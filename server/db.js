var mysql = require( 'mysql' )

var connection = mysql.createConnection( {
  host     : 'bsd1',
  user     : 'root',
  password : '',
  database : 'test'
} )

console.time( 'connexion' )
var connected 

connection.connect( function ( error )
{
    console.timeEnd( 'connexion' )
    if ( error )
        console.log( 'connexion échouée')
    else
        connected = true
} )


console.time( 'select' )
if ( connected ) 
    connection.query( 'SELECT * from  user', function ( error, results, fields ) 
    {
        console.timeEnd( 'select' )
        if ( error ) throw error
        console.log( 'The answer is: ', results[0] )
    } )

var db = {
    //liste des enregistrement de la @table
    get: function ( table )
    {
        return new Promise( function ( resolve, reject )
        {
            console.time( 'get' )
            connection.query( 'SELECT * FROM ' + table, function ( err, results, fields ) 
            {
                console.timeEnd( 'get' )
                if ( err )
                    reject( err )
                else
                    resolve( results )    
            } )
       
        } )
    },


    //récupère l'utilisateur à partir de son @mail
    find_by_mail: function ( mail )
    {
        console.log( 'db.find_by_mail() mail=', mail )
        return new Promise( function ( resolve, reject )
        {
            connection.query( 'SELECT id FROM user WHERE mail = ?',  mail, function ( err, results, fields ) 
            {
                if ( err )
                    reject( err )
                else
                    resolve( results[0] || {} )    
            } )
        } )
    },

    //sauvegarde la clé secrète dans la table user
    save_secret: function ( secret, id )
    {
        console.log( 'db.save_secret() secret=%s id=%s', secret, id )
        return new Promise( function ( resolve, reject )
        {
            connection.query( 'UPDATE user SET secret_key = ? WHERE id = ?', [secret, id], function ( err, results, fields )
            {
                if ( err )
                    reject( err )
                else
                    resolve( results )
            } )
        } )
    },

    //ajoute un utilisateur dans la table user à partir de son mail
    create_user: function ( secret, mail )
    {
        console.log( 'db.create_user()' )
        return new Promise( function ( resolve, reject )
        {
            var data = {
                mail: mail,
                secret_key: secret
            }
            connection.query( 'INSERT INTO user SET ?', data, function ( err, results, fields ) 
            {
                if ( err )
                    reject( err )
                else
                    resolve( results )
            } )
        } )
    }
}

module.exports = db