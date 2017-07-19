/**
 * 
 */
 onmessage = function(evt){
    // interval 시간을 설정한다.
    // Default는 5초로 정해둠.
    var interval = 5000;
    var curPageSettingTime= evt.data;
    
   //console.log(curPageSettingTime);
    
    
    if(curPageSettingTime!=null){
    	interval = curPageSettingTime.dataTime * 1000;
    }
    setInterval(post, interval);
    
    
    function post(){
    	postMessage(interval);
    }
    
}
