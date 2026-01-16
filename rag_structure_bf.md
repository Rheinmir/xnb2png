# Generic RAG Context Structure Template

This guide describes how to create a standardized `rag` context for ANY project. This ensures that AI agents can quickly understand the project state, architecture, and rules without needing re-training.

## 📂 Folder Structure
Create a directory named `rag` at the root of your project. Inside, create the following markdown files:

```text
project_root/
└── rag/
    ├── architecture.md
    ├── workflows.md
    ├── rules.md
    ├── tech_stack.md
    ├── business_logic.md
    └── templates/
        └── random_component1_UI_UX_template.md
```
🏛️ 1. ARCHITECTURE (rag/architecture.md)
Purpose: Explain "How it works" and "How it's organized".

[ ] System Context: - [ ] High-Level Diagram: - [ ] Directory Structure: - [ ] Key Data Flows: ---
 update architecture.md based on instant code
⚙️ 2. WORKFLOWS (rag/workflows.md)
Purpose: Explain "How to run/build/deploy it".

[ ] Development: - [ ] Building: - [ ] Deployment: - [ ] Testing: ---
update workflows.md based on instant code
📜 3. RULES (rag/rules.md)
Purpose: Explain "How to write code here".

[ ] Coding Standards: - [ ] Architecture Rules: - [ ] Special Rules: - [ ] Git Flow: ---
update rules.md based on instant code
## AI Agent Guidelines
1. **RAG Maintenance**: ANY modification to the codebase (logic, architecture, workflows) MUST be accompanied by an update to the corresponding file in the `rag/` directory. This ensures the context remains the single source of truth.
2. **Session Start**: At the beginning of every new chat or session, the AI MUST read `rag/rules.md` first to align with project standards.

🛠️ 4. TECH STACK (rag/tech_stack.md)
Purpose: Explain "What is it built with".
update architecture.md based on instant code
[ ] Core Engine: - [ ] Libraries: - [ ] Infrastructure: ---
update tech_stack.md based on instant code
🧠 5. BUSINESS LOGIC (rag/business_logic.md)
Purpose: Explain "What are the rules/formulas/algorithms".

[ ] Domain Rules: - [ ] State Machine: - [ ] Algorithms: - [ ] Constraints: ---
update business_logic.md based on instant code
🚀 Usage Guide
Initialize: Create the rag/ folder and files immediately.

Populate: Use an AI Agent to scan the codebase and fill in the placeholders above.

Maintain: Add a rule in rules.md to update these files whenever code changes.

##random_component1_UI_UX_template.md
# Component Name UI/UX Specification
Base on what prompt describe name of the component, make a general template of UI/UX of this component, which can be used as a reference for the future using(using new created template, AI model can make the same UI/UX in other projects mapping field/values of the new needs).
## Overview
Brief description of the component's purpose. 

## Visual Design
- **Layout**:
- **Colors**:
- **Typography**:

## Interactions
- **States**: (Default, Hover, Active, Disabled, Loading)
- **Animations**:
- **Events**:

## Accessibility
- **ARIA Roles**:
- **Keyboard Navigation**:

## Usage Example
```tsx
<Component />
```
