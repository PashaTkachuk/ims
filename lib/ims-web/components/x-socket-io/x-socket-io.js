var self;
Polymer({
    is: "x-socket-io",
    properties: {
        sessionState: {
            type: Boolean,
            reflectToAttribute: true,
            notify: true,
            observer: '_sessionStateChanged'
        },
        user: {
            type: Object,
            reflectToAttribute: true,
            notify: true
        },
        onlineUsers: {
            type: Array,
            reflectToAttribute: true,
            notify: true
        }
    },
    ready: function() {
        self = this;
        this.onlineUsers = [];
    },
    _sessionStateChanged: function(newValue, oldValue) {
        if (newValue) {
            app.socket = io.connect('http://localhost:3000');
            app.socket.on('change status', this.changeStatus);
        }
    },
    changeStatus: function(data) {
        if (self.user.user_id == data.user_id) {
            self.user.status = "online";
        }
        self.onlineUsers.push(data.user_id);
        console.log('User' + data.user_id + ' go '+ data.status)
    }
});