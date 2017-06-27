/**
 * 
 */
 onmessage = function(evt){
   
    
  
    // interval 시간을 설정한다.
    // Default는 10초로 정해둠.
    var interval = 10000;
    
    if(evt.data!=null){
    	interval = evt.data * 1000;
    }
    setInterval(post, 5000);
    
    
    function post(){
    	console.log('알람메세지');
    	postMessage(interval);
    }
    
}
