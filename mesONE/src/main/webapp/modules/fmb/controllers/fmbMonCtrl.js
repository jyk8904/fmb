/**  
 * @Class Name : fmbCh006Ctrl.js
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
    .controller('FmbMonCtrl', [   'CmmAjaxService'
    							, 'CmmModalSrvc'
    							, 'CmmWorkerSrvc'
    							, '$rootScope'
    						    , 'CmmFactSrvc'
    							, '$http'
    							, '$scope'
    							, '$window'
    							, '$q'
    							, '$filter'
    							, '$location'
    							, '$mdDialog'
    							, '$timeout'
    							, function (
    									  CmmAjaxService
    									, CmmModalSrvc
    									, CmmWorkerSrvc
    									, $rootScope
    								    , CmmFactSrvc
    									, $http
    									, $scope
    									, $window
    									, $q
    									, $filter
    									, $location
    									, $mdDialog
    									, $timeout
    									) 
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
    
    //설비parameter
    self.eqptParamVo = {};
    //elf.eqptParamVo.factId = CmmFactSrvc.getSelectedFactId() ;
    self.eqptParamVo.factId = 'B';
    self.eqptParamVo.plcId = '';
    self.eqptParamVo.eqptCnm ='';
    	
	//plc parameter
	self.plcParamVo={};
	self.plcParamVo.plcId ='';
	self.plcParamVo.factId ='B';
	//self.plcParamVo.factId = CmmFactSrvc.getSelectedFactId() ;
	
	self.stsData = {};
	self.BgList = {
	    factId: 'B'
	};
	$scope.eachBg = {
	    A: ''
	 	, B: ''
	 	, C: ''
	 	, Comd: ''
	};
	
    self.showModal = false;
	    
    self.toggleModal = function(pid){
    	self.plcSelectedVo = {plcId: pid,
					    		  factId: ''
					    		  } 
    	//선택된 plc 데이터 가져오기
    	getSelectedPlc();
    
    	}
    
	// 모바일 체크 함수 실행
	isMobileFunc();

    AmCharts.makeChart("eqptStsHisChart",{
		"type": "serial",
		"categoryField": "date",
		"dataDateFormat": "YYYY-MM-DD",
		"categoryAxis": {
			"parseDates": true
		},
		"chartCursor": {
			"enabled": true
		},
		"chartScrollbar": {
			"enabled": true
		},
		"trendLines": [],
		"graphs": [
			{
				"bullet": "round",
				"id": "AmGraph-1",
				"title": "graph 1",
				"valueField": "column-1"
			},
			{
				"bullet": "square",
				"id": "AmGraph-2",
				"title": "graph 2",
				"valueField": "column-2"
			}
		],
		"guides": [],
		"valueAxes": [
			{
				"id": "ValueAxis-1",
				"title": "Axis title"
			}
		],
		"allLabels": [],
		"balloon": {},
		"legend": {
			"enabled": true,
			"useGraphSettings": true
		},
		"titles": [
			{
				"id": "Title-1",
				"size": 15,
				"text": "Chart Title"
			}
		],
		"dataProvider": [
			{
				"date": "2014-03-01",
				"column-1": 8,
				"column-2": 5
			},
			{
				"date": "2014-03-02",
				"column-1": 6,
				"column-2": 7
			},
			{
				"date": "2014-03-03",
				"column-1": 2,
				"column-2": 3
			},
			{
				"date": "2014-03-04",
				"column-1": 1,
				"column-2": 3
			},
			{
				"date": "2014-03-05",
				"column-1": 2,
				"column-2": 1
			},
			{
				"date": "2014-03-06",
				"column-1": 3,
				"column-2": 2
			},
			{
				"date": "2014-03-07",
				"column-1": 6,
				"column-2": 8
			}
		]
	}
);


    getBgImageList();      
    // 비동기실행에 따른 이벤트 순서 제어 
    $timeout(getPlcList(), 50)
    		.then(function(){//getPlcList 수행 완료 후 
    			console.log("getPlcList 실행");
    			$timeout(getEqptList(),600)
    				.then(function(){//getEqptList 수행 완료 후 
    				//bindData();
    				console.log('getEqptList 실행');

    			}, function(){//getEqptList 수행 실패 후 
    				console.log('getEqptList 실패')
    			});
    		}, function(){//getPlcList 수행 실패 후 
    			console.log('getPlcList data loading 실패');
    			}
    		);
    
    // 모바일 체크 함수 정의
	function isMobileFunc(){
		var UserAgent = navigator.userAgent;

		if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null)
		{
			$scope.isMobile = true;
		}else{
			$scope.isMobile =  false;
		}
		console.log($scope.isMobile)
	}
	
	function getSelectedPlc(){
		
		var promise = CmmAjaxService.select("/mes/bas/selectFmbPlc.do", self.plcSelectedVo);
        promise.then(function(data){
        	self.plc = data;//fmbPlcVo가 담긴 리스트 형태리턴
        }
        ,function(data){
        	alert('fail: '+ data)
        });
    	
    	 self.showModal = !self.showModal;
    };
    
    function getBgImageList() {

        var bgImagePromise = CmmAjaxService.select("/mes/bas/selectFmbBgImage.do", self.BgList);
        bgImagePromise.then(function (data) {
            self.bgImageList = data;

            for (var i = 0; i < self.bgImageList.length; i++) {
                var factId = self.bgImageList[i].factId;

                if (factId == "A") {
                    console.log($scope.eachBg.A)
                    $scope.eachBg.A = self.bgImageList[i].imgPath;
                    console.log($scope.eachBg.A)
                } else if (factId == "B") {
                    $scope.eachBg.B = self.bgImageList[i].imgPath;
                } else if (factId == "C") {
                    $scope.eachBg.C = self.bgImageList[i].imgPath;
                } else if (factId == "Comb") {
                    $scope.eachBg.Comb = self.bgImageList[i].imgPath;
                }

            }
        }, function (data) {
            alert('fail:' + data)
        });
    }

	//워커 스타트
	workerList.workerStart(workerList.worker2, "worker2.js", getData);
  //설비 이미지리스트 가져오기
    
	
    // 팝업 테스트용 코드입니다....
    
    var customFullscreen = false;
    
    $scope.cancel = function() {
    	$mdDialog.hide();
    };
    
    $scope.showAdvanced = function(ev) {
    	
    	CmmFactSrvc.setPlcData(ev);
    	console.log(CmmFactSrvc.getPlcData());
    	//PlC 데이터 저장 하는 부분.
    	//CmmFactSrvc.setPlcData(ev);
    	
        $mdDialog.show({
          controller: 'DialogCtrl',
          controllerAs: 'vm',
          templateUrl: '/mes/modules/fmb/views/dialog1.tmpl.html',
          parent: angular.element(document.body),
          isolateScope: false,
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    };
	
	
    function getEqptList(){
	    	//설비 이미지리스트 가져오기 메소드
	    	var eqptPromise = CmmAjaxService.select("/mes/bas/selectFmbEqpt.do", self.eqptParamVo);
	    	eqptPromise.then(function(data) {
	    		self.eqptList = data; //fmbEqptVo가 담긴 리스트 형태리턴
	    		aaa();
	    		
	    	}, function(data){
	    		alert('fail: '+ data)
	    	});
    }
    
    function aaa(){
		for(var i =0; i < self.eqptList.length; i++){
			var target = $filter('filter')(self.plcList, {plcId : self.eqptList[i].plcId});
			self.stsData[i]= target[0].eqptSts;
		}
		//console.log(self.stsData[0])
	};
    
		function getPlcList(){
   		//설비 plc 데이터 가져오기
   	   		var plcPromise = CmmAjaxService.select("/mes/bas/selectFmbPlc.do", self.plcParamVo);
           	plcPromise.then(function(data) {
           		//랜덤값 입력
           		for(var i = 0; i< data.length; i++){
               		var random = Math.floor(Math.random()*3);
               		if(random==0){
               			random = 4;
               		}
               		data[i].eqptSts = random;
           		}
           		$scope.plcList = data;
           		self.plcList = data; //fmbplcVo가 담긴 리스트 형태리턴
           		
           	}, function(data){
           		alert('fail: '+ data)
           });
   		}
		
		function getData(){
			getEqptList();
	   		getPlcList();
		} 		

		
    	
}]);

