/**  
 * @Class Name : fmbProdCtrl.js
 * @Description : fmbProd
 * @Modification Information  
 * @
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
    		 , ['CmmAjaxService','CmmModalSrvc','CmmWorkerSrvc','$http','$scope','$window','$q','$location', '$filter'
     , function (CmmAjaxService , CmmModalSrvc , CmmWorkerSrvc , $http , $scope , $window , $q , $location, $filter)
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
    
    // 모바일 체크 함수 실행
	isMobileFunc();
	

    self.data = [{"lineName":"PL6 OTR", "plan":51000, "prod":46972, "archive":92, "bad":2, "ppm":43},
    			{"lineName":"L7 OTR", "plan":85000, "prod":82988, "archive":98, "bad":2, "ppm":24},
    			{"lineName":"UKL OTR", "plan":132460,"prod":133227, "archive":101, "bad":3, "ppm":23},
    			{"lineName":"CD4 OTR", "plan":47600, "prod":43776, "archive":92, "bad":2, "ppm":46},
    			{"lineName":"PL6 OTR", "plan":51000, "prod":46972, "archive":92, "bad":2, "ppm":43},
    			{"lineName":"L7 OTR", "plan":85000, "prod":82988, "archive":98, "bad":2, "ppm":24},
    			{"lineName":"UKL OTR", "plan":132460,"prod":133227, "archive":101, "bad":3, "ppm":23},
    			{"lineName":"CD4 OTR", "plan":47600, "prod":43776, "archive":92, "bad":2, "ppm":46},
    			{"lineName":"PL6 OTR", "plan":51000, "prod":46972, "archive":92, "bad":2, "ppm":43},
    			{"lineName":"L7 OTR", "plan":85000, "prod":82988, "archive":98, "bad":2, "ppm":24},
    			{"lineName":"UKL OTR", "plan":132460,"prod":133227, "archive":101, "bad":3, "ppm":23},
    			{"lineName":"CD4 OTR", "plan":47600, "prod":43776, "archive":92, "bad":2, "ppm":46},
    			{"lineName":"PL6 OTR", "plan":51000, "prod":46972, "archive":92, "bad":2, "ppm":43},
    			{"lineName":"L7 OTR", "plan":85000, "prod":82988, "archive":98, "bad":2, "ppm":24},
    			{"lineName":"UKL OTR", "plan":132460,"prod":133227, "archive":101, "bad":3, "ppm":23},
    			{"lineName":"CD4 OTR", "plan":47600, "prod":43776, "archive":92, "bad":2, "ppm":46}
    			]
    
    	//페이징관련 변수
	  $scope.totalItems = self.data.length; 									//뿌려줄 데이터 갯수
	  $scope.currentPage = 0;													//현재페이지넘버
	  $scope.maxSize = 5;														//한 페이지당 보여줄 데이터 갯수
      $scope.startNum = $scope.currentPage*$scope.maxSize						//현재페이지에서 보여줄 데이터의 시작 인덱스
      $scope.endNum = $scope.currentPage*$scope.maxSize + $scope.maxSize -1		//현재페이지에서 보여줄 데이터의 마지막 인덱스
      $scope.totalPage = Math.ceil($scope.totalItems/$scope.maxSize)			//보여줄 총 페이지 갯수 
	 
      $scope.planttl =0;
      $scope.prodttl = 0;
      $scope.archivettl= 0;
      $scope.archivenum = 0;
      $scope.badttl = 0;
      $scope.ppmdttl = 0;
      
      $scope.minPage = minPage;
      $scope.plusPage = plusPage;

      if(workerList.worker2.data)
/*      var worker2Data = workerList.worker2.data;
      worker2Data = workerList.worker2.data*/
      
  	//워커 스타트
  	workerList.workerStart(workerList.worker2, "worker.js");

  	workerList.workerOnmessage(workerList.worker2, pageChange);
  	   
  	
  	
  	function pageChange(){
  		
  		if($scope.currentPage >= $scope.totalPage-1 ){
  			$scope.currentPage = 0
  			self.planttl =0;
  	    	self.prodttl = 0;
  	    	self.archivettl= 0;
  	    	self.archivenum = 0;
  	    	self.badttl = 0;
  	    	self.ppmdttl = 0;
  			
  		}else{
  			plusPage();
  		}
  		$scope.$apply();
  	}
  	
    function minPage(){
    	$scope.currentPage=$scope.currentPage-1;
    	 self.planttl =0;
    	 self.prodttl = 0;
    	 self.archivettl= 0;
    	 self.archivenum = 0;
    	 self.badttl = 0;
    	 self.ppmdttl = 0;
         
    }
    function plusPage(){
    	$scope.currentPage=$scope.currentPage+1;
    	self.planttl =0;
    	self.prodttl = 0;
    	self.archivettl= 0;
    	self.archivenum = 0;
    	self.badttl = 0;
    	self.ppmdttl = 0;
    	console.log("plusPage",$scope.currentPage)
    	
         
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
    	  /*  var promise = CmmAjaxService.select("/mes/bas/selectFmbLine.do", self.lineParamVo);
    	    promise.then(function(data){
    	    	self.data = data;*/
    	    	var length = self.data.length;
    	    	var dangle = length % 7;
    	    	if (dangle != 0) 
    	    	{
    	    		var blankCount = 7- dangle;
    	    		for (var i = 0; i < blankCount; i++)
    	    		{
    	    			var data = {"lineName":'', "plan":'', "prod":'', "achive":'', "bad":'', "ppm":''}
    	    			
    	    			self.data.push(data);
    	    		}
    	    	}
    	  /*  }
    	    ,function(data){
    	    	alert('fail: '+ data)
    	    });*/
    	    	
    	    	

    	       
    	    }
}]);

