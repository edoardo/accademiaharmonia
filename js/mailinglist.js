// function for add a new email address to the mailing list
// AJAX powered!

// global variable (used also in callback function)
var oForm;

function manageMailingList( oButton )
{
    oForm = oButton.form;

    var oAJAXengine = new AJAX();

    oAJAXengine.call(
        {
            uri: 'http://www.sabadelli.it/cgi-bin/webservices/mailinglist',
            callback: manageResponse,
        },
        [
          'language', oForm.language.value,
          'user', 'harmonia',
          'action', oButton.name,
          'email', oForm.email.value,
        ]
    );

    // cookie remove if action is remove... TODO
}

function manageResponse( cResponse )
{
    alert( cResponse );
}
