var self;
Polymer({
    is: "x-socket-io",
    properties: {
        sessionState: {
            type: Boolean,
            reflectToAttribute: true,
            notify: true
        },
        user: {
            type: Object,
            reflectToAttribute: true,
            notify: true
        }
    },
    ready: function() {
        self = this;
        app.socket = io.connect('http://localhost:3000');
        app.socket.on('connected', this.connectedCallback.bind(this));
    },
    connectedCallback: function() {
        console.log('User connected');
    },
    changeStatus: function(data) {
        if (self.user.user_id == data.user_id) {
            self.user.status = "online";
        }
        self.onlineUsers.push(data.user_id);
        console.log('User' + data.user_id + ' go '+ data.status)
    }
});