var express = require( 'express' );
var app = express();
var mongoose = require( 'mongoose' );
var bodyParser = require( 'body-parser' );
var router = require( './app/models/routes' );

mongoose.connect( 'mongodb://127.0.0.1:27017/crud' );

app.use( bodyParser.urlencoded( {extended : false } ) );
app.use( bodyParser.json() );
app.use('/', router);
app.set( 'view engine', 'ejs' );
app.set( 'views', __dirname + '/public/views' );
app.use( express.static( __dirname + '/public' ) );

app.listen( 8080 );
console.log( 'Port 8080' );