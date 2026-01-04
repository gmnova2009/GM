KMS — small web project

Setup (PowerShell):

1. Configure Git identity (you provided):

```powershell
git config --global user.name "gmnova2009"
git config --global user.email "gmnova2009@gmail.com"
```

2. Initialize, add, commit:

```powershell
cd "C:\Users\User\Desktop\KMS"
git init
git add .
git commit -m "Initial commit"
```

3. Create GitHub repo:

- Option A (web): create new repo on GitHub and copy remote URL.
- Option B (CLI):

```powershell
# Requires GitHub CLI (gh)
gh repo create kms --public --source=. --remote=origin --push
```

4. Or add remote and push manually:

```powershell
git branch -M main
git remote add origin https://github.com/<your-username>/kms.git
git push -u origin main
```

Notes:

- If you have large audio files (mp3), install Git LFS and track them:

```powershell
git lfs install
git lfs track "*.mp3"
git add .gitattributes
```

- `.gitignore` is included in this repo; edit it before your first `git add .` if you want to exclude more files.
