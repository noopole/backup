var express = require( 'express' )
var speakeasy = require( 'speakeasy' )
var email = require( 'emailjs' )
var bodyParser = require( 'body-parser' )
var db = require( './db' )

var smtpServer = email.server.connect( {
    user: 'bga@netinc.fr',
    password : 'khan21keo74',
    host: 'smtp.online.net',
    ssl: true
} )

var router = express.Router()
var jsonParser = bodyParser.json()

//envoie un mail avec un code d'authenfication provisoire
router.post( '/sendcode', jsonParser, function( req, res )
{
    var mail = req.body.mail
    console.log( 'POST /sendkey mail=', mail )

    //clé secrète
    var secret = speakeasy.generateSecret()

    db.find_by_mail( mail )
    .then( save_secret, create_user )
    .then( send_mail )
    .then( 
        () => res.status( 200 ).send(),
        err => res.status( 400 ).send( err )
    )
    .catch( err => res.status( 500 ).send( err ) )

    
    //ajoute la clé secrete et envoie le code temporaire par e-mail
    function save_secret ( user )
    {
        console.log( 'auth.save_secret() user=', user )
        return db.save_secret( secret.base32, user.id )
    }

    //crée un utilisateur avec une clé secrète 
    function create_user ()
    {
        return db.create_user( secret, mail )
    }

    //envoie le mail avec le code
    function send_mail ()
    {
        return new Promise( function ( resolve, reject )
        {
            var token = speakeasy.totp( {
                key: secret.base32,
                encoding: 'base32'
            } )
            
            var message = {
                text:    'Bonjour !\nVoici le code d\'authentification : ' + token, 
                from:    "gachie.bruno@orange.fr", 
                to:      mail,
                subject: 'Code de connexion au site', 
                attachment: {
                        data: `<html>
                                Bonjour !<br>
                                Voici le code d\'authentification : <b>' + token + '</b><br>
                                Ce code n'est valable que 5 minutes.
                              </html>`, 
                        type:'text/html', 
                        alternative:true
                }
            }
            smtpServer.send( message, function( err, message ) 
            { 
                if ( err ) 
                    reject( err )
                else
                    resolve()
            } )        
        } )
    }

} )

module.exports = router
