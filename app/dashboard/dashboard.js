'use strict';

angular.module('myApp.dashboard', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/dashboard', {
        templateUrl: 'dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'DashboardCtrl'
    });
}])

.controller('DashboardController', ['$scope', '$timeout', 'CommonProp', function ($scope, $timeout, CommonProp) {
            var _self = this;
            if (!CommonProp.getUser()) {
                CommonProp.changeLocation('/login');
            } else {
                this.username = CommonProp.getUser().name;
                this.searchInitiated = false;
                this.articlesLoaded = false;
                this.articles = [];
                $scope.$watch('search.name', function (newVal, oldVal) {
                    if (newVal && !oldVal) {
                        _self.articlesLoaded = false;
                        _self.searchInitiated = true;
                        CommonProp.fetchAllPlanets(newVal).then(function () {
                            _self.articles = CommonProp.getPlanetsData();
                            _self.articlesLoaded = true;
                        });
                    } else {
                        if (!newVal) {
                            _self.articles = [];
                            _self.articlesLoaded = false;
                            _self.searchInitiated = false;
                        }
                    }
                });
            }
}]);