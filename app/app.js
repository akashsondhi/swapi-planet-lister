'use strict';
// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
    'myApp.login',
    'myApp.dashboard',
    'myApp.logout'
]).
config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/login'
        });
}])
    .service('CommonProp', function ($location, $timeout, $window, $http, $filter, $q) {
        var API_ENDPOINT = "https://swapi.co/api/";
        var planetsData = [];
        var getResourceFromUrl = function (url) {
            return $http.get(url).then(function onSuccess(data) {
                planetsData.push(data.data.results);
                if (data.data.next) {
                    return getResourceFromUrl(data.data.next);
                }
                

            })
        };
        return {
            getUsersList: function (username) {
                return $http.get(API_ENDPOINT + "people/?search=" + username);
            },
            fetchUserData: function (userList, username) {
                return $filter('filter')(userList, {
                    name: username
                }, true);
            },
            getUser: function () {
                return JSON.parse($window.sessionStorage.getItem("currentUser"));
            },
            setUser: function (value) {
                $window.sessionStorage.setItem("currentUser", angular.toJson(value));
            },
            getPlanetsData: function () {
                return _.map(_.flatten(planetsData), function (item) {
                    return {
                        name: item.name,
                        size: item.population === "unknown" ? 0 : parseInt(item.population, 10)
                    }
                });
            },
            fetchAllPlanets: function (planetName) {
                planetsData = [];
                return $q.all(getResourceFromUrl(API_ENDPOINT + 'planets/?search=' + planetName));
            },
            changeLocation: function (nextLocation) {
                $timeout(function () {
                    $location.path(nextLocation);
                });
            }

        };
    });