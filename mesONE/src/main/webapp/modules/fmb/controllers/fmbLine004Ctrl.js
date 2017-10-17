/**  
 * @Class Name : fmbLinACtrl.js
 * @Description : fmbLineA
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
    .controller('FmbLine004Ctrl'
    		, [	'CmmAjaxService','CmmModalSrvc','CmmWorkerSrvc','$http','$scope','$window','$q','$location','$rootScope'
     , function (CmmAjaxService , CmmModalSrvc , CmmWorkerSrvc , $http , $scope , $window , $q , $location,$rootScope) 
{
	/*------------------------------------------
     * 변수 선언
     *-----------------------------------------*/
 
    var self = this;
    var workerList = CmmWorkerSrvc;
    var fact_id = "004";
    var promise = null;
    var length = null;
    var dangle = null;
    var blankCount = null;
    var data = null;
    $scope.isMobile = false;
    $rootScope.showBar = $location.url();
    //워커3(알람정보워커)가 없을경우 start
   // $scope.Worker3Start()
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
	
    //워커 스타트
	workerList.workerStart(workerList.worker, "worker.js");
	//워커 온메세지
	workerList.workerOnmessage(workerList.worker, getLineList);

	//선택된 공장의 line별 데이터 가져오기
   function getLineList(){
	   //console.log(getLineList)
	    promise = CmmAjaxService.select("bas/selectFmbLine.do", self.lineParamVo);
	    promise.then(function(data){
	    	self.lineList = data;
	    	//console.log(data)
	    	length = self.lineList.length;
	    	dangle = length % 7;
	    	if (dangle != 0) 
	    	{
	    		blankCount = 7- dangle;
	    		for (var i = 0; i < blankCount; i++)
	    		{
	    			data = { eqptSts : ''
			    			    , desc : null
			    			    , lineBotNm : ''
			    			    , lineCd : ''
			    				, lineMidNm : ''
			    				, lineNm : ''
			    				, lineTopNm : ''
			    				
			    			   };
	    			self.lineList.push(data);
	    		}
	    	}
	    	promise = null;
	        length = null;
	        dangle = null;
	        blankCount = null;
	        data = null;
	    }
	    ,function(data){
	    	//alert('fail: '+ data)
	    	console.log('fail' + data)
	    });
  }
}]);
