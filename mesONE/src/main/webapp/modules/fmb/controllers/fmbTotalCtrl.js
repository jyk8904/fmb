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
angular.module('app').controller('FmbTotalCtrl',[	'CmmAjaxService',
													'CmmWorkerSrvc',
													'$http',
													'$scope',
													'$window',
													'$q',
													'$timeout',
													'$mdSidenav',
	function(CmmAjaxService, CmmWorkerSrvc, $http, $scope, $window,	$q, $timeout, $mdSidenav) {
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
		// 변수 선언 및 디폴트 값 세팅 
		$scope.dateRunInfoList = {};
		$scope.planProgressList = {};	

		self.info = {
				alarm : { firstTitle : "null", firstValue : "null", secondTitle : "null", secondValue : "null", thirdTitle : "null", thirdValue : "null" },
				norun : { firstTitle : "null", firstValue : "null", secondTitle : "null", secondValue : "null", thirdTitle : "null", thirdValue : "null" },
				standby : { firstTitle : "null", firstValue : "null", secondTitle : "null", secondValue : "null", thirdTitle : "null", thirdValue : "null" }
		};
		
		self.gauge = {
				run: "null", standby: "null", norun: "null", alarm: "null"
		};
			
		
	/*------------------------------------------
	 * Function 호출
	 *-----------------------------------------*/
		
		// 모바일 체크 함수 실행
		isMobileFunc();
		
		//함수 호출 제일 중요 부분
		//모바일과 데스크탑에 따른 함수호출분기
		if ($scope.isMobile) {
			MobileGetData();
		} else {
			getData();
		}

	/*------------------------------------------
	 * Function 선언
	 *-----------------------------------------*/
		
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
		
		// 데스크탑일 경우 함수 정의
		function getData()
		{
			getPlanProgress();
			getGaugeRunRate();
			getGaugeRunInfo();
			getDateRunInfo();
			getRankRunInfo();
			gauge();
			pie();
			barChart();
		}
		
		//모바일일 경우 함수 정의
		function MobileGetData()
		{
			getPlanProgress();
			getGaugeRunRate();
			getGaugeRunInfo();
			getDateRunInfo();
			getRankRunInfo();
			MobileGauge();
			MobilePie();
			MobileBarChart();
		}
		
		
		// 모바일 & 데스크탑에서 사용 되는 함수 정의
		// 공용 함수 정의
		
		function getPlanProgress() {
			// 계획진도율 가져오기
			var planProgressPromise = CmmAjaxService.select("/mes/bas/selectPlanProgress.do");
				planProgressPromise.then(function(data) {
				$scope.planProgressList = data;			

				if ($scope.isMobile){
					MobilePlanProgress();
				} else {
					planProgress();
				}

			}, function(data) {
				alert('fail: ' + data)
			});	
		}
		
		function getGaugeRunRate() {
			// 라인가동현황게이지 가져오기
			var gaugeRunRatePromise = CmmAjaxService.select("/mes/bas/selectGaugeRunRate.do");
				gaugeRunRatePromise.then(function(data) {
				self.gaugeRunRateList = data;						
			}, function(data) {
				alert('fail: ' + data)
			});
		}	
		
		function getGaugeRunInfo() {	
			// 라인가동현황 그리드 가져오기
			var gaugeRunInfoPromise = CmmAjaxService.select("/mes/bas/selectGaugeRunInfo.do");
				gaugeRunInfoPromise.then(function(data) {
				gaugeRunInfoList = data;						

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
				
				if ($scope.isMobile) {
					MobileAlarmDateRunInfo();
					MobileStandbyDateRunInfo();
					MobileNoRunDateRunInfo();
				} else {
					alarmDateRunInfo();
					standbyDateRunInfo();
					noRunDateRunInfo();
				}
	
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
		
	
		
		/* Desktop Function */
		// 데스크탑에서만 사용되는 함수 정의
		function gauge() {
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
							"value": "30"
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
			
			/*gauge.arrows[0].setValue(self.gaugeRunRateList[0].lineGauge.toString());
			gauge.axes[0].setBottomText(self.gaugeRunRateList[0].lineGauge.toString() + "%");*/
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
				    lineThickness: 2,
				    legendValueText: "[[description]]/[[value]]",
				    descriptionField: "townName",
				    bullet: "round",
				    bulletSizeField: "alarm_dur",
				    bulletBorderColor: "#786c56",
				    bulletBorderAlpha: 1,
				    bulletBorderThickness: 3,
				    bulletColor: "#000000",
				    labelText: "[[alarm_tm]]",
				    labelPosition: "right",
				    balloonText: "Time:[[value]]",
				    showBalloon: true,
				    animationPlayed: true,
				  }],
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
					  }],
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
					    lineThickness: 2,
					    legendValueText: "[[description]]/[[value]]",
					    descriptionField: "townName",
					    bullet: "round",
					    bulletSizeField: "alarm_dur",
					    bulletBorderColor: "#786c56",
					    bulletBorderAlpha: 1,
					    bulletBorderThickness: 3,
					    bulletColor: "#000000",
					    labelText: "[[alarm_tm]]",
					    labelPosition: "right",
					    balloonText: "Time:[[value]]",
					    showBalloon: true,
					    animationPlayed: true,
					  }],
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
					  }],
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
					    lineThickness: 2,
					    legendValueText: "[[description]]/[[value]]",
					    descriptionField: "townName",
					    bullet: "round",
					    bulletSizeField: "alarm_dur",
					    bulletBorderColor: "#786c56",
					    bulletBorderAlpha: 1,
					    bulletBorderThickness: 3,
					    bulletColor: "#000000",
					    labelText: "[[alarm_tm]]",
					    labelPosition: "right",
					    balloonText: "Time:[[value]]",
					    showBalloon: true,
					    animationPlayed: true,
					  }],
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
						"categoryAxis": {
							"gridPosition": "start"
						},
						"trendLines": [],
						"graphs": [
							{
								"balloonText": "[[title]] of [[category]]:[[value]]",
								"fillAlphas": 1,
								"fillColors": "#DD4635",
								"id": "AmGraph-1",
								"lineAlpha": 0,
								"lineColor": "#FFFFFF",
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
								"column-1": 4,
								"column-2": 3
							},
							{
								"category": "category 4",
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
							{ "category": "category 1", "column-1": 8, "color": "BC596A"},
							{ "category": "category 2", "column-1": 6, "color": "386E85"},
							{ "category": "category 3", "column-1": 2, "color": "ECBD89"},
							{ "category": "category 4", "column-1": 2, "color": "7F75C1"},
							{ "category": "category 5", "column-1": 2, "color": "678D5A"},
							{ "category": "기타 (ETC)", "column-1": 2, "color": "B886DC"}]
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
						"angle": 10,
						"autoMarginOffset": 20,
						"depth3D": 10,
						"marginRight": 10,
						"marginTop": 30,
						"plotAreaBorderAlpha": 0,
						"plotAreaBorderColor": "#008000",
						"plotAreaFillAlphas": 0,
						"sequencedAnimation": false,
						"startDuration": 1,
						"startEffect": "easeOutSine",
						"backgroundColor": "#E7E7E7",
						"borderColor": "#E7E7E7",
						"fontSize": 13,
						"theme": "default",
						"categoryAxis": {
							"gridPosition": "start",
							"gridAlpha": 0.2,
							"gridColor": "#E5E5E5",
							"color": "#E7E7E7",
							"axisAlpha": 0
						},
						"trendLines": [],
						"graphs": [
							{
								"balloonText": "[[title]] of [[category]]:[[value]]",
								"columnWidth": 0.61,
								"fillAlphas": 1,
								"fillColors": "#ecbd89",
								"fixedColumnWidth": 20,
								"fontSize": 4,
								"id": "AmGraph-1",
								"labelText": "",
								"lineAlpha": 0,
								"lineColor": "#FFFFFF",
								"negativeLineAlpha": 0,
								"title": "graph 1",
								"type": "column",
								"valueField": "curCountPer"
							},
							{
								"balloonColor": "#FFFFFF",
								"columnWidth": 0.45,
								"fillAlphas": 1,
								"fillColors": "#4F8298",
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
								"title": "",
								"gridAlpha": 0.2,
								"gridColor": "#E5E5E5",
								"color": "#E7E7E7"
							}
						],
						"allLabels": [],
						"balloon": {},
						"titles": [],
						"dataProvider": $scope.planProgressList
					}
				)
		}
		
		
		/* Mobile Function */
		// 모바일에서만 사용되는 함수 정의
		
		function MobileGauge() {
			var MobileGauge = AmCharts.makeChart("MobileGauge",
				{
					"type": "gauge",
					"marginBottom": 0,
					"marginLeft": 0,
					"marginRight": 0,
					"marginTop": 0,
					"theme": "dark",
					"arrows": [
						{
							"value": "30"
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
			
			/*gauge.arrows[0].setValue(self.gaugeRunRateList[0].lineGauge.toString());
			gauge.axes[0].setBottomText(self.gaugeRunRateList[0].lineGauge.toString() + "%");*/
		}
		
		//알람발생추이
		function MobileAlarmDateRunInfo() {
			AmCharts.makeChart("MobileAlarmChart", {
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
				    lineThickness: 2,
				    legendValueText: "[[description]]/[[value]]",
				    descriptionField: "townName",
				    bullet: "round",
				    bulletSizeField: "alarm_dur",
				    bulletBorderColor: "#786c56",
				    bulletBorderAlpha: 1,
				    bulletBorderThickness: 3,
				    bulletColor: "#000000",
				    labelText: "[[alarm_tm]]",
				    labelPosition: "right",
				    balloonText: "Time:[[value]]",
				    showBalloon: true,
				    animationPlayed: true,
				  }],
				  chartCursor: {
				    zoomable: false,
				    categoryBalloonDateFormat: "DD",
				    cursorAlpha: 0,
				    valueBalloonsEnabled: false
				  }
				})
			}
	
			
			//대기발생추이
		    function MobileStandbyDateRunInfo() {	    	
		    	AmCharts.makeChart("MobileStandbyChart", {
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
					  }],
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
					    lineThickness: 2,
					    legendValueText: "[[description]]/[[value]]",
					    descriptionField: "townName",
					    bullet: "round",
					    bulletSizeField: "alarm_dur",
					    bulletBorderColor: "#786c56",
					    bulletBorderAlpha: 1,
					    bulletBorderThickness: 3,
					    bulletColor: "#000000",
					    labelText: "[[alarm_tm]]",
					    labelPosition: "right",
					    balloonText: "Time:[[value]]",
					    showBalloon: true,
					    animationPlayed: true,
					  }],
					  chartCursor: {
					    zoomable: false,
					    categoryBalloonDateFormat: "DD",
					    cursorAlpha: 0,
					    valueBalloonsEnabled: false
					  }
					})
		    }

			//비가동 발생추이
		    function MobileNoRunDateRunInfo() {
		    	AmCharts.makeChart("MobileNorunChart", {
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
					  }],
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
					    lineThickness: 2,
					    legendValueText: "[[description]]/[[value]]",
					    descriptionField: "townName",
					    bullet: "round",
					    bulletSizeField: "alarm_dur",
					    bulletBorderColor: "#786c56",
					    bulletBorderAlpha: 1,
					    bulletBorderThickness: 3,
					    bulletColor: "#000000",
					    labelText: "[[alarm_tm]]",
					    labelPosition: "right",
					    balloonText: "Time:[[value]]",
					    showBalloon: true,
					    animationPlayed: true,
					  }],
					  chartCursor: {
					    zoomable: false,
					    categoryBalloonDateFormat: "DD",
					    cursorAlpha: 0,
					    valueBalloonsEnabled: false
					  }
					})
		    }
		function MobilePie() {
			AmCharts.makeChart("MobilePieChart",
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
							{ "category": "category 1", "column-1": 8, "color": "BC596A"},
							{ "category": "category 2", "column-1": 6, "color": "386E85"},
							{ "category": "category 3", "column-1": 2, "color": "ECBD89"},
							{ "category": "category 4", "column-1": 2, "color": "7F75C1"},
							{ "category": "category 5", "column-1": 2, "color": "678D5A"},
							{ "category": "기타 (ETC)", "column-1": 2, "color": "B886DC"}]
					}
				);
		}
		function MobileBarChart() {
			AmCharts.makeChart("MobileBarChart",
					{
						"type": "serial",
						"categoryField": "category",
						"angle": 20,
						"depth3D": 30,
						"sequencedAnimation": false,
						"startDuration": 1,
						"startEffect": "easeOutSine",
						"fontSize": 12,
						"categoryAxis": {
							"gridPosition": "start"
						},
						"trendLines": [],
						"graphs": [
							{
								"balloonText": "[[title]] of [[category]]:[[value]]",
								"fillAlphas": 1,
								"fillColors": "#DD4635",
								"id": "AmGraph-1",
								"lineAlpha": 0,
								"lineColor": "#FFFFFF",
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
								"column-1": 4,
								"column-2": 3
							},
							{
								"category": "category 4",
								"column-1": 2,
								"column-2": 3
							}
						]
					}
				)
		}
		function MobilePlanProgress(){
			//계획진도율 차트 
			AmCharts.makeChart("MobilePlanProgress",
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
