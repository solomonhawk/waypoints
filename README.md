# React Webpack Typescript Starter
[Source](https://github.com/vikpe/react-webpack-typescript-starter)

* **[React](https://facebook.github.io/react/)** (16.x)
* **[Webpack](https://webpack.js.org/)** (4.x)
* **[Typescript](https://www.typescriptlang.org/)** (3.x)
* **[Hot Module Replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/)** using [React Hot Loader](https://github.com/gaearon/react-hot-loader) (4.x)
* [Babel](http://babeljs.io/) (7.x)
* [SASS](http://sass-lang.com/)
* [Jest](https://facebook.github.io/jest/) - Testing framework for React applications
* Production build script
* Image loading/minification using [Image Webpack Loader](https://github.com/tcoopman/image-webpack-loader)
* Typescript compiling using [Awesome Typescript Loader](https://github.com/s-panferov/awesome-typescript-loader) (5.x)
* Code quality (linting) for Typescript.

## Installation
1. Clone/download repo
2. `yarn install` (or `npm install` for npm)
3. `cp .env.example .env`
4. Fill in the required environment variables in `.env`

## Environment Configuration

This project uses [12-Factor Config](https://12factor.net/config). Configuration lives in `.env`. The values required can be found in the `#waypoints` slack channel on Hawk's Nest or by contacting [Solomon Hawk](solomon.hawk@viget.com).

## Usage
**Development**

`yarn run start:dev`

* Build app continuously (HMR enabled)
* App served @ `http://localhost:8080`

**Production**

`yarn run start:prod`

* Build app once (HMR disabled)
* App served @ `http://localhost:3000`

---

**All commands**

Command | Description
--- | ---
`yarn run start:dev` | Build app continuously (HMR enabled) and serve @ `http://localhost:8080`
`yarn run start:prod` | Build app once (HMR disabled) and serve @ `http://localhost:3000`
`yarn run build` | Build app to `/dist/`
`yarn run test` | Run tests
`yarn run test:cov` | Run test coverage
`yarn run lint` | Run Typescript linter
`yarn run start` | (alias of `yarn run start:dev`)

**Note**: replace `yarn` with `npm` if you use npm.

## See also
* [React Webpack Babel Starter](https://github.com/vikpe/react-webpack-babel-starter)
* [Isomorphic Webapp Starter](https://github.com/vikpe/isomorphic-webapp-starter)
* [TSLint ESLint Rules](https://www.npmjs.com/package/tslint-eslint-rules)
* [AirBnB TSLint Config](https://www.npmjs.com/package/tslint-config-airbnb)