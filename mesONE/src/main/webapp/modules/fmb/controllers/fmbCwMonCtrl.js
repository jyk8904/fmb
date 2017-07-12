/**  
 * @Class Name : fmbCwMonCtrl.js
 * @Description : fmbCwMon
 * @Modification Information  
 * @
 * @ 작업일       작성자      내용
 * @ ----------  ---------  -------------------------------
 * @ 2017.06.29  정유경    최초생성
 * @ 
 * 
 */

'use strict';

angular
    .module('app')
    .controller('FmbCwMonCtrl', [ 'CmmAjaxService'
    							, 'CmmModalSrvc'
    							, 'CmmWorkerSrvc'
    							, 'CmmFactSrvc'
    							, '$rootScope'
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
    									, CmmFactSrvc
    									, $rootScope
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
    var self = this;
    var workerList = CmmWorkerSrvc;
    console.log(workerList);
    //설비parameter
    self.eqptParamVo = {};
    self.eqptParamVo.factId = 'Comb';
    self.eqptParamVo.plcId = '';
    self.eqptParamVo.eqptCnm ='';
    	
	//plc parameter
	self.plcParamVo={};
	self.plcParamVo.plcId ='';
	self.plcParamVo.factId ='';
	
	self.stsData = {};
	
    self.showModal = false;
	    
    self.toggleModal = function(pid){
    	self.plcSelectedVo = {plcId: pid,
					    		  factId: ''
					    		  } 
    	//선택된 plc 데이터 가져오기
    	getSelectedPlc();
        
    }
    
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
   
	
    
    function getPlcList(){
   		//설비 plc 데이터 가져오기
   	   		var plcPromise = CmmAjaxService.select("/mes/bas/selectFmbPlc.do", self.plcParamVo);
           	plcPromise.then(function(data) {
           		//랜덤값 입력
           			for(var i = 0; i< data.length; i++){
               		var random = Math.floor(Math.random()*5);
               		data[i].eqptSts = random;
           			}
           			self.plcList = data; 
           			//fmbplcVo가 담긴 리스트 형태리턴
           		
           	}, function(data){
           		alert('fail: '+ data)
           });
   		}

    function getEqptList(){
	    	//설비 이미지리스트 가져오기 메소드
	    	var eqptPromise = CmmAjaxService.select("/mes/bas/selectFmbEqpt.do", self.eqptParamVo);
	    	eqptPromise.then(function(data) {
	    		$timeout(self.eqptList = data, 200)
	    		.then(function(){
	    			bindData();
	    		});
	    	}, function(data){
	    		alert('fail: '+ data)
	    	});
	}

	function bindData(){
		for(var i =0; i < self.eqptList.length; i++){
			var target = $filter('filter')(self.plcList, {plcId : self.eqptList[i].plcId});
			//console.log(self.seqptList[i].plcId);
			self.stsData[i]= target[0].eqptSts;
		}
	};
	    
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

    function aaa(){
    	getEqptList();
   		getPlcList();
     }  
    
    	//워커 스타트
    	workerList.workerStart(workerList.worker2, "worker2.js", aaa);
	
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
}]);

