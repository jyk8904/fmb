package com.dsinfo.fmb.service;


/*PLC모니터링VO*/

public class FmbEqptParamVO extends MBasAbsVO {

	//DB컬럼이름과 같게 지정
	private String fact_id;   // 공장 ID
	private String eqpt_type; // type
	private String id;   	  //  ID
	private String eqpt_cnm;  // 설비클래스명
		
	//생성자
	public FmbEqptParamVO() {
	}

	//메소드명 지정방식 :  Camel Case
	public String getFactId() {
		return fact_id;
	}


	public void setFactId(String fact_id) {
		this.fact_id = fact_id;
	}
	
	public String getEqptType() {
		return eqpt_type;
	}

	public void setEqptType(String eqpt_type) {
		this.eqpt_type = eqpt_type;
	}

	public String getId() {
		return id;
	}


	public void setPlcId(String id) {
		this.id = id;
	}


	public String getEqptCnm() {
		return eqpt_cnm;
	}


	public void setEqptCnm(String eqpt_cnm) {
		this.eqpt_cnm = eqpt_cnm;
	}
}