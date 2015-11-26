(function(document) {
    'use strict';

    var app = document.querySelector('#app');

    // Sets app default base URL
    app.baseUrl = '/inbox';
    app.serviceUrl = 'http://127.0.0.1:3000';

    app.addEventListener('dom-change', function() {
        console.log('Our app is ready to rock!');
    });

    app.dialog_id = null;
    app.connectionStatus = "Offline";
    app.online_users = [];

    // See https://github.com/Polymer/polymer/issues/1381
    window.addEventListener('WebComponentsReady', function() {

    });

    // Scroll page to top and expand header
    app.scrollPageToTop = function() {
        app.$.headerPanelMain.scroller.scrollTop;
    };

})(document);