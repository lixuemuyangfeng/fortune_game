#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const im2ccPath = fs.realpathSync(execFileSync('which', ['im2cc'], { encoding: 'utf8' }).trim());
let source = fs.readFileSync(im2ccPath, 'utf8');

if (source.includes('function buildSessionStartupNotice(params)')) {
  console.log(`startup notify already installed: ${im2ccPath}`);
  process.exit(0);
}

const helper = `function buildSessionStartupNotice(params) {
    const { sessionName, sessionId, cwd, tool, permissionMode, source } = params;
    const toolLabel = tool ?? 'codex';
    const modeLabel = permissionMode ?? 'default';
    const lines = [
        source === 'remote'
            ? \`本地已接管远程对话 "\${sessionName}"\`
            : \`本地已创建对话 "\${sessionName}"\`,
        '',
        \`session_id: \${sessionId}\`,
        \`tool: \${toolLabel}\`,
        \`mode: \${modeLabel}\`,
        \`cwd: \${cwd}\`,
        '',
        '远程控制:',
        \`  /fc \${sessionName}\`,
        \`  /mode \${modeLabel}\`,
        '  /fs',
        '  /stop',
        '  /fd',
        '',
        '本地恢复:',
        \`  im2cc connect \${sessionName}\`,
        \`  \${resumeCommand(toolLabel, sessionId)}\`,
    ];
    return lines.join('\\n');
}
async function sendFeishuText(conversationId, text, receiveIdType = 'chat_id') {
    const config = loadConfig();
    if (!config.feishu.appId || !config.feishu.appSecret) {
        throw new Error('飞书 App ID 或 App Secret 未配置');
    }
    const lark = await import('@larksuiteoapi/node-sdk');
    const sendWithClient = async (client) => {
        await client.im.message.create({
            params: { receive_id_type: receiveIdType },
            data: {
                receive_id: conversationId,
                msg_type: 'text',
                content: JSON.stringify({ text }),
            },
        });
    };
    const client = new lark.Client({ appId: config.feishu.appId, appSecret: config.feishu.appSecret });
    try {
        await sendWithClient(client);
    }
    catch (err) {
        const maybeDnsError = err && typeof err === 'object'
            && (err.code === 'ENOTFOUND'
                || err.message?.includes('ENOTFOUND open.feishu.cn') === true);
        if (!maybeDnsError)
            throw err;
        const fallbackClient = new lark.Client({
            appId: config.feishu.appId,
            appSecret: config.feishu.appSecret,
            domain: lark.Domain.Lark,
        });
        await sendWithClient(fallbackClient);
    }
}
async function sendStartupNotice(target, text) {
    const transport = target.transport ?? (target.conversationId.startsWith('wechat:') ? 'wechat' : 'feishu');
    if (transport === 'wechat') {
        const account = loadWeChatAccount();
        if (!account?.botToken)
            throw new Error('微信未绑定');
        const { WeChatAdapter } = await import('../src/wechat.js');
        const adapter = new WeChatAdapter(account);
        await adapter.sendText(target.conversationId, text);
        return;
    }
    await sendFeishuText(target.conversationId, text, target.receiveIdType ?? 'chat_id');
}
function localStartupNotifyTarget(config) {
    const conversationId = process.env.IM2CC_LOCAL_NOTIFY_CONVERSATION_ID
        ?? config.localNotifyConversationId
        ?? config.startupNotify?.localConversationId;
    if (!conversationId)
        return null;
    return {
        conversationId,
        transport: process.env.IM2CC_LOCAL_NOTIFY_TRANSPORT
            ?? config.localNotifyTransport
            ?? config.startupNotify?.localTransport
            ?? (conversationId.startsWith('wechat:') ? 'wechat' : 'feishu'),
        receiveIdType: process.env.IM2CC_LOCAL_NOTIFY_RECEIVE_ID_TYPE
            ?? config.localNotifyReceiveIdType
            ?? config.startupNotify?.localReceiveIdType
            ?? 'chat_id',
    };
}
async function notifyLocalSessionStartup(params) {
    const { sessionId, sessionName, cwd, tool, permissionMode, config } = params;
    const text = buildSessionStartupNotice({ sessionName, sessionId, cwd, tool, permissionMode, source: 'local' });
    const target = localStartupNotifyTarget(config);
    if (!target) {
        console.log('ℹ️  本地启动通知未配置：设置 IM2CC_LOCAL_NOTIFY_CONVERSATION_ID 或 config.localNotifyConversationId 后可发送给账号创建人');
        return;
    }
    try {
        await sendStartupNotice(target, text);
        console.log('📨 已发送本地启动通知');
    }
    catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(\`[startup-notify] 本地启动通知发送失败: \${msg}\`);
    }
}
`;

function replaceOnce(needle, replacement) {
  if (!source.includes(needle)) {
    throw new Error(`patch anchor not found: ${needle.slice(0, 80)}`);
  }
  source = source.replace(needle, replacement);
}

replaceOnce('function cmdHelp() {\n', `${helper}function cmdHelp() {\n`);
replaceOnce(
  `        registerWithMeta(name, sessionId, validation.resolvedPath, tool, { claudeProfile, permissionMode });
        // 在 tmux 中启动交互式工具`,
  `        registerWithMeta(name, sessionId, validation.resolvedPath, tool, { claudeProfile, permissionMode });
        await notifyLocalSessionStartup({
            sessionId,
            sessionName: name,
            cwd: validation.resolvedPath,
            tool,
            permissionMode,
            config,
        });
        // 在 tmux 中启动交互式工具`,
);
const handoffBlock = `    const handoffLead = shouldInterrupt
        ? (interrupted > 0
            ? \`🔄 "\${sessionName}" 已转到电脑端，远程正在执行的任务已停止\`
            : \`🔄 "\${sessionName}" 已转到电脑端\`)
        : \`🔄 "\${sessionName}" 已转到电脑端，当前任务会在电脑端继续处理\`;
    const registered = lookup(sessionName);
    const handoffText = [
        handoffLead,
        '',
        buildSessionStartupNotice({
            sessionName,
            sessionId,
            cwd: registered?.cwd ?? remoteBinding.cwd,
            tool: registered?.tool ?? remoteBinding.tool ?? 'codex',
            permissionMode: registered?.permissionMode ?? remoteBinding.permissionMode,
            source: 'remote',
        }),
    ].join('\\n');
    try {
        await sendStartupNotice({
            conversationId: remoteBinding.conversationId,
            transport: remoteBinding.transport ?? 'feishu',
        }, handoffText);
    }
    catch (err) {
        const code = err?.code;
        const msg = err instanceof Error ? err.message : String(err);
        console.error(\`[handoff] 接回通知发送失败\${code ? \` (\${code})\` : ''}: \${msg}\`);
    }
`;
const oldHandoffStart = source.indexOf('    const handoffText = shouldInterrupt');
const oldHandoffEnd = source.indexOf('    const suffix = shouldInterrupt', oldHandoffStart);
if (oldHandoffStart === -1 || oldHandoffEnd === -1) {
  throw new Error('patch anchor not found: releaseRemoteBinding handoff block');
}
source = source.slice(0, oldHandoffStart) + handoffBlock + source.slice(oldHandoffEnd);

fs.writeFileSync(im2ccPath, source);
console.log(`startup notify installed: ${im2ccPath}`);
