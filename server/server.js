var express = require( 'express' )
var bodyParser = require( 'body-parser' )
var morgan = require( 'morgan' )
//var cookieParser = require( 'cookie-parser' )
var routes = require( './routes' )
//var expressSession = require( 'express-session' )
//var passwordless = require( 'passwordless' )
//var mysql_store = require( 'passwordless-mysql' )
//var email = require( 'emailjs' )

//connexion SMTP
/*var smtpServer = email.server.connect( {
    user: 'bga@netinc.fr',
    password : 'khan21keo74',
    host: 'smtp.online.net',
    ssl: true
} )*/

//initialisation
//const connection_string = 'mysql://root:darwin2008@bsd1/test'
//passwordless.init( new mysql_store( connection_string ) )

//méthode de livraison
/*passwordless.addDelivery( function( tokenToSend, uidToSend, recipient, callback ) 
{
    var host = 'localhost'
    smtpServer.send( {
        text:    'Bonjour !\nConnectez-vous via ce lien : http://' 
        + host + '?token=' + tokenToSend + '&uid=' 
        + encodeURIComponent( uidToSend ), 
        from:    "gachie.bruno@orange.fr", 
        to:      recipient,
        subject: 'Token for ' + host
    }, function( err, message ) 
    { 
        if ( err ) 
        {
            console.log( err )
        }
        callback( err )
    } )
} )*/

//application
var app = express()
//login
app.use( morgan( 'dev') )
//body parser
app.use( bodyParser.json() )
//app.use( bodyParser.urlencoded( { extended: false } ) )
//cookie
//app.use( cookieParser() )
//sessions
//app.use( expressSession( { secret: '42', saveUninitialized: false, resave: false } ) )

//connexion persistente
//app.use( passwordless.sessionSupport() )

//autentification
//app.use( passwordless.acceptToken( { successRedirect: '/' } ) )

//fichiers statiques
app.use( express.static( 'public' ) )

//routes 
app.use( '/', routes )

//run
const port = process.env.PORT || 80

app.listen( port ) 

console.log( process.env.npm_package_version )


