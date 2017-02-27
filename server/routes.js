var express = require( 'express' )
var passwordless = require( 'passwordless' )
var api = require( './api' )

var router = express.Router()


//api
router.use( '/api' , api )


var users = [
    { id: 1, email: 'bg@netinc.fr' },
    { id: 2, email: 'bga@netinc.fr' }
]


/* GET logout. */
router.get( '/logout', function( req, res ) 
{
  res.redirect( '/' )
} )



module.exports = router