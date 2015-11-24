var self;
Polymer({
    is: "x-contacts-page",
    ready: function() {
        self = this;
    },
    openChat: function(event) {
        page.redirect('/chat/'+event.currentTarget.id);
    }
});