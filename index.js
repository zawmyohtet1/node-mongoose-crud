var express = require( 'express' );
var app = express();
var mongoose = require( 'mongoose' );
var bodyParser = require( 'body-parser' );
var router = require( './app/models/routes' );
var methodOverride = require( 'method-override' );

// Use native promises
mongoose.Promise = global.Promise;
mongoose.connect( 'mongodb://127.0.0.1:27017/crud' );

app.use( bodyParser.urlencoded( {extended : false } ) );
app.use( bodyParser.json() );

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'));

app.use('/', router);
app.set( 'view engine', 'ejs' );
app.set( 'views', __dirname + '/public/views' );
app.use( express.static( __dirname + '/public' ) );

app.listen( 8080 );
console.log( 'Port 8080' );