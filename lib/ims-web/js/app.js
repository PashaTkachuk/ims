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

(function(document) {
    'use strict';

    var app = document.querySelector('#app');

    // Sets app default base URL
    app.baseUrl = '/inbox';
    app.serviceUrl = 'http://localhost:3000';

    app.addEventListener('dom-change', function() {
        console.log('Our app is ready to rock!');
    });

    app.connectionStatus = "Offline";
    app.online_users = [];

    window.addEventListener('WebComponentsReady', function() {
        var router = document.querySelector('app-router');
        window.addEventListener('hashchange', function (event) {
            var res = event.newURL.match(/login\/.*/gi);
            if (res !== null) return;

            if (!app.isLogged && event.newURL !== 'http://localhost:3030/#/login') {
                event.preventDefault();
                window.location.hash = '/login';
            }
        });

        router.addEventListener('before-data-binding', function(event) {
            event.detail.model.isLogged = app.isLogged;
            event.detail.model.user = app.user;
        });
    });

})(document);