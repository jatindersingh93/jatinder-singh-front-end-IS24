# Introduction
This code generates the front end for CRUD task on proudcts list provided by Django Back End app. 

- It runs using `React 18`, `React Redux toolkit` and `axios` to make RestAPI calls.

- Three components call async Thunks which uses ProductsDataService to call REST APIs.
    - `AddEditProduct` - Perform Add and Edit using material form submission
    - `DetailProduct`  - Product Detailed view with delete and edit buttons
    - `ProductsList`   - List view of products with delete and edit buttons

- `http-common.js` - initializes axios with HTTP requests to apis
- `store.js` - Redux store instance is created with products reducer.
- `Slices` - actions and reducer for features are defined 


# Technology
- React@18.0
- react-redux@8.1.1
- redux-toolkkit@1.1.2
- react-router-dom@6.14.1
- axios@1.4.0
- bootstrap@5.3


# Docker
Dockerfile is used by docker-composer to self containerize the app and works along with backend and database.


# Local Installation/setup
The first thing to do is to clone the repository:

```sh
$ git clone https://github.com/jatindersingh93/jatinder-singh-front-end-IS24.git
$ cd jatinder-singh-front-end-IS24
```

## Available Scripts

In the project directory, you can run:

### `npm install`

### `npm start` or ``

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
