/**  
 * @Class Name : fmbLinCtrl.js
 * @Description : fmbLine
 * @Modification Information  
 * @
 * @ 작업일       작성자      내용
 * @ ----------  ---------  -------------------------------
 * @ 2017.06.19  정유경    최초생성
 * @ 
 * 
 */

'use strict';

angular
    .module('app')
    .controller('FmbLineACtrl'
    		, [	'CmmAjaxService','CmmModalSrvc','CmmWorkerSrvc','$http','$scope','$window','$q','$location'
     , function (CmmAjaxService , CmmModalSrvc , CmmWorkerSrvc , $http , $scope , $window , $q , $location) 
{
	/*------------------------------------------
     * 변수 선언
     *-----------------------------------------*/
 
    var self = this;
    var workerList = CmmWorkerSrvc;
    var fact_id = "A";

    self.lineParamVo = {
    	factId : fact_id,
    	lineCd : '',
    	lineNm : '',
    	dGoal: '',
    	nGoal : '',
    	eqptStst : '',
    	dCount: '',
    	nCount: '',
    	dRate : '',
    	nRate : '',
    	lineTopNm: '',
    	lineMidNm: '',
    	lineBotNm: ''
    }

    self.parseInt = function(value){
    	if (value == ""){
    		return "";
    	}
    	else {
    		return parseInt(value);
    	}
    };
    
   
    getLineList();
    //Worker2Start();
    
    
    
   /* function Worker2Start(){
    	 //브라우저가 웹 워커를 지원하는지 검사한다 .
        if(!!window.Worker){    
           
           //워커가 이미 존재하면 종료시킨다 .
           if(workerList.worker2!=undefined){
        	   workerList.worker2.terminate();
        	   workerList.worker2=undefined;
           }      
           
           //새로운 워커(객체)를 생성한다.
           workerList.worker2= new Worker("worker2.js");       
           
          
           //Setting 정보를 Worker로 넘긴다.
           var SettingTime = workerList.worker2data;
           for(var i =0; i < SettingTime.length; i++){
        	   if('/'+SettingTime[i].pageNm ==$location.url()){
        		   workerList.worker2.postMessage(SettingTime[i]);
        		   console.log(SettingTime[i])
        	   }
           }
	           
	           // 워커로부터 전달되는 메시지를 받는다.
	           		workerList.worker2.onmessage = function(evt){ 
	           			if(workerList.worker2sts=='stop'){
	           				Worker2Start();
	           			}
	           			getLineList();

		             }  
        	}
        else {
          alert("현재 브라우저는 웹 워커를 지원하지 않습니다");
        }
      }*/
           function getLineList(){
        	 //선택된 공장의 line별 데이터 가져오기
        	    var promise = CmmAjaxService.select("/mes/bas/selectFmbLine.do", self.lineParamVo);
        	    promise.then(function(data){
        	    	self.lineList = data;
        	    	var length = self.lineList.length;
        	    	var dangle = length % 7;
        	    	if (dangle != 0) 
        	    	{
        	    		var blankCount = 7- dangle;
        	    		for (var i = 0; i < blankCount; i++)
        	    		{
        	    			var data = {  dcount : ''
        			    			    , dgoal : ''
        			    			    , drate : ''
        			    			    , eqptSts : ''
        			    			    , desc : null
        			    			    , lineBotNm : ''
        			    			    , lineCd : ''
        			    				, lineMidNm : ''
        			    				, lineNm : ''
        			    				, lineTopNm : ''
        			    				, ncount : ''
        			    				, ngoal : ''
        			    				, nrate : ''
        			    			   };
        	    			self.lineList.push(data);
        	    		}
        	    	}
        	    }
        	    ,function(data){
        	    	alert('fail: '+ data)
        	    });
          }
}]);

