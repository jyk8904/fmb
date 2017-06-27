/**  
 * @Class Name : fmb001Ctrl.js
 * @Description : fmb001 
 * @Modification Information  
 * @
 * @ 작업일       작성자      내용
 * @ ----------  ---------  -------------------------------
 * @ 2017.05.29  정유경    최초생성
 * @ 
 * 
 */

'use strict';
var list;
angular
    .module('app')
    .controller('Fmb005Ctrl', ['CmmAjaxService', 'CmmModalSrvc','$http', '$scope', '$q', function (CmmAjaxService, CmmModalSrvc, $http, $scope, $q) 
{
	/*------------------------------------------
     * 변수 선언
     *-----------------------------------------*/
    var self = this;

    self.plcList= {};
    self.vo = {
    	plcId: '', 
    	factId: ''
    }
    
    aaa();

    function aaa(){
    	
	    var promise = CmmAjaxService.select("/mes/bas/selectFmbPlc.do",self.vo);
	    promise.then(function(data){
		list = data;//fmbPlcVo가 담긴 리스트 형태리턴
		
		bbb();
		console.log(list);
		}
		,function(data){
		alert('fail: '+ data)
		});
	    
    	
    }
    
    function bbb(){
		
		$scope.dataGridOptions = {
		        dataSource: list,
		        columns:["eqptNm","plcId","lineNm", "eqptCd", "lineNm","stsDttm","tcounts"]
		       
		    };
		console.log(list);
    }
    	    
    	    


    
}]);
