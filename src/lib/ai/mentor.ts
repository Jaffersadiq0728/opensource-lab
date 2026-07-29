export interface MentorMessage {
  sender: "user" | "mentor";
  content: string;
  timestamp: string;
}

export async function askAiMentor(prompt: string, context?: string): Promise<string> {
  const p = prompt.toLowerCase();

  if (p.includes("yara")) {
    return `rule TyroTech_Malware_Detect {
    meta:
        description = "Auto-generated YARA signature by TyroTech AI Mentor"
        author = "TyroTech Cyber AI"
        date = "2026-07-29"
    strings:
        $cmd1 = "cmd.exe /c powershell -enc"
        $hex1 = { 4D 5A 90 00 03 00 00 00 }
    condition:
        uint16(0) == 0x5A4D and any of ($cmd*, $hex*)
}`;
  }

  if (p.includes("sigma")) {
    return `title: Suspicious PowerShell Encoded Execution
id: 9a2f1b40-7e3a-4c2d-91b4-10b98100f0ff
status: experimental
description: Detects obfuscated PowerShell command lines
logsource:
    category: process_creation
    product: windows
detection:
    selection:
        CommandLine|contains:
            - '-enc'
            - '-encodedcommand'
    condition: selection
falsepositives:
    - Administrative maintenance scripts
level: high`;
  }

  if (p.includes("hint") || p.includes("sql")) {
    return "AI Mentor Hint: For SQL Injection in login forms, test payload: admin' OR '1'='1 -- to force the authentication boolean query to evaluate to true. Never hardcode strings directly in SQL queries!";
  }

  if (p.includes("cve")) {
    return "CVE Analysis (e.g. CVE-2023-34048): Critical remote code execution vulnerability in VMware vCenter Server vSphere client. Remediation requires updating vCenter server instance to patched build.";
  }

  return "I am your TyroTech Cybersecurity Instructor. I can help explain vulnerabilities, guide lab hints, generate YARA and Sigma rules, review quiz performance, and structure your daily study roadmap.";
}
