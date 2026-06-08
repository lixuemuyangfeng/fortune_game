from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/assets/game/social/states/social-progress-0.png"
OUT_DIR = ROOT / "public/assets/game/stock/states"
SOURCE_DIR = ROOT / "public/assets/game/stock/source"
FONT_PATH = "/System/Library/Fonts/Hiragino Sans GB.ttc"

W, H = 1280, 720


def font(size, index=0):
    return ImageFont.truetype(FONT_PATH, size=size, index=index)


def draw_round(draw, xy, fill, outline=None, width=2, radius=12):
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


def draw_text(draw, xy, text, size, fill=(235, 240, 230), index=0, spacing=4):
    draw.multiline_text(xy, text, font=font(size, index), fill=fill, spacing=spacing)


def fit_source():
    image = Image.open(SOURCE).convert("RGB")
    scale = max(W / image.width, H / image.height)
    resized = image.resize((round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS)
    left = (resized.width - W) // 2
    top = (resized.height - H) // 2
    return resized.crop((left, top, left + W, top + H))


def kline(draw, x, y, points, color=(232, 76, 62), width=4):
    scaled = [(x + px, y + py) for px, py in points]
    draw.line(scaled, fill=color, width=width, joint="curve")
    for px, py in scaled:
        draw.ellipse((px - 3, py - 3, px + 3, py + 3), fill=color)


def paper(draw, x, y, w, h, title, body, fill=(226, 218, 188), angle_label=None):
    draw_round(draw, (x, y, x + w, y + h), fill, outline=(107, 98, 68), width=2, radius=7)
    draw_text(draw, (x + 14, y + 10), title, 18, fill=(45, 50, 40), index=1)
    draw.line((x + 14, y + 38, x + w - 14, y + 38), fill=(150, 80, 65), width=2)
    draw_text(draw, (x + 14, y + 48), body, 14, fill=(55, 57, 48))
    if angle_label:
        draw_round(draw, (x + w - 54, y + h - 32, x + w - 12, y + h - 8), (187, 76, 54), radius=4)
        draw_text(draw, (x + w - 48, y + h - 29), angle_label, 13, fill=(250, 232, 210), index=1)


def phone(draw, x, y, w, h, title, change, line_color=(230, 61, 54)):
    draw_round(draw, (x, y, x + w, y + h), (18, 24, 25), outline=(40, 48, 48), width=3, radius=17)
    draw_round(draw, (x + 8, y + 12, x + w - 8, y + h - 14), (226, 230, 218), radius=10)
    draw_text(draw, (x + 17, y + 22), title, 15, fill=(35, 42, 38), index=1)
    draw_text(draw, (x + 17, y + 48), change, 18, fill=(180, 34, 34), index=1)
    kline(draw, x + 18, y + 88, [(0, 38), (22, 22), (45, 28), (68, 9), (92, 2), (116, -16)], line_color, 3)


def monitor(draw, x, y, w, h):
    draw_round(draw, (x, y, x + w, y + h), (17, 27, 27), outline=(73, 84, 78), width=4, radius=12)
    draw_round(draw, (x + 14, y + 18, x + w - 14, y + h - 22), (230, 232, 224), radius=7)
    draw_text(draw, (x + 32, y + 32), "2026 年以来涨幅榜", 24, fill=(24, 34, 31), index=1)
    rows = [
        ("中际旭创", "约4967%"),
        ("天孚通信", "约700%"),
        ("新易盛", "超1000%"),
        ("利通电子", "年内超5倍"),
        ("巨能股份", "30%涨停"),
    ]
    yy = y + 75
    for index, (name, pct) in enumerate(rows):
        fill = (242, 245, 236) if index % 2 == 0 else (222, 229, 221)
        draw.rectangle((x + 28, yy, x + w - 28, yy + 32), fill=fill)
        draw_text(draw, (x + 42, yy + 5), name, 16, fill=(38, 44, 40))
        draw_text(draw, (x + w - 148, yy + 5), pct, 16, fill=(164, 36, 32), index=1)
        yy += 38
    draw.rectangle((x + w // 2 - 45, y + h, x + w // 2 + 45, y + h + 16), fill=(28, 35, 33))
    draw_round(draw, (x + w // 2 - 72, y + h + 13, x + w // 2 + 72, y + h + 24), (24, 30, 28), radius=6)


def add_scene_objects(base):
    img = base.convert("RGBA")
    wash = Image.new("RGBA", (W, H), (8, 16, 14, 42))
    img = Image.alpha_composite(img, wash)
    draw = ImageDraw.Draw(img)

    # Dark desk extension and stock-monitor cluster.
    draw.polygon([(540, 135), (1265, 110), (1265, 705), (440, 710)], fill=(32, 25, 20, 185))
    monitor(draw, 640, 105, 425, 290)
    phone(draw, 430, 355, 112, 188, "热榜推送", "+20cm", line_color=(230, 70, 62))
    phone(draw, 176, 563, 118, 170, "券商弹窗", "融资买入", line_color=(221, 55, 50))

    paper(draw, 565, 430, 165, 116, "龙虎榜剪报", "机构席位\n游资净买\n散户跟风", angle_label="热")
    paper(draw, 764, 423, 150, 100, "涨停通知", "巨能股份\n6月8日\n30% 涨停", fill=(244, 224, 166), angle_label="停")
    paper(draw, 948, 415, 178, 115, "卖房加仓草算纸", "首付 - 违约金\n= 可追涨资金\n孩子学费待填", fill=(223, 212, 188))
    paper(draw, 1004, 560, 196, 112, "风险揭示折角", "过往涨幅不代表未来\n高波动可能导致亏损", fill=(210, 218, 206))
    paper(draw, 730, 554, 170, 105, "模拟盘满仓图", "满仓 AI 光模块\n收益率 +168%\n未显示回撤", fill=(216, 226, 218))

    # Chat cards and small tickets.
    draw_round(draw, (545, 220, 628, 292), (218, 230, 222), outline=(86, 105, 92), radius=10)
    draw_text(draw, (557, 231), "荐股群\n邀请卡", 17, fill=(38, 48, 42), index=1)
    draw_round(draw, (554, 266, 612, 283), (68, 126, 78), radius=8)
    draw_text(draw, (567, 265), "进群", 13, fill=(245, 240, 218), index=1)

    paper(draw, 340, 500, 142, 90, "三倍截图", "新易盛\n2024-2026\n超1000%", fill=(241, 230, 188), angle_label="红")
    paper(draw, 307, 321, 132, 88, "700%截图", "天孚通信\n两年累计\n刷屏", fill=(226, 235, 222))
    paper(draw, 1088, 184, 125, 94, "中望20cm", "涨停字样\n被圈三遍", fill=(238, 226, 180), angle_label="20")
    paper(draw, 87, 470, 142, 92, "五倍便签", "利通电子\n年内超5倍\n被贴到杯边", fill=(239, 224, 182))
    paper(draw, 936, 270, 152, 84, "中际旭创", "榜首行被荧光笔\n画到发亮", fill=(236, 234, 204))

    # More same-category decoys: ordinary slips and harmless chart clutter.
    for x, y, text in [
        (33, 392, "水电费"), (71, 610, "旧快递单"), (249, 626, "普通便签"), (492, 620, "购物小票"),
        (608, 621, "普通账单"), (914, 631, "咖啡渍"), (1146, 332, "空白贴纸"), (1172, 487, "遥控器"),
        (386, 661, "书签"), (828, 318, "普通表格"), (460, 189, "窗边相框"), (1154, 112, "旧书脊"),
    ]:
        draw_round(draw, (x, y, x + 82, y + 36), (196, 189, 161, 150), outline=(92, 84, 62), width=1, radius=5)
        draw_text(draw, (x + 9, y + 8), text, 13, fill=(50, 48, 39))

    # Cigarette smoke / fatigue marks near the protagonist.
    draw.arc((250, 225, 315, 275), 190, 330, fill=(210, 218, 206, 95), width=2)
    draw.arc((286, 199, 344, 248), 180, 330, fill=(210, 218, 206, 72), width=2)
    return img


def add_expression_state(img, progress):
    out = img.copy()
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    # Face/neck region from the reused room plate; visible enough for progress changes.
    face_alpha = min(95, 24 + progress * 6)
    stress_alpha = max(10, 95 - progress * 5)
    draw.ellipse((200, 185, 345, 328), fill=(205, 138, 83, face_alpha))
    draw.arc((244, 245, 297, 270), 12, 172, fill=(58, 35, 28, stress_alpha), width=2)
    draw.line((236, 224, 282, 216), fill=(42, 28, 24, stress_alpha), width=2)
    if progress >= 9:
        draw.arc((236, 232, 302, 275), 200, 340, fill=(215, 168, 104, 90), width=3)
    if progress >= 12:
        draw.ellipse((248, 236, 258, 246), fill=(235, 214, 160, 80))
    out = Image.alpha_composite(out, overlay.filter(ImageFilter.GaussianBlur(1.6)))
    if progress:
        enhancer = ImageEnhance.Color(out)
        out = enhancer.enhance(0.96 + progress * 0.006)
    return out.convert("RGB")


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    SOURCE_DIR.mkdir(parents=True, exist_ok=True)
    base = fit_source()
    scene = add_scene_objects(base)
    scene.convert("RGB").save(SOURCE_DIR / "stock-base.png", quality=95)
    for progress in range(14):
        add_expression_state(scene, progress).save(OUT_DIR / f"stock-progress-{progress}.png", quality=95)


if __name__ == "__main__":
    main()
