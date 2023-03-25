const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config({ path: '../.env' });

const sessionSecret = process.env.SESSION_SECRET;

module.exports = (app) => {

    //Enable cross origin
    app.use(cors());

    //Transforms req.body into JSON
    app.use(bodyParser.json());

    //Parses ulrencoded bodies
    app.use(bodyParser.urlencoded({ extended: true}));

    //Indicates the app is behind a front-facing proxy
    app.set('trust proxy', 1);

    //Creates a session
    app.use(
        session({
            secret: sessionSecret,
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false, //if true HTTPS enable website is necessary
                maxAge: 24 * 60 * 60 * 1000
            }
        })
    );

    return app;
}