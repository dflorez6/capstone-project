# CAPSTONE PROJECT | MERN Stack (ES6)

## DEVELOPMENT: Run local servers

* Only the Back-End: From the root directory (/capstone-project) in the terminal run the following command:

    > yarn run server

* Only the Front-End: From the root directory (/capstone-project) in the terminal run the following command:

    > yarn run client

* Both servers concurrently: From the root directory (/capstone-project) in the terminal run the following command:

    > yarn run dev

# BACK-END: Node, Express & MongoDB

## Express (Web Server)
* To install express, from the console:
    > yarn add express --save

* To make it work with ES6 import/export modules, go to package.json and add the following:

        "type": "module"

* Also add the following inside scripts { }:

        "start": "node --experimental-specifier-resolution=node index",

## ENV Variables (dotenv)
https://www.youtube.com/watch?v=PxshhOKNPpQ
* From the terminal run:
    
    > yarn add dotenv --save

* Inside index.js (server config file) add the following:
    
        //====================
        // ENV
        //====================
        const path = require('path');
        const dotenv = require('dotenv');
        require('dotenv').config({path: path.resolve(__dirname, './.env')}) // If file is in another path ./folder/.env

* To use ENV variables in the code:

        process.env.ENV_NAME
        // Example PORT=3000 will be the ENV variable used
        process.env.PORT

## MongoDB with Mongoose (ORM) In Express Installation

* From the terminal:

    > yarn add mongoose --save

* To import dependency, from the server file (server.js) or /models/index.js (decoupled models):

        // Import the dependencies
        import mongoose from 'mongoose';

* To connect to the database, from the server file (server.js) or /models/index.js (decoupled models):

        // Connect to DB
        const connectDB = () => {
            return mongoose.connect(process.env.DATABASE_URL);
        };

## Seed the DB

1. Create a Model (e.g. City)
2. Create a seed file (e.g. seedCity)
3. Run the seed model from the terminal, make sure to be in the correct folder:

    > node seedCity.js

### Bcryptjs (encrypt/decrypt password)

* Install from the terminal:

    > yarn add bcryptjs --save

* To import dependency -> in the file that you want to use it:

        // Import the dependencies
        import bcrypt from 'bcryptjs';

* To use bcryptjs:

        // Example: Login
        // Check if passwords match (DB with client)
        const isMatch = await bcrypt.compare(req.body.password, admin.password);

        // Example: Sign Up
        // Protect Password
        const hashedPassword = await bcrypt.hash(req.body.password, 12); // 12 is the "salt" added to the hashed password

### Concurrently

* In order to run concurrently backend (ExpressJS) & frontend (ReactJS) servers in Development, install the following package

    > yarn add concurrently --save -D

### JSON Web Token
* Install from the terminal:

    > yarn add jsonwebtoken --save

### Cookie Parser
* Install from the terminal:

    > yarn add cookie-parser --save

### Async Handler
* Install from the terminal:

    > yarn add express-async-handler --save

### Body Parser
* Install from the terminal:

    > yarn add body-parser --save


### Nodemon
* Install from the terminal:

    > yarn add nodemon --save -D

* Update package.json

        "scripts": {
            "start": "nodemon server.js"
        },

* If using VS Code Run/Debug, update launch.json by adding description: Node.js: Nodemon setup and make sure that "program" has the correct path to the project directory

* Then inside package.json, under scripts add this to run both servers concurrently

        "dev": "concurrently \"npm run server\" \"npm run client\""

### Helper Module: list express routes
https://www.npmjs.com/package/express-list-routes
* From the terminal:

    > npm install express-list-routes --save

* From the routes file (e.g. routes/service.js) import the dependency:

        import expressListRoutes from 'express-list-routes';

* On the file, call the function to log/print routes:

        expressListRoutes(router);

### Express Session
* Install from the terminal:
    
    > npm install express-session --save

* To import dependency in the server file (server.js):

        import session from 'express-session';

* Initialize middleware and pass it the 'session' variable

        app.use(session({
            secret: process.env.SESSION_SECRET, // Store it in an environment variable
            resave: false, // Create a new session on every request (when set to false)
            saveUninitialized: false, // if we have not modified the session we don't want to save it
        }));

### Connect MongoDB Session (Session Store)
* Install from the terminal:
    
    > npm install connect-mongodb-session --save

* To import dependency -> in /models/index.js (decoupled models):

        // MongoDB Session Store
        import session from 'express-session';
        import mongoDBSession from 'connect-mongodb-session';
        const mongoDBStore = mongoDBSession(session); // pass session to connect-mongodb-session

* Initialize MongoDB Session Store -> in /models/index.js (decoupled models):  

        //====================
        // MongoDB Session Store
        //====================
        const store = new mongoDBStore({
            uri: process.env.DATABASE_URL,
            collection:'sessions',
            secret: process.env.SESSION_SECRET
        })

* Export store to be used in the server file (server.js)

        export { store };

### Cloudinary
https://medium.com/@lola.omolambe/image-upload-using-cloudinary-node-and-mongoose-2f6f0723c745
https://www.freecodecamp.org/news/how-to-allow-users-to-upload-images-with-node-express-mongoose-and-cloudinary-84cefbdff1d9/
* Dependencies needed: 
    
    > cloudinary, multer (multipart upload) & multer-storage-cloudinary

