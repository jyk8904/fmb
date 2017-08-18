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
    .controller('DialogCtrl', [  'CmmAjaxService'
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
    $scope.isMobile = false;
      
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
    
    // 모바일 체크 함수 실행
	isMobileFunc();
    
    getSelectedPlc();
   
    
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
	
  	//설비상태 발생추이 가져오기
	var dateRunInfoPromise = CmmAjaxService.select("/mes/bas/selectDateRunInfo.do");
	
	dateRunInfoPromise.then(function(data) {
			
		self.timeProdData = data;
		console.log(self.timeProdData);
		$timeout(function(){}, 200)
    	.then(function(){
    		timeProdData = self.timeProdData;
    		makeDataRunInfoChart();
    	});	
		//timeProd();
	}, function(data) {
		alert('fail: ' + data)
	});


	function makeDataRunInfoChart(){
		console.log(timeProdData)
		
		AmCharts.makeChart("DataRunInfoChart",{
				"type": "serial",
				"categoryField": "dt",
				"dataDateFormat": "MM-DD",
				"mouseWheelZoomEnabled": true,
				"mouseWheelScrollEnabled": true,
				"fontFamily": "noteSans",
				"fontSize": 10,
				"categoryAxis": {
					"parseDates": true
				},
				"theme": "dark",
			/*	"chartCursor": {
					"enabled": true
				},*/
				
				"trendLines": [],
				"graphs": [
					{
						"balloonText": "[[title]] <br>[[norun_count]]",
						"bullet": "square",
						"id": "AmGraph-1",
						"title": "비가동",
						"valueField": "norun_count"
					},
					{
						"balloonText": "[[title]] <br>[[standby_count]]",
						"bullet": "square",
						"id": "AmGraph-2",
						"title": "대기",
						"valueField": "standby_count"
					},
					{
						"balloonText": "[[title]] <br>[[alarm_count]]",
						"bullet": "square",
						"bulletColor": "#58A0DC",
						"lineColor":"#58A0DC",
						"id": "AmGraph-3",
						"title": "알람",
						"valueField": "alarm_count"
					}

				],
				"guides": [],
				"valueAxes": [
					{
						"id": "ValueAxis-1"
					}
				],
				"allLabels": [],
				"balloon": {},
				"legend": {
					 "position": "bottom",
					"enabled": true,
					"useGraphSettings": true
				},
				"dataProvider":  timeProdData
			}
		);
	}
		
/*	chart.addListener("rendered", zoomChart);
	zoomChart();

	// this method is called when chart is first inited as we listen for "rendered" event
	function zoomChart() {
	    // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
	    chart.zoomToIndexes(chartData.length - 40, chartData.length - 1);
	}
		*/
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
	            { valueField: "standby_count", name: "대기 발생추이" },
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
	
	//시간별 가동상태 변화 데이터 가져오기
	var eqptStsHisPromise = CmmAjaxService.select("/mes/bas/selectEqptStsHis.do", self.stsVo);
	eqptStsHisPromise.then(function(data) {
		self.eqptStsHisData = data
		console.log(self.eqptStsHisData);
		
		$timeout(function(){}, 200)
    	.then(function(){
    		
    		$timeout(getCstData(),400)
        	.then(function(){
    		
        		makeEqptStsHischart();
        	});
    	});
	}, function(data) {
		alert('fail: ' + data)
	});

	//시간별 가동상태 변화 차트 만들기
	function makeEqptStsHischart(){
		// this function returns our chart data as a promise
	var char = AmCharts.makeChart("eqptStsHisChart1",
			{
				"type": "serial",
				"categoryField": "timeMin",	
				//"mouseWheelScrollEnabled": true,
				"mouseWheelZoomEnabled": true,
				"startDuration" : 1,
				"categoryAxis": {
					"title": "시간(분)"
				},
				"panEventsEnabled": false,
				"pan": true,
				//"autoZoom": true,
				"minSelectedTime": 4,
				"rotate": false,
				"chartScrollbar": {
					"autoGridCount": true,
					"graph": "AmGraph-1",
					"scrollHeight": 40
				},
				"chartCursor": {
					"limitToGraph": "AmGraph-1"
				},
				"depth3D": 1,
				"startDuration": 1,
				"fontFamily": "noteSans",
				"fontSize": 12,
				"color": "#FFFFFF",
				"categoryAxis": {
					"gridPosition": "start",
					"titleRotation": 0
				},
				"theme": "dark",
				"graphs": [
					{
						"balloonText": "[[plcStsTxt]] <br> Start:[[strDttm]]<br> End:[[endDttm]]",
						"closeField": "endDttm",
						"fillAlphas": 1,
						"columnWidth": 1,
						"fillColorsField": "color",
						"lineColorField": "color",
						"gapPeriod": 1,
						"id": "AmGraph-1",
						"openField": "strDttm",
						
						"title": "graph 1",
						"type": "column"
					}
				],
				"valueAxes": [
					{
						"id": "ValueAxis-1",
						"maximum": 0,
						"maximumDate": "",
						"stackType": "regular",
						"type": "date",
						"autoRotateCount": 1,
						"firstDayOfWeek": 0
					}
				],
				"balloon": {
					"showBullet": true
				},
				"dataProvider": eqptStsCstData
			}
		);
	char.addListener("rendered", zoomChart);
	zoomChart();
	
	function zoomChart() {
		char.zoomToIndexes(eqptStsCstData.length - 40, eqptStsCstData.length - 1);
	}
	}

	
	//시간별 가동상태 변화 데이터 커스터마이징
	function getCstData(){
		for(var i = 0; i< self.eqptStsHisData.length; i++){
			if(self.eqptStsHisData[i].plcSts == 0){ //비가동일경우
				eqptStsCstData[i] = {
							"timeMin": self.eqptStsHisData[i].timeMin,
							"plcStsTxt": self.eqptStsHisData[i].plcStsTxt,
							"strDttm": self.eqptStsHisData[i].strDttm,
							"endDttm": self.eqptStsHisData[i].endDttm,
							"plcSts": self.eqptStsHisData[i].plcSts,
							"color": "#FF0F00"
								}
					}else if(self.eqptStsHisData[i].plcSts == 1){
						eqptStsCstData[i] = {
								"timeMin": self.eqptStsHisData[i].timeMin,
								"plcStsTxt": self.eqptStsHisData[i].plcStsTxt,
								"strDttm": self.eqptStsHisData[i].strDttm,
								"endDttm": self.eqptStsHisData[i].endDttm,
								"plcSts": self.eqptStsHisData[i].plcSts,
								"color": "#60B764"
								}
					}else if(self.eqptStsHisData[i].plcSts ==2){

						eqptStsCstData[i] = {
								"timeMin": self.eqptStsHisData[i].timeMin,
								"plcStsTxt": self.eqptStsHisData[i].plcStsTxt,
								"strDttm": self.eqptStsHisData[i].strDttm,
								"endDttm": self.eqptStsHisData[i].endDttm,
								"plcSts": self.eqptStsHisData[i].plcSts,
								"color": "#FFFFFF"
								}
						
					}else if(self.eqptStsHisData[i].plcSts == 3){
						eqptStsCstData[i] = {
								"timeMin": self.eqptStsHisData[i].timeMin,
								"plcStsTxt": self.eqptStsHisData[i].plcStsTxt,
								"strDttm": self.eqptStsHisData[i].strDttm,
								"endDttm": self.eqptStsHisData[i].endDttm,
								"plcSts": self.eqptStsHisData[i].plcSts,
								"color": "#FCD202"
								}
					}else{
						eqptStsCstData[i] = {
								"timeMin": self.eqptStsHisData[i].timeMin,
								"plcStsTxt": self.eqptStsHisData[i].plcStsTxt,
								"strDttm": self.eqptStsHisData[i].strDttm,
								"endDttm": self.eqptStsHisData[i].endDttm,
								"plcSts": self.eqptStsHisData[i].plcSts,
								"color": "#FF0F00"
								}
					}
		}
	}

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

