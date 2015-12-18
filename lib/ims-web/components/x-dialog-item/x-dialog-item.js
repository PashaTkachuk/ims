Polymer({
    is: "x-dialog-item",
    properties: {
        dialog: {
            type: Object,
            reflectToAttribute: true,
            notify: true
        }
    },
    openChat: function() {
        document.querySelector('app-router').go('/dialog/'+this.dialog.room_id);
    },
    formatTime: function(time) {
        var date = new Date(time);
        return date.toLocaleString();
    }
});