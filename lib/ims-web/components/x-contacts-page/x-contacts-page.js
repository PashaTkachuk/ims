Polymer({
    is: "x-contacts-page",
    properties: {
        user: {
            type: Object,
            reflectToAttribute: true,
            notify: true
        }
    },
    attached: function() {
        app.socket.on('get roster feedback', this.handleGetRoster.bind(this));
        app.socket.emit('get roster', { user_id: this.user.user_id});
    },
    openDialog: function(){
        this.$.addContactDialog.open();
    },
    addContact: function(){
        app.socket.on('add to roster feedback', this.handleAddToRoster.bind(this));
        app.socket.emit('add to roster', { user_id: this.user.user_id, email: this.contact_email});
    },
    handleGetRoster: function (data) {
        if (data.status) {
            this.contacts = data.roster;
        }
    },
    handleAddToRoster: function (data) {
        if (data.status) {
            app.socket.emit('get roster', { user_id: this.user.user_id});
        }
    }
});