# Sue's Full Stack Project Template

This template provides a minimal setup for a full-stack project, with a separate frontend and backend.

Frontend (web):
* Typescript
* React
* Vite - for hot-reload in browser, bundling. (webpack replacement)
* Vitest - for testing
* Eslint + Prettier - for linting
* Tailwind - CSS class library

Note that React, Vite, Vitest, and Tailwind are only applicable for front-end applicatoins.

Backend (server):
* node.js / ts-node
* Typescript
* Express
* Eslint + Prettier
* Jest + Supertest - for testing
* Postgres
* Node-fetch


Note that we don't need babel anywhere in this configuration, because we are using Vite instead of Webpack on the frontend, and because we are targetting newer web browsers and recent versions of node on the backend.



## Setting up with eslint

Currently, two official plugins are available:

* [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
* [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

* Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

* Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
* Optionally add `...tseslint.configs.stylisticTypeChecked`
* Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
