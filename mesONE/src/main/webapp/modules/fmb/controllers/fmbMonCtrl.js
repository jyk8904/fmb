/**  
 * @Class Name : fmbMonCtrl.js
 * @Description : fmbMon
 * @Modification Information  
 * @ 설비 모니터링 화면
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
	if(newVal == false){//loginChk가 false인경우 로그아웃
		console.log("loginChkWatch")
		$location.url('');
		}    	
	}, true);

    							    
    var self = this;
    var workerList = CmmWorkerSrvc;
    $scope.isMobile = false;
  //워커3(알람정보워커)가 없을경우 start
    //$scope.Worker3Start()
    //설비parameter
    self.eqptParamVo = {};
    //self.eqptParamVo.factId = CmmFactSrvc.getSelectedFactId() ;
    self.eqptParamVo.factId = 'Comb';
    self.eqptParamVo.eqptType= 'PLC';
    self.eqptParamVo.id ='';
    self.eqptParamVo.eqptCnm ='';
    	
    //안돈설비 param
    self.andonEqptParamVo = { factId : 'Comb'
    						, eqptType: 'ANDON'
    						, id 		: ''
    						, eqptCnm : ''
    		
    }
    
  // $scope.Worker3Start()
   


    //plc parameter
	self.plcParamVo={};
	self.plcParamVo.plcId ='';
	self.plcParamVo.factId ='';
	//self.plcParamVo.factId = CmmFactSrvc.getSelectedFactId() ;
	
	self.stsData = [];
	self.andonStsData = [];
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


    getBgImageList();      
   	getData();
   	dataChk();
   	
   	
    $scope.hover=[];
    $scope.hoverIn = function(index){
   	 $scope.hover[index] = true;
    }
    $scope.hoverOut = function(index){
   	 $scope.hover[index] = false;
    }
	function dataChk(){ //function(getplcList, getEqptList, bindData) 순서제어
	   	    if(self.preplcList==undefined || self.preeqptList==undefined||self.preAndonEqptList==undefined){//모든 데이터를 읽지 못했을경우
	   	    	$timeout(function(){
/*		   	    	console.log(self.plcList==undefined, self.plcList)
				   	console.log(self.eqptList==undefined, self.eqptList)*/
	   	    	}, 100)
	   	    	.then(function(){
	   	    		dataChk();
	   	    	});
			 
	   		}else{ 													//모든 데이터를 읽어들인 경우
	   			bindData();
	   			andonBindData();
	   		}
	   	}
    
    // 모바일 체크 함수 정의
	function isMobileFunc(){
		var UserAgent = navigator.userAgent;

		if (UserAgent.match(/iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null)
		{
			$scope.isMobile = true;
		}else{
			$scope.isMobile =  false;
		}
		//console.log($scope.isMobile)
		//console.log( navigator.userAgent)
	}
	
	function getSelectedPlc(){
		var promise = CmmAjaxService.select("/fmb/bas/selectFmbPlc.do", self.plcSelectedVo);
        promise.then(function(data){
        	self.plc = data;//fmbPlcVo가 담긴 리스트 형태리턴
        }
        ,function(data){
        	/*alert('fail: '+ data)*/
    		console.log('fail'+data);
        });
    	
    	 self.showModal = !self.showModal;
    };
    
    function getBgImageList() {

        var bgImagePromise = CmmAjaxService.select("/fmb/bas/selectFmbBgImage.do", self.BgList);
        bgImagePromise.then(function (data) {
            self.bgImageList = data;

            for (var i = 0; i < self.bgImageList.length; i++) {
                var factId = self.bgImageList[i].factId;

                if (factId == "A") {
                    $scope.eachBg.A = self.bgImageList[i].imgPath;
                } else if (factId == "B") {
                    $scope.eachBg.B = self.bgImageList[i].imgPath;
                } else if (factId == "C") {
                    $scope.eachBg.C = self.bgImageList[i].imgPath;
                } else if (factId == "Comb") {
                    $scope.eachBg.Comb = self.bgImageList[i].imgPath;
                }

            }
        }, function (data) {
        	/*alert('fail: '+ data)*/
    		console.log('fail'+data);
        });
    }

	//워커 스타트
	workerList.workerStart(workerList.worker2, "worker.js");
	//워커 온메세진
	workerList.workerOnmessage(workerList.worker2, function(){getData(); dataChk();} );
	  
	
    // 팝업 테스트용 코드입니다....
    
    var customFullscreen = false;
    
    $scope.cancel = function() {
    	$mdDialog.cancel();
    };
    $scope.hide = function() {
    	$mdDialog.hide();
    };
     
    //팝업클릭
    $scope.showAdvanced = function(id,ev) {
    	//PlC 데이터 저장 하는 부분.
    	CmmFactSrvc.setPlcData(id);
    	//console.log(CmmFactSrvc.getPlcData());
    	//CmmFactSrvc.setPlcData(ev);
    	
        $mdDialog.show({
          controller: 'DialogCtrl',
          controllerAs: 'vm',
          templateUrl: '/fmb/modules/fmb/views/dialog1.tmpl.html',
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
	
	
    //설비 이미지리스트 가져오기 메소드
    function getEqptList(){
	    	var eqptPromise = CmmAjaxService.select("/fmb/bas/selectFmbEqpt.do", self.eqptParamVo);
	    	eqptPromise.then(function(data) {
	    		self.preeqptList = data; //fmbEqptVo가 담긴 리스트 형태리턴
	    		
	    		self.eqptList = self.preeqptList; 
	    		//bindData();
	    	}, function(data){
	    		/*alert('fail: '+ data)*/
	    		console.log('fail'+data);
	    	});
    }
    function bindData(){
    	//console.log("bindData")
		for(var i =0; i < self.eqptList.length; i++){
			var target = $filter('filter')(self.plcList, {plcId : self.eqptList[i].id});
			self.stsData[i]= target[0];
		}
	};
	
    function getAndonList(){
    	var eqptPromise = CmmAjaxService.select("/fmb/bas/selectFmbEqpt.do", self.andonEqptParamVo);
    	eqptPromise.then(function(data) {
    		self.preAndonEqptList = data; //fmbEqptVo가 담긴 리스트 형태리턴
    		self.andonEqptList = self.preAndonEqptList; 
    		//bindData();
    	}, function(data){
    		/*alert('fail: '+ data)*/
    		console.log('fail'+data);
    	});
}

    function andonBindData(){
    	//console.log("andonBindData")
		for(var i =0; i < self.andonEqptList.length; i++){
			var target = $filter('filter')(self.plcList, {plcId : self.andonEqptList[i].id});
			self.andonStsData[i] = target[0];
		}
	};
    

    
	
	//설비 plc 데이터 가져오기
	function getPlcList(){
   		var plcPromise = CmmAjaxService.select("/fmb/bas/selectFmbPlc.do", self.plcParamVo);
       	plcPromise.then(function(data) {
       		// 설비상태 카운트 변수
       		self.count1=0;
       		self.count2=0;
       		self.count4=0;
       		       		
       		/* //랜덤값 입력
       		for(var i = 0; i< data.length; i++){
           		var random = Math.floor(Math.random()*3);
           		if(random==0){
           			self.count0++;
           			random = 4;
           		}else if(random==1){
           			self.count1++;
           		}else if(random==2){
           			self.count2++;
           		}
           		data[i].eqptSts = random;
       		}*/
       		for(var i=0; i< data.length; i++){
       			if(data[i].plcId.split('_')[0]=="MPLC"){
       				if(data[i].eqptSts ==0 ||data[i].eqptSts ==4){		//알람 카운트
           				self.count4++;
           			}else if(data[i].eqptSts ==1){	//가동 카운트
           				self.count1++;
           			}else if(data[i].eqptSts ==2){	//대기 카운트
           				self.count2++;
           			}
       			}
       		}
       		$scope.plcList = data;
       		
       		//데이터를 가져오는동안 깜빡임 방지
       		self.preplcList = data; 
       		self.plcList = self.preplcList;
       		
       	}, function(data){
       		/*alert('fail: '+ data)*/
    		console.log('fail'+data);
       });
	}
	
	function getData(){
		self.preplcList = undefined;
		self.preeqptList = undefined;
		self.preAndonEqptList = undefined;
		
		getEqptList();
		getAndonList();	
   		getPlcList();
	} 	
    	
}]);

