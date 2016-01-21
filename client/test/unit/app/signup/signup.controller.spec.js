(function () {
  'use strict';

  describe('GIVEN Signup Controller', function () {
    var vm,
      $q,
      scope,
      userApi,
      $cookies,
      stubUserApiSignup,
      stubUserApiIsUser,
      dependencies,
      createController;

    beforeEach(module('signup.module'));
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
          'SignupCtrl as vm',
          _.defaults(mockDependencies, dependencies)
        );
      };



    }));

    it('should not be null', function () {
      vm = createController();
      expect(vm).not.toEqual(null);
    });

    describe('GIVEN the user has entered their credentials for signup', function () {
      var testUser = {
        username: 'foo',
        password: 'bar'
      };

      beforeEach(inject(function ($controller) {
        //var goodResponse = {'objectId': 'fred', sessionToken: '123'};

        stubUserApiSignup = sinon.stub(userApi, 'signUp');
        vm = createController();
      }));

      afterEach(function () {
        stubUserApiSignup.restore();
      });

      describe('AND the auth service will APPROVE the credentials', function () {
        beforeEach(function () {
          stubUserApiSignup.returns($q.when({}));
        });

        describe('WHEN the user signs up', function () {
          beforeEach(function () {
            vm.signUp(testUser.username, testUser.password);
            scope.$digest();
          });

          it('THEN it should call the userApi', function () {
            expect(stubUserApiSignup.calledOnce).toBeTruthy();
            expect(vm).not.toEqual(null);
          });

          it('THEN it should call the userApi with the correct parameters', function () {
            expect(stubUserApiSignup.calledWithMatch(testUser.username, testUser.password)).toBeTruthy();
          });

          it('THEN it should clear any error messages', function () {
            expect(vm.errorMessage).toEqual('');
          });

        });
      });

      describe('AND the auth service will REJECT the credentials', function () {
        var errorMessage = 'Bad login';
        beforeEach(function () {
          stubUserApiSignup.returns($q.reject({'message': errorMessage}));
        });

        describe('WHEN the user logs in', function () {
          beforeEach(function () {
            vm.signUp(testUser.username, testUser.password);
            scope.$digest();
          });

          it('THEN it should call the userApi', function () {
            expect(stubUserApiSignup.calledOnce).toBeTruthy();
          });

          it('THEN it should call the userApi with the correct parameters', function () {
            expect(stubUserApiSignup.calledWithMatch(testUser.username, testUser.password)).toBeTruthy();
          });

          it('THEN it should set the error messages', function () {
            expect(vm.errorMessage).toEqual(errorMessage);
          });

        });

      });

    });

    describe('GIVEN the system checks to see if a username is taken', function () {
      var testUser = {
        username: 'foo'
      };

      beforeEach(inject(function ($controller) {
        stubUserApiIsUser = sinon.stub(userApi, 'isUser');
        vm = createController();
      }));

      afterEach(function () {
        stubUserApiIsUser.restore();
      });

      describe('AND the auth service will APPROVE the credentials', function () {
        beforeEach(function () {
          stubUserApiIsUser.returns($q.when({}));
        });

        describe('WHEN the system checks for a user', function () {
          beforeEach(function () {
            vm.isUser(testUser.username);
            scope.$digest();
          });

          it('THEN it should call the userApi', function () {
            expect(stubUserApiIsUser.calledOnce).toBeTruthy();
            expect(vm).not.toEqual(null);
          });

          it('THEN it should call the userApi with the correct parameters', function () {
            expect(stubUserApiIsUser.calledWithMatch(testUser.username)).toBeTruthy();
          });

          it('THEN it should clear any error messages', function () {
            expect(vm.errorMessage).toEqual('');
          });

        });
      });

      describe('AND the auth service will REJECT the credentials', function () {
        var errorMessage = 'Bad login';
        beforeEach(function () {
          stubUserApiIsUser.returns($q.reject({'message': errorMessage}));
        });

        describe('WHEN the system checks for a user', function () {
          beforeEach(function () {
            vm.isUser(testUser.username);
            scope.$digest();
          });

          it('THEN it should call the userApi', function () {
            expect(stubUserApiIsUser.calledOnce).toBeTruthy();
          });

          it('THEN it should call the userApi with the correct parameters', function () {
            expect(stubUserApiIsUser.calledWithMatch(testUser.username)).toBeTruthy();
          });

          it('THEN it should set the error messages', function () {
            expect(vm.errorMessage).toEqual(errorMessage);
          });

        });

      });

    });



  });
})();
