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
													/*'CmmModalSrvc',*/
													'CmmWorkerSrvc',
													'$http',
													'$scope',
													'$window',
													'$q',
													'$timeout',
	function(CmmAjaxService, CmmWorkerSrvc, $http, $scope, $window,	$q, $timeout) {
		/*------------------------------------------
		 * 변수 선언
		 *-----------------------------------------*/
		var self = this;
		var workerList = CmmWorkerSrvc;
		// 설비parameter
		var count = 1;
		$scope.value = "70";
		$scope.dateRunInfoList = {};
		 var dataSource = [{
			    country: "Russia",
			    area: 12
			}, {
			    country: "Canada",
			    area: 7
			}, {
			    country: "USA",
			    area: 7
			}, {
			    country: "China",
			    area: 7
			}, {
			    country: "Brazil",
			    area: 6
			}, {
			    country: "Australia",
			    area: 5
			}, {
			    country: "India",
			    area: 2
			}, {
			    country: "Others",
			    area: 55
			}];

		 var dataSource2 = [{
			    day: "유형1",
			    oranges: 3
			}, {
			    day: "유형2",
			    oranges: 2
			}, {
			    day: "유형3",
			    oranges: 9
			}, {
			    day: "유형4",
			    oranges: 4
			}, {
			    day: "유형5",
			    oranges: 6
			}];
		 
		self.info = {
				alarm : {
					firstTitle : "null",
					firstValue : "null",
					secondTitle : "null",
					secondValue : "null",
					thirdTitle : "null",
					thirdValue : "null"
				},
				norun : {
					firstTitle : "null",
					firstValue : "null",
					secondTitle : "null",
					secondValue : "null",
					thirdTitle : "null",
					thirdValue : "null"
				},
				standby : {
					firstTitle : "null",
					firstValue : "null",
					secondTitle : "null",
					secondValue : "null",
					thirdTitle : "null",
					thirdValue : "null"
				}
		};
		self.gauge = {
				run: "null",
				standby: "null",
				norun: "null",
				alarm: "null"
		};
		getData();
		
		function getData()
		{
			console.log("getData Call!!")
			getPlanProgress();
			getGaugeRunRate();
			getGaugeRunInfo();
			getDateRunInfo();
			getRankRunInfo();
		}
		
		var createData = function () {
			
			
		};
		
		function getPlanProgress() {
			// 계획진도율 가져오기
			var planProgressPromise = CmmAjaxService.select("/mes/bas/selectPlanProgress.do");
				planProgressPromise.then(function(data) {
				self.planProgressList = data;						
				//console.log(self.planProgressList);
				planProgress();
				
			}, function(data) {
				alert('fail: ' + data)
			});	
		}
		function getGaugeRunRate() {
			// 라인가동현황게이지 가져오기
			var gaugeRunRatePromise = CmmAjaxService.select("/mes/bas/selectGaugeRunRate.do");
				gaugeRunRatePromise.then(function(data) {
				self.gaugeRunRateList = data;						
				$scope.value = self.gaugeRunRateList[0].lineGauge;
				if (count == 1) {
					gaugeRunRate();
				}
			}, function(data) {
				alert('fail: ' + data)
			});
		}	
		function getGaugeRunInfo() {	
			// 라인가동현황 그리드 가져오기
			var gaugeRunInfoPromise = CmmAjaxService.select("/mes/bas/selectGaugeRunInfo.do");
				gaugeRunInfoPromise.then(function(data) {
				gaugeRunInfoList = data;						
				//console.log(gridList);
				gaugeRunInfo();
				
			}, function(data) {
				alert('fail: ' + data)
			});
		}
		function getDateRunInfo() {
			//카운트 초기화
			
			$scope.dateRunInfoList = "";
			//설비상태 발생추이 가져오기
			var dateRunInfoPromise = CmmAjaxService.select("/mes/bas/selectDateRunInfo.do");
				dateRunInfoPromise.then(function(data) {
				
				$scope.dateRunInfoList = data;


				alarmDateRunInfo();
				standbyDateRunInfo();
				noRunDateRunInfo();
			}, function(data) {
				alert('fail: ' + data)
			});
		}	
		function getRankRunInfo() {
			//설비상태별 발생량 순위 가져오기
			var rankRunInfoPromise = CmmAjaxService.select("/mes/bas/selectRankRunInfo.do");
				rankRunInfoPromise.then(function(data) {
				rankRunInfoList = data;
				alarmRankRunInfo();
				standbyRankRunInfo();
				noRunRankRunInfo();
				$scope.apply();


			}, function(data) {
				alert('fail: ' + data)
			});
		}	

			
		function alarmRankRunInfo(){
		//알람 발생량 순위 그리드
			self.info.alarm.firstTitle = rankRunInfoList["0"].alarmNm;
			self.info.alarm.firstValue = rankRunInfoList["0"].alarmTm+ "시간 (" + rankRunInfoList["0"].alarmCount + " 번)";
			self.info.alarm.secondTitle = rankRunInfoList["1"].alarmNm;
			self.info.alarm.secondValue = rankRunInfoList["1"].alarmTm+ "시간 (" + rankRunInfoList["1"].alarmCount + " 번)";
			self.info.alarm.thirdTitle = rankRunInfoList["2"].alarmNm;
			self.info.alarm.thirdValue = rankRunInfoList["2"].alarmTm+ "시간 (" + rankRunInfoList["2"].alarmCount + " 번)";
		}	
		
		function standbyRankRunInfo(){
			//대기 발생량 순위 그리드
			self.info.standby.firstTitle = rankRunInfoList["0"].standbysNm;
			self.info.standby.firstValue = rankRunInfoList["0"].standbyTm+ "시간 (" + rankRunInfoList["0"].standbyCount + " 번)";
			self.info.standby.secondTitle = rankRunInfoList["1"].standbysNm;
			self.info.standby.secondValue = rankRunInfoList["1"].standbyTm+ "시간 (" + rankRunInfoList["1"].standbyCount + " 번)";
			self.info.standby.thirdTitle = rankRunInfoList["2"].standbysNm;
			self.info.standby.thirdValue = rankRunInfoList["2"].standbyTm+ "시간 (" + rankRunInfoList["2"].standbyCount + " 번)";
		}			
		
		function noRunRankRunInfo(){
			//비가동 발생량 순위 그리드
			self.info.norun.firstTitle = rankRunInfoList["0"].noRunNm;
			self.info.norun.firstValue = rankRunInfoList["0"].noRunTm+ "시간 (" + rankRunInfoList["0"].noRunCount + " 번)";
			self.info.norun.secondTitle = rankRunInfoList["1"].noRunNm;
			self.info.norun.secondValue = rankRunInfoList["1"].noRunTm+ "시간( " + rankRunInfoList["1"].noRunCount + " 번)";
			self.info.norun.thirdTitle = rankRunInfoList["2"].noRunNm;
			self.info.norun.thirdValue = rankRunInfoList["2"].noRunTm+ "시간 (" + rankRunInfoList["2"].noRunCount + " 번)";
		}
		
	
		//알람발생추이
		    $scope.alarmDateRunInfo = {
		    	bindingOptions: {
		    			dataSource: "dateRunInfoList"
		    	},
		        size: {
		        	width: 450,
		        	height: 200
		        },
		        commonSeriesSettings: {
		        	height:100,
		            argumentField: "dt",
		            dashStyle: "solid",
		            color: "#d79392",
		        	point: {
		        		color: "#dc0002"
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
		            { valueField: "alarmCount", name: "알람발생추이" },
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
		        },
		        animation: {
	                easing: 'easeOutCubic',
	                duration: 2000
	            }
		    };
	
			
			//대기발생추이
		    $scope.standbyDateRunInfo = {	    	
		    		bindingOptions: {
		    			dataSource: "dateRunInfoList"
		    	},
		        size: {
		        	width: 450,
		        	height: 200
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
		        },
		        animation: {
	                easing: 'easeOutCubic',
	                duration: 2000
	            }
		    };

			//비가동 발생추이
		    $scope.noRunDateRunInfo = {
		    	bindingOptions: {
		    			dataSource: "dateRunInfoList"
		    	},
		        size: {
		        	width: 450,
		        	height: 200
		        },
		        commonSeriesSettings: {
		            argumentField: "dt",
		            dashStyle: "solid",
		        	color: "#f8ad6f",
		        	point: {
		        		color: "#974806"
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
		        legend: {
		        	visible: false
		        },
		        series: [
		            { valueField: "noRunCount", name: "비가동발생추이" },
		        ],
		        /*"export": {
		            enabled: true
		        },*/
		        tooltip: {
		            enabled: true,
		            customizeTooltip: function (arg) {
		                return {
		                    text: arg.valueText
		                };
		            },
		            zIndex: 101
		        },
		        animation: {
	                easing: 'easeOutCubic',
	                duration: 2000
	            }
		    };
		
			
			
		function gaugeRunInfo(){
			//라인가동현황 그리드
			self.gauge.run = gaugeRunInfoList["0"].runCount + " 라 인";
			self.gauge.standby = gaugeRunInfoList["0"].standbyCount + " 라 인";
			self.gauge.norun = gaugeRunInfoList["0"].noRunCount + " 라 인";
			self.gauge.alarm = gaugeRunInfoList["0"].alarmCount + " 라 인";
		}

			//라인가동현황게이지
			$scope.gaugeRunRate = {
				bindingOptions: {
					value: "value"
				},
		        scale: {
		            startValue: 0,
		            endValue: 100,
		            tickInterval: 10,
		            label: {
		                customizeText: function (arg) {
		                    return arg.valueText + "%";
		                },
		                font: {
		                	color: "#e1e1e7"
		                }
		            }
		        },
		        size: {
		        	width: 250,
		        	height: 250
		        },
		        rangeContainer: {
		            ranges: [
		                { startValue: 0, endValue: 30, color: "#0077BE" },
		                { startValue: 30, endValue: 70, color: "#E6E200" },
		                { startValue: 70, endValue: 100, color: "#77DD77" }
		            ]
		        }
		        //tooltip: { enabled: true },	        
		        //value: self.gaugeRunRateList[0].lineGauge
		        
		    };

		
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
			        		label: {
			        			font: {
			        				color: "#e1e1e7"
			        			}
			        		},
			        		synchronizedValue : 0
			        	}
			        ],
			        argumentAxis: {
			            label: {
			        		font: {
			        			color: "#e1e1e7"
			        		}
			        	}
			        },
			        size: {
			        	width: 450,
			        	height: 800
			        },
			        legend: {
			            verticalAlignment: "bottom",
			            horizontalAlignment: "center",
			            itemTextPosition: "right",
			            position:"outside",
			            orientation:"horizontal", //범례 정렬
		            	//columnItemSpacing: '6' //범례간 간격
			            font: {
			            	color: "#e1e1e7"
			            }
			        },
			        tooltip: {
			            enabled: true,
			            customizeTooltip: function (arg) {
			                return {
			                    text: arg.percentText 
			                };
			            },
			            zIndex: 101
			        }
			    }
			}

			
			// 공정 불량 바차트 테스트 코드 
			self.workChart = {
			        dataSource: dataSource2,
			        series: {
			            argumentField: "day",
			            valueField: "oranges",
			            name: "My oranges",
			            type: "bar",
			            color: '#ffaa66'
			        },
			        size: {
			        	width: 450,
			        	height: 220
			        },
			        legend: {
			        	visible: false
			        },
			        argumentAxis: {
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
			    };
			
			// 공정 불량 파이 차트 테스트 코드
			 self.pieChart = {
				        size: {
				            width: 300,
				            height: 300
				        },
				        palette: "bright",
				        dataSource: dataSource,
				        series: [
				            {
				                argumentField: "country",
				                valueField: "area",
				                label: {
				                    visible: true,
				                    connector: {
				                        visible: true,
				                        width: 1
				                    },
				                    position: "inside"
				                }
				            }
				        ],
				        legend : {
				        	visible: false
				        },
				        onPointClick: function (e) {
				            var point = e.target;
				    
				            toggleVisibility(point);
				        },
				        onLegendClick: function (e) {
				            var arg = e.target;
				    
				            toggleVisibility(this.getAllSeries()[0].getPointsByArg(arg)[0]);
				        }
				    };
			
	

	
	
		
			//워커 스타트
		   workerList.workerStart(workerList.worker2, "worker2.js", getData);
	
	
		
	}]);
