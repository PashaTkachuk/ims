Polymer({
    is: "x-contacts-page",
    openDialog: function(){
        this.$.addContactDialog.open();
    },
    addContact: function(){
        var req = this.$.addContactReq;
        req.body = '{"email":"' + this.contact_email + '"}';
        req.generateRequest();
    },
    handleResponse: function (event, res) {
        if (res.response.status === 'success') {
            this.$.getContactsReq.generateRequest();
        }
    }
});