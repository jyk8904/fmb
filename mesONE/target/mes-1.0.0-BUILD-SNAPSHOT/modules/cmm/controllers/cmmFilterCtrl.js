/**
 * 
 */

angular.module('app')
 .filter('sumOfValue', function(){
	  return function(data, key){
		  if (angular.isUndefined(data) || angular.isUndefined(key))
	            return 0;        
	        var sum = 0;        
	        angular.forEach(data,function(value){
	            sum = sum + parseInt(value[key], 10);
	        });        
	        return sum;
	  }
  });
  
