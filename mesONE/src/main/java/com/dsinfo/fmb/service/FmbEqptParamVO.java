package com.dsinfo.fmb.service;


/*PLC모니터링VO*/

public class FmbEqptParamVO extends MBasAbsVO {

	//DB컬럼이름과 같게 지정
	private String fact_id;   // 공장 ID
	private String plc_id;    // PLC ID
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


	public String getPlcId() {
		return plc_id;
	}


	public void setPlcId(String plc_id) {
		this.plc_id = plc_id;
	}


	public String getEqptCnm() {
		return eqpt_cnm;
	}


	public void setEqptCnm(String eqpt_cnm) {
		this.eqpt_cnm = eqpt_cnm;
	}
}