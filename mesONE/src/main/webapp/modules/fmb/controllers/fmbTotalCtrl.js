
/**
 * @Class Name : fmbTotalCtrl.js
 * @Description : fmbTotal
 * @Modification Information 
 * @ 
 * @ 작업일 작성자 내용
 * @ ---------- ---------
 * ------------------------------- 
 * @ 2017.05.29 정유경 최초생성 
 * @ 2017.09.15 조준연 수정
 * 
 */

'use strict';
angular.module('app').controller('FmbTotalCtrl',['CmmAjaxService','CmmWorkerSrvc','$http','$scope','$window','$q','$timeout','$mdSidenav','$interval','$location',										
	function(CmmAjaxService, CmmWorkerSrvc, $http, $scope, $window,	$q, $timeout, $mdSidenav, $interval, $location) {

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
		var interval;
		var gauge = null;
		var defectPie = null;
		var defectBar = null;
		var ajaxCall = null;
		var chartCall = null;
		var filteredData = null;
		var splitChartInterval = null;
		var splitChartData = null;
		var chartFlag = false;
		var rankRunInfoList = null;
		var gaugeRunInfoList = null;
		var defectRankList = null;
		var defectRate = null;
		
		$scope.isMobile = false;
		// 변수 선언 및 디폴트 값 세팅 
		$scope.dateRunInfoList = {};
		$scope.planProgressList = {};
		$scope.defectChart = {};
		
		filteredData = [{ actYn: "", avgCount: "-1146", avgCountPer: "-157", curCountPer: "102", desc: "null", goalCount: "730", goalCountPer: "0", lineCd: "0802", lineNm: "AXLE ASS'Y\n(DH/HI/KH)", totCount: "749" }
	    , { actYn: "", avgCount: "-1146", avgCountPer: "-157", curCountPer: "102", desc: "null", goalCount: "20", goalCountPer: "0", lineCd: "0802", lineNm: "AXLE ASS'Y\n(DH/HI/KH)1", totCount: "549" }
	    , { actYn: "", avgCount: "-1146", avgCountPer: "-157", curCountPer: "102", desc: "null", goalCount: "200", goalCountPer: "0", lineCd: "0802", lineNm: "AXLE ASS'Y\n(DH/HI/KH)2", totCount: "249"}];

		self.info = {
				alarm : { firstTitle : "null", firstValue : "null", secondTitle : "null", secondValue : "null", thirdTitle : "null", thirdValue : "null" },
				norun : { firstTitle : "null", firstValue : "null", secondTitle : "null", secondValue : "null", thirdTitle : "null", thirdValue : "null" },
				standby : { firstTitle : "null", firstValue : "null", secondTitle : "null", secondValue : "null", thirdTitle : "null", thirdValue : "null" }
		};
		self.defect = {
				firstNm: null, firstCount: null, secondNm: null, secondCount: null, thirdNm: null, thirdCount: null, forthNm: null, forthCount: null,
				fifthNm: null, fifthCount: null, etcNm: null, etcCount: null, wholeRate: null
		};
		
		self.gauge = {run: "null", standby: "null", norun: "null", alarm: "null"};

		var SettingTime = workerList.worker2.data;
		
		for(var i =0; i < SettingTime.length; i++){
			if('/'+ SettingTime[i].pageNm== $location.url()){
				var thisDataTime= SettingTime[i].dataTime * 1000
				break;
			}
		}
		
		ajaxCall = function() {
			getDefectInfo();
			getDateRunInfo();
			getGaugeRunRate();
			getGaugeRunInfo();	
			getRankRunInfo();
			getPlanProgress();
			//Amcharts.clear();
			$timeout.cancel(ajaxCall);
		}
		
		chartCall = function() {
			if (chartFlag == true){
				AmCharts.clear();
			}
			chartBind();
			$timeout.cancel(chartCall);
			chartFlag = true;
		}
		
	/*------------------------------------------
	 * Function 호출
	 *-----------------------------------------*/
		//함수 호출 제일 중요 부분
		//모바일과 데스크탑에 따른 함수호출분기
			
		angular.element(document).ready(function(){//페이지 로드 후에 실행
			// 모바일 체크 함수 실행
			isMobileFunc();
			if ($scope.isMobile) {
				MobileGetData();
			} else {	
				getData();
			}
		});
	/*------------------------------------------
	 * Function 선언
	 *-----------------------------------------*/
		
		// 모바일 체크 함수 정의
		function isMobileFunc(){
			var UserAgent = navigator.userAgent;

			if (UserAgent.match(/iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null)
			{
				$scope.isMobile = true;
			}else{
				$scope.isMobile =  false;
			}
		}
		
		// 데스크탑일 경우 함수 정의
		function getData()
		{
			$timeout(ajaxCall, 10);
		}
		
		//모바일일 경우 함수 정의
		function MobileGetData()
		{
			$timeout(ajaxCall, 10);
		}
				
		function splitPlanProgress() {
			var firstFlag = true;
			var count = 3;														// 다량의 데이터를 나눠 보여줄 횟수
			var quotient = parseInt($scope.planProgressList.length /count); 	// 몫: 한번에 보여줄 데이터 갯수
			var remainder = $scope.planProgressList.length % quotient;			// 나머지
			var startRan =0;													// 한번에 보여줄 데이터의 첫번째 num
			var endRan =0;														// 한번에 보여줄 데이터의 마지막 num
			getFltrdData();
			//FmbTotal의 (datatime/횟수)를 interval 지정하여 다량의 데이터를 나눠보여줌 
			$interval.cancel(splitChartInterval);
			splitChartInterval = $interval( getFltrdData, thisDataTime/count, count-1); 
						
			function getFltrdData(){
				if (firstFlag == true){
					startRan = 0;
					endRan = 0;
				}
				var filteredData = [];
				startRan= endRan;
				if(remainder!=0){
					remainder -= 1;
					endRan= endRan + quotient + 1;
				}else{
					endRan= endRan + quotient;
				}
				splitChartData = function(){
					$timeout.cancel(splitChartData);
					for(var j=startRan; j<endRan; j++){
						filteredData.push($scope.planProgressList[j]);
					}
					if ($scope.isMobile) {
                        MobilePlanProgress();
                    } else {
                        planProgress(filteredData);
                    }
					firstFlag = false;
				}
				$timeout(splitChartData, 30);
			}
		}
		
		function getPlanProgress() {
			// 계획진도율 가져오기
			var planProgressPromise = CmmAjaxService.select("/fmb/bas/selectPlanProgress.do");
				planProgressPromise.then(function(data) {
					planProgressPromise = null;
					$scope.planProgressList = data;
					splitPlanProgress();
			}, function(data) {
				alert('fail: ' + data)
			});	
		}
		
		function getDefectInfo() {
			// 계획진도율 가져오기
			var getDefectChart = CmmAjaxService.select("/fmb/bas/selectFmbDefectChart.do");
					getDefectChart.then(function(data) {
					getDefectChart = null;
					$scope.defectChart = data;
					
					if ($scope.isMobile){
						MobilePie();
					} else {		
						pie();
					}
					
			}, function(data) {
				alert('fail: ' + data)
			});
			
			var getDefectRank = CmmAjaxService.select("/fmb/bas/selectFmbDefectRank.do");
					getDefectRank.then(function(data) {
					getDefectRank = null;
					defectRankList = data;
					
					defectInfo();
					if ($scope.isMobile){
						MobileBarChart();
					} else {		
						barChart();
					}
			}, function(data) {
				alert('fail: ' + data)
			});
				
			var getDefectRate = CmmAjaxService.select("/fmb/bas/selectFmbDefectRate.do");
					getDefectRate.then(function(data) {
					getDefectRate = null;
					defectRate = data;
					
					defectInfo2();
			}, function(data) {
				alert('fail: ' + data)
			});	
		}
		
		function getGaugeRunRate() {
			// 라인가동현황게이지 가져오기
			var gaugeRunRatePromise = CmmAjaxService.select("/fmb/bas/selectGaugeRunRate.do");
				gaugeRunRatePromise.then(function(data) {
					gaugeRunRatePromise = null;
					self.gaugeRunRateList = data;
					if ($scope.isMobile){
						MobileGaugeFunc();
					} else {
						gaugeFunc();
					}
				}, function(data) {
					alert('fail: ' + data)
				});			
		}	
		
		function getGaugeRunInfo() {	
			// 라인가동현황 그리드 가져오기
			var gaugeRunInfoPromise = CmmAjaxService.select("/fmb/bas/selectGaugeRunInfo.do");
				gaugeRunInfoPromise.then(function(data) {
					gaugeRunInfoPromise = null;
					gaugeRunInfoList = data;
					self.gaugeRunInfoList =  data;
					console.log(gaugeRunInfoList)
				}, function(data) {
					alert('fail: ' + data)
				});
		}
		
		function getDateRunInfo() {
			//설비상태 발생추이 가져오기
			var dateRunInfoPromise = CmmAjaxService.select("/fmb/bas/selectDateRunInfo.do");
				dateRunInfoPromise.then(function(data) {
					dateRunInfoPromise = null;
					$scope.dateRunInfoList = data;
					//$scope.dateRunInfoList[data.length-1].bulletClass = "lastBullet";
					
					if ($scope.isMobile){
						MobileAlarmDateRunInfo();
						MobileStandbyDateRunInfo();
					} else {		
						alarmDateRunInfo();
						standbyDateRunInfo();
					}
					
			}, function(data) {
				alert('fail: ' + data)
			});		
		}	
		
		function getRankRunInfo() {
			//설비상태별 발생량 순위 가져오기
			var rankRunInfoPromise = CmmAjaxService.select("/fmb/bas/selectRankRunInfo.do");
				rankRunInfoPromise.then(function(data) {
					rankRunInfoPromise = null;
					rankRunInfoList = data;
					rankRunInfo();
			}, function(data) {
				alert('fail: ' + data)
			});
		}	
		
		function defectInfo(){
			if (defectRankList != null || angular.isUndefined(defectRankList) == false) {
				self.defect.firstNm = defectRankList["0"].itemNm;
				self.defect.firstCount = defectRankList["0"].rankCount;
				self.defect.secondNm = defectRankList["1"].itemNm;
				self.defect.secondCount = defectRankList["1"].rankCount;
				self.defect.thirdNm = defectRankList["2"].itemNm;
				self.defect.thirdCount = defectRankList["2"].rankCount;
				self.defect.forthNm = defectRankList["3"].itemNm;
				self.defect.forthCount = defectRankList["3"].rankCount;
				self.defect.fifthNm = defectRankList["4"].itemNm;
				self.defect.fifthCount = defectRankList["4"].rankCount;
				self.defect.etcNm = defectRankList["5"].itemNm;
				self.defect.etcCount = defectRankList["5"].rankCount;
			}
		}
		
		function defectInfo2(){
			if (defectRate != null || angular.isUndefined(defectRate) == false) {
				self.defect.wholeRate = defectRate["0"].wholeRate + " PPM";
			}
		}
			
		function rankRunInfo(){
			//알람 발생량 순위 그리드
			if (rankRunInfoList !=  null || angular.isUndefined(rankRunInfoList) == false){
				self.info.alarm.firstTitle = rankRunInfoList["0"].alarmNm;
				self.info.alarm.firstValue = rankRunInfoList["0"].alarmTm+ "시간 (" + rankRunInfoList["0"].alarmCount + " 번)";
				self.info.alarm.secondTitle = rankRunInfoList["1"].alarmNm;
				self.info.alarm.secondValue = rankRunInfoList["1"].alarmTm+ "시간 (" + rankRunInfoList["1"].alarmCount + " 번)";
				self.info.alarm.thirdTitle = rankRunInfoList["2"].alarmNm;
				self.info.alarm.thirdValue = rankRunInfoList["2"].alarmTm+ "시간 (" + rankRunInfoList["2"].alarmCount + " 번)";
				//대기 발생량 순위 그리드
				self.info.standby.firstTitle = rankRunInfoList["0"].standbysNm;
				self.info.standby.firstValue = rankRunInfoList["0"].standbyTm+ "시간 (" + rankRunInfoList["0"].standbyCount + " 번)";
				self.info.standby.secondTitle = rankRunInfoList["1"].standbysNm;
				self.info.standby.secondValue = rankRunInfoList["1"].standbyTm+ "시간 (" + rankRunInfoList["1"].standbyCount + " 번)";
				self.info.standby.thirdTitle = rankRunInfoList["2"].standbysNm;
				self.info.standby.thirdValue = rankRunInfoList["2"].standbyTm+ "시간 (" + rankRunInfoList["2"].standbyCount + " 번)";
			}	
		}	

		/* Desktop Function */
		// 데스크탑에서만 사용되는 함수 정의
		function gaugeFunc() {
		 gauge = AmCharts.makeChart("gauge",{"type": "gauge","marginBottom": 0,"marginLeft": 0,"marginRight": 0,"marginTop": 0,"theme": "dark","startDuration": 0,"arrows": [{}],"axes": [{	"axisThickness": 1,"bottomText":  "0%","bottomTextFontSize": 20,"bottomTextYOffset": -20,"endValue": 100,"id": "GaugeAxis-1","valueInterval": 10,"bands": [{"color": "#00CC00","endValue": 30,"id": "GaugeBand-1","startValue": 0},{"color": "#ffac29","endValue": 70,"id": "GaugeBand-2","startValue": 30},{"color": "#ea3838","endValue": 100,"id": "GaugeBand-3","innerRadius": "95%","startValue": 70}]}],"allLabels": [],"balloon": {},"titles": []});
		 	if (self.gaugeRunRateList != null || angular.isUndefined(self.gaugeRunRateList) == false)
	 		{
		 		gauge.arrows[0].setValue(self.gaugeRunRateList[0].lineGauge);
				gauge.axes[0].setBottomText(self.gaugeRunRateList[0].lineGauge.toString() + "%");
				gauge.validateData();
	 		}
		 	
		 	if (gaugeRunInfoList != null || angular.isUndefined(gaugeRunInfoList) == false)
		 	{
		 		//라인가동현황 그리드
				self.gauge.run = gaugeRunInfoList["0"].runCount + " 라 인";
				self.gauge.standby = gaugeRunInfoList["0"].standbyCount + " 라 인";
				self.gauge.norun = gaugeRunInfoList["0"].noRunCount + " 라 인";
				self.gauge.alarm = gaugeRunInfoList["0"].alarmCount + " 라 인";
		 	}
		}
		
		//알람발생추이
		function alarmDateRunInfo() {
			AmCharts.makeChart("alarmChart", { type: "serial", theme: "dark", dataDateFormat: "YYYYMMDD", dataProvider: $scope.dateRunInfoList, addClassNames: true, color: "#FFFFFF", marginLeft: 0, categoryField: "dt", categoryAxis: { parseDates: true, minPeriod: "DD", autoGridCount: false, gridCount: 50, gridAlpha: 0.1, gridColor: "#FFFFFF", axisColor: "#555555", dateFormats: [{ period: 'DD', format: 'DD' }, { period: 'WW', format: 'MMM DD' }, { period: 'MM', format: 'MMM' }, { period: 'YYYY', format: 'YYYY'}] }, valueAxes: [{ id: "a1", title: "", gridAlpha: 0, axisAlpha: 0 }, { id: "a2", position: "right", gridAlpha: 0, axisAlpha: 0, labelsEnabled: false}], graphs: [{ id: "g1", valueField: "alarm_count", type: "column", fillAlphas: 0.9, valueAxis: "a1", balloonText: "[[value]] 번", legendValueText: "[[value]] Count", legendPeriodValueText: "total: [[value.sum]] Count", lineColor: "#E74C3C", alphaField: "alpha" },{ id: "g2", valueField: "alarm_tm", type: "line", valueAxis: "a2", lineColor: "#ea9170", bullet: "round", bulletSize: 11, lineThickness: 3, legendValueText: "[[description]]/[[value]]", labelText: "[[alarm_tm]]", labelPosition: "right", balloonText: "Time:[[value]]", showBalloon: true, animationPlayed: true}], chartCursor: { zoomable: false, categoryBalloonDateFormat: "DD", cursorAlpha: 0, valueBalloonsEnabled: false} });				
		}
		
		//대기발생추이
		function standbyDateRunInfo() {	    	
		    AmCharts.makeChart("standbyChart", { type: "serial", theme: "dark", dataDateFormat: "YYYYMMDD", dataProvider: $scope.dateRunInfoList, addClassNames: true, color: "#FFFFFF", marginLeft: 0, categoryField: "dt", categoryAxis: { parseDates: true, minPeriod: "DD", autoGridCount: false, gridCount: 50, gridAlpha: 0.1, gridColor: "#FFFFFF", axisColor: "#555555", dateFormats: [{ period: 'DD', format: 'DD' }, { period: 'WW', format: 'MMM DD' }, { period: 'MM', format: 'MMM' }, { period: 'YYYY', format: 'YYYY'}] }, valueAxes: [{ id: "a1", title: "", gridAlpha: 0, axisAlpha: 0 }, { id: "a2", position: "right", gridAlpha: 0, axisAlpha: 0, labelsEnabled: false}], graphs: [{ id: "g1", valueField: "standby_count", type: "column", fillAlphas: 0.9, valueAxis: "a1", balloonText: "[[value]] 번", legendValueText: "[[value]] Count", legendPeriodValueText: "total: [[value.sum]] Count", lineColor: "#BDC3C7", alphaField: "alpha" },{ id: "g2", valueField: "standby_tm", type: "line", valueAxis: "a2", lineColor: "#f9fcfc", bullet: "round", bulletSize: 11, lineThickness: 3, legendValueText: "[[description]]/[[value]]", labelText: "[[alarm_tm]]", labelPosition: "right", balloonText: "Time:[[value]]", showBalloon: true, animationPlayed: true}], chartCursor: { zoomable: false, categoryBalloonDateFormat: "DD", cursorAlpha: 0, valueBalloonsEnabled: false} });
		}

		function barChart() {
			defectBar = AmCharts.makeChart("barChart",{"type": "serial","categoryField": "rankNum","angle": 20,"depth3D": 30,"sequencedAnimation": false,"startDuration": 0,"startEffect": "easeOutSine","fontSize": 12,"plotAreaBorderAlpha": 0,"plotAreaBorderColor": "#008000","plotAreaFillAlphas": 0,"backgroundColor": "#E7E7E7","borderColor": "#E7E7E7","categoryAxis": {"gridPosition": "start","gridColor": "#E5E5E5","color": "#E7E7E7","labelFunction": function(rankNum){return rankNum + "순위"}},"trendLines": [],"graphs": [{"balloonText": "[[category]] 순위:[[itemNm]] ([[value]] 개)","fillAlphas": 1,"fillColors": "#DD4635","id": "AmGraph-1","lineAlpha": 0,"lineColor": "#FFFFFF","title": "graph 1","type": "column","valueField": "rankCount"}],"guides": [],"valueAxes": [{"id": "rankCount","title": "","gridColor": "#E5E5E5","color": "#E7E7E7"}],"allLabels": [],"balloon": {},"legend": {"enabled": false,"useGraphSettings": true},"dataProvider": defectRankList})
			defectBar.validateData();
		}
		
		function pie() {
			defectPie = AmCharts.makeChart("pieChart",{"type": "pie","angle": 46,"pullOutRadius": "5%","balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]개</b> ([[percents]]%)</span>","labelText":"[[title]]<br>[[value]]개 ([[percents]]%)","depth3D": 30,"labelRadius": -70,"marginBottom": 0,"marginTop": 0,"startRadius": "100%","startDuration": 0,"sequencedAnimation": false,"titleField": "defectNm","valueField": "defectCount","theme": "dark","allLabels": [],"balloon": {},"titles": [],"dataProvider": $scope.defectChart});
			defectPie.validateData();
		}
		
		function planProgress(filteredData){
			//계획진도율 차트 
			AmCharts.makeChart("chartdiv",{"type": "serial","rotate": true,"categoryField": "lineNm","angle": 10,"autoMarginOffset": 20,"depth3D": 10,"marginRight": 10,"marginTop": 30,"plotAreaBorderAlpha": 0,"plotAreaBorderColor": "#008000","plotAreaFillAlphas": 0,"sequencedAnimation": false,"startDuration": 0,"startEffect": "easeOutSine","backgroundColor": "#E7E7E7","borderColor": "#E7E7E7","fontSize": 13,"theme": "default","categoryAxis": {"gridPosition": "start","gridAlpha": 0.2,"gridColor": "#E5E5E5","color": "#E7E7E7","axisAlpha": 0},"trendLines": [],"graphs": [{"balloonText": "[[lineNm]] \n 진도율:[[curCountPer]] % 진행","columnWidth": 0.61,"fillAlphas": 1,"fillColors": "#ecbd89","fixedColumnWidth": 20,"fontSize": 4,"id": "AmGraph-1","labelText": "","lineAlpha": 0,"lineColor": "#FFFFFF","negativeLineAlpha": 0,"title": "graph 1","type": "column","valueField": "curCountPer"},{"balloonText": "[[lineNm]] \n 진도율:[[curCountPer]] % 진행","balloonColor": "#FFFFFF","columnWidth": 0.61,"fillAlphas": 1,"fillColors": "#4F8298","fixedColumnWidth": 20,"id": "AmGraph-5","lineAlpha": 0,"lineColor": "#FFFFFF","lineThickness": 2,"negativeLineAlpha": 0,"negativeLineColor": "#E7E7E7","tabIndex": 1,"title": "graph 5","type": "column","valueField": "goalCountPer"}],"guides": [],"valueAxes": [{"id": "ValueAxis-1","stackType": "100%","title": "","gridAlpha": 0.2,"gridColor": "#E5E5E5","color": "#E7E7E7"}],"allLabels": [],"balloon": {},"titles": [],"dataProvider": filteredData})
		}
		
		
		/* Mobile Function */
		// 모바일에서만 사용되는 함수 정의
		
		function MobileGaugeFunc() {
			var MobileGauge = AmCharts.makeChart("MobileGauge",{"type": "gauge","marginBottom": 0,"marginLeft": 0,"marginRight": 0,"marginTop": 0,"theme": "dark","startDuration": 0,"arrows": [{}],"axes": [{	"axisThickness": 1,"bottomText":  "0%","bottomTextFontSize": 20,"bottomTextYOffset": -20,"endValue": 100,"id": "GaugeAxis-1","valueInterval": 10,"bands": [{"color": "#00CC00","endValue": 30,"id": "GaugeBand-1","startValue": 0},{"color": "#ffac29","endValue": 70,"id": "GaugeBand-2","startValue": 30},{"color": "#ea3838","endValue": 100,"id": "GaugeBand-3","innerRadius": "95%","startValue": 70}]}],"allLabels": [],"balloon": {},"titles": []});
			
			MobileGauge.arrows[0].setValue(self.gaugeRunRateList[0].lineGauge.toString());
			MobileGauge.axes[0].setBottomText(self.gaugeRunRateList[0].lineGauge.toString() + "%");
			MobileGauge.validateData();
			
			//라인가동현황 그리드
			self.gauge.run = gaugeRunInfoList["0"].runCount + " 라 인";
			self.gauge.standby = gaugeRunInfoList["0"].standbyCount + " 라 인";
			self.gauge.norun = gaugeRunInfoList["0"].noRunCount + " 라 인";
			self.gauge.alarm = gaugeRunInfoList["0"].alarmCount + " 라 인";
		}
		
		//알람발생추이
		function MobileAlarmDateRunInfo() {
			AmCharts.makeChart("MobileAlarmChart", { type: "serial", theme: "dark", dataDateFormat: "YYYYMMDD", dataProvider: $scope.dateRunInfoList, addClassNames: true, color: "#FFFFFF", marginLeft: 0, categoryField: "dt", categoryAxis: { parseDates: true, minPeriod: "DD", autoGridCount: false, gridCount: 50, gridAlpha: 0.1, gridColor: "#FFFFFF", axisColor: "#555555", dateFormats: [{ period: 'DD', format: 'DD' }, { period: 'WW', format: 'MMM DD' }, { period: 'MM', format: 'MMM' }, { period: 'YYYY', format: 'YYYY'}] }, valueAxes: [{ id: "a1", title: "", gridAlpha: 0, axisAlpha: 0 }, { id: "a2", position: "right", gridAlpha: 0, axisAlpha: 0, labelsEnabled: false}], graphs: [{ id: "g1", valueField: "alarm_count", type: "column", fillAlphas: 0.9, valueAxis: "a1", balloonText: "[[value]] 번", legendValueText: "[[value]] Count", legendPeriodValueText: "total: [[value.sum]] Count", lineColor: "#E74C3C", alphaField: "alpha" },{ id: "g2", valueField: "alarm_tm", type: "line", valueAxis: "a2", lineColor: "#ea9170", bullet: "round", bulletSize: 11, lineThickness: 3, legendValueText: "[[description]]/[[value]]", labelText: "[[alarm_tm]]", labelPosition: "right", balloonText: "Time:[[value]]", showBalloon: true, animationPlayed: true}], chartCursor: { zoomable: false, categoryBalloonDateFormat: "DD", cursorAlpha: 0, valueBalloonsEnabled: false} });
		}
				
			//대기발생추이
		function MobileStandbyDateRunInfo() {	    	
			AmCharts.makeChart("MobileStandbyChart", { type: "serial", theme: "dark", dataDateFormat: "YYYYMMDD", dataProvider: $scope.dateRunInfoList, addClassNames: true, color: "#FFFFFF", marginLeft: 0, categoryField: "dt", categoryAxis: { parseDates: true, minPeriod: "DD", autoGridCount: false, gridCount: 50, gridAlpha: 0.1, gridColor: "#FFFFFF", axisColor: "#555555", dateFormats: [{ period: 'DD', format: 'DD' }, { period: 'WW', format: 'MMM DD' }, { period: 'MM', format: 'MMM' }, { period: 'YYYY', format: 'YYYY'}] }, valueAxes: [{ id: "a1", title: "", gridAlpha: 0, axisAlpha: 0 }, { id: "a2", position: "right", gridAlpha: 0, axisAlpha: 0, labelsEnabled: false}], graphs: [{ id: "g1", valueField: "standby_count", type: "column", fillAlphas: 0.9, valueAxis: "a1", balloonText: "[[value]] 번", legendValueText: "[[value]] Count", legendPeriodValueText: "total: [[value.sum]] Count", lineColor: "#BDC3C7", alphaField: "alpha" },{ id: "g2", valueField: "standby_tm", type: "line", valueAxis: "a2", lineColor: "#f9fcfc", bullet: "round", bulletSize: 11, lineThickness: 3, legendValueText: "[[description]]/[[value]]", labelText: "[[alarm_tm]]", labelPosition: "right", balloonText: "Time:[[value]]", showBalloon: true, animationPlayed: true}], chartCursor: { zoomable: false, categoryBalloonDateFormat: "DD", cursorAlpha: 0, valueBalloonsEnabled: false} });
		}

		function MobilePie() {
			defectPie = AmCharts.makeChart("MobilePieChart",{"type": "pie","angle": 46,"pullOutRadius": "5%","balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]회</b> ([[percents]]%)</span>","depth3D": 30,"labelRadius": -70,"marginBottom": 0,"marginTop": 0,"startRadius": "100%","startDuration": 0,"sequencedAnimation": false,"titleField": "defectNm","valueField": "defectCount","theme": "dark","allLabels": [],"balloon": {},"titles": [],"dataProvider": $scope.defectChart});
			defectPie.validateData();
		}
		function MobileBarChart() {
			defectBar = AmCharts.makeChart("MobileBarChart",{"type": "serial","categoryField": "rankNum","angle": 20,"depth3D": 30,"sequencedAnimation": false,"startDuration": 0,"startEffect": "easeOutSine","fontSize": 12,"plotAreaBorderAlpha": 0,"plotAreaBorderColor": "#008000","plotAreaFillAlphas": 0,"backgroundColor": "#E7E7E7","borderColor": "#E7E7E7","categoryAxis": {"gridPosition": "start","gridColor": "#E5E5E5","color": "#E7E7E7","labelFunction": function(rankNum){return rankNum + "순위"}},"trendLines": [],"graphs": [{"balloonText": "[[category]] 순위:[[itemNm]] ([[value]] 개)","fillAlphas": 1,"fillColors": "#DD4635","id": "AmGraph-1","lineAlpha": 0,"lineColor": "#FFFFFF","title": "graph 1","type": "column","valueField": "rankCount"}],"guides": [],"valueAxes": [{"id": "rankCount","title": "","gridColor": "#E5E5E5","color": "#E7E7E7"}],"allLabels": [],"balloon": {},"legend": {"enabled": false,"useGraphSettings": true},"dataProvider": defectRankList})
			defectBar.validateData();
		}
		function MobilePlanProgress(){
			//계획진도율 차트 
			AmCharts.makeChart("MobilePlanProgress",{"type": "serial","rotate": false,"categoryField": "lineNm","angle": 10,"autoMarginOffset": 20,"depth3D": 10,"marginRight": 10,"marginTop": 30,"plotAreaBorderAlpha": 0,"plotAreaBorderColor": "#008000","plotAreaFillAlphas": 0,"sequencedAnimation": false,"startDuration": 0,"startEffect": "easeOutSine","backgroundColor": "#E7E7E7","borderColor": "#E7E7E7","fontSize": 13,"theme": "default","categoryAxis": {"gridPosition": "start","gridAlpha": 0.2,"gridColor": "#E5E5E5","color": "#E7E7E7","axisAlpha": 0},"trendLines": [],"graphs": [{"balloonText": "[[lineNm]] \n 진도율:[[curCountPer]] % 진행","columnWidth": 0.61,"fillAlphas": 1,"fillColors": "#ecbd89","fixedColumnWidth": 20,"fontSize": 4,"id": "AmGraph-1","labelText": "","lineAlpha": 0,"lineColor": "#FFFFFF","negativeLineAlpha": 0,"title": "graph 1","type": "column","valueField": "curCountPer"},{"balloonText": "[[lineNm]] \n 진도율:[[curCountPer]] % 진행","balloonColor": "#FFFFFF","columnWidth": 0.61,"fillAlphas": 1,"fillColors": "#4F8298","fixedColumnWidth": 20,"id": "AmGraph-5","lineAlpha": 0,"lineColor": "#FFFFFF","lineThickness": 2,"negativeLineAlpha": 0,"negativeLineColor": "#E7E7E7","tabIndex": 1,"title": "graph 5","type": "column","valueField": "goalCountPer"}],"guides": [],"valueAxes": [{"id": "ValueAxis-1","stackType": "100%","title": "","gridAlpha": 0.2,"gridColor": "#E5E5E5","color": "#E7E7E7"}],"allLabels": [],"balloon": {},"titles": [],"dataProvider": filteredData})
		}

		//워커 스타트
	   workerList.workerStart(workerList.worker2, "worker.js");
	   workerList.workerOnmessage(workerList.worker2, getData);
	
		
	}]);
