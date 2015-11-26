var self;
Polymer({
    is: "x-contact-item",
    properties: {
        contact: {
            type: Object,
            reflectToAttribute: true,
            notify: true
        }
    },
    openChat: function(event) {
        this.serviceContactUrl = app.serviceUrl + '/contact/'+ event.currentTarget.id;
        this.$.getContactDialogReq.generateRequest();
    },
    handleResponse: function (event, res) {
        app.dialog_id = res.response.dialog_id;
        page.redirect('/chat/'+res.response.dialog_id);
    }
});