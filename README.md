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

## 🎯 Objectives

1. **Evaluate** AI-assisted coding impact on **quality, reliability, maintainability, hygiene, and security** in full-stack applications.
2. **Compare** two different AI models (SLM vs LLM) in practical development contexts.
3. **Provide** actionable recommendations for developers and organizations considering AI-assisted coding tools.

---

## 🛠️ Methodology

Our research follows a **controlled experimental design**:

1. **Selected Projects**  
   Three open-source MERN stack projects:
   - [MERN Thinkboard](https://github.com/burakorkmez/mern-thinkboard)  
   - [MERN Social Media](https://github.com/ed-roh/mern-social-media)  
   - [MERN Chat App](https://github.com/burakorkmez/fullstack-chat-app)  

2. **Experiment Process**
   - Identify and remove 5 target files (min. 2 frontend) from each project.
   - Use a **universal full-stack tailored prompt** to generate replacements with each AI model.
   - Maintain separate branches for:
     - Original code
     - Phi-4 generated files
     - Llama-3.1 generated files

3. **Analysis Tools**
   - **Static Analysis:** SonarQube, ESLint  
   - **Runtime Performance:** Lighthouse  
   - **Security Testing:** OWASP ZAP  

4. **Statistical Tests**
   - Wilcoxon Signed Rank Test  
   - Mann–Whitney U Test  

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
├     └── cli-gen-logs     # Generation logs and output files          
└── README.md              # This file
```

---

## 📖 Wiki


See the **[Project Wiki](../../wiki)**.

---


## ⚠️ License

This repository is licensed under the [MIT License](LICENSE), unless otherwise stated for third-party code or datasets.

---

## 🌐 Related Work

- Khan et al. (2023) — *Assessing the Promise and Pitfalls of ChatGPT for Automated Code Generation*  
- Tan et al. (2024) — *How far are AI powered programming assistants from meeting developers' needs?*  
- Agarwal et al. (2024) — *Copilot Evaluation Harness*  
- more...

(Full bibliography available in the thesis document.)

---

## 📬 Contact

- Georgios Panormitis Latos — [gusgeorgla@student.gu.se]  
- Joey Karlsson — [gusjoeyka@student.gu.se]  
