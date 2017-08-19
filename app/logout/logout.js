'use strict';

angular.module('myApp.logout', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/logout', {
        template: '',
        controller: 'LogoutCtrl'
    });
}])

.controller('LogoutCtrl', ['$window', 'CommonProp', function ($window, CommonProp) {
    delete($window.sessionStorage['currentUser']);
    CommonProp.changeLocation('/login');

}]);