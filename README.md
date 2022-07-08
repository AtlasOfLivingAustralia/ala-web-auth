# ALA Web Authentication

![NPM Version](https://img.shields.io/npm/v/ala-web-auth?style=flat-square)
![GitHub License](https://img.shields.io/github/license/AtlasOfLivingAustralia/ala-web-auth?style=flat-square)
![Bundle Size](https://img.shields.io/bundlephobia/min/ala-web-auth?label=bundle%20size&style=flat-square)

---

> This package provides a utility library for authenticating with the ALA

## Features

- Robust typings with `TypeScript`
- Test coverage with `Jest`
- Simple, functional interface to allow for tree-shaking

## Installation

To use `ala-web-auth`, simply run `yarn add ala-web-auth` or `npm i ala-web-auth` with NPM.

## Documentation / Usage

### Basic Authentication

```typescript
import { getClient, signInWithRedirect } from 'ala-web-auth';

// Firstly, create the OIDC client
const client = getClient('oidc-test-client-id', ['openid', 'email']);

// User will be redirected to the authentication page,
// then back to the specified URL with the access token
signInWithRedirect(client, 'http://localhost:3000');
```

### Handling Redirects

Upon each page load, call the following function:

```typescript
import { getRedirectResult } from 'ala-web-auth';

getRedirectResult();
```

This will parse the token supplied in the redirect URL (if it exists), and store it within the browser's local storage.

For ease of use, the token is returned from the `getRedirectResult` function as an object of type `OIDCAuthResult`:

```js
{
	accessToken: 'token-here',
	expiresIn: 28800
}
```

You can also retireve the token like so:

```typescript
import { getToken } from 'ala-web-auth';

// Will return null if no token
// has been stored via getRedirectResult()
const token = getToken();
```

## Contributing

To setup your environment for `ala-web-auth` contributions, the following steps are recommended:

1. Download [Node.js v16](https://nodejs.org/en/) (easilly manage multiple versions with [NVM](https://github.com/nvm-sh/nvm))
2. Download [Yarn](https://yarnpkg.com/) package manager (optional)
3. Download [Visual Studio Code](https://code.visualstudio.com/)
4. Install the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) VSCode extensions
5. Clone the `ala-web-auth` repository
6. Install the project dependencies with the `yarn` / `npm install` command
7. Start developing using `yarn develop` / `npm develop` (saved changes will automatically reload `src/index.ts`)
