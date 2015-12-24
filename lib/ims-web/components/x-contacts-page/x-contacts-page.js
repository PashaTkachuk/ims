var self;
Polymer({
    is: "x-contacts-page",
    properties: {
        user: {
            type: Object,
            reflectToAttribute: true,
            notify: true
        },
        contacts: {
            type: Array,
            value: function() {
                return [];
            },
            notify: true
        }
    },
    attached: function() {
        app.socket.on('status changed', this.handleStatusChanged.bind(this));
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
            var contacts = data.roster.contacts;
            var sockets = data.roster.socket_ids;
            contacts.forEach(function(contact, i){
                contacts.forEach(function(contact, i) {
                    sockets.forEach(function(socket, j) {
                        if (contact.user_id == socket.user_id) {
                            contact.status = socket.status;
                            return;
                        }
                    });
                });
            });
            this.contacts = contacts;
        }
    },
    handleAddToRoster: function (data) {
        if (data.status) {
            app.socket.emit('get roster', { user_id: this.user.user_id});
        }
        this.$.contactPageToast.text = data.message;
        this.$.contactPageToast.show();
    },
    handleStatusChanged: function (data) {
        for (var i=0, n = this.contacts.length; i < n; i++) {
            if (this.contacts[i].user_id == data.user_id) {
                this.set('contacts.'+i+'.status', data.status);
            }
        }
    }
});