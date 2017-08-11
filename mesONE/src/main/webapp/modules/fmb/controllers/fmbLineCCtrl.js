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
    .controller('FmbLineCCtrl'
    		 , ['CmmAjaxService','CmmModalSrvc','CmmWorkerSrvc','$http','$scope','$window','$q','$location'
     , function (CmmAjaxService , CmmModalSrvc , CmmWorkerSrvc , $http , $scope , $window , $q , $location)
{
	/*------------------------------------------
     * 변수 선언
     *-----------------------------------------*/
	 $scope.$watch('loginChk', function(newVal, oldVal) {
			if(newVal == false){
				$location.url('');
			}    	
		}, true);

    var self = this;
    var workerList = CmmWorkerSrvc;
    var fact_id = "C";
    var i = 1;
    
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
	//워커 스타트
	workerList.workerStart(workerList.worker2, "worker2.js", getLineList);
    
    function getLineList(){
    
	//선택된 공장의 line별 데이터 가져오기
    var promise = CmmAjaxService.select("/mes/bas/selectFmbLine.do", self.lineParamVo);
    promise.then(function(data){
    	self.lineList = data;
    	console.log(self.lineList);
    	console.log(self.lineList.length)
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

