/**  
 * @Class Name : fmb002Ctrl.js
 * @Description : fmb002 
 * @Modification Information  
 * @
 * @ 작업일       작성자      내용
 * @ ----------  ---------  -------------------------------
 * @ 2017.05.29  정유경    
 * @ 
 * 

 */

'use strict';

angular
    .module('app')
    .controller('Fmb002Ctrl', ['CmmAjaxService', '$http', '$scope', '$q', function (CmmAjaxService, $http, $scope, $q) 
{
	/*------------------------------------------
     * 변수 선언
     *-----------------------------------------*/
    	  console.log("tq")
    var self = this;

  
    self.vo = {
        plcId: 'PLC_054',
       	factId:''
    }

    var promise = CmmAjaxService.select("/mes/bas/selectFmbPlc.do", self.vo);
    promise.then(function(data){
    	self.plcList = data;
    }
    ,function(data){
    	alert('fail: '+ data)
    });
}]);

