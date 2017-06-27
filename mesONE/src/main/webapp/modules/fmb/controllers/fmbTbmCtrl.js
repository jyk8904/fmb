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
    .controller('FmbTbmCtrl', ['CmmAjaxService','CmmModalSrvc','CmmWorkerSrvc', '$http', '$scope', '$window','$q', function (CmmAjaxService, CmmWorkerSrvc, $http, $scope, $window, $q) 
{
	/*------------------------------------------
     * 변수 선언
     *-----------------------------------------*/
    var self = this;
    var workerList = CmmWorkerSrvc;
     	   
    
  //선택된 spc2 데이터 가져오기
    var promise = CmmAjaxService.selectAll("/mes/bas/selectFmbTbm.do");
    promise.then(function(data){
    	self.Tbm = data;
    	console.log(self.Tbm);
    }
    ,function(data){
    	alert('fail: '+ data)
    });
    
  //워커가 이미 존재하면 종료시킨다 .
    if(workerList.worker2!=undefined){
    	workerList.worker2.terminate();
    	workerList.worker2=undefined;
    }      
}]);

