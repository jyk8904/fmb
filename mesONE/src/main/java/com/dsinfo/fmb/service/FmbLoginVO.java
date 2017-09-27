package com.dsinfo.fmb.service;


/*PLC모니터링VO*/

public class FmbLoginVO extends MBasAbsVO {

	//DB컬럼이름과 같게 지정
	private String user_id;
	private String user_pw;
	
	
	//생성자
	public FmbLoginVO() {
	}


	public String getUserId() {
		return user_id;
	}


	public void setUserId(String user_id) {
		this.user_id = user_id;
	}


	public String getUserPw() {
		return user_pw;
	}


	public void setUserPw(String user_pw) {
		this.user_pw = user_pw;
	}
	
	//메소드명 지정방식 :  Camel Case


	
}