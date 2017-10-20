/**  
 * @Class Name : fmbSpcCtrl.js
 * @Description : fmbSpc 
 * @Modification Information  
 * @
 * @ 작업일       작성자      내용
 * @ ----------  ---------  -------------------------------
 * @ 2017.05.29  정유경    최초생성
 * @ 사용x
 * 
 */

'use strict';

angular
    .module('app')
    .controller('FmbSpcCtrl', ['CmmAjaxService','CmmModalSrvc','CmmWorkerSrvc', '$http', '$scope', '$window','$q', function (CmmAjaxService, CmmWorkerSrvc, $http, $scope, $window, $q) 
{
	/*------------------------------------------
     * 변수 선언
     *-----------------------------------------*/
   
    var self = this;
    var workerList = CmmWorkerSrvc;
    self.spcVo = {
    	lineCd: '',
    	opCd :''
    		}
    
    //설비parameter
    self.eqptParamVo = {
    		factId: 'C',
			plcId: '', 
    		eqptCnm: ''
        }
    
    
    
	//선택된 spc 데이터 가져오기
    var promise = CmmAjaxService.select("bas/selectFmbSpc.do", self.spcVo);
    promise.then(function(data){
    	self.spcList= data;
    }
    ,function(data){
    	alert('fail: '+ data)
    });
	
	//선택된 spc2 데이터 가져오기
    var promise = CmmAjaxService.select("bas/selectFmbSpc2.do", self.spcVo);
    promise.then(function(data){
    	self.spcList2= data;
    	console.log(self.spcList2);
    }
    ,function(data){
    	alert('fail: '+ data)
    });
	
   
    //설비 이미지리스트 가져오기
    var eqptPromise = CmmAjaxService.select("bas/selectFmbEqpt.do", self.eqptParamVo);
    eqptPromise.then(function(data) {
    	self.eqptList = data; //fmbEqptVo가 담긴 리스트 형태리턴
    }, function(data){
    		alert('fail: '+ data)
    });
    
    
    
    //워커가 이미 존재하면 종료시킨다 .
    if(workerList.worker2!=undefined){
    	workerList.worker2.terminate();
    	workerList.worker2=undefined;
    }      

}]);

