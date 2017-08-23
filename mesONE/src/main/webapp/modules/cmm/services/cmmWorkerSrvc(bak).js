/**
 * @Class Name : worker.js
 * @Description : 페이지 전환 설정 관리 워커
 * @Modification Information  
 * @
 * @  작업일       작성자      내용
 * @ ----------  ---------  -------------------------------
 * @ 2017.05.    조준연 정유경    최초생성
 * @ 
 * @since 
 * @version 1.0
 * @function
 *
 */
 onmessage = function(evt){
   
    // 화면전환에 필요한 각각의 데이터를 JSON으로 받음.
	 var jsonData = evt.data[0];
	 var curPageSeq = evt.data[1];
	 var maxLength = jsonData.length;
	 
    if(curPageSeq == null){//main에서 시작한경우 바로 페이지 전환
    	curPageSeq = 0;
    	 while(jsonData[curPageSeq].switcher == false){
  		   curPageSeq++;
    	 }
    	postMessage(curPageSeq);
    
    }else{				//다른 페이지에서 시작한경우 seq+1
    	
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
       // 화면 전환 순번을 넘김
       postMessage(curPageSeq);
    }
}
