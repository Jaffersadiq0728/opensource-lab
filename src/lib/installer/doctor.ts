import { execSync } from "child_process";

export interface SystemHealthCheck {
  service: string;
  installed: boolean;
  version: string | null;
  status: "OK" | "WARNING" | "CRITICAL";
  details: string;
}

export function runSystemDoctor(): SystemHealthCheck[] {
  const checks: SystemHealthCheck[] = [];

  // Check Node.js
  try {
    const nodeVer = process.version;
    checks.push({
      service: "Node.js Environment",
      installed: true,
      version: nodeVer,
      status: "OK",
      details: "Node.js execution runtime active",
    });
  } catch {
    checks.push({
      service: "Node.js Environment",
      installed: false,
      version: null,
      status: "CRITICAL",
      details: "Node.js is missing or inaccessible",
    });
  }

  // Check Docker
  try {
    const dockerOut = execSync("docker --version 2>nul || docker --version", { encoding: "utf8" });
    checks.push({
      service: "Docker Container Engine",
      installed: true,
      version: dockerOut.trim(),
      status: "OK",
      details: "Docker daemon detected for containerized labs",
    });
  } catch {
    checks.push({
      service: "Docker Container Engine",
      installed: false,
      version: null,
      status: "WARNING",
      details: "Docker daemon not running; fallback web sandbox active",
    });
  }

  // Check VirtualBox
  try {
    const vboxOut = execSync("VBoxManage --version 2>nul || VBoxManage --version", { encoding: "utf8" });
    checks.push({
      service: "VirtualBox Hypervisor",
      installed: true,
      version: vboxOut.trim(),
      status: "OK",
      details: "VirtualBox hypervisor ready for VM labs",
    });
  } catch {
    checks.push({
      service: "VirtualBox Hypervisor",
      installed: false,
      version: null,
      status: "WARNING",
      details: "VirtualBox missing; VM labs disabled",
    });
  }

  // Check Ollama AI
  try {
    const ollamaOut = execSync("ollama --version 2>nul || ollama --version", { encoding: "utf8" });
    checks.push({
      service: "Ollama Local AI Engine",
      installed: true,
      version: ollamaOut.trim(),
      status: "OK",
      details: "Local LLM inference available offline",
    });
  } catch {
    checks.push({
      service: "Ollama Local AI Engine",
      installed: false,
      version: null,
      status: "WARNING",
      details: "Ollama not detected; fallback offline AI matrix active",
    });
  }

  return checks;
}
