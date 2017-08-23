/**
 * @Class Name : worker.js
 * @Description : 화면 전환 및 내부페이지 데이터 갱신 관리 워커
 * @Modification Information  
 * @
 * @  작업일       작성자      내용
 * @ ----------  ---------  -------------------------------
 * @ 2017.05.    조준연 정유경    최초생성
 * @ 
 * @since 
 * @version 1.0
 * @function
 */


 onmessage = function(evt){
	 
	var jsonData = evt.data[0];			//페이지 세팅데이터
	var curPageSeq = evt.data[1];		//현재페이지
	var switchPage = evt.data[2];		//페이지를 전환하는지 여부 on, off
	var switchNum = jsonData[curPageSeq].switchNum; //현재페이지의 갱신횟수
    var interval = jsonData[curPageSeq].dataTime *1000;	//현재페이지의 갱신시간 
    var postNum = 0;								//페이지 갱신 횟수
	var dataChange = true;							//데이터 갱신을 계속 하는지 여부
	var maxLength = jsonData.length;
	var nextPage =getNextPage();
    //console.log(curPageSettingTime);
    
    if(switchPage =="on"){//페이지 전환중 -> 페이지 갱신 횟수만큼 post, 후 페이지 전환
    	
    	setInterval(post, interval);			//페이지 전환
    	
    }else{				  //페이지 내에서 데이터만 갱신중, 계속 페이지 갱신 post
    	
    	setInterval(post2, interval);	//계속 페이지 갱신
    }  

    function post(){
    	postNum+=1;
    	if(postNum>=switchNum){
    		dataChange=false;
    	}
    	postMessage([dataChange, nextPage]);
    }
    function post2(){
       	postMessage([dataChange, nextPage]);
    }
    
    function getNextPage(){
    		//다른 페이지에서 시작한경우 seq+1
        	curPageSeq = curPageSeq + 1;
        	
        	if(curPageSeq>=maxLength){//현재 마지막페이지인경우 변경될 페이지를 첫페이지로 지정
        		curPageSeq = 0;
    	    }
        	
        	while(jsonData[curPageSeq].switcher == false){
        		curPageSeq = curPageSeq + 1;
        		if(curPageSeq>=maxLength){
        			curPageSeq = 0;
        	    }
        	}
            return curPageSeq;
    }
    
    
}
