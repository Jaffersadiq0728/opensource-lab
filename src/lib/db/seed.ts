import { prisma } from "./index";

async function main() {
  console.log("Seeding TyroTech System Metadata & Learning Curriculums...");
  console.log("(Zero user accounts are created during seed. System starts in fresh OS state.)");

  // Seed Learning Path: Web Security & Pentesting
  await prisma.learningPath.upsert({
    where: { slug: "web-security-pentesting" },
    update: {},
    create: {
      title: "Web Security & OWASP Pentesting",
      slug: "web-security-pentesting",
      description: "Master modern web application security, SQL injection, XSS, SSRF, and authentication bypasses.",
      category: "Web",
      difficulty: "BEGINNER",
      icon: "globe",
      courses: {
        create: [
          {
            title: "OWASP Top 10 Fundamentals",
            slug: "owasp-top-10-fundamentals",
            description: "Deep dive into web vulnerabilities, root causes, and remediation strategies.",
            difficulty: "BEGINNER",
            estimatedMinutes: 120,
            modules: {
              create: [
                {
                  title: "Module 1: Injection Attacks",
                  description: "Understanding SQL injection, Command injection, and LDAP injection.",
                  lessons: {
                    create: [
                      {
                        title: "SQL Injection Theory & Hands-on Lab",
                        slug: "sql-injection-theory-lab",
                        type: "LAB",
                        contentMarkdown: `# SQL Injection (SQLi) Fundamentals

SQL Injection occurs when untrusted user input is directly concatenated into a database query string without proper sanitization or parameterized binding.

## Attack Pattern
\`\`\`sql
SELECT * FROM users WHERE username = 'admin' AND password = '' OR '1'='1';
\`\`\`

## Mitigation Strategy
Always use parameterized queries or ORM frameworks like Prisma:
\`\`\`typescript
const user = await prisma.user.findFirst({
  where: { username, password }
});
\`\`\`
`,
                        cheatSheet: "sqlmap -u 'http://target/page.php?id=1' --batch --dbs",
                        xpReward: 100,
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  // Seed Knowledge Base Articles (MITRE ATT&CK & OWASP)
  await prisma.knowledgeArticle.upsert({
    where: { slug: "mitre-t1059-command-scripting-interpreter" },
    update: {},
    create: {
      title: "Command and Scripting Interpreter (T1059)",
      slug: "mitre-t1059-command-scripting-interpreter",
      category: "MITRE",
      referenceId: "T1059",
      content: "Adversaries may abuse command and script interpreters to execute commands, scripts, or binaries (e.g. bash, PowerShell, cmd.exe).",
      tagsJson: JSON.stringify(["Execution", "Command-Line", "MITRE"]),
    },
  });

  console.log("System metadata seeded successfully! 0 user accounts present.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
