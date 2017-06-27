/**
 * @Class Name : fmb006Ctrl.js
 * @Description : fmb006
 * @Modification Information @ @ 작업일 작성자 내용 @ ---------- ---------
 * ------------------------------- @ 2017.05.29 정유경 최초생성 @
 * 
 */

'use strict';
var rankRunInfoList;
var gaugeRunInfoList;
angular.module('app').controller('FmbTotalCtrl',[	/*'dx',*/
													'CmmAjaxService',
													'CmmModalSrvc',
													'CmmWorkerSrvc',
													'$http',
													'$scope',
													'$window',
													'$q',
	function(CmmAjaxService, CmmWorkerSrvc, $http, $scope, $window,	$q) {
		/*------------------------------------------
		 * 변수 선언
		 *-----------------------------------------*/
		var self = this;
		var workerList = CmmWorkerSrvc;
		// 설비parameter

		
													
		
		// 계획진도율 가져오기
		var planProgressPromise = CmmAjaxService.select("/mes/bas/selectPlanProgress.do");
			planProgressPromise.then(function(data) {
			self.planProgressList = data;						
			//console.log(self.planProgressList);
			planProgress();
			
		}, function(data) {
			alert('fail: ' + data)
		});
		
		
		// 라인가동현황게이지 가져오기
		var gaugeRunRatePromise = CmmAjaxService.select("/mes/bas/selectGaugeRunRate.do");
			gaugeRunRatePromise.then(function(data) {
			self.gaugeRunRateList = data;						
			//console.log(self.gaugeRunRateList);
			gaugeRunRate();
			
		}, function(data) {
			alert('fail: ' + data)
		});
			
		
		// 라인가동현황 그리드 가져오기
		var gaugeRunInfoPromise = CmmAjaxService.select("/mes/bas/selectGaugeRunInfo.do");
			gaugeRunInfoPromise.then(function(data) {
			gaugeRunInfoList = data;						
			//console.log(gridList);
			gaugeRunInfo();
			
		}, function(data) {
			alert('fail: ' + data)
		});
	
			
		//설비상태 발생추이 가져오기
		var dateRunInfoPromise = CmmAjaxService.select("/mes/bas/selectDateRunInfo.do");
			dateRunInfoPromise.then(function(data) {
			self.dateRunInfoList = data;						
			//console.log(self.dateRunInfoList);
			alarmDateRunInfo();
			standbyDateRunInfo();
			noRunDateRunInfo();
		}, function(data) {
			alert('fail: ' + data)
		});
		
		
		//설비상태별 발생량 순위 가져오기
		var rankRunInfoPromise = CmmAjaxService.select("/mes/bas/selectRankRunInfo.do");
			rankRunInfoPromise.then(function(data) {
			rankRunInfoList = data;						
			//console.log(rankRunInfoList);
			alarmRankRunInfo();
			standbyRankRunInfo();
			noRunRankRunInfo();
		}, function(data) {
			alert('fail: ' + data)
		});	
			
			
			
			
			
			
		function alarmRankRunInfo(){
		//알람 발생량 순위 그리드
			self.alarmRankRunInfoList = {
					dataSource: rankRunInfoList,
			        columns:[{dataField: "alarmNm"},
			        		{dataField: "alarmTm"},
			        		{dataField:"alarmCount"}]
			}
		}	
		
		function standbyRankRunInfo(){
			//대기 발생량 순위 그리드
			self.standbyRankRunInfoList = {
					dataSource: rankRunInfoList,
			        columns:[{dataField: "standbyNm"},
			        		{dataField: "standbyTm"},
			        		{dataField:"standbyCount"}]
			}
		}			
		
		function noRunRankRunInfo(){
			//비가동 발생량 순위 그리드
			self.noRunRankRunInfoList = {
					dataSource: rankRunInfoList,
			        columns:[{dataField: "noRunNm"},
			        		{dataField: "noRunTm"},
			        		{dataField:"noRunCount"}]
			}
		}	
		
		function alarmDateRunInfo(){
			//알람발생추이
			    self.alarmDateRunInfo = {
			        palette: "violet",
			        dataSource: self.dateRunInfoList,
			        commonSeriesSettings: {
			        	height:100,
			            argumentField: "dt"
			        },
			        argumentAxis: {
			        
			            valueMarginsEnabled: false,
			            discreteAxisDivisionMode: "crossLabels",
			            grid: {
			                visible: true
			            }
			        },
			        series: [
			            { valueField: "alarmCount", name: "알람발생추이" },
			        ],
			        title: { 
			            text: "알람발생추이"
			        },
			        /*"export": {
			            enabled: true
			        },*/
			        tooltip: {
			            enabled: true,
			            customizeTooltip: function (arg) {
			                return {
			                    text: arg.valueText
			                };
			            }
			        }
			    };
		}
			
		function standbyDateRunInfo(){
			//대기발생추이
		    self.standbyDateRunInfo = {	    	
		        palette: "violet",
		        dataSource: self.dateRunInfoList,
		        commonSeriesSettings: {
		            argumentField: "dt"
		        },
		        argumentAxis: {
		            valueMarginsEnabled: false,
		            discreteAxisDivisionMode: "crossLabels",
		            grid: {
		                visible: true
		            }
		        },
		        series: [
		            { valueField: "standbyCount", name: "대기 발생추이" },
		        ],
		        title: { 
		            text: "대기 발생추이"
		        },
		        /*"export": {
		            enabled: true
		        },*/
		        tooltip: {
		            enabled: true,
		            customizeTooltip: function (arg) {
		                return {
		                    text: arg.valueText
		                };
		            }
		        }
		    };
		}			
		
		function noRunDateRunInfo(){
			//비가동 발생추이
		    self.noRunDateRunInfo = {	    	
		        palette: "violet",
		        dataSource: self.dateRunInfoList,
		        commonSeriesSettings: {
		            argumentField: "dt"
		        },
		        argumentAxis: {
		            valueMarginsEnabled: false,
		            discreteAxisDivisionMode: "crossLabels",
		            grid: {
		                visible: true
		            }
		        },
		        series: [
		            { valueField: "noRunCount", name: "비가동발생추이" },
		        ],
		        title: { 
		            text: "비가동발생추이"
		        },
		        /*"export": {
		            enabled: true
		        },*/
		        tooltip: {
		            enabled: true,
		            customizeTooltip: function (arg) {
		                return {
		                    text: arg.valueText
		                };
		            }
		        }
		    };
	}			
			
			
		function gaugeRunInfo(){
			//라인가동현황 그리드
			self.gaugeRunInfoList = {
					dataSource: gaugeRunInfoList,
			        columns:[
			        	{dataField:function(){return "runCount"+"standbyCount"+"noRunCount"},caption:"총 운행라인"},
			        	{dataField: "runCount",caption:"가동"},
			        	{dataField: "standbyCount",caption:"대기"},
			        	{dataField:"noRunCount",caption:"비가동"}]
		
			}
		}
		function gaugeRunRate(){
			//라인가동현황게이지
			self.gaugeRunRate = {
		        scale: {
		            startValue: 0,
		            endValue: 100,
		            tickInterval: 10,
		            label: {
		                customizeText: function (arg) {
		                    return arg.valueText + "%";
		                }
		            }
		        },
		        rangeContainer: {
		            ranges: [
		                { startValue: 0, endValue: 30, color: "#0077BE" },
		                { startValue: 30, endValue: 70, color: "#E6E200" },
		                { startValue: 70, endValue: 100, color: "#77DD77" }
		            ]
		        },
		        //tooltip: { enabled: true },
		        title: {
		            text: "라인가동현황",
		            font: { size: 28 }
		        },
		        
		        value: self.gaugeRunRateList[0].lineGauge
		        
		    };
		}
		

			function planProgress(){
				//계획진도율 차트 
			 	self.planProgress = { 
			 		rotated: true,
			        dataSource: self.planProgressList,
			        commonSeriesSettings: {
			        	label:{
			        		displayMode: "stagger" ,
			        		staggeringSpacing: '10',
			        		font:{
			        			size:15,
			        			color:'#FFFFFF',
			        			family: 'Verdana'
			        		}
			        	},
			            argumentField: "lineNm"/*,
			            type: "fullStackedBar"*/
			        },
			        
			        series: [
			            { valueField: "curCountPer", name: "생산실적", type:'fullStackedBar'},
			            { valueField: "goalCountPer", name: "계획수량", type:'fullStackedBar' },
			            { 
			            	vlaueField: "avgCountPer", 
			            	name: "평균생산실적",
			            	type: 'bar',
			            	/*axis: 'absoluteAxis',*/
			            	color:'#208fd8'
			            		
			            }
			        ],
			        valueAxis:[
			        	{name : 'percentAxis'},
			        	{
			        		name : 'absoluteAxis',
			        		position:'right',
			        		label: { format: 'largeNumber' },
			        		synchronizedValue : 0
			        	}
			        ],
			        legend: {
			            verticalAlignment: "bottom",
			            horizontalAlignment: "center",
			            itemTextPosition: "right",
			            position:"outside",
			            orientation:"horizontal", //범례 정렬
		            	//columnItemSpacing: '6' //범례간 간격
			        },
			        title: {
			            text: "계획진도율",
			           /* subtitle: {
			                text: "(Millions of Tons, Oil Equivalent)" 
			            }*/
			        },
			        "export": {
			            enabled: true
			        },
			        tooltip: {
			            enabled: true,
			            customizeTooltip: function (arg) {
			                return {
			                    text: arg.percentText 
			                };
			            }
			        }
			    }
			}

			
			
	
	
	
	
	
		
	// 워커가 이미 존재하면 종료시킨다 .
	if (workerList.worker2 != undefined) {
		workerList.worker2.terminate();
		workerList.worker2 = undefined;
	}
	
	
		
	}]);
