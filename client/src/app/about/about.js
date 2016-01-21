(function() {
  'use strict';

  angular.module('getting-started',
    [
      'common.services.api'
    ])
    .config(config)
    .controller('GettingStartedCtrl', GettingStartedCtrl);

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
          controller: 'GettingStartedCtrl as vm'
        }
      }/*,
      resolve: {
        auth: authentication
      }*/
    });
  }

  /**
   * @name  authentication
   * @description returns promise based on whether user is logged in
   */
  function authentication ($q, userApi) {

    if (userApi.currentUser()) {
      return $q.resolve({ 'authenticated': true });
    } else {
      return $q.reject({ 'authenticated': false });
    }
  }

  /**
   * @name  gettingStartedCtrl
   * @description Controller
   */
  function GettingStartedCtrl($log) {
    var vm = this;
    vm.someMethod = function () {
      $log.debug('I\'m a method');
    };
  }

})();
