/**  
 * @Class Name : fmbCwMonCtrl.js
 * @Description : fmbCwMon
 * @Modification Information  
 * @
 * @ 작업일        작성자          내용
 * @ ----------  ------------  -------------------------------
 * @ 2017.07.03  조준연, 정유경    최초생성
 * @ 
 * 
 */

'use strict';

angular
    .module('app')
    .controller('DialogCtrl', [ 'CmmAjaxService'
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
	var eqptStsCstData = [];
    var plcData = {};
    var timeProdData= {};
    var dataSource = [{
        country: "TASK1",
        s1: 60,
        s2: 1000
    }, {
        country: "TASK2",
        s3: 60,
        s4: 40,
        s5: 900
    }, {
        country: "TASK3",
        s6: 100,
        s7: 50,
        s8: 850
    }, {
        country: "TASK4",
        s9: 150,
        s10: 60,
        s11: 790
    }, {
        country: "TASK5",
        s12: 210,
        s13: 90,
        s14: 700
    }, {
        country: "TASK6",
        s15: 300,
        s16: 200,
        s17: 500
    }, {
        country: "TASK7",
        s18: 500,
        s19: 200,
        s20: 300
    }, {
        country: "TASK8",
        s21: 700,
        s22: 100,
        s23: 200
    }, {
        country: "TASK9",
        s24: 800,
        s25: 200
    }];
    self.plcData = CmmFactSrvc.getPlcData();
    
	self.plcSelectedVo = {
			plcId: CmmFactSrvc.getPlcData() ,
	        factId: ''
  		  } 
	self.stsVo = {
			dt:'',
			plcId: CmmFactSrvc.getPlcData() 
  		  } 
	
	
    self.cancel = function() {
    	$mdDialog.hide();
    };
    
    getSelectedPlc();
    console.log(self.stsVo);
	//설비상태 발생추이 가져오기
	var dateRunInfoPromise = CmmAjaxService.select("/mes/bas/selectDateRunInfo.do");
		dateRunInfoPromise.then(function(data) {
		self.timeProdData = data;
		timeProd();
	}, function(data) {
		alert('fail: ' + data)
	});
	
	//시간별 가동상태 가져오기
	var eqptStsHisPromise = CmmAjaxService.select("/mes/bas/selectEqptStsHis.do", self.stsVo);
	eqptStsHisPromise.then(function(data) {
		
		self.eqptStsHisData = data;
		console.log(self.eqptStsHisData);
		
		getCstData();
		//StsProd();
	}, function(data) {
		alert('fail: ' + data)
	});
	
	//테스트 코드	
	self.test = {
			rotated: true,
			zoomingMode: "all",
			scrollingMode: "all",
	        dataSource: dataSource,
	        commonSeriesSettings: {
	            argumentField: "country",
	            type: "fullStackedBar"
	        },
	        size: {
	        	width: 850,
	        	height: 370
	        },
	        series: [
	            { valueField: "s1", name: "1", color:"white" },
	            { valueField: "s2", name: "2", color:"transparent" },
	            { valueField: "s3", name: "3", color:"transparent" },
	            { valueField: "s4", name: "4", color:"green" },
	            { valueField: "s5", name: "5", color:"transparent" },
	            { valueField: "s6", name: "6", color:"transparent" },
	            { valueField: "s7", name: "7", color:"yellow" },
	            { valueField: "s8", name: "8", color:"transparent" },
	            { valueField: "s9", name: "9", color:"transparent" },
	            { valueField: "s10", name: "10", color:"green" },
	            { valueField: "s11", name: "11", color:"transparent" },
	            { valueField: "s12", name: "12", color:"transparent" },
	            { valueField: "s13", name: "13", color:"red" },
	            { valueField: "s14", name: "14", color:"transparent" },
	            { valueField: "s15", name: "15", color:"transparent" },
	            { valueField: "s16", name: "16", color:"white" },
	            { valueField: "s17", name: "17", color:"transparent"},
	            { valueField: "s18", name: "18", color:"transparent" },
	            { valueField: "s19", name: "19", color:"green" },
	            { valueField: "s20", name: "20", color:"transparent" },
	            { valueField: "s21", name: "21", color:"transparent" },
	            { valueField: "s22", name: "22", color:"red" },
	            { valueField: "s23", name: "23", color:"transparent" },
	            { valueField: "s24", name: "24", color:"transparent" },
	            { valueField: "s25", name: "25", color:"green" }
	            
	        ],
	        legend: {
	            verticalAlignment: "top",
	            horizontalAlignment: "center",
	            itemTextPosition: "right",
	            visible: false
	        },
	        title: {
	            text: "Energy Consumption in 2004",
	            subtitle: {
	                text: "(Millions of Tons, Oil Equivalent)" 
	            }
	        },
	        "export": {
	            enabled: false
	        },
	        tooltip: {
	            enabled: true,
	            customizeTooltip: function (arg) {
	                return {
	                    text: arg.percentText + " - " + arg.valueText
	                };
	            }
	        }
	    };
	//테스트코드 끝	
	
	
	
	function timeProd(){
		//대기발생추이
	    self.timeProd = {	    	
	        dataSource: self.timeProdData,
	        zoomingMode: "all",
	        size: {
	        	width: 850,
	        	height: 250
	        },
	        commonSeriesSettings: {
	            argumentField: "dt",
	            dashStyle: "solid",
	            color: "#f2f2f2",
	        	point: {
	        		color: "#7f7f7f"
	        	},
	        	width: 4
	        },
	        argumentAxis: {
	            valueMarginsEnabled: false,
	            discreteAxisDivisionMode: "crossLabels",
	            grid: {
	                visible: false
	            },
	        	label: {
	        		font: {
	        			color: "#e1e1e7"
	        		}
	        	}
	        },
	        valueAxis: {
	        	label: {
	        		font: {
	        			color: "#e1e1e7"
	        		}
	        	}
	        },
	        series: [
	            { valueField: "standbyCount", name: "대기 발생추이" },
	        ],
	        legend: {
	        	visible: false
	        },
	        tooltip: {
	            enabled: true,
	            customizeTooltip: function (arg) {
	                return {
	                    text: arg.valueText
	                };
	            },
	            zIndex: 101
	        }
	    };
	}		
	
	
	
	function getCstData(){
		for(var i = 0; i< self.eqptStsHisData.length; i++){
			if(self.eqptStsHisData[i].plcSts == '0'){ //비가동일경우
					eqptStsCstData[i] = {
							"task" : i,
							"pre" : new Date(Number(self.eqptStsHisData[i].strDttm.split('-')[0]),
												  Number(self.eqptStsHisData[i].strDttm.split('-')[1]),
												  Number(self.eqptStsHisData[i].strDttm.split('-')[2].split(' ')[0]),
												  Number(self.eqptStsHisData[i].strDttm.split(' ')[1].split(':')[0]),
												  Number(self.eqptStsHisData[i].strDttm.split(' ')[1].split(':')[1]), 
												  Number(self.eqptStsHisData[i].strDttm.split(' ')[1].split(':')[2]),
												  0),
							"Dttm0" : new Date(Number(self.eqptStsHisData[i].endDttm.split('-')[0]),
												  Number(self.eqptStsHisData[i].endDttm.split('-')[1]),
												  Number(self.eqptStsHisData[i].endDttm.split('-')[2].split(' ')[0]),
												  Number(self.eqptStsHisData[i].endDttm.split(' ')[1].split(':')[0]),
												  Number(self.eqptStsHisData[i].endDttm.split(' ')[1].split(':')[1]), 
												  Number(self.eqptStsHisData[i].endDttm.split(' ')[1].split(':')[2]),
												  0),
							"Dttm1" :0,
							"Dttm2" :0,
							"Dttm3" : 0,
							"Dttm4" : 0,}

					}else if(self.eqptStsHisData[i].plcSts == '1'){
						eqptStsCstData[i] = {
								"task" : i,
								"pre" : new Date(Number(self.eqptStsHisData[i].strDttm.split('-')[0]),
										  Number(self.eqptStsHisData[i].strDttm.split('-')[1]),
										  Number(self.eqptStsHisData[i].strDttm.split('-')[2].split(' ')[0]),
										  Number(self.eqptStsHisData[i].strDttm.split(' ')[1].split(':')[0]),
										  Number(self.eqptStsHisData[i].strDttm.split(' ')[1].split(':')[1]), 
										  Number(self.eqptStsHisData[i].strDttm.split(' ')[1].split(':')[2]),
										  0),
								"Dttm0" : 0,
								"Dttm1" : new Date(Number(self.eqptStsHisData[i].endDttm.split('-')[0]),
										  Number(self.eqptStsHisData[i].endDttm.split('-')[1]),
										  Number(self.eqptStsHisData[i].endDttm.split('-')[2].split(' ')[0]),
										  Number(self.eqptStsHisData[i].endDttm.split(' ')[1].split(':')[0]),
										  Number(self.eqptStsHisData[i].endDttm.split(' ')[1].split(':')[1]), 
										  Number(self.eqptStsHisData[i].endDttm.split(' ')[1].split(':')[2]),
										  0),
								"Dttm2" : 0,
								"Dttm3" : 0,
								"Dttm4" : 0
						}
					}else if(self.eqptStsHisData[i].plcSts == '2'){
						eqptStsCstData[i] = {
								"task" : i,
								"pre" : new Date(Number(self.eqptStsHisData[i].strDttm.split('-')[0]),
								  Number(self.eqptStsHisData[i].strDttm.split('-')[1]),
								  Number(self.eqptStsHisData[i].strDttm.split('-')[2].split(' ')[0]),
								  Number(self.eqptStsHisData[i].strDttm.split(' ')[1].split(':')[0]),
								  Number(self.eqptStsHisData[i].strDttm.split(' ')[1].split(':')[1]), 
								  Number(self.eqptStsHisData[i].strDttm.split(' ')[1].split(':')[2]),
								  0),
								"Dttm0" : 0,
								"Dttm1" : 0,
								"Dttm2" : new Date(Number(self.eqptStsHisData[i].endDttm.split('-')[0]),
										  Number(self.eqptStsHisData[i].endDttm.split('-')[1]),
										  Number(self.eqptStsHisData[i].endDttm.split('-')[2].split(' ')[0]),
										  Number(self.eqptStsHisData[i].endDttm.split(' ')[1].split(':')[0]),
										  Number(self.eqptStsHisData[i].endDttm.split(' ')[1].split(':')[1]), 
										  Number(self.eqptStsHisData[i].endDttm.split(' ')[1].split(':')[2]),
										  0),
								"Dttm3" : 0,
								"Dttm4" : 0		
						}
						
					}else if(self.eqptStsHisData[i].plcSts == '3'){
						eqptStsCstData[i] = {
								"task" : i,
								"pre" : new Date(Number(self.eqptStsHisData[i].strDttm.split('-')[0]),
										  Number(self.eqptStsHisData[i].strDttm.split('-')[1]),
										  Number(self.eqptStsHisData[i].strDttm.split('-')[2].split(' ')[0]),
										  Number(self.eqptStsHisData[i].strDttm.split(' ')[1].split(':')[0]),
										  Number(self.eqptStsHisData[i].strDttm.split(' ')[1].split(':')[1]), 
										  Number(self.eqptStsHisData[i].strDttm.split(' ')[1].split(':')[2]),
										  0),
								"Dttm0" : 0,
								"Dttm1" : 0,
								"Dttm2" : 0,
								"Dttm3" : new Date(Number(self.eqptStsHisData[i].endDttm.split('-')[0]),
										  Number(self.eqptStsHisData[i].endDttm.split('-')[1]),
										  Number(self.eqptStsHisData[i].endDttm.split('-')[2].split(' ')[0]),
										  Number(self.eqptStsHisData[i].endDttm.split(' ')[1].split(':')[0]),
										  Number(self.eqptStsHisData[i].endDttm.split(' ')[1].split(':')[1]), 
										  Number(self.eqptStsHisData[i].endDttm.split(' ')[1].split(':')[2]),
										  0),
								"Dttm4" : 0}
					}else{
						eqptStsCstData[i] = {
								"task" : i,
								"pre" :  new Date(Number(self.eqptStsHisData[i].strDttm.split('-')[0]),
										  Number(self.eqptStsHisData[i].strDttm.split('-')[1]),
										  Number(self.eqptStsHisData[i].strDttm.split('-')[2].split(' ')[0]),
										  Number(self.eqptStsHisData[i].strDttm.split(' ')[1].split(':')[0]),
										  Number(self.eqptStsHisData[i].strDttm.split(' ')[1].split(':')[1]), 
										  Number(self.eqptStsHisData[i].strDttm.split(' ')[1].split(':')[2]),
										  0),
								"Dttm0" : 0,
								"Dttm1" : 0,
								"Dttm2" : 0,
								"Dttm3" : 0,
								"Dttm4" : new Date(Number(self.eqptStsHisData[i].endDttm.split('-')[0]),
										  Number(self.eqptStsHisData[i].endDttm.split('-')[1]),
										  Number(self.eqptStsHisData[i].endDttm.split('-')[2].split(' ')[0]),
										  Number(self.eqptStsHisData[i].endDttm.split(' ')[1].split(':')[0]),
										  Number(self.eqptStsHisData[i].endDttm.split(' ')[1].split(':')[1]), 
										  Number(self.eqptStsHisData[i].endDttm.split(' ')[1].split(':')[2]),
										  0),
								}		
					}
		}
		console.log(eqptStsCstData);
		StsProd();
	}
		
	function StsProd(){
		self.stsProd = {	
			rotated: true,
	        equalBarWidth: false,
	        dataSource: eqptStsCstData,
	        //redrawOnResize : true,
	        scrollingMode: "all", 
	        zoomingMode: "all",
	        adjustOnZoom: true, 
	        size: {
	        	width: 850,
	        	height: 376
	        },
	        commonSeriesSettings: {
	            argumentField: "task",
	            type:"stackedBar"
	            //width: 4
	        },
	        series: [
	        	{valueField: "pre", name: "pre", color: 'rgba(1,1,1,0.1)'},
	            {valueField: "Dttm0", name: "비가동"},
	            {valueField: "Dttm1", name: "가동"},
		        {valueField: "Dttm2", name: "대기"},
		        {valueField: "Dttm3", name: "수리"},
		        {valueField: "Dttm4", name: "알람"}		        
	        ],
	        valueAxis: { 
        		//min: new Date('2017','01','09','08','30'),
	     /*   	min: new Date('2017','01','09','08','30'),
	        	max: new Date('2017','01','10','08','29'),
	        */

	      	    visible: true,
	      	    valueType: "Numeric",
	      	    label:{   
	      	     	overlappingBehavior: "stagger",
	      	    	//format: "shortTime"
	      	       }
	        },
	        argumentAxis : {
	        	inverted:true,
	        	argumentType: "Numeric",
	        	label: {
	        	visible : false
	        	}
	        },
	        tooltip:{
	        	enabled: true,
	        	customizeTooltip: function (arg) {
	                return {
	                    text: arg.argumentText
	                };
	            },
	        },
	        legend: {
	        	visible: true,
	        	itemTextPosition:"bottom",
	        	hoverMode : "includePoints"
	        	//position : "inside"
	        }	 
		}
	}		
	
	/*function StsProd(){
		self.stsProd = {	
			rotated: true,
			//palette: "violet",
	        equalBarWidth: false,
	        dataSource: eqptStsCstData,
	        //redrawOnResize : true,
	        scrollingMode: "all", 
	        zoomingMode: "all",
	        adjustOnZoom: true, 
	        size: {
	        	width: 850,
	        	height: 376
	        },
	        commonSeriesSettings: {
	        	//color: "#f2f2f2",
	            argumentField: "task",
	            type:"rangeBar"
	            //width: 4
	        },
	        series: [
	            { rangeValue1Field: "strDttm0", 
	              rangeValue2Field: "endDttm0", 
	              name: "비가동" 
	             },
	            { rangeValue1Field: "strDttm1", 
	              rangeValue2Field: "endDttm1", 
	              name: "가동" 
		        },
		        { rangeValue1Field: "strDttm2", 
	              rangeValue2Field: "endDttm2", 
	              name: "대기" 
		        },
		        { rangeValue1Field: "strDttm3", 
	              rangeValue2Field: "endDttm3", 
	              name: "수리" 
		        },
		        { rangeValue1Field: "strDttm4", 

		        	urangeValue2Field: "endDttm4", 
	              name: "알람" 
		        }
		        
	        ],
	        valueAxis: { 
        		min: new Date('2017','01','09','08','30'),
	        	max: new Date('2017','01','10','08','29'),

	      	    visible: true,
	      	    valueType: "datetime",
	      	    label:{   
	      	     	//overlappingBehavior: "stagger",
	      	    	format: "shortTime"
	      	       }
	        },
	        argumentAxis : {
	        	inverted:true,
	        	argumentType: "Numeric",
	        	label: {
	        	visible : false
	        	}
	        },
	        tooltip:{
	        	enabled: true,
	        	customizeTooltip: function (arg) {
	                return {
	                    text: arg.argumentText
	                };
	            },
	        },
	        legend: {
	        	visible: true,
	        	itemTextPosition:"bottom",
	        	hoverMode : "includePoints"
	        	//position : "inside"
	        }	 
		}
		
		self.rangeOptions = {
		        size: {
		            height: 120
		        },
		        margin: {
		            left: 10
		        },
		        scale: {
		            minorTickCount: 1
		        },
		        dataSource: eqptStsCstData,
		        chart: {
		        	rotated : true,
		            commonSeriesSettings: {
		            	argumentField: "task",
		                type: "rangeBar"
		            },
		            equalBarWidth: false,
		            series: [
			            { rangeValue1Field: "strDttm0", 
			              rangeValue2Field: "endDttm0", 
			              name: "비가동" 
			             },
			            { rangeValue1Field: "strDttm1", 
			              rangeValue2Field: "endDttm1", 
			              name: "가동" 
				        },
				        { rangeValue1Field: "strDttm2", 
			              rangeValue2Field: "endDttm2", 
			              name: "대기" 
				        },
				        { rangeValue1Field: "strDttm3", 
			              rangeValue2Field: "endDttm3", 
			              name: "수리" 
				        },
				        { rangeValue1Field: "strDttm4", 
			              rangeValue2Field: "endDttm4", 
			              name: "알람" 
				        }
				        
			        ]
		        },
		        behavior: {
		            callValueChanged: "onMoving"
		        },
		        onValueChanged: function (e) {
		            var zoomedChart = $(".eqptRunCh #zoomedChart").dxChart("instance");
		            zoomedChart.zoomArgument(e.value[0], e.value[1]);
		        }
		    };
		
		
	}		
   	*/
	function getSelectedPlc(){
				
		var promise = CmmAjaxService.selectOne("/mes/bas/selectFmbPlc.do", self.plcSelectedVo);
        promise.then(function(data){
        	for(var i = 0; i< data.length; i++){
           		var random = Math.floor(Math.random()*3);
           		if(random==0){
           			random = 4;
           		}
           		data[i].eqptSts = random;
       		}
        	
        	self.plc = data;//fmbPlcVo가 담긴 리스트 형태리턴
        	
        	
        }
        ,function(data){
        	alert('fail: '+ data)
        });
    	
    };
    
}]);

