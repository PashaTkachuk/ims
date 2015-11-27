var self;
Polymer({
    is: "x-socket-io",
    properties: {
        sessionState: {
            type: Boolean,
            reflectToAttribute: true,
            notify: true,
            observer: '_sessionStateChanged'
        }
    },
    _sessionStateChanged: function(newValue, oldValue) {
        if (newValue) {
            app.socket = io.connect('http://localhost:3000');
            app.socket.on('online', this.userConnected);
            app.socket.on('offline', this.userDisconnected);
        }
    },
    userConnected: function() {
        app.connectionStatus = "Online";
    },
    userDisconnected: function() {
        app.connectionStatus = "Offline";
        this.disconnect();
    }
});