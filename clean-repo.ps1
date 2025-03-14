# Remove arquivos de build do Electron
Remove-Item -Path "dist_electron" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "release" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "out" -Recurse -Force -ErrorAction SilentlyContinue

# Atualiza o .gitignore
@"
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Electron build output
/release
/dist_electron
/out

# Environment variables
.env
.env.local
.env.*.local
"@ | Set-Content .gitignore

# Remove os arquivos do histórico do Git
git filter-branch --force --index-filter "git rm -r --cached --ignore-unmatch dist_electron" --prune-empty --tag-name-filter cat -- --all
git filter-branch --force --index-filter "git rm -r --cached --ignore-unmatch release" --prune-empty --tag-name-filter cat -- --all
git filter-branch --force --index-filter "git rm -r --cached --ignore-unmatch out" --prune-empty --tag-name-filter cat -- --all

# Força o garbage collector do Git
git for-each-ref --format="delete %(refname)" refs/original/ | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now --aggressive
