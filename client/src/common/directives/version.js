(function() {
  'use strict';

  angular.module('common.directives.version', [])
      .directive('appVersion', versionDirective);

  function versionDirective(version) {
    return {
      restrict: 'A',
      /*jshint unused:false*/
      link: function(scope, elm, attrs) {
        elm.text(version);
      }
    };
  }

})();
