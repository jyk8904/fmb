/**  
 * @Class Name : fmb006Ctrl.js
 * @Description : fmb006 
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
    .controller('Fmb006Ctrl', ['CmmAjaxService', '$http', '$scope', '$q', function (CmmAjaxService, $http, $scope, $q) 
{
	/*------------------------------------------
     * 변수 선언
     *-----------------------------------------*/
    var self = this;
    
    self.plcVo = {
    	plcId: '', 
    	factId: 'C'
    }
    
    self.eqptVo={
    	eqptNm: '',
    	factId: ''
    }
    
    
    self.setSelected = function(id){
    	self.plcVo.plcId = id;
    	$('#editModal').modal(self.plcVo);
    }
    
    
    
    var plcPromise = CmmAjaxService.select("/mes/bas/selectFmbPlc.do", self.plcVo);
    plcPromise.then(function(data){
    	self.plcList = data;//fmbPlcVo가 담긴 리스트 형태
    	//console.log(self.plcList);
    }
    ,function(data){
    	alert('fail: '+ data)
    });
    
/*    
    var eqptPromise = CmmAjaxService.select("/mes/bas/selectFmbEqpt.do", self.eqptVo);
    eqptPromise.then(function(data){
    	self.eqptList = data;//fmbEqptVo가 담긴 리스트 형태
    	//console.log(self.eqptList);
    }
    ,function(data){
    	alert('fail: '+ data)
    });*/
    
    
}]);

