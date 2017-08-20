describe('LoginController testing', function(){
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
    it('should call changeLocation if user is already logged in', function(){
        spyOn(mockCommonService,"getUser").and.returnValue(true);
        spyOn(mockCommonService,"changeLocation");
        var ctrl = $controller('LoginController', {$scope: $scope, CommonProp: mockCommonService});
        expect(mockCommonService.changeLocation).toHaveBeenCalled();
        
    });
     it('should throw error if getUsersList method fails to fetch data from the people api', function(){
        spyOn(mockCommonService,"getUser").and.returnValue(false);
        spyOn(mockCommonService,"changeLocation");
         spyOn(mockCommonService,"getUsersList").and.callFake(function(){
             return {
                 then: function(success, error) {
                     return error(mockUserList);
                 }
             }
         })
        var ctrl = $controller('LoginController', {$scope: $scope, CommonProp: mockCommonService});
        expect(mockCommonService.changeLocation).not.toHaveBeenCalled();
        ctrl.user = {
            username: "Test",
            password: "1"
        };
        ctrl.SignIn(e);
         expect(ctrl.errorInLogin).toBe(true);
         expect(ctrl.errorMsg).toEqual('Unable to fetch record at the moment. Check your network connection.');
    });
    it('should throw error if username is incorrect', function(){
        spyOn(mockCommonService,"getUser").and.returnValue(false);
        spyOn(mockCommonService,"changeLocation");
         spyOn(mockCommonService,"getUsersList").and.callFake(function(){
             return {
                 then: function(success, error) {
                     return success(mockUserList);
                 }
             }
         })
        var ctrl = $controller('LoginController', {$scope: $scope, CommonProp: mockCommonService});
        expect(mockCommonService.changeLocation).not.toHaveBeenCalled();
        ctrl.user = {
            username: "Test",
            password: "1"
        };;
        ctrl.SignIn(e);
         expect(ctrl.errorInLogin).toBe(true);
         expect(ctrl.errorMsg).toEqual('Username not found.');
    });
    it('should throw error if password is incorrect', function(){
        spyOn(mockCommonService,"getUser").and.returnValue(false);
        spyOn(mockCommonService,"changeLocation");
         spyOn(mockCommonService,"getUsersList").and.callFake(function(){
             return {
                 then: function(success, error) {
                     return success(mockUserList);
                 }
             }
         })
        var ctrl = $controller('LoginController', {$scope: $scope, CommonProp: mockCommonService});
        expect(mockCommonService.changeLocation).not.toHaveBeenCalled();
        ctrl.user = {
            username: "Test1",
            password: "2"
        };;
        ctrl.SignIn(e);
         expect(ctrl.errorInLogin).toBe(true);
         expect(ctrl.errorMsg).toEqual('Incorrect password.');
    });
     it('should call setUser and changeLocation if credentials match', function(){
        spyOn(mockCommonService,"getUser").and.returnValue(false);
        spyOn(mockCommonService,"changeLocation");
         spyOn(mockCommonService,"setUser");
         spyOn(mockCommonService,"getUsersList").and.callFake(function(){
             return {
                 then: function(success, error) {
                     return success(mockUserList);
                 }
             }
         })
        var ctrl = $controller('LoginController', {$scope: $scope, CommonProp: mockCommonService});
        expect(mockCommonService.changeLocation).not.toHaveBeenCalled();
        ctrl.user = {
            username: "Test1",
            password: "1"
        };;
        ctrl.SignIn(e);
         expect(mockCommonService.changeLocation).toHaveBeenCalled();
         expect(mockCommonService.setUser).toHaveBeenCalled();
         expect(ctrl.errorInLogin).toBe(false);
         
    });
})