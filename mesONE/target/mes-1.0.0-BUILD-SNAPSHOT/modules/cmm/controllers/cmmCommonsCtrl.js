angular.module('app')
/* 메시지 확인 컨트롤 */
.controller('CmmConfirmCtrl', ['$scope', 'close', 'title', 'message', function($scope, close, title, message) {

	$scope.title = title;
	$scope.message = message;
	
	$scope.close = function(result) {
		close(result, 500); // close, but give 500ms for bootstrap to animate
		$scope.showModal = false;
	};
}])
/*기간 선택 달력 컨트롤 */
.controller('cmmPeriodpickerCtrl', function($scope) {
	$scope.openStt = function() {
		$scope.opened1 = true;
	};
	
	$scope.openEnd = function() {
		$scope.opened2 = true;
	};

	$scope.opened1 = false;
	$scope.opened2 = false;
	
	$scope.format = 'yyyy-MM-dd';
})
/* 달력 컨트롤 */
.controller('CmmDatepickerCtrl', ['$scope', 'close', 'title', 'message', function($scope, close, title, message) {

	$scope.today = function() {
		$scope.dt = new Date();
	};
	$scope.today();

	$scope.clear = function () {
		$scope.dt = null;
	};

	// Disable weekend selection
	$scope.disabled = function(date, mode) {
		return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	};

	$scope.toggleMin = function() {
		$scope.minDate = $scope.minDate ? null : new Date();
	};
	$scope.toggleMin();
	$scope.maxDate = new Date(2020, 5, 22);

	$scope.open = function($event) {
		$scope.status.opened = true;
	};

	$scope.setDate = function(year, month, day) {
		$scope.dt = new Date(year, month, day);
	};

	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};

	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[0];

	$scope.status = {
		opened: false
	};

	var tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	var afterTomorrow = new Date();
	afterTomorrow.setDate(tomorrow.getDate() + 2);
	$scope.events = [
	    {
	    	date: tomorrow,
	    	status: 'full'
	    },
	    {
	    	date: afterTomorrow,
	    	status: 'partially'
	    }
    ];

	$scope.getDayClass = function(date, mode) {
	    if (mode === 'day') {
	    	var dayToCheck = new Date(date).setHours(0,0,0,0);

	    	for (var i=0;i<$scope.events.length;i++) {
	    		var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

	    		if (dayToCheck === currentDay) {
	    			return $scope.events[i].status;
	    		}
	    	}
	    }
	    return '';
	};
	
}]);