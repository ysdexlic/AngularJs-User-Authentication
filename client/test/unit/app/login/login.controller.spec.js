(function () {
  'use strict';

  describe('GIVEN Login Controller', function () {
    var vm,
      $q,
      scope,
      userApi,
      $cookies,
      stubUserApiLogin,
      stubUserApiLogout,
      stubUserApiIsLoggedIn,
      dependencies,
      createController;

    beforeEach(module('login.module'));
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
          'LoginCtrl as vm',
          _.defaults(mockDependencies, dependencies)
        );
      };



    }));

    it('should not be null', function () {
      vm = createController();
      expect(vm).not.toEqual(null);
    });

    describe('GIVEN the user has entered their credentials for login', function () {
      var testUser = {
        username: 'foo',
        password: 'bar'
      };

      beforeEach(inject(function ($controller) {
        stubUserApiIsLoggedIn = sinon.stub(userApi, 'isLoggedIn');
        stubUserApiLogin = sinon.stub(userApi, 'logIn');
        vm = createController();
      }));

      afterEach(function () {
        stubUserApiIsLoggedIn.restore();
        stubUserApiLogin.restore();
      });

      describe('AND a user is already logged in', function () {
        beforeEach(function () {
          stubUserApiLogin.returns($q.when({}));
          stubUserApiIsLoggedIn.returns(true);
        });

        describe('WHEN the user logs in', function () {
          beforeEach(function () {
            vm.logIn(testUser.username, testUser.password);
            scope.$digest();
          });

          it('THEN it should report an error message that a user is logged in', function () {
            expect(stubUserApiIsLoggedIn.calledOnce).toBe(true);
            expect(vm.errorMessage).toEqual('You are already logged in!');
          });

        });
      });

      describe('AND the auth service will APPROVE the credentials', function () {
        beforeEach(function () {
          stubUserApiLogin.returns($q.when({}));
        });

        describe('WHEN the user logs in', function () {
          beforeEach(function () {
            vm.logIn(testUser.username, testUser.password);
            scope.$digest();
          });

          it('THEN it should call the userApi', function () {
            expect(stubUserApiLogin.calledOnce).toBeTruthy();
          });

          it('THEN it should call the userApi with the correct parameters', function () {
            expect(stubUserApiLogin.calledWithMatch(testUser.username, testUser.password)).toBeTruthy();
          });

          it('THEN it should clear any error messages', function () {
            expect(vm.errorMessage).toEqual('');
          });

        });

      });


      describe('AND the auth service will REJECT the credentials', function () {
        var errorMessage = 'Bad login';
        beforeEach(function () {
          stubUserApiLogin.returns($q.reject({'message': errorMessage}));
        });

        describe('WHEN the user logs in', function () {
          beforeEach(function () {
            vm.logIn(testUser.username, testUser.password);
            scope.$digest();
          });

          it('THEN it should call the userApi', function () {
            expect(stubUserApiLogin.calledOnce).toBeTruthy();
          });

          it('THEN it should call the userApi with the correct parameters', function () {
            expect(stubUserApiLogin.calledWithMatch(testUser.username, testUser.password)).toBeTruthy();
          });

          it('THEN it should set the error messages', function () {
            expect(vm.errorMessage).toEqual(errorMessage);
          });

        });

      });


    });

    describe('GIVEN the user wants to log out', function () {
      beforeEach(inject(function ($controller) {
        stubUserApiIsLoggedIn = sinon.stub(userApi, 'isLoggedIn');
        stubUserApiLogout = sinon.stub(userApi, 'logOut');
        vm = createController();
      }));

      afterEach(function () {
        stubUserApiIsLoggedIn.restore();
        stubUserApiLogout.restore();
      });

      describe('AND no user is currently logged in', function () {
        beforeEach(function () {
          stubUserApiLogout.returns($q.when({}));
        });

        describe('WHEN the user logs out', function () {
          beforeEach(function () {
            stubUserApiIsLoggedIn.returns(false);
            vm.logOut();
            scope.$digest();
          });

          it('THEN it should report an error message that a user is logged in', function () {
            // as there is no user logged in, the api is not called
            expect(stubUserApiLogout.notCalled).toBeTruthy();
            expect(vm.errorMessage).toEqual('No user logged in!');
          });

        });
      });

      describe('AND the auth service APPROVES', function () {
        beforeEach(function () {
          stubUserApiLogout.returns($q.when({}));
        });

        describe('WHEN the user logs out', function () {
          beforeEach(function () {
            stubUserApiIsLoggedIn.returns(true);
            vm.logOut();
            scope.$digest();
          });

          it('THEN it should call the userApi', function () {
            expect(stubUserApiLogout.calledOnce).toBeTruthy();
          });

          it('THEN should clear any error messages', function () {
            expect(vm.errorMessage).toEqual('');
          });

        });
      });

      describe('AND the auth service REJECTS', function () {
        var errorMessage = 'Bad login';
        beforeEach(function () {
          stubUserApiLogout.returns($q.reject({'message': errorMessage}));
        });

        describe('WHEN the user logs out', function () {
          beforeEach(function () {
            stubUserApiIsLoggedIn.returns(true);
            vm.logOut();
            scope.$digest();
          });

          it('THEN it should call the userApi', function () {
            expect(stubUserApiLogout.calledOnce).toBeTruthy();
          });

          it('THEN it should set the error messages', function () {
            expect(vm.errorMessage).toEqual(errorMessage);
          });

        });

      });

    });
  });
})();
