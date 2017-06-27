/**  
 * @Class Name : fmb001Ctrl.js
 * @Description : fmb001 
 * @Modification Information  
 * @
 * @ 작업일       작성자      내용
 * @ ----------  ---------  -------------------------------
 * @ 2017.05.26  kb.shin    최초생성
 * @ 
 * 
 * @author kb.shin
 * @since 2017.01.01
 * @version 1.0
 * @see
 * 
 */

'use strict';

angular
    .module('app')
    .controller('Fmb003Ctrl', ['CmmAjaxService', 'CmmModalSrvc', '$http', '$scope', '$q', function (CmmAjaxService, $http, $scope, $q) 
{
	/*------------------------------------------
     * 변수 선언
     *-----------------------------------------*/
    var self 	= this;
    //설비parameter
    self.eqptParamVo = {
    		factId: 'C',
			plcId: '', 
    		eqptCnm: ''
        }
    
    //plc parameter
    self.plcParamVo = {
        	plcId: '', 
        	factId: ''
        }
        
  self.showModal = false;
    
   /* self.toggleModal = function(pid){
    	self.plcSelectedVo = {plcId: pid,
				    		  factId: ''
				    		  } 
    	
    	
    	//선택된 plc 데이터 가져오기
        var promise = CmmAjaxService.select("/mes/bas/selectFmbPlc.do", self.plcSelectedVo);
        promise.then(function(data){
        	self.plcList = data;//fmbPlcVo가 담긴 리스트 형태리턴
        }
        ,function(data){
        	alert('fail: '+ data)
        });
    	
    	
    	 self.showModal = !self.showModal;
    };*/
    
    //설비 이미지리스트 가져오기
    var eqptPromise = CmmAjaxService.select("/mes/bas/selectFmbEqpt.do", self.eqptParamVo);
    eqptPromise.then(function(data) {
    	self.eqptList = data; //fmbEqptVo가 담긴 리스트 형태리턴
    }, function(data){
    		alert('fail: '+ data)
    });
    
 
    
   
}]);

