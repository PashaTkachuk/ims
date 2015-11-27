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
        });
    });

})(document);