var self;
Polymer({
    is: "x-socket-io",
    properties: {
        user: {
            type: Object,
            reflectToAttribute: true,
            notify: true,
            observer: '_userChanged'
        }
    },
    _userChanged: function(newValue, oldValue) {
        if (newValue.hasOwnProperty('username')) {
            app.socket = io.connect('http://localhost:3000');
            app.socket.on('online', this.userConnected);
            app.socket.on('offline', this.userDisconnected);
            app.socket.on('message', this.receiveMessage);
        }
    },
    userConnected: function() {
        app.connectionStatus = "Online";
    },
    userDisconnected: function() {
        app.connectionStatus = "Offline";
        this.disconnect();
    },
    receiveMessage: function(message){
        app.$.x_chat.receiveMessage(message);
    }
});