'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginController',
        controllerAs: 'LoginCtrl',
    });
}])

.controller('LoginController', ['$scope', '$location', 'CommonProp', '$timeout', function ($scope, $location, CommonProp, $timeout) {
    var _self = this;
    var userObj = {};
    this.user = {};
    var login = {};
    if (CommonProp.getUser()) {
        CommonProp.changeLocation('/dashboard');
    }

    this.login = login;

    this.SignIn = function (e) {
        login.loading = true;
        this.errorInLogin = false;
        e.preventDefault();
        var username = _self.user.username;
        var password = _self.user.password;
        CommonProp.getUsersList(username).then(
            function onSuccess(userList) {
                userObj = CommonProp.fetchUserData(userList.data.results, username)[0];
                login.loading = false;
                _self.errorInLogin = true;
                if (!userObj) {
                    _self.errorMsg = "Username not found.";
                } else {
                    if (userObj.birth_year === password) {
                        CommonProp.setUser(userObj);
                        CommonProp.changeLocation('/dashboard');

                    } else {
                        _self.errorMsg = "Incorrect password.";
                    }
                }

            },
            function OnError(error) {
                login.loading = false;
                _self.errorInLogin = true;
                _self.errorMsg = "Unable to fetch record at the moment. Check your network connection.";

            }
        )

    }
}])


.directive('laddaLoading', [
    function () {
        return {
            link: function (scope, element, attrs) {
                var Ladda = window.Ladda;
                var ladda = Ladda.create(element[0]);
                // Watching login.loading for change
                scope.$watch(attrs.laddaLoading, function (newVal, oldVal) {
                    // if true show loading indicator
                    if (newVal) {
                        ladda.start();
                    } else {
                        ladda.stop();
                    }
                });
            }
        };
    }
]);