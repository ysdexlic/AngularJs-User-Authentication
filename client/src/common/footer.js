(function() {
  'use strict';

  function footerCtrl($log) {
    $log.debug('Footer loaded');
  }

  angular.module('common.footer', [])
    .controller('FooterCtrl', footerCtrl)
    .directive('contactButtons', function(){
    	return{
    		restrict: 'E',
    		templateUrl: 'src/app/partials/buttons.tpl.html'
    	};
    });
})();
