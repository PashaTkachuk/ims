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

function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (90*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

(function(document) {
    'use strict';

    var app = document.querySelector('#app');
    app.serverUrl = 'http://10.1.17.39:3000';

    app.addEventListener('dom-change', function() {
        console.log('Our app is ready to rock!');
    });

    window.addEventListener('WebComponentsReady', function() {
        var router = document.querySelector('app-router');
        window.addEventListener('hashchange', function (event) {
            var res = event.newURL.match(/login\/.*/gi);
            if (res !== null) return;

            if (!app.isLogged && !event.newURL.includes('#/login')) {
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