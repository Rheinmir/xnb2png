# Rules

## Coding Standards
- **Component Style**: Functional React Components with Hooks.
- **Styling**: Use TailwindCSS utility classes. Avoid custom CSS files unless necessary for complex animations.
- **State Management**: Use React local state (`useState`, `useReducer`) or Context for global app state.
- **File Naming**: CamelCase for JS functions, PascalCase for React Components (`SomeComponent.jsx`).

## Architecture Rules
- keep `components` pure and display-oriented where possible.
- Put complex logic in `utils` or custom `hooks`.
- Do not hardcode magic numbers; use constants or config files.

## RAG Maintenance
- **Single Source of Truth**: This `rag/` directory is the source of truth for AI agents.
- **Update Policy**: ANY modification to the codebase (logic, architecture, workflows) MUST be accompanied by an update to the corresponding file in this directory.
- **Session Context**: AI Agents should read these files to ground their understanding before making changes.

## Git Flow
- **Main Branch**: Deploys to production via Jenkins.
- **Commit Messages**: specific format not enforced but clarity is required.
