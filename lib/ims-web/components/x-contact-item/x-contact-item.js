Polymer({
    is: "x-contact-item",
    properties: {
        contact: {
            type: Object,
            reflectToAttribute: true,
            notify: true,
            value: function() {
                return {};
            }
        },
        user: {
            type: Object,
            reflectToAttribute: true,
            notify: true
        }
    },
    observers: [
        'contactStatusChanged(contact.status)'
    ],
    attached: function() {
        app.socket.on('delete from roster feedback', this.handleDeleteFromRoster.bind(this));
        app.socket.on('get room feedback', this.handleGetRoom.bind(this));
        app.socket.on('create room feedback', this.handleCreateRoom.bind(this));
        if (this.contact.status == 'online') {
            this.bgColor = '#006600';
        } else {
            this.bgColor = '#90a4ae';
        }
    },
    openChat: function() {
        app.socket.emit('get room', { user_id: this.user.user_id, contact_id: this.contact.user_id});
    },
    deleteContact: function() {
        app.socket.emit('delete from roster', { user_id: this.user.user_id, contact_id: this.contact.user_id});
    },
    handleDeleteFromRoster: function (data) {
        if (data.status) {
            app.socket.emit('get roster', { user_id: this.user.user_id});
        }
    },
    handleGetRoom: function (data) {
        if (data.status) {
            document.querySelector('app-router').go('/dialog/'+data.room_id);
        } else {
            app.socket.emit('create room', { user_id: this.user.user_id, contact_id: this.contact.user_id});
        }
    },
    handleCreateRoom: function (data) {
        if (data.status) {
            document.querySelector('app-router').go('/dialog/'+data.room_id);
        }
    },
    contactStatusChanged: function(newValue) {
        if (newValue) {
            if (newValue == 'online') {
                this.bgColor = '#006600';
            } else {
                this.bgColor = '#90a4ae';
            }
        }
    }
});