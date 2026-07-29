# TyroTech - Self-Hosted Open-Source Cybersecurity Learning & Lab Platform

TyroTech is an enterprise-grade, production-ready, self-hosted cybersecurity education and lab platform designed to run **100% offline** (or with optional cloud/AI APIs).

---

<<<<<<< HEAD
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
=======
## 🚀 Key Modules Included

1. **Virtual Machine Manager**: Hypervisor integration for VirtualBox & VMware with VM controls and snapshots.
2. **Network Lab Builder**: Drag-and-drop canvas topology builder for routers, switches, firewalls, and subnets.
3. **Docker Lab Engine**: Automatic multi-container deployment, port mappings, and flag verification.
4. **Cybersecurity Workspace**: Web Terminal, PCAP Packet Dissector, Log Analyzer, Hash Generator/Identifier, JWT Inspector & HTTP Builder.
5. **AI Cyber Mentor**: Offline Ollama + multi-provider assistant for YARA/Sigma rule generation, CVE breakdowns, and hints.
6. **Offline Knowledge Base**: Fast indexed database for MITRE ATT&CK, OWASP Top 10, CVEs, NIST, and Cheat Sheets.
7. **Red & Blue Team Workspaces**: Web/AD pentesting tools & SIEM Log Analyzer (Wazuh/Elastic simulator).
8. **Enterprise Edition**: Classroom management, student cohorts, and instructor dashboards.
9. **Lab Marketplace & Community**: Download signature-verified lab packs and engage in community discussions.
10. **`tyrotech` CLI Package Manager & System Doctor**: Diagnostic CLI tool for platform maintenance.

---

## 🛠️ Prerequisites & Installation

- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**
- *(Optional)* **Docker Desktop** (for containerized labs)
- *(Optional)* **VirtualBox** (for VM-based labs)
- *(Optional)* **Ollama** (for local offline LLM AI mentor)

---

## ⚡ How to Run TyroTech Locally

### Step 1: Navigate to the project folder
```bash
cd C:\Users\jaffe\.gemini\antigravity-ide\scratch\tyrotech
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Set up Environment Variables
Create a `.env` file in the root folder:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="tyrotech-production-secret-key-2026"
NODE_ENV="development"
```

### Step 4: Initialize Database & Seed Content
```bash
npx prisma db push
npm run db:seed
```

### Step 5: Start the Development Server
```bash
npm run dev
```

Open your browser and navigate to:
👉 **`http://localhost:3000`**

---

## 🔑 Default Login Credentials (from Seed)

- **Admin Account**:
  - Email: `admin@tyrotech.local` or Username: `admin`
  - Password: `admin123`
- **Student Account**:
  - Email: `student@tyrotech.local` or Username: `student`
  - Password: `student123`
>>>>>>> cfaeb654a47cfead08727d956d3d2146a1b8f846

---

## 📤 How to Push to GitHub

<<<<<<< HEAD
=======
Run the following commands in your terminal to push this project to your repository [`https://github.com/Jaffersadiq0728/opensource-lab`](https://github.com/Jaffersadiq0728/opensource-lab):

>>>>>>> cfaeb654a47cfead08727d956d3d2146a1b8f846
```bash
cd C:\Users\jaffe\.gemini\antigravity-ide\scratch\tyrotech

git init
git add .
<<<<<<< HEAD
git commit -m "Fresh OS-style install setup & clean database architecture"
=======
git commit -m "Initial commit: TyroTech Cybersecurity Platform"
>>>>>>> cfaeb654a47cfead08727d956d3d2146a1b8f846
git branch -M main
git remote add origin https://github.com/Jaffersadiq0728/opensource-lab.git
git push -u origin main
```
<<<<<<< HEAD
=======

---

## 💻 `tyrotech` CLI Commands

Run the platform diagnostic CLI:
```bash
npm run cli doctor
```

---

## 📜 License
Open-Source under MIT License.
>>>>>>> cfaeb654a47cfead08727d956d3d2146a1b8f846
