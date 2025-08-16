# 📄 Bachelor Thesis — *The Impact of AI-Assisted Coding on Full-Stack Development*

**Authors:**  
- Georgios Panormitis Latos  
- Joey Karlsson  

**Supervisor:** Farnaz Fotrousi  

**University:** University of Gothenburg.  
**Date:** August, 2025.  
**Repository Type:** Research / Academic  

---

## 📚 Overview

This repository contains the research materials, code, and documentation for our thesis.

Our research evaluates how AI coding assistants influence software engineering outcomes in realistic **full-stack** development scenarios. Specifically, we compare **Microsoft’s Phi-4 14B Reasoning Plus** (a small language model) with **Meta’s Llama-3.1 70B Instruct** (a large language model), focusing on **code quality, maintainability, performance, security, and developer productivity**.

Unlike previous studies focused on isolated coding tasks, our work examines AI-assisted development in **integrated MERN stack applications**, reflecting real-world complexities.

---

## 🛠️ Selected Projects

   Three open-source MERN stack projects:
   - [MERN Thinkboard](https://github.com/burakorkmez/mern-thinkboard)  
   - [MERN Social Media](https://github.com/ed-roh/mern-social-media)  
   - [MERN Chat App](https://github.com/burakorkmez/fullstack-chat-app)  


---

## 📊 Metrics Collected

| Category        | Tool         | Key Metrics |
|-----------------|--------------|-------------|
| **Reliability** | SonarQube / ESLint | Bugs, Halstead Bugs, CLS |
| **Maintainability** | SonarQube / ESLint | Code Smells, Technical Debt, Cyclomatic Complexity, Halstead Effort |
| **Hygiene** | ESLint / Lighthouse | Total Issues, Best Practices |
| **Performance** | Lighthouse | INP, TBT, Performance Score |
| **Security** | OWASP ZAP | Detected vulnerabilities |

---

## 📦 Repository Structure

```
├── ProjectData/           # Data entry folder per project
├ └── *ProjectName*/
├     └── cli-gen-logs/    # Generation logs and output files      
├     └── eslint-report/   # Contains all .json report output files and a .csv that includes them all
├     └── sonarqube/       # Contains an exported in .json version of the SonarQube project and a .csv with our selected metrics
└── README.md              # This file
```

---

## 📖 Wiki


See the **[Project Wiki](../../wiki)**.

---


## ⚠️ License

This repository is licensed under the [MIT License](LICENSE), unless otherwise stated for third-party code or datasets.

---

## 📬 Contact

- Georgios Panormitis Latos — [gusgeorgla@student.gu.se]  
- Joey Karlsson — [gusjoeyka@student.gu.se]  
