/**  
 * @Class Name : factoryCCtrl.js
 * @Description : factoryC
 * @Modification Information  
 * @
 * @ 작업일       작성자      내용
 * @ ----------  ---------  -------------------------------
 * @ 2017.06.08  정유경    최초생성
 * @ 
 * 
 */

'use strict';

angular
    .module('app')
    .controller('factCCtrl', ['CmmAjaxService', '$http', '$scope', '$q', function (CmmAjaxService, $http, $scope, $q) 
{
	/*------------------------------------------
     * 변수 선언
     *-----------------------------------------*/
    var self = this;
    
    self.vo = {
    	plcId: '', 
    	factId: ''
    }
}]);

