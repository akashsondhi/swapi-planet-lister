describe('DashboardController testing', function(){
    var $controller, $scope, mockCommonService;
    var mockUserList = {
        data: {
            results:[
                {
                    name: "Test1",
                    birth_year: "1"
                }
            ]
        }
    };
    var mockUser = {
        name: "Test1",
        birth_year: "1"
    };
    var e = {
            preventDefault: jasmine.createSpy()
        };
    beforeEach(function(){
        module('myApp');
        
    });
    beforeEach(inject(function(_$controller_, _$rootScope_, CommonProp){
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        mockCommonService = CommonProp;
    }));
    it('should call changeLocation with /login if user is not logged in', function(){
        spyOn(mockCommonService,"getUser").and.returnValue(undefined);
        spyOn(mockCommonService,"changeLocation");
        var ctrl = $controller('DashboardController', {$scope: $scope, CommonProp: mockCommonService});
        expect(mockCommonService.changeLocation).toHaveBeenCalledWith('/login');
        
    });
     it('test search functionality', function(){
        spyOn(mockCommonService,"getUser").and.returnValue(mockUser);
         spyOn(mockCommonService,"fetchAllPlanets").and.callFake(function(){
             return {
                 then: function(success) {
                     return success();
                 }
             }
         });
         spyOn(mockCommonService, "getPlanetsData");
        var ctrl = $controller('DashboardController', {$scope: $scope, CommonProp: mockCommonService});
         $scope.$apply();
         $scope.search= {
             name: "S"
         };
         $scope.$apply();
         expect(ctrl.articlesLoaded).toBe(true);
         expect(mockCommonService.getPlanetsData).toHaveBeenCalled();
         $scope.search = {
             name: ""
         }
         $scope.$apply();
         expect(ctrl.articlesLoaded).toBe(false);
         expect(ctrl.searchInitiated).toBe(false);
    });
    
})