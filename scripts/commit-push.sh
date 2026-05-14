#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

message="${1:-}"
remote="${GIT_REMOTE:-origin}"
branch="$(git branch --show-current)"

if [[ -z "$branch" ]]; then
  echo "No current branch. Check out a branch before shipping." >&2
  exit 1
fi

if [[ -z "$message" ]]; then
  message="Update fortune game UI"
fi

echo "Repository: $repo_root"
echo "Branch: $branch"
echo "This script commits all tracked and untracked project changes, including code, docs, and public assets."

if git remote get-url "$remote" >/dev/null 2>&1; then
  remote_url="$(git remote get-url "$remote")"
  if [[ "$remote_url" == https://github.com/lixuemuyangfeng/fortune_game.git ]]; then
    git remote set-url "$remote" git@github.com:lixuemuyangfeng/fortune_game.git
    echo "Switched $remote to SSH to avoid HTTPS username prompts."
  fi
else
  git remote add "$remote" git@github.com:lixuemuyangfeng/fortune_game.git
  echo "Added $remote as SSH remote."
fi

echo "Syncing $branch with $remote before committing..."
git fetch "$remote" "$branch" >/dev/null 2>&1 || true
if git show-ref --verify --quiet "refs/remotes/$remote/$branch"; then
  git pull --rebase --autostash "$remote" "$branch"
else
  echo "Remote branch $remote/$branch does not exist yet; will create it on push."
fi

if [[ "${SKIP_VERIFY:-0}" == "1" ]]; then
  echo "Skipping verification because SKIP_VERIFY=1."
else
  echo "Running verification..."
  npm test
  npm run build
  npm run test:e2e
fi

git add -A

if git diff --cached --quiet; then
  echo "No staged changes. Pushing current branch $branch."
else
  git commit -m "$message"
fi

if ! git push -u "$remote" "$branch"; then
  echo "Initial push failed. Rebasing once and retrying..."
  git pull --rebase --autostash "$remote" "$branch"
  git push -u "$remote" "$branch"
fi
