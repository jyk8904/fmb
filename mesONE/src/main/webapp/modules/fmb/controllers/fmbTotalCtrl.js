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
		$scope.planProgressList = {};
		
		var chartData = [
		    {
		        "date": "2012-01-01",
		        "distance": 227,
		        "townName": "New York",
		        "townName2": "New York",
		        "townSize": 25,
		        "latitude": 40.71,
		        "duration": 408
		    },
		    {
		        "date": "2012-01-02",
		        "distance": 371,
		        "townName": "Washington",
		        "townSize": 14,
		        "latitude": 38.89,
		        "duration": 482
		    },
		    {
		        "date": "2012-01-03",
		        "distance": 433,
		        "townName": "Wilmington",
		        "townSize": 40,
		        "latitude": 34.22,
		        "duration": 562
		    },
		    {
		        "date": "2012-01-04",
		        "distance": 345,
		        "townName": "Jacksonville",
		        "townSize": 7,
		        "latitude": 30.35,
		        "duration": 379
		    },
		    {
		        "date": "2012-01-05",
		        "distance": 480,
		        "townName": "Miami",
		        "townName2": "Miami",
		        "townSize": 10,
		        "latitude": 25.83,
		        "duration": 501
		    },
		    {
		        "date": "2012-01-06",
		        "distance": 386,
		        "townName": "Tallahassee",
		        "townSize": 7,
		        "latitude": 30.46,
		        "duration": 443
		    },
		    {
		        "date": "2012-01-07",
		        "distance": 348,
		        "townName": "New Orleans",
		        "townSize": 10,
		        "latitude": 29.94,
		        "duration": 405,
		        "bulletClass": "lastBullet"
		    }
		];
		
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
			pie();
			barChart();
			alarmDateRunInfo();
		}
		
		var createData = function () {
			
			
		};
		
		function getPlanProgress() {
			// 계획진도율 가져오기
			var planProgressPromise = CmmAjaxService.select("/mes/bas/selectPlanProgress.do");
				planProgressPromise.then(function(data) {
				$scope.planProgressList = data;			
				console.log($scope.planProgressList)
				//console.log(self.planProgressList);
				planProgress();
				planProgress2();
				
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
				gauge.arrows[0].setValue(self.gaugeRunRateList[0].lineGauge);
				gauge.axes[0].setBottomText(self.gaugeRunRateList[0].lineGauge + "%");
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
				$scope.dateRunInfoList[data.length-1].bulletClass = "lastBullet";

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
		function alarmDateRunInfo() {
			AmCharts.makeChart("alarmChart", {
				  type: "serial",
				  theme: "dark",
				  dataDateFormat: "MM/DD",
				  dataProvider: $scope.dateRunInfoList,

				  addClassNames: true,
				  startDuration: 1,
				  color: "#FFFFFF",
				  marginLeft: 0,

				  categoryField: "dt",
				  categoryAxis: {
				    parseDates: true,
				    minPeriod: "DD",
				    autoGridCount: false,
				    gridCount: 50,
				    gridAlpha: 0.1,
				    gridColor: "#FFFFFF",
				    axisColor: "#555555",
				    dateFormats: [{
				        period: 'DD',
				        format: 'DD'
				    }, {
				        period: 'WW',
				        format: 'MMM DD'
				    }, {
				        period: 'MM',
				        format: 'MMM'
				    }, {
				        period: 'YYYY',
				        format: 'YYYY'
				    }]
				  },

				  valueAxes: [{
				    id: "a1",
				    title: "",
				    gridAlpha: 0,
				    axisAlpha: 0
				  },{
				    id: "a2",
				    position: "right",
				    gridAlpha: 0,
				    axisAlpha: 0,
				    labelsEnabled: false
				  }
				  /*,{
				    id: "a3",
				    title: "",
				    position: "right",
				    gridAlpha: 0,
				    axisAlpha: 0,
				    inside: true,
				    duration: "mm",
				    durationUnits: {
				        DD: "d. ",
				        hh: "h ",
				        mm: "min",
				        ss: ""
				    }
				  }*/
				  ],
				  graphs: [{
				    id: "g1",
				    valueField:  "alarm_count",
				    title:  "",
				    type:  "column",
				    fillAlphas:  0.9,
				    valueAxis:  "a1",
				    balloonText:  "[[value]] 번",
				    legendValueText:  "[[value]] Count",
				    legendPeriodValueText:  "total: [[value.sum]] Count",
				    lineColor:  "#E74C3C",
				    alphaField:  "alpha",
				  },{
				    id: "g2",
				    valueField: "alarm_tm",
				    classNameField: "bulletClass",
				    title: "",
				    type: "line",
				    valueAxis: "a2",
				    lineColor: "#786c56",
				    lineThickness: 1,
				    legendValueText: "[[description]]/[[value]]",
				    descriptionField: "townName",
				    bullet: "round",
				    bulletSizeField: "alarm_dur",
				    bulletBorderColor: "#786c56",
				    bulletBorderAlpha: 1,
				    bulletBorderThickness: 2,
				    bulletColor: "#000000",
				    labelText: "[[alarm_tm]]",
				    labelPosition: "right",
				    balloonText: "Time:[[value]]",
				    showBalloon: true,
				    animationPlayed: true,
				  }
				  /*,{
				    id: "g3",
				    title: "",
				    valueField: "duration",
				    type: "line",
				    valueAxis: "a3",
				    lineColor: "#ff5755",
				    balloonText: "[[value]]",
				    lineThickness: 1,
				    legendValueText: "[[value]]",
				    bullet: "square",
				    bulletBorderColor: "#ff5755",
				    bulletBorderThickness: 1,
				    bulletBorderAlpha: 1,
				    dashLengthField: "dashLength",
				    animationPlayed: true
				  }*/
				  ],

				  chartCursor: {
				    zoomable: false,
				    categoryBalloonDateFormat: "DD",
				    cursorAlpha: 0,
				    valueBalloonsEnabled: false
				  }
				})
		}
	
			
			//대기발생추이
		    function standbyDateRunInfo() {	    	
		    	AmCharts.makeChart("standbyChart", {
					  type: "serial",
					  theme: "dark",
					  dataDateFormat: "MM/DD",
					  dataProvider: $scope.dateRunInfoList,

					  addClassNames: true,
					  startDuration: 1,
					  color: "#FFFFFF",
					  marginLeft: 0,

					  categoryField: "dt",
					  categoryAxis: {
					    parseDates: true,
					    minPeriod: "DD",
					    autoGridCount: false,
					    gridCount: 50,
					    gridAlpha: 0.1,
					    gridColor: "#FFFFFF",
					    axisColor: "#555555",
					    dateFormats: [{
					        period: 'DD',
					        format: 'DD'
					    }, {
					        period: 'WW',
					        format: 'MMM DD'
					    }, {
					        period: 'MM',
					        format: 'MMM'
					    }, {
					        period: 'YYYY',
					        format: 'YYYY'
					    }]
					  },

					  valueAxes: [{
					    id: "a1",
					    title: "",
					    gridAlpha: 0,
					    axisAlpha: 0
					  },{
					    id: "a2",
					    position: "right",
					    gridAlpha: 0,
					    axisAlpha: 0,
					    labelsEnabled: false
					  }
					  /*,{
					    id: "a3",
					    title: "",
					    position: "right",
					    gridAlpha: 0,
					    axisAlpha: 0,
					    inside: true,
					    duration: "mm",
					    durationUnits: {
					        DD: "d. ",
					        hh: "h ",
					        mm: "min",
					        ss: ""
					    }
					  }*/
					  ],
					  graphs: [{
					    id: "g1",
					    valueField:  "standby_count",
					    title:  "",
					    type:  "column",
					    fillAlphas:  0.9,
					    valueAxis:  "a1",
					    balloonText:  "[[value]] 번",
					    legendValueText:  "[[value]] Count",
					    legendPeriodValueText:  "total: [[value.sum]] Count",
					    lineColor:  "#BDC3C7",
					    alphaField:  "alpha",
					  },{
					    id: "g2",
					    valueField: "standby_tm",
					    classNameField: "bulletClass",
					    title: "",
					    type: "line",
					    valueAxis: "a2",
					    lineColor: "#786c56",
					    lineThickness: 1,
					    legendValueText: "[[description]]/[[value]]",
					    descriptionField: "townName",
					    bullet: "round",
					    bulletSizeField: "alarm_dur",
					    bulletBorderColor: "#786c56",
					    bulletBorderAlpha: 1,
					    bulletBorderThickness: 2,
					    bulletColor: "#000000",
					    labelText: "[[alarm_tm]]",
					    labelPosition: "right",
					    balloonText: "Time:[[value]]",
					    showBalloon: true,
					    animationPlayed: true,
					  }
					  /*,{
					    id: "g3",
					    title: "",
					    valueField: "duration",
					    type: "line",
					    valueAxis: "a3",
					    lineColor: "#ff5755",
					    balloonText: "[[value]]",
					    lineThickness: 1,
					    legendValueText: "[[value]]",
					    bullet: "square",
					    bulletBorderColor: "#ff5755",
					    bulletBorderThickness: 1,
					    bulletBorderAlpha: 1,
					    dashLengthField: "dashLength",
					    animationPlayed: true
					  }*/
					  ],

					  chartCursor: {
					    zoomable: false,
					    categoryBalloonDateFormat: "DD",
					    cursorAlpha: 0,
					    valueBalloonsEnabled: false
					  }
					})
		    }

			//비가동 발생추이
		    function noRunDateRunInfo() {
		    	AmCharts.makeChart("norunChart", {
					  type: "serial",
					  theme: "dark",
					  dataDateFormat: "MM/DD",
					  dataProvider: $scope.dateRunInfoList,

					  addClassNames: true,
					  startDuration: 1,
					  color: "#FFFFFF",
					  marginLeft: 0,

					  categoryField: "dt",
					  categoryAxis: {
					    parseDates: true,
					    minPeriod: "DD",
					    autoGridCount: false,
					    gridCount: 50,
					    gridAlpha: 0.1,
					    gridColor: "#FFFFFF",
					    axisColor: "#555555",
					    dateFormats: [{
					        period: 'DD',
					        format: 'DD'
					    }, {
					        period: 'WW',
					        format: 'MMM DD'
					    }, {
					        period: 'MM',
					        format: 'MMM'
					    }, {
					        period: 'YYYY',
					        format: 'YYYY'
					    }]
					  },

					  valueAxes: [{
					    id: "a1",
					    title: "",
					    gridAlpha: 0,
					    axisAlpha: 0
					  },{
					    id: "a2",
					    position: "right",
					    gridAlpha: 0,
					    axisAlpha: 0,
					    labelsEnabled: false
					  }
					  /*,{
					    id: "a3",
					    title: "",
					    position: "right",
					    gridAlpha: 0,
					    axisAlpha: 0,
					    inside: true,
					    duration: "mm",
					    durationUnits: {
					        DD: "d. ",
					        hh: "h ",
					        mm: "min",
					        ss: ""
					    }
					  }*/
					  ],
					  graphs: [{
					    id: "g1",
					    valueField:  "norun_count",
					    title:  "",
					    type:  "column",
					    fillAlphas:  0.9,
					    valueAxis:  "a1",
					    balloonText:  "[[value]] 번",
					    legendValueText:  "[[value]] Count",
					    legendPeriodValueText:  "total: [[value.sum]] Count",
					    lineColor:  "#F9E79F",
					    alphaField:  "alpha",
					  },{
					    id: "g2",
					    valueField: "norun_tm",
					    classNameField: "bulletClass",
					    title: "",
					    type: "line",
					    valueAxis: "a2",
					    lineColor: "#786c56",
					    lineThickness: 1,
					    legendValueText: "[[description]]/[[value]]",
					    descriptionField: "townName",
					    bullet: "round",
					    bulletSizeField: "alarm_dur",
					    bulletBorderColor: "#786c56",
					    bulletBorderAlpha: 1,
					    bulletBorderThickness: 2,
					    bulletColor: "#000000",
					    labelText: "[[alarm_tm]]",
					    labelPosition: "right",
					    balloonText: "Time:[[value]]",
					    showBalloon: true,
					    animationPlayed: true,
					  }
					  /*,{
					    id: "g3",
					    title: "",
					    valueField: "duration",
					    type: "line",
					    valueAxis: "a3",
					    lineColor: "#ff5755",
					    balloonText: "[[value]]",
					    lineThickness: 1,
					    legendValueText: "[[value]]",
					    bullet: "square",
					    bulletBorderColor: "#ff5755",
					    bulletBorderThickness: 1,
					    bulletBorderAlpha: 1,
					    dashLengthField: "dashLength",
					    animationPlayed: true
					  }*/
					  ],

					  chartCursor: {
					    zoomable: false,
					    categoryBalloonDateFormat: "DD",
					    cursorAlpha: 0,
					    valueBalloonsEnabled: false
					  }
					})
		    }
		
			
			
		function gaugeRunInfo(){
			//라인가동현황 그리드
			self.gauge.run = gaugeRunInfoList["0"].runCount + " 라 인";
			self.gauge.standby = gaugeRunInfoList["0"].standbyCount + " 라 인";
			self.gauge.norun = gaugeRunInfoList["0"].noRunCount + " 라 인";
			self.gauge.alarm = gaugeRunInfoList["0"].alarmCount + " 라 인";
		}
		
	
			var gauge = AmCharts.makeChart("gauge",
					{
						"type": "gauge",
						"marginBottom": 0,
						"marginLeft": 0,
						"marginRight": 0,
						"marginTop": 0,
						"theme": "dark",
						"arrows": [
							{
							}
						],
						"axes": [
							{
								"axisThickness": 1,
								"bottomText": "0 %",
								"bottomTextFontSize": 20,
								"bottomTextYOffset": -20,
								"endValue": 100,
								"id": "GaugeAxis-1",
								"valueInterval": 10,
								"bands": [
									{
										"color": "#00CC00",
										"endValue": 30,
										"id": "GaugeBand-1",
										"startValue": 0
									},
									{
										"color": "#ffac29",
										"endValue": 70,
										"id": "GaugeBand-2",
										"startValue": 30
									},
									{
										"color": "#ea3838",
										"endValue": 100,
										"id": "GaugeBand-3",
										"innerRadius": "95%",
										"startValue": 70
									}
								]
							}
						],
						"allLabels": [],
						"balloon": {},
						"titles": []
					}
				);

	
		function barChart() {
			AmCharts.makeChart("barChart",
					{
						"type": "serial",
						"categoryField": "category",
						"angle": 20,
						"depth3D": 30,
						"sequencedAnimation": false,
						"startDuration": 1,
						"startEffect": "easeOutSine",
						"fontSize": 12,
						"theme": "dark",
						"categoryAxis": {
							"gridPosition": "start"
						},
						"trendLines": [],
						"graphs": [
							{
								"balloonText": "[[title]] of [[category]]:[[value]]",
								"fillAlphas": 1,
								"id": "AmGraph-1",
								"title": "graph 1",
								"type": "column",
								"valueField": "column-1"
							}
						],
						"guides": [],
						"valueAxes": [
							{
								"id": "ValueAxis-1",
								"title": ""
							}
						],
						"allLabels": [],
						"balloon": {},
						"legend": {
							"enabled": false,
							"useGraphSettings": true
						},
						"dataProvider": [
							{
								"category": "category 1",
								"column-1": 8,
								"column-2": 5
							},
							{
								"category": "category 2",
								"column-1": 6,
								"column-2": 7
							},
							{
								"category": "category 3",
								"column-1": 2,
								"column-2": 3
							}
						]
					}
				)
		}
		
		function pie() {
			AmCharts.makeChart("pieChart",
					{
						"type": "pie",
						"angle": 46,
						"pullOutRadius": "5%",
						"balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
						"depth3D": 30,
						"labelRadius": -70,
						"marginBottom": 0,
						"marginTop": 0,
						"startRadius": "100%",
						"sequencedAnimation": false,
						"titleField": "category",
						"valueField": "column-1",
						"theme": "dark",
						"allLabels": [],
						"balloon": {},
						"titles": [],
						"dataProvider": [
							{
								"category": "category 1",
								"column-1": 8
							},
							{
								"category": "category 2",
								"column-1": 6
							},
							{
								"category": "category 3",
								"column-1": 2
							}
						]
					}
				);
		}
		function planProgress(){
			//계획진도율 차트 
			AmCharts.makeChart("chartdiv",
					{
						"type": "serial",
						"rotate": true,
						"categoryField": "lineNm",
						"angle": 30,
						"autoMarginOffset": 20,
						"depth3D": 20,
						"marginRight": 10,
						"marginTop": 30,
						"plotAreaBorderAlpha": 0.36,
						"plotAreaBorderColor": "#008000",
						"plotAreaFillAlphas": 0.46,
						"sequencedAnimation": false,
						"startDuration": 1,
						"startEffect": "easeOutSine",
						"backgroundColor": "#E7E7E7",
						"borderColor": "#E7E7E7",
						"fontSize": 13,
						"theme": "default",
						"categoryAxis": {
							"gridPosition": "start"
						},
						"trendLines": [],
						"graphs": [
							{
								"balloonText": "[[title]] of [[category]]:[[value]]",
								"columnWidth": 0.61,
								"fillAlphas": 1,
								"fillColors": "#008000",
								"fixedColumnWidth": 20,
								"fontSize": 4,
								"id": "AmGraph-1",
								"labelText": "",
								"lineColor": "#008000",
								"negativeLineAlpha": 0,
								"title": "graph 1",
								"type": "column",
								"valueField": "curCountPer"
							},
							{
								"balloonColor": "#FFFFFF",
								"columnWidth": 0.45,
								"fillAlphas": 1,
								"fillColors": "#FF8000",
								"fixedColumnWidth": 20,
								"id": "AmGraph-5",
								"lineAlpha": 0,
								"lineColor": "#FFFFFF",
								"lineThickness": 2,
								"negativeLineAlpha": 0,
								"negativeLineColor": "#E7E7E7",
								"tabIndex": 1,
								"title": "graph 5",
								"type": "column",
								"valueField": "goalCountPer"
							}
						],
						"guides": [],
						"valueAxes": [
							{
								"id": "ValueAxis-1",
								"stackType": "100%",
								"title": ""
							}
						],
						"allLabels": [],
						"balloon": {},
						"titles": [],
						"dataProvider": $scope.planProgressList
					}
				)
		}
		
		function planProgress2(){
			//계획진도율 차트 
			AmCharts.makeChart("barChart2",
					{
						"type": "serial",
						"rotate": false,
						"categoryField": "lineNm",
						"angle": 30,
						"autoMarginOffset": 20,
						"depth3D": 20,
						"marginRight": 10,
						"marginTop": 30,
						"plotAreaBorderAlpha": 0.36,
						"plotAreaBorderColor": "#008000",
						"plotAreaFillAlphas": 0.46,
						"sequencedAnimation": false,
						"startDuration": 1,
						"startEffect": "easeOutSine",
						"backgroundColor": "#E7E7E7",
						"borderColor": "#E7E7E7",
						"fontSize": 13,
						"theme": "default",
						"categoryAxis": {
							"gridPosition": "start"
						},
						"trendLines": [],
						"graphs": [
							{
								"balloonText": "[[title]] of [[category]]:[[value]]",
								"columnWidth": 0.61,
								"fillAlphas": 1,
								"fillColors": "#008000",
								"fixedColumnWidth": 20,
								"fontSize": 4,
								"id": "AmGraph-1",
								"labelText": "",
								"lineColor": "#008000",
								"negativeLineAlpha": 0,
								"title": "graph 1",
								"type": "column",
								"valueField": "curCountPer"
							},
							{
								"balloonColor": "#FFFFFF",
								"columnWidth": 0.45,
								"fillAlphas": 1,
								"fillColors": "#FF8000",
								"fixedColumnWidth": 20,
								"id": "AmGraph-5",
								"lineAlpha": 0,
								"lineColor": "#FFFFFF",
								"lineThickness": 2,
								"negativeLineAlpha": 0,
								"negativeLineColor": "#E7E7E7",
								"tabIndex": 1,
								"title": "graph 5",
								"type": "column",
								"valueField": "goalCountPer"
							}
						],
						"guides": [],
						"valueAxes": [
							{
								"id": "ValueAxis-1",
								"stackType": "100%",
								"title": ""
							}
						],
						"allLabels": [],
						"balloon": {},
						"titles": [],
						"dataProvider": $scope.planProgressList
					}
				)
		}


			//워커 스타트
		   workerList.workerStart(workerList.worker2, "worker2.js", getData);
	
	
		
	}]);
