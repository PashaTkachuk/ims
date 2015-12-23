Polymer({
    is: "x-account-item",
    properties: {
        user: {
            type: Object,
            reflectToAttribute: true,
            notify: true
        }
    },
    attached: function () {
        window.onbeforeunload = this.handleCloseWindowEvent.bind(this);
        app.socket.on('set status feedback', this.handleSetStatusEvent.bind(this));
        if (this.user.status == 'offline') {
            this.$.selectedStatus.selected = 0;
        } else if (this.user.status == 'online') {
            this.$.selectedStatus.selected = 0;
        } else if (this.user.status == 'invisible') {
            this.$.selectedStatus.selected = 1;
        }
    },
    changeStatus: function(event) {
        if (this.$.selectedStatus.selected == 1) {
            if (this.user.status != 'invisible') {
                app.socket.emit('set status', {user_id: this.user.user_id, status: 'invisible'});
            }
            this.user.status = 'invisible';
            this.bgColor = '#90a4ae';
            console.log('Go to invisible');
        } else if (this.$.selectedStatus.selected == 0) {
            if (this.user.status != 'online') {
                app.socket.emit('set status', {user_id: this.user.user_id, status: 'online'});
            }
            this.user.status = 'online';
            this.bgColor = '#006600';
            console.log('Go to online');
        }
    },
    handleSetStatusEvent: function (data) {
        if (data.status) {
            console.log('User status changed');
        } else {
            console.log('User status not changed');
        }
    },
    handleCloseWindowEvent: function () {
        //app.socket.emit('set status', {user_id: this.user.user_id, status: 'offline'});
    }
});