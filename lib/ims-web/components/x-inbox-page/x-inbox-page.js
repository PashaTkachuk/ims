Polymer({
    is: "x-inbox-page",
    properties: {
        dialog: {
            type: Number,
            reflectToAttribute: true,
            notify: true
        }
    },
    ready: function() {
        this.messageService = app.serviceUrl + '/message';
    }
});