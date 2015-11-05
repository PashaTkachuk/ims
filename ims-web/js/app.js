window.addEventListener('WebComponentsReady', function() {
	  
    var t = document.querySelector('template');
    var router = t.content.querySelector('app-router');
    
    window.addEventListener('hashchange', function (event) {
      var res = event.newURL.match(/login\/.*/gi);
      if (res !== null) return;
      
      if (!t.isSession && event.newURL !== 'http://localhost/#/login') {
        event.preventDefault();
        window.location.hash = '/login';
      }
    });

    router.addEventListener('before-data-binding', function(event) {  		
  		event.detail.model.isSession = t.isSession;
    });

});