/* jshint undef:false*/
(function () {
  'use strict';

  describe('HomeCtrl', function() {
    var fakeData = ['some', 'data'];
    var ctrl,
      scope,
      rootScope;

    beforeEach(module('app'));
    beforeEach(inject(function ($rootScope, $controller, _DataService_) {
      rootScope = $rootScope;
      scope = $rootScope.$new();
      ctrl = $controller('HomeCtrl as vm', {
        $scope: scope,
        data: {
          data: fakeData
        }
      });
    }));

    it('should not be null', function () {
      expect(ctrl).not.toEqual(null);
    });

    it('should have "data" into its $scope', function () {
      expect(scope.vm.data[0]).toEqual('some');
      expect(scope.vm.data[1]).toEqual('data');
      expect(scope.vm.data.length).toEqual(2);
    });
  });
})();
