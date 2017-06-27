/**  
 * @Class Name : fmb001Ctrl.js
 * @Description : fmb001 
 * @Modification Information  
 * @
 * @ 작업일       작성자      내용
 * @ ----------  ---------  -------------------------------
 * @ 2017.05.29  정유경    최초생성
 * @ 
 * 
 */

'use strict';

angular
    .module('app')
    .controller('Fmb001Ctrl', ['CmmAjaxService', '$http', '$scope', '$q', function (CmmAjaxService, $http, $scope, $q) 
{
	/*------------------------------------------
     * 변수 선언
     *-----------------------------------------*/
    var self = this;
    
    self.vo = {
    	plcId: '', 
    	factId: ''
    }

    //modules/cmm/services/cmmAjaxSrvc.js로  url과 json객체 보냄
    var promise = CmmAjaxService.select("/mes/bas/selectFmbPlc.do", self.vo);
    promise.then(function(data){
    	self.plcList = data;//fmbPlcVo가 담긴 리스트 형태
    	//console.log(self.plcList);
    }
    ,function(data){
    	alert('fail: '+ data)
    });
}]);

