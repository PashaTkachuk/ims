Polymer({
    is: "x-account-item",
    properties: {
        user: {
            type: Object,
            reflectToAttribute: true,
            notify: true
        }
    },
    changeStatus: function(event) {
        if (this.user) {
            if (this.$.selectedStatus.selected == 1) {
                this.user.status = 'invisible';
                this.bgColor = '#90a4ae';
                console.log('Go to invisible');
            } else if (this.$.selectedStatus.selected == 0) {
                this.user.status = 'online';
                this.bgColor = '#006600';
                console.log('Go to online');
            }
        }
    }
});