* Install from the terminal:
    
    > yarn add cloudinary multer --save
    > yarn add multer multer-storage-cloudinary --save

* Create a Cloudinary instance

        const cloudinary = require('cloudinary').v2; // ES5
        import {v2 as cloudinary} from 'cloudinary' // ES6

* Create utils/cloudinary.config.js file and set config file:

        // Configuration 
        // import dotenv to use environment variables
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

* Create utils/multer.js file and set the config file:

        // Import dependencies
        import multer from 'multer';
        import cloudinary from './cloudinary.config.js';
        import { createCloudinaryStorage } from 'multer-storage-cloudinary';

        // Define cloudinary storage (multer-storage-cloudinary)
        const storage = createCloudinaryStorage({
            cloudinary: cloudinary,
            params: {
                folder: "dflorezPersonalExpress",
                allowedFormats: ["jpg", "png"],
                /*
                transformation: [{
                width: 500,
                height: 500,
                crop: "limit"
                }],
                */
            }    
        });

        // Create multer storage instance and export module
        const imgUploader = multer({ storage: storage });
        export default imgUploader;

* Use imgUploader as Middleware in routes to use cloudinary/multer uploader

        // Import dependencies        
        import imgUploader from '../utils/multer.js';
        router.get('/', imgUploader.single('image'), (req, res) => { Return Function });

* Inside the "return function" methods from cloudinary (npm) module can be called for example for deleting an image from cloudinary

### Express Validator
* Install from the terminal:
    
    > npm install express-validator --save

### EJS (Templating)
* Install from the terminal:
    
    > npm install ejs --save

### Cross-Origin Resource Sharing - CORS
* Install from the terminal:
    
    > npm install cors --save

* Inside index.js (server config file) add the following:

        const cors = require('cors');
        app.use(cors()); // To enable CORS requests on all routes

* In case you want to use CORS on specific routes, inside index.js:

        var cors = require('cors')
        // Then on the route
        app.get('/products/:id', cors(), function (req, res) {
            res.json({msg: 'This is CORS-enabled for a Single Route'})
        })


## Other Modules
* express-flash (flash messages): https://www.npmjs.com/package/express-flash

<hr>

# FRONT-END: React

* To create a new project we are using Vite. From the terminal run the following command:

    > npm create vite@latest "projectName"

## Dependencies

### SASS

* Install the following packages

    > npm install sass --save

### React Router

* Install the following packages

    > npm install react-router-dom --save

### Redux Toolkit + React-Redux

* Install the following packages

    > npm install @reduxjs/toolkit react-redux --save

### React Toastify

* Install the following packages

    > npm install react-toastify --save

<hr>

# DEPLOYMENT

1. From the /frontend folder, build static assets. If using Vite: /dist folder. If using create-react-app /build folder.

    > npm run build

2. In the /backend folder, inside server.js

        //====================
        // Production
        //====================
        // Serve static assets if in production
        if (process.env.NODE_ENV === "production") {
        const __dirname = path.resolve();
        app.use(express.static(path.join(__dirname, "/frontend/dist"))); // Set static folder

        // Serve index.html if a route that is not '/api/v1' is hit
        app.get("*", (req, res) =>
            res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
        );
        } else {
        app.get("/", (req, res) => res.send("Server is ready"));
        }

3. Make sure that inside .gitignore (root & /frontend) are removed/commented out so that the folder will be included in the commit  

4. Remember to whitelist IP Address from deployment service in MongoDB Atlas
<https://docs.render.com/connect-to-mongodb-atlas>

<hr>

# UI References

https://brittanychiang.com/#experience
https://mattfarley.ca/
https://www.rammaheshwari.com/
https://chaseohlson.com/
https://dvlpr.pro/#skills
https://samsmall.design/
https://dlmak.droitlab.com/home-dark/
https://github.com/emmabostian/developer-portfolios

## Free Icons (svg, png, jpg)

<https://icons8.com/icons/set/html5>
<https://www.svgrepo.com/svg/473559/bitbucket?edit=true>


# Guides

* npm | yarn cheatsheet
<https://shift.infinite.red/npm-vs-yarn-cheat-sheet-8755b092e5cc>

* Node Manager
<https://codeforgeek.com/update-node-using-npm/>

* MERN Auth
<https://www.youtube.com/watch?v=R4AhvYORZRY>

## Authentication: PassportJS
https://www.passportjs.org/docs/

https://auth0.com/pricing?utm_source=sitelink-pricing&utm_content=sitelink-pricing&gad_source=1&gclid=CjwKCAiAhJWsBhAaEiwAmrNyqzQ68LgJzNj9Qncf47gtuqbgcwsCk5uhBS26T2ucN1qVI8T1zV2zdhoCt6kQAvD_BwE

https://medium.com/@brendt_bly/simple-mern-passport-app-tutorial-4aec2105e367


https://medium.com/hackernoon/m-e-r-n-stack-application-using-passport-for-authentication-920b1140a134
https://medium.com/hackernoon/deploy-your-node-js-app-in-production-and-use-bitbucket-to-automate-your-deployment-50b07b18914c