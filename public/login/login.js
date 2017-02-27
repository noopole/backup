SendBtn.onclick = send_mail

//Demander un mail d'authentification
function send_mail ()
{
    
    var obj = {
        mail: MailInput.value
    }
    Http.post( '/auth/sendcode', obj )
    .then(
        () => console.log( 'ok' ),
        err => console.warn( err )
    )

}