const expressLoader = require('./express');
const passportLoader = require('./passport');

module.exports = async (app) => {
    
    //Load Express middleware
    const expresApp = await expressLoader(app);

    //Losd Passport middleware
    const passport = await passportLoader(expresApp);

}