(function () {
  'use strict';

  describe('GIVEN Profile Controller', function () {
    var vm,
      $q,
      scope,
      userApi,
      $cookies,
      dependencies,
      createController;

    beforeEach(module('profile.module'));
    beforeEach(inject(function ($rootScope, $controller, _$q_, _userApi_, _$cookies_) {
      scope = $rootScope.$new();
      $q = _$q_;
      userApi = _userApi_;
      $cookies = _$cookies_;

      dependencies = {
        $scope: scope,
        userApi: userApi,
        $cookies: $cookies
        // Inject other dependencies here
      };

      // createController is called at the beginning of each test suite and
      // can take an object with optional mocked dependencies
      createController = function (mockDependencies) {
        mockDependencies = mockDependencies || {};

        return $controller(
          'profileCtrl as vm',
          _.defaults(mockDependencies, dependencies)
        );
      };



    }));

    it('should not be null', function () {
      vm = createController();
      expect(vm).not.toEqual(null);
    });



  });
})();
