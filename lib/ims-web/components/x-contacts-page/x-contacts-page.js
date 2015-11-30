Polymer({
    is: "x-contacts-page",
    openDialog: function(){
        this.$.addContactDialog.open();
    },
    addContact: function(){
        var req = this.$.addContactReq;
        req.body = '{"username":"' + this.contact_username + '"}';
        req.generateRequest();
    },
    handleResponse: function (event, res) {
        if (res.response.status === 'success') {
            this.$.getContactsReq.generateRequest();
        }
    }
});