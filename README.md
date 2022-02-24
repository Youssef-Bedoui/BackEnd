 ## Basic Requirements 
Build a single-page app that takes a user through a series of forms that simulate a shopping cart checkout experience. You should:

- Use Express to serve up an `index.html` file and its associated assets
- Build your UI using ReactJS and pre-compile your views using Babel
- Use MongoDB or MySQL to store your user data

Build your Express app inside `server.js` and your client app inside the client folder. For the basic requirements, you MUST place all of your React components into one file, `app.jsx`. Link your transpiled component file from `index.html`. **DO NOT USE WEBPACK**

For ease of development, be sure to set Babel to watch for changes in your app.js file to recompile those changes immediately. Additionally, be sure to use nodemon to watch for changes in server.js.

The homepage of your application should have a `Checkout` button, which when clicked, takes the user to the first of several forms. We'll call the forms F1, F2, F3.

- F1 collects name, email, and password for account creation.
- F2 collects ship to address (line 1, line 2, city, state, zip code) and phone number.
- F3 collects credit card #, expiry date, CVV, and billing zip code.

At each step, a `Next` button allows the user to progress to the next step in the checkout process. The final step is a confirmation page which summarizes the data collected in the prior three steps. This page contains a `Purchase` button that completes the purchase. When the purchase is complete, the user is returned to the homepage.

No actual shopping cart or products are necessary; you are modeling the checkout process only.

Every run through the checkout process (each time `Checkout` is clicked) creates a new record in your server's database, and each step in the checkout process saves its piece of the data to that record (the data is saved when `Next` is clicked).

Use the coding best practices you learned previously to ensure a clear separation of concerns with well-defined interfaces.

If you get stuck or are not sure how to proceed, you may look at the hints for this challenge to help you along.

 ## Advanced Content

- Don't allow the user to proceed until all the required fields are filled in. Address line 2 should be optional. Be sure to display appropriate error messages to the user, so they know why they are not allowed to proceed.

- Validate the form fields. Don't allow the user to proceed to the next step and do not save the data until the fields are valid. Validation means that you must prevent the user from entering `haha` as the email address -- the email address have a valid data-shape. You'll have to decide which fields deserve validation and which do not. Be sure to display appropriate error messages to the user, so they know why they are not allowed to proceed.

- If the window is closed and reopened, the checkout process should continue at the same step the user was on when the window was closed (it's ok if the fields on the "current" step are blank when the window is reopened). The app should continue to put the remaining data into the same record it was using before the window was closed. Once `Purchase` is clicked, it should not be possible to continue.

- Allow the user to move back and forward through the checkout process.

- When the user reaches the confirmation page, let the user edit any prior step. After editing fields in that step, the user should be returned to the confirmation page.

- Write tests and use Nightwatch.js to confirm your entire checkout flow is working correctly.

 ## Nightmare Mode

- Refactor to use Redux to store your state.

- If the window is closed and reopened, restore the form field values that were present when the user closed the window.

- Integrate with Google Maps API, adding an address search to verify the ship to address.

- Test your app (either by hand or via automated tests) using different browsers. Fix any issues that arise.


# Hints: Multistep Checkout Experience
## Topics:
The titles for each hint topic is listed below. Before you start the challenge, review this list of hint titles so that if you get stuck, you know what hints are available to you.

 - Installing and Running Babel
 - Serving files from Express
 - Installing and Using React
 - Loading JS files into your *_ index.html _* and in what order!?
 - Testing

If you are looking at these hints, it means you are struggling to meet the basic requirements. Below is a process you can follow to achieve the goals of the basic requirements. The hints are organized in a way that lets you ignore hints not related to your current step.

## Installing and Running Babel
The ** babel ** command should be installed locally:

```js
    npm install @babel/cli @babel/core @babel/preset-react
```
This allows you to run the babel command to turn JSX files into JS files. Please look at the Babel docs to see what each of these dependencies do

P.S. Note that tools like Babel are constantly changing. When major changes are made, existing configuration and setup may have to be updated for the tool to function properly. These hints had to be updated to accommodate the Babel 6.x to Babel 7.x update. This is why using the docs is so important, and why following tutorials can sometimes be a detriment (as this hint was when the Babel update was still fresh).

To transpile your React components, you'll need to tell Babel where to look for the source JSX files (*_client_* directory) and where to put the transpiled JS files (*_ public _* directory). You can use a command like this:
```js
./node_modules/.bin/babel client --out-dir public --presets @babel/preset-react --source-maps inline
```

Note: it is recommended that to make this an npm script by placing it in your *_ package.json _*  so you don't have remember it or look here each time. Additionally, you can add the *_ --watch _* flag to tell Babel to keep transpiling on every change.

Remember that you can only load transpiled files into your browser so be sure to link your transpiled files (*_ app.js _* not *_ app.jsx _*) from *_ index.html _*.

Express will automatically serve up any files located in a folder of your choosing. This hint is written with the expectation that you'll use the *_ public _* folder for this purpose (this is where babel is placing the transpiled file).

## Serving files from Express
Similar to the hint in challenge #2, you can use express.static to tell Express where to look for files to serve up to the browser. The convention is to serve client files from the public folder, like so:
```js
    app.use(express.static('public')
```

By default, Express will look for a file called *_ index.html _* and serve that file whenever you browse to the root (*_ / _*) route.

Installing and Using React
The easiest way to start using React is to load it from a CDN from within your index.html file, like so:
```js
    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
```


An alternative (and recommended) approach for this challenge is to download the files,*_ react-dom.development.js _* and *_ react.development.js _* from [here](https://github.com/facebook/react/releases)  and place them directly into your public folder.

To start building your own React components, include them in your JSX file (*_ app.jsx_*). To then use your own React components inside your browser, you can either load them into the browser with *_ webpack_* (not allowed for basic requirements), or by directly including your Babel transpiled files (*_app.js_*) into your *_index.html_* file.

## Loading JS files into your index.html and in what order!?
When specifying the *_ <script> _* tags in your *_ index.html _* file, it's vital that you list the *_ <script> _* tags in the correct order. The browser executes the scripts in the order they are specified inside index.html. If you try and load app.js before you load react, your app will fail to load.

You can figure out the load order by looking at the dependencies for each js file. For example, app.js requires react-dom, therefore react-dom must appear before *_ app.js _*. And *_ react-dom _* requires *_ react _* therefore *_ react _* must appear before *_ react-dom _*.

```js
<script src="react.development.js"></script>
<script src="react-dom.development.js"></script>
<script src="app.js"></script>
```

