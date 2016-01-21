(function() {
  'use strict';

  angular.module('home.module',
  [
    'signup.module',
    'login.module'
  ])
  .config(Route)
  .controller('HomeCtrl', HomeCtrl);

  /**
   * @name  Route
   * @description config block
   */
  function Route($stateProvider) {
    $stateProvider
    .state('root.home', {
      url: '/',
      views: {
        '@': {
          templateUrl: 'src/app/home/home.tpl.html',
          controller: 'HomeCtrl as vm',
          resolve: {
            data: function(DataService) {
              return DataService.get();
            }
          }
        }
      },
      resolve: {
        auth: authentication
      }
    });
  }


  /**
   * @name  authentication
   * @description returns promise based on whether user is logged in
   */
  function authentication ($q, userApi) {

    if (userApi.currentUser()) {
      return $q.reject({ 'authenticated': false });
    } else {
      return $q.resolve({ 'authenticated': true });
    }
  }

  /**
   * @name  HomeCtrl
   * @description Controller
   */
  function HomeCtrl(data) {
    var vm = this;
    vm.data = data.data;
  }

})();
