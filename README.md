# TyroTech - Self-Hosted Open-Source Cybersecurity Learning & Lab Platform

TyroTech is an enterprise-grade, production-ready, self-hosted cybersecurity education and lab platform designed to run **100% offline** (or with optional cloud/AI APIs).

---

## 🔒 OS-Style Zero-Trust Fresh Installation

TyroTech starts in a **completely fresh state** like a brand-new operating system installation:
- **NO default admin account**
- **NO default student account**
- **NO demo credentials**
- **NO hardcoded usernames or backdoor accounts**

### Initial Setup Wizard (`/setup`)
1. On first launch, TyroTech automatically detects if the `User` table is empty.
2. If empty, the system automatically redirects to the **Initial Setup Wizard** at `/setup`.
3. The installation owner creates their **Administrator Account** (Full Name, Username, optional Email, and Argon2id Password).
4. Upon creation, the setup wizard is **permanently locked (403 Forbidden)**.
5. All future users are created securely by the Administrator.

---

## ⚡ How to Launch TyroTech

### Option A: Using PowerShell (Windows)

```powershell
cd C:\Users\jaffe\.gemini\antigravity-ide\scratch\tyrotech
.\start.bat
```

### Option B: Terminal Commands

```bash
cd C:\Users\jaffe\.gemini\antigravity-ide\scratch\tyrotech

# 1. Install dependencies
npm install

# 2. Push database schema & seed initial metadata
npx prisma db push
npm run db:seed

# 3. Start application
npm run dev
```

Open **`http://localhost:3000`** in your browser.

---

## 📤 How to Push to GitHub

```bash
cd C:\Users\jaffe\.gemini\antigravity-ide\scratch\tyrotech

git init
git add .
git commit -m "Fresh OS-style install setup & clean database architecture"
git branch -M main
git remote add origin https://github.com/Jaffersadiq0728/opensource-lab.git
git push -u origin main
```
