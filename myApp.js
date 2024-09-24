const express = require('express');
const helmet = require('helmet');
const app = express();

// app.use(helmet.hidePoweredBy());//Hide the type of framework used
// app.use(helmet.frameguard({action: 'deny'}));//Disable iframe injection
// app.use(helmet.xssFilter());//mitigate xss attacks
// app.use(helmet.noSniff());//disable changing the MIME type of the content type header
// app.use(helmet.ieNoOpen());//Prevent malicious HTML from opening on the context of the app
// const ninetyDaysInSeconds = 90*24*60*60;
// app.use(helmet.hsts({maxAge: ninetyDaysInSeconds, force: true}));//Force https
// app.use(helmet.dnsPrefetchControl());
// app.use(helmet.noCache());
// app.use(helmet.contentSecurityPolicy({directives: {defaultSrc: ["'self'"], scriptSrc: ["'self'",'trusted-cdn.com']}}));
//All the middleware above can be included using helmet() except contentSecurityPolicy and noCache
app.use(helmet({
  frameguard: {//Configure
    action: 'deny'
  },
  contentSecurityPolicy: { //Enable and configure
    directives:{
      defaultSrc: ["'self'"],
      styleSrc: ['style.com'],
      scriptSrc: ["'self'",'trusted-cdn.com']
    }
  },
  dnsPrefetchControl: false //Disable
}))

module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
