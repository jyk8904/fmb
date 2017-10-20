
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
angular.module('app').controller('FmbTotalCtrl',['CmmAjaxService','CmmWorkerSrvc','$http','$scope','$window','$q','$timeout','$mdSidenav','$interval','$location','$rootScope',										
	function(CmmAjaxService, CmmWorkerSrvc, $http, $scope, $window,	$q, $timeout, $mdSidenav, $interval, $location, $rootScope) {

		/*------------------------------------------
		 * 변수 선언
		 *-----------------------------------------*/

		var self = this;
		var workerList = CmmWorkerSrvc;
		var interval;
		var gauge = null;
		var ajaxCall = null;
		var chartCall = null;
		var filteredData = [];
		var splitChartInterval = null;
		var splitChartData = null;
		var chartFlag = false;
		var rankAndonInfoList = null;
		var gaugeRunInfoList = null;
		var defectRankList = null;
		var defectRate = null;
		var defectPie = null;
		var defectBar =null;
		$rootScope.showBar = $location.url();
		
		var promise = null;
		var promise1 = null;
		var promise2 = null;
		var promise3 = null;
		var promise4 = null;
		var promise5 = null;
		var promise6 = null;
		var promise7 = null;
		
		var count = 0;
		
		var test1 = null;
		var test2 = null;
		var test3 = null;
		var test4 = null;
		var test5 = null;
		var test6 = null;
		var test7 = null;
		var test8 = null;
		var test9 = null;
		var test10 = null;
		
		var firstFlag = null;
		var quotient = null;
		var remainder = null;
		var startRan = null;
		var endRan = null;
		
		$scope.isMobile = false;
		// 변수 선언 및 디폴트 값 세팅 
		var dateAndonInfoList = {};
		var planProgressList = {};
		var defectChart = {};
		
		filteredData = [{ actYn: "", avgCount: "-1146", avgCountPer: "-157", curCountPer: "102", desc: "null", goalCount: "730", goalCountPer: "0", lineCd: "0802", lineNm: "AXLE ASS'Y\n(DH/HI/KH)", totCount: "749" }
	    , { actYn: "", avgCount: "-1146", avgCountPer: "-157", curCountPer: "102", desc: "null", goalCount: "20", goalCountPer: "0", lineCd: "0802", lineNm: "AXLE ASS'Y\n(DH/HI/KH)1", totCount: "549" }
	    , { actYn: "", avgCount: "-1146", avgCountPer: "-157", curCountPer: "102", desc: "null", goalCount: "200", goalCountPer: "0", lineCd: "0802", lineNm: "AXLE ASS'Y\n(DH/HI/KH)2", totCount: "249"}];

		self.info = {
				qcmBad : { firstTitle : "null", firstValue : "null", secondTitle : "null", secondValue : "null", thirdTitle : "null", thirdValue : "null" },
				matMiss : { firstTitle : "null", firstValue : "null", secondTitle : "null", secondValue : "null", thirdTitle : "null", thirdValue : "null" },
				itemCha : { firstTitle : "null", firstValue : "null", secondTitle : "null", secondValue : "null", thirdTitle : "null", thirdValue : "null" },
				rework : { firstTitle : "null", firstValue : "null", secondTitle : "null", secondValue : "null", thirdTitle : "null", thirdValue : "null" }
		};
		self.defect = {
				firstNm: null, firstCount: null, secondNm: null, secondCount: null, thirdNm: null, thirdCount: null, forthNm: null, forthCount: null,
				fifthNm: null, fifthCount: null, etcNm: null, etcCount: null, wholeRate: null
		};
		
		self.gauge = {run: null, standby: null, norun: null, alarm: null};

		var SettingTime = workerList.worker.data;
		
		for(var i =0; i < SettingTime.length; i++){
			if('/'+ SettingTime[i].pageNm== $location.url()){
				var thisDataTime= SettingTime[i].dataTime * 1000
				SettingTime = null;
				break;
			}
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
			firstDataCall();
		}
		
		//모바일일 경우 함수 정의
		function MobileGetData()
		{
			firstDataCall();
		}
				
		function splitPlanProgress() {
			firstFlag = true;
			count = 3;														// 다량의 데이터를 나눠 보여줄 횟수
			quotient = parseInt(planProgressList.length /count); 	// 몫: 한번에 보여줄 데이터 갯수
			remainder = planProgressList.length % quotient;			// 나머지
			startRan =0;													// 한번에 보여줄 데이터의 첫번째 num
			endRan =0;														// 한번에 보여줄 데이터의 마지막 num
			getFltrdData();
			//FmbTotal의 (datatime/횟수)를 interval 지정하여 다량의 데이터를 나눠보여줌 
			splitChartInterval = $interval( getFltrdData, thisDataTime/count, count-1); 
						
			function getFltrdData(){
				if (firstFlag == true){
					startRan = 0;
					endRan = 0;
				}
				filteredData = [];
				startRan= endRan;
				if(remainder!=0){
					remainder -= 1;
					endRan= endRan + quotient + 1;
				}else{
					endRan= endRan + quotient;
				}
				
				for(var j=startRan; j<endRan; j++){
					filteredData.push(planProgressList[j]);
				}
				if ($scope.isMobile) {
                    MobilePlanProgress();
                } else {
                    planProgress();
                }
				firstFlag = false;
			}
		}
		
		function firstDataCall() {
			
		try{
			// 계획진도율 가져오기
			promise = CmmAjaxService.select("bas/selectFmbDefectChart.do");
				promise.then(function(data) {
					try 
					{
						defectChart = data;
						data = null;
						promise = null;		
					}
					finally
					{	
						if ($scope.isMobile) {
							MobilePie();
						}else{
							pie();
						}
					
					}
			}, function(data) {
				alert('fail: ' + data)
			});
			promise1 = CmmAjaxService.select("bas/selectFmbDefectRank.do");
			promise1.then(function(data) {
				try 
				{
					defectRankList = data;
					data = null;
					promise1 = null;
				}
				finally
				{
					if ($scope.isMobile) {
					MobileBarChart
					}else{
						barChart();
					}
					defectInfo();
				}
			}, function(data) {
				alert('fail: ' + data)
			});
			promise2 = CmmAjaxService.select("bas/selectFmbDefectRate.do");
			promise2.then(function(data) {
				try
				{
					defectRate = data;
					data = null;
					promise2 = null;
				}
				finally
				{
					defectInfo2();
				}
			}, function(data) {
				alert('fail: ' + data)
			});	
		}	
		finally {	
			secondDataCall();
		}	
			
		}
		
		function secondDataCall(){
			try
			{
				promise4 = CmmAjaxService.select("bas/selectGaugeRunInfo.do");
				promise4.then(function(data) {
					try
					{
						self.gaugeRunInfoList = data;
						data = null;
						promise4 = null;
					}
					finally
					{
					}
				}, function(data) {
					alert('fail: ' + data)
				});
				promise5 = CmmAjaxService.select("bas/selectDateAndonInfo.do");
				promise5.then(function(data) {
					try
					{
						dateAndonInfoList = data;
						//test용 코드
						/*for(i=0; i<dateAndonInfoList.length; i++){
							dateAndonInfoList[i].qcmBadCount = 10;
							dateAndonInfoList[i].qcmBadTm = 10;
							dateAndonInfoList[i].qcmBadDur = 10;
							dateAndonInfoList[i].matMissCount = 10;
							dateAndonInfoList[i].matMissTm = 10;
							dateAndonInfoList[i].matMissDur = 10;
							dateAndonInfoList[i].itemChaCount = 10;
							dateAndonInfoList[i].itemChaTm = 10;
							dateAndonInfoList[i].itemChaDur = 10;
						}*/
						data = null;
						promise5 = null;
					}
					finally
					{
					
						if ($scope.isMobile) {
							MobileQcmBadDateAndonInfo();
							MobileMatMissDateAndonInfo();
							MobileItemChaDateAndonInfo();
						}else{
							qcmBadDateAndonInfo();
							matMissDateAndonInfo();
							itemChaDateAndonInfo();
						}
					}		
				}, function(data) {
					alert('fail: ' + data)
				});

				promise7 = CmmAjaxService.select("bas/selectPlanProgress.do");
				promise7.then(function(data) {
					try
					{
						planProgressList = data;
						data = null;
						promise7 = null;
					}
					finally 
					{
						splitPlanProgress();
					}
				}, function(data) {
					alert('fail: ' + data)
				});
			}
			finally
			{
				filteredData = null;
				thirdDataCall();
			}
				
		}
		
		function thirdDataCall()
		{
			promise3 = CmmAjaxService.select("bas/selectGaugeRunRate.do");
			promise3.then(function(data) {
				try
				{
					self.gaugeRunRateList = data;
					data = null;
					promise3 = null;
				}
				finally
				{
					gaugeFunc();
				}	
			}, function(data) {
				alert('fail: ' + data)
			});	
			
			promise6 = CmmAjaxService.select("bas/selectRankAndonInfo.do");
			promise6.then(function(data) {
				try
				{
					rankAndonInfoList = data;
					data = null;
					promise6 = null;
				}
				finally
				{
					rankAndonInfo();
				}
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
				
				defectRankList = null;
			}
		}
		
		function defectInfo2(){
			if (defectRate != null || angular.isUndefined(defectRate) == false) {
				self.defect.wholeRate = defectRate["0"].wholeRate + " PPM";
				defectRate = null;
			}
		}
			
		function rankAndonInfo(){
			//품질불량 순위 그리드
			if (rankAndonInfoList !=  null || rankAndonInfoList!=undefined){
				
				
				//test용 데이터!! andon데이터가 올라올경우 지워야함
				/*for(i=0; i<rankAndonInfoList.length; i++){
					rankAndonInfoList[i].qcmBadNm = "test"+i+"Q";
					rankAndonInfoList[i].qcmBadTm = 10;
					rankAndonInfoList[i].matMissNm = "test"+i +"S";
					rankAndonInfoList[i].matMissTm = 10;
					rankAndonInfoList[i].itemChaNm = "test"+i +"C";
					rankAndonInfoList[i].itemChaTm = 10;
				}*/
				//test용 데이터!!
				
				self.info.qcmBad.firstTitle = rankAndonInfoList["0"].qcmBadNm;
				self.info.qcmBad.firstValue = rankAndonInfoList["0"].qcmBadTm+ "분 (" + rankAndonInfoList["0"].qcmBadCount + " 번)";
				self.info.qcmBad.secondTitle = rankAndonInfoList["1"].qcmBadNm;
				self.info.qcmBad.secondValue = rankAndonInfoList["1"].qcmBadTm+ "분 (" + rankAndonInfoList["1"].qcmBadCount + " 번)";
				self.info.qcmBad.thirdTitle = rankAndonInfoList["2"].qcmBadNm;
				self.info.qcmBad.thirdValue = rankAndonInfoList["2"].qcmBadTm+ "분 (" + rankAndonInfoList["2"].qcmBadCount + " 번)";
				//자재결품 순위 그리드
				self.info.matMiss.firstTitle = rankAndonInfoList["0"].matMissNm;
				self.info.matMiss.firstValue = rankAndonInfoList["0"].matMissTm+ "분 (" + rankAndonInfoList["0"].matMissCount + " 번)";
				self.info.matMiss.secondTitle = rankAndonInfoList["1"].matMissNm;
				self.info.matMiss.secondValue = rankAndonInfoList["1"].matMissTm+ "분 (" + rankAndonInfoList["1"].matMissCount + " 번)";
				self.info.matMiss.thirdTitle = rankAndonInfoList["2"].matMissNm;
				self.info.matMiss.thirdValue = rankAndonInfoList["2"].matMissTm+ "분 (" + rankAndonInfoList["2"].matMissCount + " 번)";
				// 품목교체 순위 그리드
				self.info.itemCha.firstTitle = rankAndonInfoList["0"].itemChaNm;
				self.info.itemCha.firstValue = rankAndonInfoList["0"].itemChaTm+ "분 (" + rankAndonInfoList["0"].itemChaCount + " 번)";
				self.info.itemCha.secondTitle = rankAndonInfoList["1"].itemChaNm;
				self.info.itemCha.secondValue = rankAndonInfoList["1"].itemChaTm+ "분 (" + rankAndonInfoList["1"].itemChaCount + " 번)";
				self.info.itemCha.thirdTitle = rankAndonInfoList["2"].itemChaNm;
				self.info.itemCha.thirdValue = rankAndonInfoList["2"].itemChaTm+ "분 (" + rankAndonInfoList["2"].itemChaCount + " 번)";

				// 재작업
				/*self.info.itemCha.thirdValue = rankAndonInfoList["2"].reworkTm+ "분 (" + rankAndonInfoList["2"].reworkCount + " 번)";
				self.info.itemCha.firstTitle = rankAndonInfoList["0"].reworkNm;
				self.info.itemCha.firstValue = rankAndonInfoList["0"].reworkTm+ "분 (" + rankAndonInfoList["0"].reworkCount + " 번)";
				self.info.itemCha.secondTitle = rankAndonInfoList["1"].reworkNm;
				self.info.itemCha.secondValue = rankAndonInfoList["1"].reworkTm+ "분 (" + rankAndonInfoList["1"].reworkCount + " 번)";
				self.info.itemCha.thirdTitle = rankAndonInfoList["2"].reworkNm;
				self.info.itemCha.thirdValue = rankAndonInfoList["2"].reworkTm+ "분 (" + rankAndonInfoList["2"].reworkCount + " 번)";
*/
				rankAndonInfoList = null;
			}
		}	

		/* Desktop Function */
		// 데스크탑에서만 사용되는 함수 정의
		function gaugeFunc() {	
			try
			{
				if (test1 == null)
				{
					test1 = AmCharts.makeChart("gauge",{"type": "gauge","marginBottom": 0,"marginLeft": 0,"marginRight": 0,"marginTop": 0,"theme": "dark","startDuration": 0,"arrows": [{}],"axes": [{	"axisThickness": 1,"bottomText":  "0%","bottomTextFontSize": 20,"bottomTextYOffset": -20,"endValue": 100,"id": "GaugeAxis-1","valueInterval": 10,"bands": [{"color": "#00CC00","endValue": 30,"id": "GaugeBand-1","startValue": 0},{"color": "#ffac29","endValue": 70,"id": "GaugeBand-2","startValue": 30},{"color": "#ea3838","endValue": 100,"id": "GaugeBand-3","innerRadius": "95%","startValue": 70}]}],"allLabels": [],"balloon": {},"titles": []});
					if (self.gaugeRunRateList != null ||angular.isUndefined(self.gaugeRunRateList) == false)
			 		{
						test1.arrows[0].setValue(self.gaugeRunRateList["0"].lineGauge);
						test1.axes[0].setBottomText(self.gaugeRunRateList["0"].lineGauge.toString() + "%");
						test1.validateData();
			 		}
				}
				else
				{
					if (self.gaugeRunRateList != null || angular.isUndefined(self.gaugeRunRateList) == false)
			 		{
						test1.arrows[0].setValue(self.gaugeRunRateList["0"].lineGauge);
						test1.axes[0].setBottomText(self.gaugeRunRateList["0"].lineGauge.toString() + "%");
						test1.validateData();
			 		}
				}
	
			 	if (self.gaugeRunInfoList != null ||self.gaugeRunInfoList!= undefined)
			 	{
			 		//라인가동현황 그리드
					self.gauge.run = self.gaugeRunInfoList["0"].runCount;
					self.gauge.standby = self.gaugeRunInfoList["0"].standbyCount;
					self.gauge.norun = self.gaugeRunInfoList["0"].noRunCount;
					self.gauge.alarm = self.gaugeRunInfoList["0"].alarmCount;
/*			 		self.gauge.run = "0 라 인";
			 		self.gauge.standby = "0 라 인";
			 		self.gauge.norun = "0 라 인";
			 		self.gauge.alarm = "0 라 인";*/
			 	}
			 	
			 	
			}
			finally
			{
				self.gaugeRunRateList = null;
				//self.gaugeRunInfoList = null;
			}
		
		}
		
		//알람발생추이 -> 품질불량 추이 
		function qcmBadDateAndonInfo() {
			try
			{
				if (test2 ==  null)
				{
					test2 = AmCharts.makeChart("qcmBadChart",{ type: "serial", theme: "dark", dataDateFormat: "YYYYMMDD", dataProvider: dateAndonInfoList, addClassNames: true, color: "#FFFFFF", marginLeft: 0, categoryField: "dt", categoryAxis: { parseDates: true, minPeriod: "DD", autoGridCount: false, gridCount: 50,gridAlpha: 0.1, gridColor: "#FFFFFF", axisColor: "#555555", dateFormats: [{ period: 'DD', format: 'DD' }, { period: 'WW', format: 'MMM DD' }, { period: 'MM', format: 'MMM' }, { period: 'YYYY', format: 'YYYY'}] }, valueAxes: [{ id: "a1", title: "", gridAlpha: 0, axisAlpha: 0 }, { id: "a2", position: "right", gridAlpha: 0, axisAlpha: 0, labelsEnabled: false}], graphs: [{ id: "g1", valueField: "qcmBadCount", type: "column", fillAlphas: 0.9, valueAxis: "a2", balloonText: "[[value]] 번", legendValueText: "[[value]] Count", legendPeriodValueText: "total: [[value.sum]] Count", lineColor: "#E74C3C", alphaField: "alpha" },{ id: "g2", valueField: "qcmBadTm", type: "line", valueAxis: "a1",lineColor: "#ea9170", bullet: "round", bulletSize: 11, lineThickness: 3, legendValueText: "[[description]]/[[value]]", labelText: "[[qcmBadTm]]", labelPosition: "right", balloonText: "Time:[[value]]", showBalloon: true, animationPlayed: true}], chartCursor: { zoomable: false, categoryBalloonDateFormat: "DD", cursorAlpha: 0, valueBalloonsEnabled: false} });				
				}
				else
				{
					test2.dataProvider = dateAndonInfoList;
					test2.validateData();
				}
			}
			finally{}
		}
		
		//대기발생추이 -> 자재결품 추이
		function matMissDateAndonInfo() {
			try
			{
				if (test3 == null)
				{
					test3 = AmCharts.makeChart("matMissChart", { type: "serial", theme: "dark", dataDateFormat: "YYYYMMDD", dataProvider:dateAndonInfoList, addClassNames: true, color: "#FFFFFF", marginLeft: 0, categoryField: "dt", categoryAxis: { parseDates: true, minPeriod: "DD", autoGridCount: false, gridCount: 50, gridAlpha: 0.1, gridColor: "#FFFFFF", axisColor: "#555555", dateFormats: [{ period: 'DD', format: 'DD' }, { period: 'WW', format: 'MMM DD' }, { period: 'MM', format: 'MMM' }, { period: 'YYYY', format: 'YYYY'}] }, valueAxes: [{ id: "a1", title: "", gridAlpha: 0, axisAlpha: 0 }, { id: "a2", position: "right", gridAlpha: 0, axisAlpha: 0, labelsEnabled: false}], graphs: [{ id: "g1", valueField: "matMissCount", type: "column", fillAlphas: 0.9, valueAxis: "a2", balloonText: "[[value]] 번", legendValueText: "[[value]] Count", legendPeriodValueText: "total: [[value.sum]] Count", lineColor: "#BDC3C7", alphaField: "alpha" }, { id: "g2", valueField: "matMissTm", type: "line", valueAxis: "a1", lineColor: "#f9fcfc", bullet: "round", bulletSize: 11, lineThickness: 3, legendValueText: "[[description]]/[[value]]", labelText: "[[matMissTm]]", labelPosition: "right", balloonText: "Time:[[value]]", showBalloon: true, animationPlayed: true}], chartCursor: { zoomable: false, categoryBalloonDateFormat: "DD", cursorAlpha: 0, valueBalloonsEnabled: false} });
				}
				else
				{
					test3.dataProvider = dateAndonInfoList;
					test3.validateData();
				}
			}
			finally{}
		}
		
		//비가동 발생추이 -> 품목교체추이
		function itemChaDateAndonInfo() {
			try
			{
				if (test9 == null)
				{
					test9 = AmCharts.makeChart("itemChaChart", { type: "serial", theme: "dark", dataDateFormat: "YYYYMMDD", dataProvider: dateAndonInfoList, addClassNames: true, color: "#FFFFFF", marginLeft: 0, categoryField: "dt", categoryAxis: { parseDates: true, minPeriod: "DD", autoGridCount: false, gridCount: 50, gridAlpha: 0.1, gridColor: "#FFFFFF", axisColor: "#555555", dateFormats: [{ period: 'DD', format: 'DD' }, { period: 'WW', format: 'MMM DD' }, { period: 'MM', format: 'MMM' }, { period: 'YYYY', format: 'YYYY'}] }, valueAxes: [{ id: "a1", title: "", gridAlpha: 0, axisAlpha: 0 }, { id: "a2", position: "right", gridAlpha: 0, axisAlpha: 0, labelsEnabled: false}], graphs: [{ id: "g1", valueField: "itemChaCount", type: "column", fillAlphas: 0.9, valueAxis: "a2", balloonText: "[[value]] 번", legendValueText: "[[value]] Count", legendPeriodValueText: "total: [[value.sum]] Count", lineColor: "#BDC3C7", alphaField: "alpha" },{ id: "g2", valueField: "itemChaTm", type: "line", valueAxis: "a1", lineColor: "#f9fcfc", bullet: "round", bulletSize: 11, lineThickness: 3, legendValueText: "[[description]]/[[value]]", labelText: "[[itemChaTm]]", labelPosition: "right", balloonText: "Time:[[value]]", showBalloon: true, animationPlayed: true}], chartCursor: { zoomable: false, categoryBalloonDateFormat: "DD", cursorAlpha: 0, valueBalloonsEnabled: false} });
				}
				else
				{
					test9.dataProvider = dateAndonInfoList;
					test9.validateData();
				}
			}
			finally{}
		}
		function barChart() {
			try
			{
				if ($scope.defectBar == null)
				{
					$scope.defectBar = AmCharts.makeChart("barChart",{"type": "serial","categoryField": "rankNum","angle": 20,"depth3D": 30,"sequencedAnimation": false,"startDuration": 0,"startEffect": "easeOutSine","fontSize": 12,"plotAreaBorderAlpha": 0,"plotAreaBorderColor": "#008000","plotAreaFillAlphas": 0,"backgroundColor": "#E7E7E7","borderColor": "#E7E7E7","categoryAxis": {"gridPosition": "start","gridColor": "#E5E5E5","color": "#E7E7E7","labelFunction": function(rankNum){return rankNum + "순위"}},"trendLines": [],"graphs": [{"balloonText": "[[category]] 순위:[[itemNm]] ([[value]] 개)","fillAlphas": 1,"fillColors": "#DD4635","id": "AmGraph-1","lineAlpha": 0,"lineColor": "#FFFFFF","title": "graph 1","type": "column","valueField": "rankCount"}],"guides": [],"valueAxes": [{"id": "rankCount","title": "","gridColor": "#E5E5E5","color": "#E7E7E7"}],"allLabels": [],"balloon": {},"legend": {"enabled": false,"useGraphSettings": true},"dataProvider": defectRankList})
				}
				else
				{
					$scope.defectBar.dataProvider = defectRankList;
					$scope.defectBar.validateData();
				}
							
			}
			finally{}	
		}
		
		function pie() {
			try
			{
				if ($scope.defectPie == null)
				{
					$scope.defectPie = AmCharts.makeChart("pieChart",{"type": "pie","angle": 46,"pullOutRadius": "5%","balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]개</b> ([[percents]]%)</span>","labelText":"[[title]]<br>[[value]]개 ([[percents]]%)","depth3D": 30,"labelRadius": -70,"marginBottom": 0,"marginTop": 0,"startRadius": "100%","startDuration": 0,"sequencedAnimation": false,"titleField": "defectNm","valueField": "defectCount","color": "#302323","theme": "dark","allLabels": [],"balloon": {},"titles": [],"dataProvider": defectChart});
				}
				else
				{
					$scope.defectPie.dataProvider = defectChart;
					$scope.defectPie.validateData();
				}		
			}
			finally{
			}
		}
		
		function planProgress(){
			try
			{
				if (test4 == null)
				{
					test4 = AmCharts.makeChart("chartdiv",{"type": "serial","rotate": true,"categoryField": "lineMidNm","angle": 10,"autoMarginOffset": 20,"depth3D": 10,"marginRight": 10,"marginTop": 30,"plotAreaBorderAlpha": 0,"plotAreaBorderColor": "#008000","plotAreaFillAlphas": 0,"sequencedAnimation": false,"startDuration": 0,"startEffect": "easeOutSine","backgroundColor": "#E7E7E7","borderColor": "#E7E7E7","fontSize": 13,"theme": "default","categoryAxis": {"gridPosition": "start","gridAlpha": 0.2,"gridColor": "#E5E5E5","color": "#E7E7E7","axisAlpha": 0},"trendLines": [],"graphs": [{"balloonText": "[[lineNm]] \n 진도율:[[curCountPer]] % 진행","columnWidth": 0.61,"fillAlphas": 1,"fillColors": "#ecbd89","fixedColumnWidth": 20,"fontSize": 4,"id": "AmGraph-1","labelText": "","lineAlpha": 0,"lineColor": "#FFFFFF","negativeLineAlpha": 0,"title": "graph 1","type": "column","valueField": "curCountPer"},{"balloonText": "[[lineNm]] \n 진도율:[[curCountPer]] % 진행","balloonColor": "#FFFFFF","columnWidth": 0.61,"fillAlphas": 1,"fillColors": "#4F8298","fixedColumnWidth": 20,"id": "AmGraph-5","lineAlpha": 0,"lineColor": "#FFFFFF","lineThickness": 2,"negativeLineAlpha": 0,"negativeLineColor": "#E7E7E7","tabIndex": 1,"title": "graph 5","type": "column","valueField": "goalCountPer"}],"guides": [],"valueAxes": [{"id": "ValueAxis-1","stackType": "100%","title": "","gridAlpha": 0.2,"gridColor": "#E5E5E5","color": "#E7E7E7"}],"allLabels": [],"balloon": {},"titles": [],"dataProvider": filteredData})
				}
				else
				{
					test4.dataProvider = filteredData;
					test4.validateData();
				}
			}
			finally{}
			//계획진도율 차트 
		}
		/* Mobile Function */
		// 모바일에서만 사용되는 함수 정의
		function MobileGaugeFunc() {
			try
			{
				if (test5 == null)
				{
					test5 = AmCharts.makeChart("MobileGauge",{"type": "gauge","marginBottom": 0,"marginLeft": 0,"marginRight": 0,"marginTop": 0,"theme": "dark","startDuration": 0,"arrows": [{}],"axes": [{	"axisThickness": 1,"bottomText":  "0%","bottomTextFontSize": 20,"bottomTextYOffset": -20,"endValue": 100,"id": "GaugeAxis-1","valueInterval": 10,"bands": [{"color": "#00CC00","endValue": 30,"id": "GaugeBand-1","startValue": 0},{"color": "#ffac29","endValue": 70,"id": "GaugeBand-2","startValue": 30},{"color": "#ea3838","endValue": 100,"id": "GaugeBand-3","innerRadius": "95%","startValue": 70}]}],"allLabels": [],"balloon": {},"titles": []});
				
					if (self.gaugeRunRateList != null || angular.isUndefined(self.gaugeRunRateList) == false)
			 		{
						test5.arrows[0].setValue(self.gaugeRunRateList[0].lineGauge);
						test5.axes[0].setBottomText(self.gaugeRunRateList[0].lineGauge.toString() + "%");
						test5.validateData();
			 		}
				}
				else
				{if (self.gaugeRunRateList != null || angular.isUndefined(self.gaugeRunRateList) == false)
		 		{
					test5.arrows[0].setValue(self.gaugeRunRateList[0].lineGauge);
					test5.axes[0].setBottomText(self.gaugeRunRateList[0].lineGauge.toString() + "%");
					test5.validateData();
		 		}				
			}
			}
			finally{}
			//라인가동현황 그리드
			self.gauge.run = self.gaugeRunInfoList["0"].runCount + " 라 인";
			self.gauge.standby = self.gaugeRunInfoList["0"].standbyCount + " 라 인";
			self.gauge.norun = self.gaugeRunInfoList["0"].noRunCount + " 라 인";
			self.gauge.alarm = self.gaugeRunInfoList["0"].alarmCount + " 라 인";
		}
		
		//품질이상 발생추이
		function MobileQcmBadDateAndonInfo() {
			try
			{
				if (test6 == null)
				{
					test6 = AmCharts.makeChart("MobileAlarmChart", { type: "serial", theme: "dark", dataDateFormat: "YYYYMMDD", dataProvider: dateAndonInfoList, addClassNames: true, color: "#FFFFFF", marginLeft: 0, categoryField: "dt", categoryAxis: { parseDates: true, minPeriod: "DD", autoGridCount: false, gridCount: 50, gridAlpha: 0.1, gridColor: "#FFFFFF", axisColor: "#555555", dateFormats: [{ period: 'DD', format: 'DD' }, { period: 'WW', format: 'MMM DD' }, { period: 'MM', format: 'MMM' }, { period: 'YYYY', format: 'YYYY'}] }, valueAxes: [{ id: "a1", title: "", gridAlpha: 0, axisAlpha: 0 }, { id: "a2", position: "right", gridAlpha: 0, axisAlpha: 0, labelsEnabled: false}], graphs: [{ id: "g1", valueField: "alarm_count", type: "column", fillAlphas: 0.9, valueAxis: "a1", balloonText: "[[value]] 번", legendValueText: "[[value]] Count", legendPeriodValueText: "total: [[value.sum]] Count", lineColor: "#E74C3C", alphaField: "alpha" },{ id: "g2", valueField: "qcm_bad_tm", type: "line", valueAxis: "a2", lineColor: "#ea9170", bullet: "round", bulletSize: 11, lineThickness: 3, legendValueText: "[[description]]/[[value]]", labelText: "[[alarm_tm]]", labelPosition: "right", balloonText: "Time:[[value]]", showBalloon: true, animationPlayed: true}], chartCursor: { zoomable: false, categoryBalloonDateFormat: "DD", cursorAlpha: 0, valueBalloonsEnabled: false} });
				}
				else
				{
					test6.dataProvider = dateAndonInfoList
					test6.validateData();
				}
			}
			finally{}
		}
			//자재결품 발생추이
		function MobileMatMissDateAndonInfo() {	
			try
			{
				if (test7 == null)
				{
					test7 = AmCharts.makeChart("MobileMatMissChart", { type: "serial", theme: "dark", dataDateFormat: "YYYYMMDD", dataProvider: dateAndonInfoList, addClassNames: true, color: "#FFFFFF", marginLeft: 0, categoryField: "dt", categoryAxis: { parseDates: true, minPeriod: "DD", autoGridCount: false, gridCount: 50, gridAlpha: 0.1, gridColor: "#FFFFFF", axisColor: "#555555", dateFormats: [{ period: 'DD', format: 'DD' }, { period: 'WW', format: 'MMM DD' }, { period: 'MM', format: 'MMM' }, { period: 'YYYY', format: 'YYYY'}] }, valueAxes: [{ id: "a1", title: "", gridAlpha: 0, axisAlpha: 0 }, { id: "a2", position: "right", gridAlpha: 0, axisAlpha: 0, labelsEnabled: false}], graphs: [{ id: "g1", valueField: "matMiss_count", type: "column", fillAlphas: 0.9, valueAxis: "a1", balloonText: "[[value]] 번", legendValueText: "[[value]] Count", legendPeriodValueText: "total: [[value.sum]] Count", lineColor: "#BDC3C7", alphaField: "alpha" },{ id: "g2", valueField: "mat_miss_tm", type: "line", valueAxis: "a2", lineColor: "#f9fcfc", bullet: "round", bulletSize: 11, lineThickness: 3, legendValueText: "[[description]]/[[value]]", labelText: "[[alarm_tm]]", labelPosition: "right", balloonText: "Time:[[value]]", showBalloon: true, animationPlayed: true}], chartCursor: { zoomable: false, categoryBalloonDateFormat: "DD", cursorAlpha: 0, valueBalloonsEnabled: false} });
				}
				else
				{
					test7.dataProvider = dateAndonInfoList
					test7.validateData();
				}
			}
			finally{}
		}
		//재작업 발생추이
		function MobileMatMissDateAndonInfo() {	
			try
			{
				if (test10 == null)
				{
					test10 = AmCharts.makeChart("MobileMatMissChart", { type: "serial", theme: "dark", dataDateFormat: "YYYYMMDD", dataProvider: dateAndonInfoList, addClassNames: true, color: "#FFFFFF", marginLeft: 0, categoryField: "dt", categoryAxis: { parseDates: true, minPeriod: "DD", autoGridCount: false, gridCount: 50, gridAlpha: 0.1, gridColor: "#FFFFFF", axisColor: "#555555", dateFormats: [{ period: 'DD', format: 'DD' }, { period: 'WW', format: 'MMM DD' }, { period: 'MM', format: 'MMM' }, { period: 'YYYY', format: 'YYYY'}] }, valueAxes: [{ id: "a1", title: "", gridAlpha: 0, axisAlpha: 0 }, { id: "a2", position: "right", gridAlpha: 0, axisAlpha: 0, labelsEnabled: false}], graphs: [{ id: "g1", valueField: "standby_count", type: "column", fillAlphas: 0.9, valueAxis: "a1", balloonText: "[[value]] 번", legendValueText: "[[value]] Count", legendPeriodValueText: "total: [[value.sum]] Count", lineColor: "#BDC3C7", alphaField: "alpha" },{ id: "g2", valueField: "mat_miss_tm", type: "line", valueAxis: "a2", lineColor: "#f9fcfc", bullet: "round", bulletSize: 11, lineThickness: 3, legendValueText: "[[description]]/[[value]]", labelText: "[[alarm_tm]]", labelPosition: "right", balloonText: "Time:[[value]]", showBalloon: true, animationPlayed: true}], chartCursor: { zoomable: false, categoryBalloonDateFormat: "DD", cursorAlpha: 0, valueBalloonsEnabled: false} });
				}
				else
				{
					test10.dataProvider = dateAndonInfoList
					test10.validateData();
				}
			}
			finally{}
		}
		function MobilePie() {
			try
			{
				if (defectPie == null)
				{
					defectPie = AmCharts.makeChart("MobilePieChart",{"type": "pie","angle": 46,"pullOutRadius": "5%","balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]회</b> ([[percents]]%)</span>","depth3D": 30,"labelRadius": -70,"marginBottom": 0,"marginTop": 0,"startRadius": "100%","startDuration": 0,"sequencedAnimation": false,"titleField": "defectNm","valueField": "defectCount","theme": "dark","allLabels": [],"balloon": {},"titles": [],"dataProvider": defectChart});
				}
				else
				{
					defectPie.dataProvider = defectChart
					defectPie.validateData();
				}
			}
			finally{}
			
		}
		function MobileBarChart() {
			try
			{
				if (defectBar == null)
				{
					defectBar = AmCharts.makeChart("MobileBarChart",{"type": "serial","categoryField": "rankNum","angle": 20,"depth3D": 30,"sequencedAnimation": false,"startDuration": 0,"startEffect": "easeOutSine","fontSize": 12,"plotAreaBorderAlpha": 0,"plotAreaBorderColor": "#008000","plotAreaFillAlphas": 0,"backgroundColor": "#E7E7E7","borderColor": "#E7E7E7","categoryAxis": {"gridPosition": "start","gridColor": "#E5E5E5","color": "#E7E7E7","labelFunction": function(rankNum){return rankNum + "순위"}},"trendLines": [],"graphs": [{"balloonText": "[[category]] 순위:[[itemNm]] ([[value]] 개)","fillAlphas": 1,"fillColors": "#DD4635","id": "AmGraph-1","lineAlpha": 0,"lineColor": "#FFFFFF","title": "graph 1","type": "column","valueField": "rankCount"}],"guides": [],"valueAxes": [{"id": "rankCount","title": "","gridColor": "#E5E5E5","color": "#E7E7E7"}],"allLabels": [],"balloon": {},"legend": {"enabled": false,"useGraphSettings": true},"dataProvider": defectRankList})
				}
				else
				{
					defectBar.dataProvider = defectRankList
					defectBar.validateData();
				}
			}
			finally{}
		}
		function MobilePlanProgress(){

			try
			{
				if (test8 == null)
				{
					test8 = AmCharts.makeChart("MobilePlanProgress",{"type": "serial","rotate": false,"categoryField": "lineNm","angle": 10,"autoMarginOffset": 20,"depth3D": 10,"marginRight": 10,"marginTop": 30,"plotAreaBorderAlpha": 0,"plotAreaBorderColor": "#008000","plotAreaFillAlphas": 0,"sequencedAnimation": false,"startDuration": 0,"startEffect": "easeOutSine","backgroundColor": "#E7E7E7","borderColor": "#E7E7E7","fontSize": 13,"theme": "default","categoryAxis": {"gridPosition": "start","gridAlpha": 0.2,"gridColor": "#E5E5E5","color": "#E7E7E7","axisAlpha": 0},"trendLines": [],"graphs": [{"balloonText": "[[lineNm]] \n 진도율:[[curCountPer]] % 진행","columnWidth": 0.61,"fillAlphas": 1,"fillColors": "#ecbd89","fixedColumnWidth": 20,"fontSize": 4,"id": "AmGraph-1","labelText": "","lineAlpha": 0,"lineColor": "#FFFFFF","negativeLineAlpha": 0,"title": "graph 1","type": "column","valueField": "curCountPer"},{"balloonText": "[[lineNm]] \n 진도율:[[curCountPer]] % 진행","balloonColor": "#FFFFFF","columnWidth": 0.61,"fillAlphas": 1,"fillColors": "#4F8298","fixedColumnWidth": 20,"id": "AmGraph-5","lineAlpha": 0,"lineColor": "#FFFFFF","lineThickness": 2,"negativeLineAlpha": 0,"negativeLineColor": "#E7E7E7","tabIndex": 1,"title": "graph 5","type": "column","valueField": "goalCountPer"}],"guides": [],"valueAxes": [{"id": "ValueAxis-1","stackType": "100%","title": "","gridAlpha": 0.2,"gridColor": "#E5E5E5","color": "#E7E7E7"}],"allLabels": [],"balloon": {},"titles": [],"dataProvider": filteredData})
				}
				else
				{
					test8.dataProvider = filteredData
					test8.validateData();
				}
			}
			finally{}
		}

		//워커 스타트
	   workerList.workerStart(workerList.worker, "worker.js");
	   workerList.workerOnmessage(workerList.worker, getData);
	
		
	}]);
