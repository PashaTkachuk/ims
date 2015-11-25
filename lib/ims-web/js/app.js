(function(document) {
    'use strict';

    var app = document.querySelector('#app');

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

    // Sets app default base URL
    app.baseUrl = '/inbox';

    app.user = Object();
    app.user.username = getCookie('username');
    app.user.user_id = getCookie('user_id');
    if (app.user.username) {
        app.user.isLogged = true;
    } else {
        app.user.isLogged = false;
    }
    app.serviceUrl = 'http://127.0.0.1:3000';

    app.addEventListener('dom-change', function() {
        console.log('Our app is ready to rock!');
    });

    // See https://github.com/Polymer/polymer/issues/1381
    window.addEventListener('WebComponentsReady', function() {

        // imports are loaded and elements have been registered
    });

    // Scroll page to top and expand header
    app.scrollPageToTop = function() {
        app.$.headerPanelMain.scroller.scrollTop;
    };

})(document);