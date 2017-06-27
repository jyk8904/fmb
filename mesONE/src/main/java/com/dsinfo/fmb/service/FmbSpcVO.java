package com.dsinfo.fmb.service;


/*LINE별 생산실적 모니터링 VO*/

public class FmbSpcVO extends MBasAbsVO {

	private String pat_cnt;
	private String act_cnt;
	private String act_rate;
	
	//생성자
	public FmbSpcVO() {
	}

	
	//메소드명 지정방식 :  Camel Case
	public String getPatCnt() {
		return pat_cnt;
	}

	public void setPatCnt(String pat_cnt) {
		this.pat_cnt = pat_cnt;
	}

	public String getActCnt() {
		return act_cnt;
	}

	public void setActCnt(String act_cnt) {
		this.act_cnt = act_cnt;
	}

	public String getActRate() {
		return act_rate;
	}

	public void setActRate(String act_rate) {
		this.act_rate = act_rate;
	}

}

	