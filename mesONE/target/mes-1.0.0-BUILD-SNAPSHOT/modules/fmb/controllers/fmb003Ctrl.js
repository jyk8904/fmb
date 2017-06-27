/**  
 * @Class Name : fmb001Ctrl.js
 * @Description : fmb001 
 * @Modification Information  
 * @
 * @ 작업일       작성자      내용
 * @ ----------  ---------  -------------------------------
 * @ 2017.05.26  kb.shin    최초생성
 * @ 
 * 
 * @author kb.shin
 * @since 2017.01.01
 * @version 1.0
 * @see
 * 
 */

'use strict';

angular
    .module('app')
    .controller('Fmb003Ctrl', ['CmmAjaxService', '$http', '$scope', '$q', function (CmmAjaxService, $http, $scope, $q) 
{
	/*------------------------------------------
     * 변수 선언
     *-----------------------------------------*/
    var self 	= this;
    
    
    
    
    var test = CmmAjaxService.select("/mes/bas/selectFmbPlc.do", self.vo);
    alert(test);
    console.log(test);
}]);

