/**  
 * @Class Name : fmbModeCtrl.js
 * @Description : fmbMode 
 * @Modification Information  
 * @ 개발모드
 * @ 작업일       작성자      내용
 * @ ----------  ---------  -------------------------------
 * @ 2017.05.29  정유경       최초생성
 * @ 2017.06.19  jy CHO     수정
 * 
 */

'use strict';

angular
    .module('app')
    .controller('FmbModeCtrl', ['CmmAjaxService','CmmWorkerSrvc','CmmFactSrvc', '$http', '$scope','$mdSidenav', '$filter','$window','$mdDialog', '$timeout','$rootScope','$location', function (CmmAjaxService, CmmWorkerSrvc, CmmFactSrvc, $http, $scope, $mdSidenav, $filter, $window, $mdDialog, $timeout, $rootScope, $location) 
{
/*----------------------------------------------------------------
*  변수 선언
* ----------------------------------------------------------------
*  @ 설명
*  
*---------------------------------------------------------------*/
    
     var self = this;
     $scope.buttons = [
    	 {'name':'Yellow25', 'value':'assets/img/button/Yellow25.png'},
    	 {'name':'Blue25', 'value': 'assets/img/button/Blue25.png'},
    	 {'name':'Red25', 'value' : 'assets/img/button/Red25.png'},
    	 {'name':'GreenQ', 'value' : 'assets/img/button/GreenQ.png'},
    	 {'name':'직접입력', 'value': ''}
    	 ]
     $rootScope.showBar = $location.url();
     $scope.hover=[];
     $scope.hoverIn = function(index){
    	 $scope.hover[index] = true;
    	 
     }
     $scope.hoverOut = function(index){
    	 $scope.hover[index] = false;
     }
     $scope.sensRating = 1;
     $scope.sensRating1 = 1;
     var workerList = CmmWorkerSrvc;
     if(workerList.worker.worker!=undefined){
    	 	workerList.worker.worker.terminate();
    	 	workerList.worker.worker=undefined; 
    	 	workerList.worker.sts = "off";
	   }
/*     if(workerList.worker3.worker!=undefined){
 	 	workerList.worker3.worker.terminate();
 	 	workerList.worker3.worker=undefined; 
	   }*/
     self.showModal = false;
     self.selected = {};
     self.pointer = {
    		  /*display : 'none'*/
    		  display : false
     		, top : '0px'
     		, left : '0px'
     };
     $scope.plctext = {};
     $scope.crtEqpt = {};
     
     self.configSetting = {
    		 index : null
     };
     
     //설비parameter
     self.eqptParamVo = {
    		  factId: 'Comb'		//전체
		   	, eqptType: 'PLC'
		   	, id : ''
		   	, eqptCnm: ''
     };

 	//plc parameter
 	self.plcParamVo = {
 			  plcId: ''
 			, factId: 'Comb'
 	};
 	//spc parameter
 	self.spcParamVo = {
 			  plcId: ''
 		 	, factId: 'Comb'	
 			//spc 프로시저 완성후 수정
 	}
 	//andon parameter
 	self.andonParamVo = {
 			 plcId: ''
		   , factId: 'Comb'	 			
 			//andon 프로시저 완성후 수정
 	}
 	//count parameter
 	self.countParamVo = {
 			factId : '',
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
 	
 	$scope.crtEqtp = {
		 	  cnm  : ''
			, type : ''
			, id : ''
			, factId : ''
 	}
    self.BgList = {
    		   factId: '' 
    };
    $scope.eachBg = {
          A : ''
    	, B : ''
    	, C : ''
    	, Comd : ''
    };
 	self.opacityData = 100;
 	
/*----------------------------------------------------------------
*  함수 실행
* ---------------------------------------------------------------- 
*  @ 설명
*  brbr - brbrbrbr~~
*  brbr - brbrbr~~~~
*---------------------------------------------------------------*/ 	
 	
 	getBgImageList();
 	
 	
 	
/*----------------------------------------------------------------
*  이벤트 함수 맵핑
* ---------------------------------------------------------------- 
*  @ 설명
*  brbr - brbrbrbr~~
*  brbr - brbrbr~~~~
*---------------------------------------------------------------*/ 	
 	
    self.changeFact = changeFact;
    self.changeType = changeType;
    self.deleteDiv = function (index) {
    	//console.log(index)
    	self.eqptList[index].status = "delete";
    	//console.log(self.eqptList[index].status)
       	//console.log(self.eqptList)	
    }

    self.toggleLeft = buildToggler('left');

    $scope.$watch('vm.eqptList', function(newVal, oldVal) {
    	if (newVal != null && oldVal != null && newVal.length == oldVal.length)
    	{
	    	if(newVal.length > 0 && oldVal.length > 0) {
		    	newVal.forEach(function (obj, i) {
		    		
		    		Object.keys(obj).forEach(function(f){
		    			
		    			if (f != '$$hashKey') {
		    				
			    			var detNewVal = obj[f];
			    			var detOldVal = oldVal[i][f];
			    			
			    		
			    			if (detNewVal !== detOldVal) {
			    				var updateIndex = i;
			    				if (self.eqptList[i].status == 'keep') {
			    					self.eqptList[i].status = 'update';
			    				}
			    				if ($mdSidenav('left').isOpen()) {
				    				self.setSelectedData(i);	    					
			    				}
			    			}
		    			}
		    		});
		    	});
	    	}
    	}
    
    }, true);

    self.crtEqptModal = function(){
    	if(self.eqptParamVo.eqptType=="PLC"){
    		var classList = $filter('orderBy')(self.eqptList,'eqptCnm');
        	if (classList.length == 0) {
        		$scope.crtEqpt.cnm = 'plc001';
        	}
        	else 
        	{
    	    	var latestNum = classList[classList.length - 1].eqptCnm.split('plc')[1];
    	    	
    	    	$scope.crtEqpt.cnm = 'plc' + leadingZeros(parseInt(latestNum) + 1, 3);
        	}
        	   
    	  	  var tmp={}, res=[];
    		  for(var i=0;i<self.plcList.length;i++) tmp[self.plcList[i].plcId]=1;
    		  for(var i=0;i<self.eqptList.length;i++) { if(tmp[self.eqptList[i].id]) delete tmp[self.eqptList[i].id]; }
    		  for(var k in tmp) res.push(k);
    		 // console.log(res);
    		  self.plcLst = res;
    		  //console.log(self.plcLst);
        	
        	
    	}else if(self.eqptParamVo.eqptType=="SPC"){
    		var classList = $filter('orderBy')(self.eqptList,'eqptCnm');
        	if (classList.length == 0) {
        		$scope.crtEqpt.cnm = 'spc001';
        	}
        	else 
        	{
    	    	var latestNum = classList[classList.length - 1].eqptCnm.split('spc')[1];
    	    	
    	    	$scope.crtEqpt.cnm = 'spc' + leadingZeros(parseInt(latestNum) + 1, 3);
        	}
        	   
    	  	  var tmp={}, res=[];
    		  for(var i=0;i<self.spcList.length;i++) tmp[self.spcList[i].plcId]=1;
    		  for(var i=0;i<self.eqptList.length;i++) { if(tmp[self.eqptList[i].id]) delete tmp[self.eqptList[i].id]; }
    		  for(var k in tmp) res.push(k);
    		  //console.log(res);
    		  self.spcLst = res;
    		  //console.log(self.spcLst);
    		
    	}else if(self.eqptParamVo.eqptType=="ANDON"){
    		var classList = $filter('orderBy')(self.eqptList,'eqptCnm');
    		console.log(self.eqptList)
        	if (classList.length == 0) {
        		$scope.crtEqpt.cnm = 'andon001';
        	}
        	else 
        	{
    	    	var latestNum = classList[classList.length - 1].eqptCnm.split('andon')[1];
    	    	
    	    	$scope.crtEqpt.cnm = 'andon' + leadingZeros(parseInt(latestNum) + 1, 3);
        	}
        	   
    	  	  var tmp={}, res=[];
    		  for(var i=0;i<self.andonList.length;i++) tmp[self.andonList[i].plcId]=1;
    		  for(var i=0;i<self.eqptList.length;i++) { if(tmp[self.eqptList[i].id]) delete tmp[self.eqptList[i].id];}
    		  for(var k in tmp) res.push(k);
    		  //console.log(res);
    		  self.andonLst = res;
    		  //console.log(self.eqptList);
 
    		
    	}else if(self.eqptParamVo.eqptType=="COUNT"){
    		var classList = $filter('orderBy')(self.eqptList,'eqptCnm');
        	if (classList.length == 0) {
        		$scope.crtEqpt.cnm = 'count001';
        	}
        	else 
        	{
    	    	var latestNum = classList[classList.length - 1].eqptCnm.split('count')[1];
    	    	
    	    	$scope.crtEqpt.cnm = 'count' + leadingZeros(parseInt(latestNum) + 1, 3);
        	}
        	   
    	  	  var tmp={}, res=[];
    	  		  for(var i=0;i<self.countList.length;i++) tmp[self.countList[i].lineCd]=1;
    	  	  if(self.eqptList!=null){
    	  		  for(var i=0;i<self.eqptList.length;i++) { if(tmp[self.eqptList[i].id]) delete tmp[self.eqptList[i].id]; }
    	  	  }
    		  for(var k in tmp) res.push(k);
    		 // console.log(res);
    		  self.countLst = res;
    		 console.log(self.countLst);
    	}
    	
    	self.showModal = !self.showModal;
    };
    
    
    self.sensChange = function(sensRating){
    	$scope.sensRating1 = sensRating;
    }


    function leadingZeros(n, digits) {
    	var zero = '';
    	n = n.toString();
    	
    	if (n.length < digits) {
    		for (var i = 0; i < digits - n.length; i++)
    			zero += '0';
    	}
    	
    	return zero + n;
    }
    
    //설비버튼 생성
    $scope.submit = function(){	
    	var cnm = $scope.crtEqpt.cnm;
    	var type = $scope.crtEqpt.type;
    	var id = $scope.crtEqpt.id;
    	var factId = self.eqptParamVo.factId

    	console.log(self.eqptList)
    	console.log(cnm,type,id,factId)
    	if (cnm != null && cnm != "" && type != null && type != "" && id != null && id != "")
    	{
    		var detect = $filter('filter')(self.eqptList, {id : id , status : '!delete'});
    			if(type=='PLC'){
    				var data = {  eqptCnm : cnm
    						, id : id
    						, eqptType : type
    						, factId : factId
    						, desc : null
    						, cssZindex : 'auto'
							, cssWidth : '25px'
							, cssHeight : '25px'
							, cssTop : '230px'
							, cssLeft : '550px'
							, status : 'insert'
							, stsImg0: 'assets/img/button/color25.png'
							, stsImg1: 'assets/img/button/Green25.png'
							, stsImg2: 'assets/img/button/White25.png'
							, stsImg3: 'assets/img/button/Blue25.png'
							, stsImg4: 'assets/img/button/Red25.png'
    				};
    				
    				
    			}else if(type=='ANDON'){
    				console.log('andon')
    				var data = {  eqptCnm : cnm
    						, id : id
    						, eqptType : type
    						, factId : factId
    						, desc : null
    						, cssZindex : 'auto'
							, cssWidth : '90px'
							, cssHeight : '25px'
							, cssTop : '230px'
							, cssLeft : '550px'
							, status : 'insert'
							, stsImg0: 'assets/img/button/GreenQ.png'
							, stsImg1: 'assets/img/button/RedQ.png'
							, stsImg2: 'assets/img/button/GreenS.png'
							, stsImg3: 'assets/img/button/RedS.png'
							, stsImg4: 'assets/img/button/GreenC.png'
							, stsImg5: 'assets/img/button/RedC.png'
    				};
    			}else if(type=='COUNT'){
    				console.log("count")
    				var data = {  eqptCnm : cnm
    						, id : id
    						, eqptType : type
    						, factId : factId
    						, desc : null
    						, cssZindex : 'auto'
							, cssWidth : '60px'
							, cssHeight : '25px'
							, cssTop : '230px'
							, cssLeft : '550px'
							, status : 'insert'
    				};
    			}
		    	
		    	var check=true;
		    	if(data.id=='None'){
		    		check =false;
		    	}
		    	for(var i=0; i<self.eqptList.length; i++){
			    	if(data.id ==self.eqptList[i].id){
			    	 check = false;
			    	}
		    	}
		    	if(check ==true ){
		    	self.eqptList.push(data);
		    	//console.log(data);
		    	}else{
		    		alert("PLC ID를 확인하세요");
		    	}
    	}
    	else {
    		//console.log(cnm,type,id)
    		alert("모든 칸을 기입해야합니다.");
    	}
    };
    
    
    
    
    
    
    self.saveEqptData = function(){
    	for(var i=0; i< self.eqptList.length; i++){
    		if(self.eqptList[i].eqptType =="PLC"){
    			//console.log("plc저장")
    			var stsImg = self.eqptList[i].stsImg0
    			self.eqptList[i].stsImg1 = stsImg.replace('color', 'Green');
    			self.eqptList[i].stsImg2 = stsImg.replace('color', 'White');
    			self.eqptList[i].stsImg3 = stsImg.replace('color', 'Blue');
    			self.eqptList[i].stsImg4 = stsImg.replace('color', 'Red');
    		}else if(self.eqptList[i].eqptType =="ANDON"){
    			//console.log("andon저장")
    			var stsImg = self.eqptList[i].stsImg0
    			self.eqptList[i].stsImg1 = stsImg.replace('Green', 'Red');
    			self.eqptList[i].stsImg2 = stsImg.replace('Q', 'S');
    			self.eqptList[i].stsImg3 = stsImg.replace('Green', 'Red').replace('Q','S');
    			self.eqptList[i].stsImg4 = stsImg.replace('Q', 'C');
    			self.eqptList[i].stsImg5 = stsImg.replace('Green', 'Red').replace('Q','C');
    		}
    	}	
    	console.log(self.eqptList);
    	 var eqptPromise = CmmAjaxService.save("bas/saveFmbEqpt.do", self.eqptList);
    };
    
    //설비 이미지리스트 가져오기
    function getEqptList(){
    	var eqptPromise = CmmAjaxService.select("bas/selectFmbEqpt.do", self.eqptParamVo);
    	eqptPromise.then(function(data) {
    		//console.log(data)
    		self.eqptList = data; //fmbEqptVo가 담긴 리스트 형태리턴
    		for(var i = 0; i < self.eqptList.length; i++){
    			self.eqptList[i]['status'] = "keep";
    		}
    	}, function(data){
    		console.log(data);
    	//alert('fail: '+ data)
    });    	
    
    }
    
    function getPlcList(){
    	//설비 plc 데이터 가져오기
    	var plcPromise = CmmAjaxService.select("bas/selectFmbPlc.do", self.plcParamVo);
    	plcPromise.then(function(data) {
    		var dataList= [];
    		for(var i=0; i<data.length; i++){
    			if(data[i].plcId.split('_')[0]=="MPLC"){
    				dataList.push(data[i]);
    			}
    		}
    		self.plcList = dataList;
    		//self.plcList = data; //fmbplcVo가 담긴 리스트 형태리턴
    	}, function(data){
    		/*alert('fail: '+ data)*/
    		('fail'+data);
    	});
    }
    function getAndonList(){
    	
    	//설비 Andon 데이터 가져오기   andon프로시저 생성후 수정해야함 
    	var andonPromise = CmmAjaxService.select("bas/selectFmbAndon.do", self.andonParamVo);
    		andonPromise.then(function(data) {
    		self.andonList = data;
    		//console.log(self.andonList)
    	}, function(data){
    		/*alert('fail: '+ data)*/
    		console.log('fail'+data);
    	});
    }
    function getSpcList(){
    	
    	//설비 Spc 데이터 가져오기   프로시저 생성후 수정해야함 
    	var spcPromise = CmmAjaxService.select("bas/selectFmbPlc.do", self.spcParamVo);
    		spcPromise.then(function(data) {
    		self.spcList = data; 
    		//console.log(self.spcList)
    	}, function(data){
    		/*alert('fail: '+ data)*/
    		console.log('fail'+data);
    	});
    }
    function getCountList(){
    	//설비 count 데이터 가져오기    프로시저 생성후 수정해야함 
    	var countPromise = CmmAjaxService.select("bas/selectFmbLine.do",self.countParamVo);
    		countPromise.then(function(data) {
    		self.countList = data; 
    		//console.log(self.countList)
    	}, function(data){
    		/*alert('fail: '+ data)*/
    		console.log('fail'+data);
    	});
    }
    function getBgImageList() {
        
    	var bgImagePromise = CmmAjaxService.select("bas/selectFmbBgImage.do", self.BgList);
    	bgImagePromise.then(function(data) {
    		self.bgImageList = data;
    		
        	for (var i = 0; i < self.bgImageList.length; i++) {
        		var factId = self.bgImageList[i].factId;
        		
        		if (factId == "A") {
        			//console.log($scope.eachBg.A)
        			$scope.eachBg.A = self.bgImageList[i].imgPath;
        			//console.log($scope.eachBg.A)
        		} else if (factId == "B") {
        			$scope.eachBg.B = self.bgImageList[i].imgPath;
        		} else if (factId == "C") {
        			$scope.eachBg.C = self.bgImageList[i].imgPath;
        		} else if (factId == "Comb") {
        			$scope.eachBg.Comb = self.bgImageList[i].imgPath;
        		}
       		
        	}
    	}, function(data) {
    		/*alert('fail: '+ data)*/
    		console.log('fail'+data);
    	});
    }
    
/*----------------------------------------------------------------
*  이벤트 함수 정의
* ----------------------------------------------------------------
* @ 설명
* 
*----------------------------------------------------------------*/
    
     function buildToggler(componentId) {
         return function() {
        	 self.pointer.animateTrigger = 'off';
        	 /*self.pointer.display = 'none';*/
        	 self.pointer.display = false;
        	 self.selected = {};
        	 self.configSetting = {};
        	 $mdSidenav(componentId).toggle();
         };
     }
     
/*     function Fmb007Ctrl ( $scope ) {
    	 $scope.data = {
    			   selectedIndex: 0
    			 , bottom: false
    	 };
    	 $scope.next = function() {
    	      $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2) ;
    	 };
    	 $scope.previous = function() {
    	      $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
    	 };
    }
    */
    //배경이미지 변경하기
  	//설비리스트 다시불러오기
    function changeFact(){
    	getEqptList();
     	getPlcList();
     	getAndonList();
     	getSpcList();
     	getCountList();
     	var factId = self.eqptParamVo.factId;

     	self.plcParamVo.factId= factId ;
     	$scope.crtEqtp.factId = factId;
    }
    
    function changeType(){
    	if(self.eqptParamVo.eqptType=="PLC"){ 			//추후 type별 다른 로직 구성해야함.
    		getEqptList();
         	getPlcList();
    	}else if(self.eqptParamVo.eqptType=="ANDON"){
    		getEqptList();
         	getAndonList();
    		//console.log("ANDON")
    	}else if(self.eqptParamVo.eqptType=="SPC"){
    		getEqptList();
         	getSpcList();
    		//console.log("SPC")
    	}else if(self.eqptParamVo.eqptType=="COUNT"){
    		getEqptList();
         	getCountList();
         	//console.log("COUNT")
    	}
    	
    	var eqptType = self.eqptParamVo.eqptType;
    	self.plcParamVo.eqptType= eqptType;
     	$scope.crtEqtp.type = eqptType;
     	console.log($scope.crtEqtp.type )
     	
    }
    
    
/*----------------------------------------------------------------
*  함수 실행
* ----------------------------------------------------------------
* @ 설명
* 
*----------------------------------------------------------------*/ 
    
    getEqptList();
    getPlcList();
     
    /*------------------------------------------
    *  Config Setting Data
    *-----------------------------------------*/ 
     
     // 선택한 요소에 대한 css 및 기본정보(클래스명, 정의된 타입, Id)값을 불러온다.
     // 탭칸에 요소들을 추가시킴.
     self.setSelectedData = function setSelectedData(index){
    	 console.log(self.eqptList[index])
    	 self.configSetting.index = index;
    	 self.selected = index;
    	 self.pointer.top = self.eqptList[index].cssTop;
    	 self.pointer.left = self.eqptList[index].cssLeft;
    	 
    	 self.pointer.animateTrigger = 'on';
    	 /*self.pointer.display = 'block';*/
    	 self.pointer.display = true;
     }
     
     // 설정한 요소들에 대하여 실제 HTML에 적용 시킨다.
     // 각각의 요소에 대하여 알맞은 데이터를 바인딩 시킨다.
     // Jquery 적인 요소로 코딩을 적용하였음.  --> 더 좋은 방법이 있다면 변경해야 함.
     self.saveConfig = function (eqpt) {
    	 var cnm = eqpt['cnm'];
    	 var target = $filter('filter')(self.eqptList, {eqptCnm : cnm});
    	 target[0]['eqptCnm'] = $scope.configSetting.cnm;
    	 target[0]['eqptType'] = $scope.configSetting.type;
    	 target[0]['id'] = $scope.configSetting.id;
    	 target[0]['cssTop'] = $scope.configSetting.top;
    	 target[0]['cssLeft'] = $scope.configSetting.left;
    	 target[0]['cssHeight'] = $scope.configSetting.height;
    	 target[0]['cssWidth'] = $scope.configSetting.width;
    	 target[0]['stsImg0'] = $scope.configSetting.imgUrl;
    	 target[0]['stsImg1'] = $scope.configSetting.imgUrl.replace('color', 'Green');
    	 target[0]['stsImg2'] = $scope.configSetting.imgUrl.replace('color', 'White');
    	 target[0]['stsImg3'] = $scope.configSetting.imgUrl.replace('color', 'Blue');
    	 target[0]['stsImg4'] = $scope.configSetting.imgUrl.replace('color', 'Red');
    	 
    	if (target[0]['status'] != 'delete' && target[0]['status'] != 'insert')
    	 {
    		 target[0]['status'] = "update";
    	 }
    	 
    	 alert("적용 되었습니다.");
     }
     
     var customFullscreen = false;
     
     self.uploadImg = function() {
	        $mdDialog.show({
		          controller: 'UploadCtrl',
		          controllerAs: 'vm',
		          templateUrl: '/fmb/modules/fmb/views/upload.tmpl.html',
		          parent: angular.element(document.body),
		          clickOutsideToClose:true,
		          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
		        })
		        .then(function(answer) {
		          $scope.status = 'You said the information was "' + answer + '".';
		        }, function() {
		          $scope.status = 'You cancelled the dialog.';
		        });
     };
     
     self.FindImg = function(factId) {
    	 //console.log("보내는쪽 팩트아이디" + factId);
	        $mdDialog.show({
		          controller: 'ImageViewerCtrl',
		          controllerAs: 'vm',
		          templateUrl: '/fmb/modules/fmb/views/imageViewer.tmpl.html',
		          parent: angular.element(document.body),
		          clickOutsideToClose:true,
		          locals : {
		        	  factId : factId
		          },
		          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
		        })
		        .then(function(answer) {
		          $scope.status = 'You said the information was "' + answer + '".';
		        }, function() {
		          $scope.status = 'You cancelled the dialog.';
		        });
     };
     
}]);
