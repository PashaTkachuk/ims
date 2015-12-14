Polymer({
    is: "x-contact-item",
    properties: {
        contact: {
            type: Object,
            reflectToAttribute: true,
            notify: true,
            observer: '_contactChanged'
        }
    },
    attached: function() {
        if (this.contact.status == 'online') {
            this.bgColor = '#006600';
        } else {
            this.bgColor = '#90a4ae';
        }
    },
    openChat: function() {
        document.querySelector('app-router').go('/dialog/'+this.contact.dialog_id);
    },
    deleteContact: function() {
        var req = this.$.deleteContactReq;
        req.url = app.serviceUrl + '/contact/' + this.contact.user_id;
        req.generateRequest();
    },
    handleResponse: function (event, res) {
        if (res.response.status === 'success') {
            this.parentNode.$.getContactsReq.generateRequest();
        }
    },
    _contactChanged: function(newValue, oldValue) {
        if (newValue) {
            if (newValue.status == 'online') {
                this.bgColor = '#006600';
            } else {
                this.bgColor = '#90a4ae';
            }
        }
    }
});