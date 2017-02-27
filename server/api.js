var router = require( 'express' ).Router()
var db = require( './db' )
var auth = require( './auth' )

router.get( '/', function ( req, res )
{
    res.send( 'version : ' + process.env.npm_package_version )
} )

router.use( '/auth' , auth )

router.get( '/db/:table', function ( req, res )
{
    db.get( req.params.table ).then( 
        data => res.status( 200 ).send( data ),
        err => res.status( 500 ).send( err )
    )
    
} )

module.exports = router 