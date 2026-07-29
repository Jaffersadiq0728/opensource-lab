# TyroTech - Self-Hosted Open-Source Cybersecurity Learning & Lab Platform

TyroTech is an enterprise-grade, production-ready, self-hosted cybersecurity education and lab platform designed to run **100% offline** (or with optional cloud/AI APIs).

---

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

---

## 📤 How to Push to GitHub

Run the following commands in your terminal to push this project to your repository [`https://github.com/Jaffersadiq0728/opensource-lab`](https://github.com/Jaffersadiq0728/opensource-lab):

```bash
cd C:\Users\jaffe\.gemini\antigravity-ide\scratch\tyrotech

git init
git add .
git commit -m "Initial commit: TyroTech Cybersecurity Platform"
git branch -M main
git remote add origin https://github.com/Jaffersadiq0728/opensource-lab.git
git push -u origin main
```

---

## 💻 `tyrotech` CLI Commands

Run the platform diagnostic CLI:
```bash
npm run cli doctor
```

---

## 📜 License
Open-Source under MIT License.
