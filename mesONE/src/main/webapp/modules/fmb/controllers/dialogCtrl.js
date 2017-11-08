/**  
 * @Class Name : dialogCtrl.js
 * @Description : dialogCtrl.html 설비모니터링 내 팝업창 컨트롤러
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
	var reqptStsCstData = [];
    var plcData = {};
    var timeProdData= {};
    var DataRunInfoChart;
    var char;
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
	console.log(self.plcData)
    self.cancel = function() {
    	$mdDialog.cancel();
    };
    self.hide = function() {
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
	var dateRunInfoPromise = CmmAjaxService.select("bas/selectDateRunInfo.do", self.stsVo);
	console.log(self.stsVo)
	dateRunInfoPromise.then(function(data) {
		console.log(data)
		self.timeProdData = data;
		var dateRunInfoTimeout =$timeout(function(){}, 200)
    	.then(function(){
    		timeProdData = self.timeProdData;
    		makeDataRunInfoChart();
    		DataRunInfoChart.dataProvider = timeProdData
    		DataRunInfoChart.validateNow ();
    	});	
		//timeProd();
	}, function(data) {
		/*alert('fail: '+ data)*/
		console.log('fail'+data);
	});


	function makeDataRunInfoChart(){
		console.log(timeProdData)
		DataRunInfoChart = AmCharts.makeChart("DataRunInfoChart",{
				"type": "serial",
				"categoryField": "dt",
				"dataDateFormat": "YYYYMMDD",
				"mouseWheelZoomEnabled": true,
				"mouseWheelScrollEnabled": true,
				"fontFamily": "noteSans",
				"fontSize": 10,
				"categoryAxis": {
					"parseDates": true,
					"dateFormats": [
						{
							"period": "fff",
							"format": "JJ:NN:SS"
						},
						{
							"period": "ss",
							"format": "JJ:NN:SS"
						},
						{
							"period": "mm",
							"format": "JJ:NN"
						},
						{
							"period": "hh",
							"format": "JJ:NN"
						},
						{
							"period": "DD",
							"format": "MM월 DD"
						},
						{
							"period": "WW",
							"format": "MM월 DD"
						},
						{
							"period": "MM",
							"format": "MM월"
						},
						{
							"period": "YYYY",
							"format": "YYYY"
						}
					]
				},

				"theme": "dark",
				"chartCursor": {
					"enabled": true
				},
				
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
/*	function timeProd(){
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
	}		*/
	
	//시간별 가동상태 변화 데이터 가져오기
	var eqptStsHisPromise = CmmAjaxService.select("bas/selectEqptStsHis.do", self.stsVo);
	eqptStsHisPromise.then(function(data) {
		self.eqptStsHisData = data
		//console.log(self.stsVo);
		//console.log(self.eqptStsHisData);
		getCstData();
		makeEqptStsHischart();
		//console.log(self.eqptStsHisData);

        		//console.log(eqptStsCstData)
        		char.dataProvider = eqptStsCstData.reverse();
        		char.validateNow ();
        		

	}, function(data) {
		/*alert('fail: '+ data)*/
		console.log('fail'+data);
	});

	//시간별 가동상태 변화 차트 만들기
	function makeEqptStsHischart(){
	
		
		// this function returns our chart data as a promise
	 char = AmCharts.makeChart("eqptStsHisChart1",
			{
				"type": "serial",
				//"categoryField": "endDttm",	
				"categoryField": "timeSec",	
				"mouseWheelScrollEnabled": true,
				"mouseWheelZoomEnabled": true,
				//"startDuration" : 1,
				"categoryAxis": {
					//"position": "top",
					"title": "시간(초)",
					"gridPosition": "start",
					"titleRotation": 0,
					"reverse": true
				},
				"panEventsEnabled": false,
				"pan": true,
				//"autoZoom": true,
				"minSelectedTime": 4,
				"rotate": true,
				"chartScrollbar": {
					//"autoGridCount": true,
					//"graph": "AmGraph-1",
					"scrollHeight": 40
				},
				"chartCursor": {
					"limitToGraph": "AmGraph-1"
				},
				"depth3D": 1,
				//"startDuration": 1,
				"fontFamily": "noteSans",
				"fontSize": 12,
				"color": "#FFFFFF",
				/*"categoryAxis": {
					"gridPosition": "start",
					"titleRotation": 0
				},*/
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
	 
	/* AmCharts.addInitHandler(function(char) {
		  
			  if ( char.categoryAxis === undefined || char.categoryAxis.reverse !== true )
			    return;
			  
			  char.dataProvider.reverse();
			  
			}, ["serial"]);
	char.addListener("rendered", zoomChart);*/
	
	zoomChart();
	
	function zoomChart() {
		char.zoomToIndexes(eqptStsCstData.length - 40, eqptStsCstData.length - 1);
	}
	}
	
	//시간별 가동상태 변화 데이터 커스터마이징
	function getCstData(){
		//console.log(self.eqptStsHisData)
		//console.log(self.eqptStsHisData.length)
		for(var i = 0; i< self.eqptStsHisData.length; i++){
			//console.log(i + "번째" + self.eqptStsHisData[i].plcSts)
			if(self.eqptStsHisData[i].plcSts == 0){ //비가동일경우
				eqptStsCstData[i] = self.eqptStsHisData[i]
				eqptStsCstData[i].color = "#FF0F00"
			}else if(self.eqptStsHisData[i].plcSts == 1){
				eqptStsCstData[i] = self.eqptStsHisData[i]
				eqptStsCstData[i].color = "#60B764"
			}else if(self.eqptStsHisData[i].plcSts ==2){
				eqptStsCstData[i] = self.eqptStsHisData[i]
				eqptStsCstData[i].color =  "#FFFFFF"
			}else if(self.eqptStsHisData[i].plcSts == 3){
				eqptStsCstData[i] = self.eqptStsHisData[i]
				eqptStsCstData[i].color = "#FCD202"
			}else if(self.eqptStsHisData[i].plcSts == 4){
				eqptStsCstData[i] = self.eqptStsHisData[i]
				eqptStsCstData[i].color = "#FF0F00"
			}
			//console.log(self.eqptStsHisData[i])
			//console.log(eqptStsCstData[i])
		}
		//console.log(eqptStsCstData);
		reqptStsCstData = eqptStsCstData.reverse();
	} 
	//선택된 plc 데이터 가져오기
	function getSelectedPlc(){
		var promise = CmmAjaxService.selectOne("bas/selectFmbPlc.do", self.plcSelectedVo);
        promise.then(function(data){
    	
        	self.plc = data[0];//fmbPlcVo가 담긴 리스트 형태리턴
        	//console.log(self.plc);
        	//eqptCd를 넘겨서 순간정지,uph,정지로스 데이터 가져오기
     	   var promise2 = CmmAjaxService.selectOne("bas/selectFmbPlc2.do",{eqptCd : self.plc.eqptCd});
           promise2.then(function(data){
        	  //console.log(data[0]);
        	   
           	self.plc2 = data[0];
           	self.plc.alramcnt = self.plc2.alramcnt;
           	self.plc.norunsum = self.plc2.norunsum;
           	self.plc.uph = self.plc2.uph;
           	self.plc.mdate = self.plc2.mdate;
           }
           ,function(data){
           	consol.log('fail'+data);
           });
           
        }
        ,function(data){
        	//alert('fail: '+ data)
    		console.log('fail'+data);
        });
  
       
 
    };
    

}]);


