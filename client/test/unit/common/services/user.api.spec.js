(function () {
  'use strict';

  describe('GIVEN the userApi', function () {
    var $q,
      userApi,
      $cookies,
      $rootScope,
      $httpBackend,
      PARSE_URLS,
      PARSE_CREDENTIALS,
      myData,
      handler,
      errorStatus;


    beforeEach(module('common.services.api', function ($provide) {
      $provide.decorator('$cookies', function ($delegate) {
        $delegate.put('_sessionToken', 'aSession');
        return $delegate;
      });
    }));

    beforeEach(inject(function (_userApi_, _$cookies_, _$httpBackend_, _$rootScope_, _$q_, _PARSE_CREDENTIALS_, _PARSE_URLS_) {
      userApi = _userApi_;
      $cookies = _$cookies_;
      $httpBackend = _$httpBackend_;
      $rootScope = _$rootScope_;
      $q = _$q_;
      PARSE_CREDENTIALS = _PARSE_CREDENTIALS_;
      PARSE_URLS = _PARSE_URLS_;
    }));

    beforeEach(function() {
      myData = [];
      errorStatus = '';
      handler = {
        success: function(data) {
          myData = data;
        },
        error: function(data) {
          errorStatus = data;
        }
      };
      spyOn(handler, 'success').and.callThrough();
      spyOn(handler, 'error').and.callThrough();
    });

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
      $cookies.remove ('_sessionToken');
    });

    it('should load the userApi', function () {
      expect(userApi).not.toEqual(null);
    });

    describe('WHEN checking if a user is logged in', function () {

      it('THEN WITH a valid session token should return true', function () {
        expect(userApi.isLoggedIn()).toEqual(true);
      });

      it('THEN WITHOUT a valid session token should return false', function () {
        $cookies.remove('_sessionToken');
        expect(userApi.isLoggedIn()).toEqual(false);
      });

    });

    describe('WHEN login is requested', function () {
      var user = 'aUser',
        password = 'aPassword',
        goodResponse = {'objectId': 'fred', sessionToken: '123'};

      it('THEN it should call the login endpoint', function () {

        $httpBackend
          .expect('GET', PARSE_URLS.LOGIN + '?password=aPassword&username=aUser')
          .respond(goodResponse);

        userApi.logIn(user, password)
          .then(handler.success, handler.error);
        $httpBackend.flush();

        expect(handler.success).toHaveBeenCalled();
        expect(errorStatus).toEqual('');
      });

      it('THEN it should pass the service credentials', function () {

        $httpBackend
          .expect('GET', PARSE_URLS.LOGIN + '?password=aPassword&username=aUser', undefined,
          function (headers) {
            return headers['X-Parse-Application-Id'] === PARSE_CREDENTIALS.APP_ID &&
              headers['X-Parse-REST-API-Key'] === PARSE_CREDENTIALS.REST_API_KEY;
          })
          .respond(goodResponse);

        userApi.logIn(user, password)
          .then(handler.success, handler.error);
        $httpBackend.flush();

        expect(handler.success).toHaveBeenCalled();
        expect(errorStatus).toEqual('');

      });

      it('THEN it should store the sessionToken as a cookie', function () {

        $httpBackend
          .expect('GET', PARSE_URLS.LOGIN + '?password=aPassword&username=aUser', undefined,
            function (headers) {
              return headers['X-Parse-Application-Id'] === PARSE_CREDENTIALS.APP_ID &&
                headers['X-Parse-REST-API-Key'] === PARSE_CREDENTIALS.REST_API_KEY;
            })
          .respond(goodResponse);

        userApi.logIn(user, password)
          .then(handler.success, handler.error);
        $httpBackend.flush();

        expect($cookies.get('_sessionToken')).toMatch('123');
      });

      it('THEN it should return the correct data on success', function () {

        $httpBackend.whenGET(PARSE_URLS.LOGIN + '?password=aPassword&username=aUser', undefined,
          function (headers) {
            return headers['X-Parse-Application-Id'] === PARSE_CREDENTIALS.APP_ID &&
              headers['X-Parse-REST-API-Key'] === PARSE_CREDENTIALS.REST_API_KEY;
          })
          .respond(goodResponse);

        userApi.logIn(user, password)
          .then(handler.success, handler.error);
        $httpBackend.flush();

        expect(handler.success).toHaveBeenCalled();
        expect(myData).toEqual(goodResponse);
        expect(handler.error).not.toHaveBeenCalled();
        expect(errorStatus).toEqual('');
      });

      it('THEN it should return an error on failing', function() {

        $httpBackend.whenGET(PARSE_URLS.LOGIN + '?password=aPassword&username=aUser', undefined,
          function (headers) {
            return headers['X-Parse-Application-Id'] === PARSE_CREDENTIALS.APP_ID &&
              headers['X-Parse-REST-API-Key'] === PARSE_CREDENTIALS.REST_API_KEY;
          })
          .respond(404, {status: 404});

        userApi.logIn(user,password)
          .then(handler.success, handler.error);
        $httpBackend.flush();

        expect(handler.error).toHaveBeenCalled();
        expect(errorStatus.status).toEqual(404);
        expect(errorStatus.message).toEqual('Invalid username or password');
        expect(handler.success).not.toHaveBeenCalled();
        expect(myData).toEqual([]);
      });

    });

    describe('WHEN Signup is requested', function () {
      var user = 'aUser',
        password = 'aPassword',
        goodResponse = {'objectId': 'fred', sessionToken: '123'};

      it('THEN it should call the signup endpoint', function () {

        $httpBackend
          .expect('POST', PARSE_URLS.SIGNUP, {'username': user, 'password': password})
          .respond(goodResponse);

        userApi.signUp(user, password)
          .then(handler.success, handler.error);
        $httpBackend.flush();

        expect(handler.success).toHaveBeenCalled();
        expect(errorStatus).toEqual('');
      });

      it('THEN it should pass the service credentials', function () {

        $httpBackend
          .expect('POST', PARSE_URLS.SIGNUP, {'username': user, 'password': password},
          function (headers) {
            return headers['X-Parse-Application-Id'] === PARSE_CREDENTIALS.APP_ID &&
              headers['X-Parse-REST-API-Key'] === PARSE_CREDENTIALS.REST_API_KEY &&
              headers['Content-Type'] === 'application/json';
          })
          .respond(goodResponse);

        userApi.signUp(user, password)
          .then(handler.success, handler.error);
        $httpBackend.flush();

        expect(handler.success).toHaveBeenCalled();
        expect(errorStatus).toEqual('');
      });

      it('THEN it should store the sessionToken as a cookie', function () {

        $httpBackend
          .expect('POST', PARSE_URLS.SIGNUP, {'username': user, 'password': password},
            function (headers) {
              return headers['X-Parse-Application-Id'] === PARSE_CREDENTIALS.APP_ID &&
                headers['X-Parse-REST-API-Key'] === PARSE_CREDENTIALS.REST_API_KEY &&
                headers['Content-Type'] === 'application/json';
            })
          .respond(goodResponse);

        userApi.signUp(user, password)
          .then(handler.success, handler.error);
        $httpBackend.flush();

        expect($cookies.get('_sessionToken')).toMatch('123');
      });

      it('THEN it should return the correct data on success', function () {

        $httpBackend.whenPOST(PARSE_URLS.SIGNUP, {'username': user, 'password': password},
          function (headers) {
            return headers['X-Parse-Application-Id'] === PARSE_CREDENTIALS.APP_ID &&
              headers['X-Parse-REST-API-Key'] === PARSE_CREDENTIALS.REST_API_KEY &&
              headers['Content-Type'] === 'application/json';
          })
          .respond(goodResponse);

        userApi.signUp(user, password)
          .then(handler.success, handler.error);
        $httpBackend.flush();

        expect(handler.success).toHaveBeenCalled();
        expect(myData).toEqual(goodResponse);
        expect(handler.error).not.toHaveBeenCalled();
        expect(errorStatus).toEqual('');
      });

      it('THEN it should return an error on failing', function() {

        $httpBackend.whenPOST(PARSE_URLS.SIGNUP, {'username': user, 'password': password},
          function (headers) {
            return headers['X-Parse-Application-Id'] === PARSE_CREDENTIALS.APP_ID &&
              headers['X-Parse-REST-API-Key'] === PARSE_CREDENTIALS.REST_API_KEY &&
              headers['Content-Type'] === 'application/json';
          })
          .respond(404, {status: 404});

        userApi.signUp(user,password)
          .then(handler.success, handler.error);
        $httpBackend.flush();

        expect(handler.error).toHaveBeenCalled();
        expect(errorStatus.status).toEqual(404);
        expect(errorStatus.message).toEqual('Invalid username or password');
        expect(handler.success).not.toHaveBeenCalled();
        expect(myData).toEqual([]);
      });

    });

    describe('WHEN Logout is requested', function () {
      var session = 'aSession',
        goodResponse = {'objectId': 'fred', sessionToken: '123'};

      it('THEN it should call the logout endpoint', function () {
        $httpBackend
          .expect('POST', PARSE_URLS.LOGOUT, {})
          .respond(goodResponse);

        userApi.logOut()
          .then(handler.success, handler.error);
        $httpBackend.flush();

        expect(handler.success).toHaveBeenCalled();
        expect(errorStatus).toEqual('');
      });

      it('THEN it should pass the service credentials', function () {
        $httpBackend
          .expect('POST', PARSE_URLS.LOGOUT, {},
          function (headers) {
            return headers['X-Parse-Application-Id'] === PARSE_CREDENTIALS.APP_ID &&
              headers['X-Parse-REST-API-Key'] === PARSE_CREDENTIALS.REST_API_KEY &&
              headers['X-Parse-Session-Token'] === session;
          })
          .respond(goodResponse);

        userApi.logOut()
          .then(handler.success, handler.error);
        $httpBackend.flush();

        expect(handler.success).toHaveBeenCalled();
        expect(errorStatus).toEqual('');
      });

      it('THEN it should return an error on failing', function() {

        $httpBackend.whenPOST(PARSE_URLS.LOGOUT, {},
          function (headers) {
            return headers['X-Parse-Application-Id'] === PARSE_CREDENTIALS.APP_ID &&
              headers['X-Parse-REST-API-Key'] === PARSE_CREDENTIALS.REST_API_KEY &&
              headers['X-Parse-Session-Token'] === session;
          })
          .respond(404, {status: 404});

        userApi.logOut()
          .then(handler.success, handler.error);
        $httpBackend.flush();

        expect(handler.error).toHaveBeenCalled();
        expect(errorStatus.status).toEqual(404);
        expect(errorStatus.message).toEqual('An error occurred');
        expect(handler.success).not.toHaveBeenCalled();
        expect(myData).toEqual([]);
      });

    });

    describe('WHEN Current User is requested with an authenticated user', function () {
      var session = 'aSession',
        goodResponse = {'objectId': 'fred', sessionToken: '123'};

      it('THEN it should call the current user endpoint', function () {
        $httpBackend
          .expect('GET', PARSE_URLS.CURRENT_USER)
          .respond(goodResponse);

        userApi.currentUser()
          .then(handler.success, handler.error);
        $httpBackend.flush();

        expect(handler.success).toHaveBeenCalled();
        expect(errorStatus).toEqual('');
      });

      it('THEN it should pass the service credentials', function () {

        $httpBackend
          .expect('GET', PARSE_URLS.CURRENT_USER, undefined,
          function (headers) {
            return headers['X-Parse-Application-Id'] === PARSE_CREDENTIALS.APP_ID &&
              headers['X-Parse-REST-API-Key'] === PARSE_CREDENTIALS.REST_API_KEY &&
              headers['X-Parse-Session-Token'] === session;
          })
          .respond(goodResponse);

        userApi.currentUser()
          .then(handler.success, handler.error);
        $httpBackend.flush();

        expect(handler.success).toHaveBeenCalled();
        expect(errorStatus).toEqual('');
      });

      it('THEN it should store the sessionToken as a cookie', function () {

        $httpBackend
          .expect('GET', PARSE_URLS.CURRENT_USER, undefined,
            function (headers) {
              return headers['X-Parse-Application-Id'] === PARSE_CREDENTIALS.APP_ID &&
                headers['X-Parse-REST-API-Key'] === PARSE_CREDENTIALS.REST_API_KEY &&
                headers['X-Parse-Session-Token'] === session;
            })
          .respond(goodResponse);

        userApi.currentUser()
          .then(handler.success, handler.error);
        $httpBackend.flush();

        //the user should already be logged in, therefore session token will be 'aSession'
        expect($cookies.get('_sessionToken')).toMatch('aSession');
      });

      it('THEN it should return an error on failing', function() {

        $httpBackend.whenGET(PARSE_URLS.CURRENT_USER, undefined,
          function (headers) {
            return headers['X-Parse-Application-Id'] === PARSE_CREDENTIALS.APP_ID &&
              headers['X-Parse-REST-API-Key'] === PARSE_CREDENTIALS.REST_API_KEY;
          })
          .respond(404, {status: 404});

        userApi.currentUser()
          .then(handler.success, handler.error);
        $httpBackend.flush();

        expect(handler.error).toHaveBeenCalled();
        expect(errorStatus.status).toEqual(404);
        expect(errorStatus.message).toEqual('An error occurred');
        expect(handler.success).not.toHaveBeenCalled();
        expect(myData).toEqual([]);
      });


    });


    describe('WHEN Current User is requested without an authenticated user', function () {

      it('THEN it should return false', function () {
        $cookies.remove('_sessionToken');
        expect(userApi.currentUser()).toBe(false);

        userApi.currentUser();
      });
    });

    describe('WHEN checking if a username is registered', function () {
      var user = 'aUser',
        goodResponse = {'objectId': 'fred'};

      it('THEN it should call the _User endpoint', function () {

        $httpBackend
          .expect('GET', PARSE_URLS.USERS + '?where=%7B%22username%22:%22aUser%22%7D')
          .respond(goodResponse);

        userApi.isUser(user)
          .then(handler.success, handler.error);
        $httpBackend.flush();

        expect(handler.success).toHaveBeenCalled();
        expect(errorStatus).toEqual('');
      });

      it('THEN it should pass the service credentials', function () {

        $httpBackend
          .expect('GET', PARSE_URLS.USERS + '?where=%7B%22username%22:%22aUser%22%7D', undefined,
            function (headers) {
              return headers['X-Parse-Application-Id'] === PARSE_CREDENTIALS.APP_ID &&
                headers['X-Parse-REST-API-Key'] === PARSE_CREDENTIALS.REST_API_KEY;
            })
          .respond(goodResponse);

        userApi.isUser(user)
          .then(handler.success, handler.error);
        $httpBackend.flush();

        expect(handler.success).toHaveBeenCalled();
        expect(errorStatus).toEqual('');

      });

      it('THEN it should return the correct data on success', function () {

        $httpBackend.whenGET(PARSE_URLS.USERS + '?where=%7B%22username%22:%22aUser%22%7D', undefined,
          function (headers) {
            return headers['X-Parse-Application-Id'] === PARSE_CREDENTIALS.APP_ID &&
              headers['X-Parse-REST-API-Key'] === PARSE_CREDENTIALS.REST_API_KEY;
          })
          .respond(goodResponse);

        userApi.isUser(user)
          .then(handler.success, handler.error);
        $httpBackend.flush();

        expect(handler.success).toHaveBeenCalled();
        expect(myData).toEqual(goodResponse);
        expect(handler.error).not.toHaveBeenCalled();
        expect(errorStatus).toEqual('');
      });

      it('THEN it should return an error on failing', function() {

        $httpBackend.whenGET(PARSE_URLS.USERS + '?where=%7B%22username%22:%22aUser%22%7D', undefined,
          function (headers) {
            return headers['X-Parse-Application-Id'] === PARSE_CREDENTIALS.APP_ID &&
              headers['X-Parse-REST-API-Key'] === PARSE_CREDENTIALS.REST_API_KEY;
          })
          .respond(404, {status: 404});

        userApi.isUser(user)
          .then(handler.success, handler.error);
        $httpBackend.flush();

        expect(handler.error).toHaveBeenCalled();
        expect(errorStatus.status).toEqual(404);
        expect(errorStatus.message).toEqual('Invalid username or password');
        expect(handler.success).not.toHaveBeenCalled();
        expect(myData).toEqual([]);
      });

    });



  });
})();
