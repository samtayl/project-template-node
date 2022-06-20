# How to create my node project template <!-- omit in toc -->

## Contents <!-- omit in toc -->

- [Prerequisites](#prerequisites)
- [git](#git)
- [.editorconfig](#editorconfig)
- [.gitattributes](#gitattributes)
- [README.md](#readmemd)
- [LICENSE](#license)
- [package.json](#packagejson)
- [Yarn](#yarn)
- [.gitignore](#gitignore)
- [ESLint](#eslint)
- [Prettier](#prettier)
- [CSpell](#cspell)
- [lint-staged](#lint-staged)
- [commitlint](#commitlint)
- [husky](#husky)
- [Commit](#commit)

## Prerequisites

- Git
- Node (v16+)
- Yarn (v2+)

## git

Initialize Git:

```
git init
```

## .editorconfig

Create the `.editorconfig` file.

Populate it with:

```conf
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true
```

## .gitattributes

Create the `.gitattributes` file.

Populate it with:

```conf
* text=auto eol=lf
```

## README.md

Create the `README.md` file.

Populate it with:

```md
# Your project name
```

## LICENSE

Choose a license. Use the following links to choose:

- https://choosealicense.com/
- https://opensource.org/licenses/
- https://spdx.org/licenses/

Create the `LICENSE` file.

Populate it with the text of your chosen license.

## package.json

Create the `package.json` file.

Populate it with:

```JSON
{
  "name": "",
  "version": "",
  "type": "",
  "description": "",
  "keywords": [],
  "license": "",
  "author": "",
  "homepage": "",
  "bugs": "",
  "repository": {
    "type": "",
    "url": ""
  },
  "files": [],
  "main": "",
  "exports": "",
  "scripts": {},
  "dependencies": {},
  "devDependencies": {},
  "peerDependencies": {},
  "engines": {}
}
```

Populate the fields you use. Remove the ones you don't.

## Yarn

Initialize yarn:

```
yarn set version stable
```

This will create the `.yarn/` directory and the `.yarnrc.yml` file:

```
yarnPath: .yarn/releases/yarn-x.y.z.cjs
```

Prepend this file with:

```diff
+ nodeLinker: node-modules

yarnPath: .yarn/releases/yarn-x.y.z.cjs
```

It will also add the `packageManager` field (and a comma to the preceding
field) to `package.json`:

```diff
{
  ...
- "engines": {}
+ "engines": {},
+ "packageManager": "yarn@x.y.z"
}
```

And it will also, delightfully, remove the empty fields: `scripts`,
`dependencies`, `devDependencies`, `peerDependencies`, despite being
placed there intentionally:

```diff
{
  ...
  "exports": "",
- "scripts": {},
- "dependencies": {},
- "devDependencies": {},
- "peerDependencies": {},
  "engines": {},
  ...
}
```

Append `.gitattributes` with:

```diff
* text=auto eol=lf

+ .yarn/releases/** binary
+ .yarn/plugins/** binary
```

## .gitignore

Create the `.gitignore` file.

Populate it with:

```
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions
node_modules
```

Add the `devDependencies` field to your `package.json`.

```diff
{
  ...
  "exports": "",
+ "devDependencies": {},
  "engines": {},
  ...
}
```

## ESLint

Install ESLint and my personal ESLint config:

```
yarn add eslint @samtayl/eslint-config -D
```

Create the `.eslintrc.js` file.

Populate it with:

```JS
module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  extends: ['@samtayl'],
};
```

Add the `scripts` field and code linting scripts to your package.json.

```diff
{
  ...
  "exports": "",
+ "scripts": {
+   "lint:code": "eslint --ext .js .",
+   "lint:code:fix": "yarn lint:code --fix"
+  },
  "devDependencies": {},
  ...
}
```

## Prettier

Install prettier:

```
yarn add prettier -D
```

Create the `.prettierrc.js` file.

```JS
module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: false,
};
```

Add other linting scripts to your package.json.

```diff
{
  ...
  "scripts": {
    "lint:code": "eslint --ext .js .",
-   "lint:code:fix": "yarn lint:code --fix"
+   "lint:code:fix": "yarn lint:code --fix",
+   "lint:other": "prettier --check \"**/*.{json,md,yml}\"",
+   "lint:other:fix": "yarn lint:other --write"
  },
  ...
}
```

## CSpell

Install CSpell:

```
yarn add cspell -D
```

Create the `.cspellrc.js` file.

Populate it with:

```js
module.exports = {
  language: 'en-GB',
  dictionaries: ['typescript', 'node', 'npm'],
  words: ['cspellrc', 'commitlint', 'samtayl'],
};
```

Add a spelling linting script to your `package.json`.

```diff
{
  ...
  "scripts": {
    ...
    "lint:other": "prettier --check \"**/*.{json,md,yml}\"",
-   "lint:other:fix": "yarn lint:other --write"
+   "lint:other:fix": "yarn lint:other --write",
+   "lint:spelling": "cspell \"**\" --config .cspellrc.js"
  }
  ...
}
```

## lint-staged

Install lint-staged:

```
yarn add lint-staged -D
```

Create the `.lintstagedrc.js` file.

Populate it with:

```js
module.exports = {
  '*.js': 'yarn lint:code:fix',
  '*.{json,md,yaml}': 'yarn lint:other:fix',
  '*': 'yarn lint:spelling',
};
```

Add a staging area linting script to your package.json.

```diff
{
  ...
  "scripts": {
    ...
    "lint:other:fix": "yarn lint:other --write",
-   "lint:spelling": "cspell \"**\" --config .cspellrc.js"
+   "lint:spelling": "cspell \"**\" --config .cspellrc.js",
+   "lint:staged": "lint-staged"
  }
  ...
}
```

## commitlint

Install commitlint cli, and the conventional commits config:

```
yarn add @commitlint/cli @commitlint/config-conventional -D
```

Create the `.commitlintrc.js` file.

Populate it with:

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```

Add a commit message linting script to your package.json.

```diff
{
  ...
  "scripts": {
    ...
    "lint:spelling": "cspell \"**\" --config .cspellrc.js",
-   "lint:staged": "lint-staged"
+   "lint:staged": "lint-staged",
+   "lint:commit": "commitlint"
  }
  ...
}
```

## husky

Install husky:

```
yarn add husky -D
```

Append a postinstall script to your package.json.

```diff
{
  ...
  "scripts": {
    ...
   "lint:staged": "lint-staged",
-  "lint:commit": "commitlint"
+  "lint:commit": "commitlint",
+  "postinstall": "husky install"
  }
  ...
}
```

Initialize husky:

```
yarn husky install
yarn husky add .husky/pre-commit "yarn lint:staged"
yarn husky add .husky/commit-msg "yarn lint:commit --edit $1"
```

## Commit

Commit your changes:

```
git add .
git commit -m "feat: initial commit"
git branch -M main
```

Create a remote repository. GitHub, BitBucket, GitLab are widley used
providers, but self-hosting is also available.

Add your remote to git:

```
git remote add origin REMOTE_URL
git push -u origin main
```