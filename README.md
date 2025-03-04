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

Backend (microservices):
* node.js / ts-node / nodemon?
* Typescript
* Express
* Eslint + Prettier
* Jest + Supertest - for testing
* Postgres - relational database
* Knex - query builder
* TBD: Node-fetch (or Axios?)

MonoRepo:
* NPM Workspaces
* package.json supplemented by BASH scripts
* 'concurrently' npm package

Deployment: (coming soon)
* CI:  tbd
* Coming Soon: Docker or Docker Compose for containerization??
* Maybe??: Kubernetes


Note that we don't need babel or Webpack anywhere in this configuration, because we are using Vite instead of Webpack on the frontend, and because we are targetting newer web browsers and recent versions of node on the backend.

## Microservices



### Configuration

## Setting up with eslint - This is from Vite's original documentation

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

### Notes on module resolution

The frontend tsconfig.json specifies, the following which work fine with Vite and newer web browsers.

```
  "compilerOptions": {
    "target": "ES2024",
    "module": "ESNext", // for frontend projects that use Vite
    "moduleResolution": "bundler"
  }
```

On the backend, I have several microservices.  While I woule like to use the newer ESM style module resolution and imports (instead of require), some of the thirdparty libraies i need to use (for file upload, parsing different document types, etc) are only available as commonJS modules (and thus my services must use "require" to import these instead of the ES6-style "import".

SO, IN GENERAL:
* each of my backend microservice packages shoudl strive to use "ESM-compliant" libraries instead of CommonJS libraries.
* When possible, avoid mixing CommonJS and ESM libraries within the same microservice. If it's needed, consider actually dividing this up into two or more microservices.
* If one of my services needs to import a commonJS module (i.e. it needs to be brought in using 'require') then that particular microservice/workspace's tsconfig.json should have the following settings:
  * moduleResolution:  ????
  * module: ???
    * target: ??
        (also, what abouto other related tsconfig.json settings, like allowImportingTsExtendsions, isolateModules, allowSyntheticDefaultImprots ???)
* If one of my backed sservices is able to use all use ESM style libraries, then the tsconfig.json should have these settings. I should always try to "import" if I can instad of "require"  (wait, is there ever a require/commonJS that I can't rewrite as a import via dynamic imports?)
  * <Find them out>

* I Need to decide a strategy for how to import, even with lots of different workspaces/microservices that have some common code (i.e. utilities).  Should I use relative paths in import statements?  When and why can I use "dynamic importing"  (i.e.const multer = await import('multer'); )
