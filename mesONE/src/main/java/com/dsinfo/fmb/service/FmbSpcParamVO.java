package com.dsinfo.fmb.service;


/*LINE별 생산실적 모니터링 VO*/

public class FmbSpcParamVO extends MBasAbsVO {

	private String line_cd;
	private String op_cd;
	
	//생성자
	public FmbSpcParamVO() {
	}

	public String getLineCd() {
		return line_cd;
	}

	public void setLineCd(String line_cd) {
		this.line_cd = line_cd;
	}

	public String getOpCd() {
		return op_cd;
	}

	public void setOpCd(String op_cd) {
		this.op_cd = op_cd;
	}

	
	//메소드명 지정방식 :  Camel Case
	
}

	