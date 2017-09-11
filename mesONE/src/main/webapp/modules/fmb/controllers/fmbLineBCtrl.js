/**  
 * @Class Name : fmbLineBCtrl.js
 * @Description : fmbLineB
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
    .controller('FmbLineBCtrl'
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
    var fact_id = "B";
    $scope.isMobile = false;
    
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
    
    // 모바일 체크 함수 실행
	isMobileFunc();
	
    getLineList();
    
    // 워커스타트
	workerList.workerStart(workerList.worker2, "worker.js");
	// 워커온메세지
	workerList.workerOnmessage(workerList.worker2, getLineList);
    
	// 모바일 체크 함수 정의
	function isMobileFunc(){
		var UserAgent = navigator.userAgent;

		if (UserAgent.match(/iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null)
		{
			$scope.isMobile = true;
		}else{
			$scope.isMobile =  false;
		}
	}
	
	//선택된 공장의 line별 데이터 가져오기
    function getLineList(){
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

