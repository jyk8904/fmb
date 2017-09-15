package com.dsinfo.fmb.service;


/*PLC모니터링VO*/

public class FmbAndonParamVO extends MBasAbsVO {

	//DB컬럼이름과 같게 지정
	private String eqpt_cd;
	private String plc_id;


	//생성자
	public FmbAndonParamVO() {
	}
	
	//메소드명 지정방식 :  Camel Case


	public String getEqptCd() {
		return eqpt_cd;
	}

	public void setEqptCd(String eqpt_cd) {
		this.eqpt_cd = eqpt_cd;
	}

	public String getPlcId() {
		return plc_id;
	}

	public void setPlcId(String plc_id) {
		this.plc_id = plc_id;
	}


	
	
}