/**
 * 
 */
 onmessage = function(evt){
   
    // 화면전환에 필요한 각각의 데이터를 JSON으로 받음.
    var jsonData = evt.data;
    
    // interval 시간을 설정한다.
    // Default는 10초로 정해둠.
    var interval = 5000;
	 console.log(jsonData);
    if(jsonData.length>0){
    	interval = jsonData[0].dataTime * 1000;
    }
  
  
    setInterval(post, interval);
    
    
    function post(){
    	postMessage(interval);
    }
    
}
