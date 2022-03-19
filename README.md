# Admin for portfolio and CV

A admin website built with TypeScript, HTML and Sass as part of a headless CMS for my personal portfolio and CV. This is part of a school assignment where I'm learning how to build a REST API with PHP and consume it with JavaScript/Typescript.

## The website

The website was developed object-oriented with TypeScript. The separate REST API:s public and protected routes are consumed by the website using TypeScript and Fetch API. This includes a public login route, and a protected logout route, which are consumed to make sure only people with the right credentials can use the admin website. Node.js and webpack was used to bundle all the TypeScript code and allow use of Sass for styling etc.

### Development server and build

There are two separate scripts in `package.json`. To run the development server use the command `npm run devStart` and to run the build for production use the command `npm run build`. Development files are located in `src/` and the production build end up in `dist/`.

### Files and structure

#### Webpack configurations

Configurations for webpack are made in separate files for development and production: 

- Common configurations can be found in `webpack.common.js`.
- Development configurations can be found in `webpack.dev.js`.
- Production configurations can be found in `webpack.prod.js`.

#### Entry point

The entry point for webpack and the bundle is in `src/index.ts`. It renders the application and imports style.

#### HTML-file

In `src/index.html` the base structure of the application is set. The application is then rendered in the element `#app-root`.

#### TypeScript

Configurations for TypeScript are made in `tsconfig.json`. The TypeScript-application exists in `src/ts/`. The structure of the TypeScript code is:
- The application entry point is `App.ts`, which authenticates the user and renders either a login view or a home view. 
- `Auth.ts` handles logging in to and logging out from the API.
- In `views/` there are two views that add modules from `views/modules/`. 
- The modules uses models in `models/` to consume the API, the api url is set in `App.ts`.

#### Sass

The Sass stylesheets are divides in three separate files: 

- `_base.scss` holds resets and basic style, colors, typography and overall layout. 
- ` _utilities.scss` holds variables, mixins and helper classes.
- `_modules.scss` holds style specific to different modules.

## Project with three parts

This website is part of a school assignment that has been developed in three separate parts. One REST API, one admin website with login to administrate it and a public website to read data from it.

These repositories holds the rest of the project:

- REST API: https://github.com/sofiewallin/cv-api
- Public website: https://github.com/sofiewallin/cv-application