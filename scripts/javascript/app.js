var createError = require('http-errors');
const https = require("https");

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var enrollAdmindemo = require('./routes/enrollAdmin');
var registerUserdemo = require('./routes/registerUser');
var invokeDemo = require('./routes/invoke');
var queryDemo = require('./routes/query');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const basicAuth = require('express-basic-auth');

// app.use("/api-docs",basicAuth({
//     users: {'1234': '1234'},
//     challenge: true,
// }), swaggerUi.serve, swaggerUi.setup(swaggerDocument));


var swaggerDefinition = {
  info: {
    title: 'Extrance chain',
    version: '2.0.0',
    description: 'extrance Chain ',
  },
  host: `localhost:3001`,
  // basePath: 'http://suw2060.thesparxitsolutions.com/',
  basePath: '/',
};
var options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./routes/*.js']
};

var swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);


});

// initialize swagger-jsdoc
app.use('/api-docs', basicAuth({
  users: {'123': '123'},
  challenge: true,
}),swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.use(cors({
//   origin:'*'
//  }));
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/enrolladmin',enrollAdmindemo );
app.use('/registeruser',registerUserdemo );
app.use('/invoke',invokeDemo);
app.use('/query',queryDemo);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3001,function(){
    console.log("inside app.js server listening on port 3001")
})
// https
//  .createServer(app)
//  .listen(3001, ()=>{
//     console.log('server is runing at port 3001')
//  });

module.exports = app;
