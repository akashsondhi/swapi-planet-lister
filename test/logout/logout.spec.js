describe('LogoutCtrl testing', function(){
    var $controller, mockCommonService;
    beforeEach(function(){
        module('myApp');
    });
    beforeEach(inject(function(_$controller_, CommonProp){
        $controller = _$controller_;
        mockCommonService = CommonProp;
    }));
    it('should call changeLocation with /login if user is logging out', function(){
        spyOn(mockCommonService,"changeLocation");
        var ctrl = $controller('LogoutCtrl', {CommonProp: mockCommonService});
        expect(mockCommonService.changeLocation).toHaveBeenCalledWith('/login');
        
    });
    
    
})