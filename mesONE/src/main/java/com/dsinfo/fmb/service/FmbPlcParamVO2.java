package com.dsinfo.fmb.service;


/*PLC모니터링VO*/

public class FmbPlcParamVO2 extends MBasAbsVO {

	private String eqpt_cd;

	//생성자
	public FmbPlcParamVO2() {
	}

	//메소드명 지정방식 :  Camel Case
	public String getEqptCd() {
		return eqpt_cd;
	}

	public void setEqptCd(String eqpt_cd) {
		this.eqpt_cd = eqpt_cd;
	}


}
