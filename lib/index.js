// dependencies

var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./configuration');
var routes = require('./routes');
var notFound = require('./middleware/notFound');

// config - all environments
var app = express();
app.set('port', config.get("express:port"));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger({ immediate: true, format: 'dev' }));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// config - development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/heartbeat', routes.heartbeat);
app.use(notFound.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
