/**  
 * @Class Name : fmbProdCtrl.js
 * @Description : fmbProd
 * @Modification Information  
 * @ 생산실적 외 모니터링
 * @ 작업일       작성자      내용
 * @ ----------  ---------  -------------------------------
 * @ 2017.08.14  조준연, 정유경    최초생성
 * @ 
 * 
 */

'use strict';

angular
    .module('app')
    .controller('FmbProdCtrl'
    		 , ['CmmAjaxService','CmmModalSrvc','CmmWorkerSrvc','$http','$scope','$window','$q','$location', '$filter', '$interval'
     , function (CmmAjaxService , CmmModalSrvc , CmmWorkerSrvc , $http , $scope , $window , $q , $location, $filter, $interval)
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
    $scope.isMobile = false;
    self.lineParamVo = {	
        	factId:''
        	}
    // 모바일 체크 함수 실행
	isMobileFunc();

      //페이징관련 변수
	  $scope.totalItems = self.lineList; 										//뿌려줄 데이터 갯수
	  $scope.currentPage =-1;													//현재페이지넘버
	  $scope.maxSize = 7;														//한 페이지당 보여줄 데이터 갯수
      $scope.startNum = $scope.currentPage*$scope.maxSize						//현재페이지에서 보여줄 데이터의 시작 인덱스
      $scope.endNum = $scope.currentPage*$scope.maxSize + $scope.maxSize -1		//현재페이지에서 보여줄 데이터의 마지막 인덱스
      $scope.totalPage =4;														//보여줄 총 페이지 갯수 
	 
      $scope.minPage = minPage;     //이전버튼 클릭 이벤트
      $scope.plusPage = plusPage;   //다음버튼 클릭 이벤트
  		
      if(workerList.worker2.data)
/*      var worker2Data = workerList.worker2.data;
      worker2Data = workerList.worker2.data*/
      
  	//워커 스타트
  	workerList.workerStart(workerList.worker2, "worker.js");
    //워커 온메세지
  	workerList.workerOnmessage(workerList.worker2, getData);
      /*workerList.workerOnmessage(workerList.worker2, function(){console.log('onmessage')});*/
  	// 워커에게서 메세지를 받을때마다 페이지 전환
  	var SettingTime = workerList.worker2.data 
  	for(var i =0; i < SettingTime.length; i++){
		console.log(SettingTime[i]);
		if('/'+ SettingTime[i].pageNm== $location.url()){
			var thisDataTime= SettingTime[i].dataTime * 1000
			console.log(thisDataTime)
			break;
		}
	}
  	function pageChange(){
  		
  		if($scope.currentPage >= $scope.totalPage-1 ){
  			$scope.currentPage = 0	//첫페이지로 이동
  			self.goalttl =0;
  	    	self.countttl = 0;
  	    	self.ratettl= 0;
  	    	self.defectttl = 0;
  	    	self.ppmttl = 0;
  			
  		}else{
  			plusPage();
  			
  		}

  	}
  	
    function minPage(){	//이전페이지 이동
    	
    	$scope.currentPage=$scope.currentPage-1;
    		self.goalttl =0;
	    	self.countttl = 0;
	    	self.ratettl= 0;
	    	self.defectttl = 0;
	    	self.ppmttl = 0;
			
         
    }
    function plusPage(){	//다음페이지 이동
    	$scope.currentPage=$scope.currentPage+1;
    	self.goalttl =0;
    	self.countttl = 0;
    	self.ratettl= 0;
    	self.defectttl = 0;
    	self.ppmttl = 0;
		
    	console.log("plusPage",$scope.currentPage);
    	
         
    }
 
    
    function getLineList(){
	    var promise = CmmAjaxService.select("bas/selectFmbLine.do", self.lineParamVo);
	    promise.then(function(data){
	    	self.lineList = data;
	    
	    	console.log(data)
	     }
	    ,function(data){
	    	console.log('fail: '+ data)
	    });
    }
    function getFactList(){
	    var promise = CmmAjaxService.select("bas/selectFmbFact.do");
	    promise.then(function(data){
	    	self.factList = data;
	    	console.log(data)
	    	console.log(self.factList)
	     }
	    ,function(data){
	    	console.log('fail: '+ data)
	    });
    }
    
    getData();
    
	// 모바일 체크 함수 정의
	function isMobileFunc(){
		var UserAgent = navigator.userAgent;

		if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null)
		{
			$scope.isMobile = true;
		}else{
			$scope.isMobile =  false;
		}
	}
	
      
      
      function getData(){
    	  getLineList();
    	  getFactList();

    	$interval(pageChange(), thisDataTime/4); 

      }
}]);

