function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

Polymer({
    is: "x-user-session",
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
        }
    },
    ready: function () {
        this.sessionState = (getCookie("username") != '');
    },
    handleSessionResponse: function (event, res) {
        if (res.response.is_login) {
            this.sessionState = true;
            this.$.getUserInfoReq.generateRequest();
        } else {
            this.sessionState = false;
        }
    },
    _sessionStateChanged: function(newValue, oldValue) {
        if (!newValue) {
            window.location.hash = '/login';
        }
    },
    handleUserResponse: function (event, res) {
        this.user = res.response;
        localStorage.setItem("user", JSON.stringify(res.response));
    }
});