Polymer({
    is: "x-contact-item",
    properties: {
        contact: {
            type: Object,
            reflectToAttribute: true,
            notify: true
        }
    },
    openChat: function() {
        document.querySelector('app-router').go('/dialog/'+this.contact.dialog_id);
    }
});