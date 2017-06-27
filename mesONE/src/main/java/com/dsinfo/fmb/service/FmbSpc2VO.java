package com.dsinfo.fmb.service;


/*LINE별 생산실적 모니터링 VO*/

public class FmbSpc2VO extends MBasAbsVO {

	private String line_cd;
	private String op_cd;
	private String ppk_kye;
	private String ppk;
	
	//생성자
	public FmbSpc2VO() {
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

	public String getPpkKye() {
		return ppk_kye;
	}

	public void setPpkKye(String ppk_kye) {
		this.ppk_kye = ppk_kye;
	}

	public String getPpk() {
		return ppk;
	}

	public void setPpk(String ppk) {
		this.ppk = ppk;
	}

	
	//메소드명 지정방식 :  Camel Case

}

	