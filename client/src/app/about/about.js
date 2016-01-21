(function() {
  'use strict';

  angular.module('getting-started',
    [
      'common.services.api'
    ])
    .config(config)
    .controller('aboutCtrl', aboutCtrl);

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
    .state('root.about', {
      url: '/about',
      views: {
        '@': {
          templateUrl: 'src/app/about/about.html',
          controller: 'aboutCtrl as vm'
        }
      }
    });
  }

  /**
   * @name  gettingStartedCtrl
   * @description Controller
   */
  function aboutCtrl($log) {
    var vm = this;
    vm.someMethod = function () {
      $log.debug('I\'m a method');
    };
  }

})();
