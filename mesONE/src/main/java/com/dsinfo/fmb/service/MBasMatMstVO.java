package com.dsinfo.fmb.service;

public class MBasMatMstVO extends MBasAbsVO {

	private String mat_cd;		//품번
	private String mat_nm;		//품명
	private String mat_snm;	//품번약어
	private String unit_cd;		//단위
	private String spec;			//자재규격
	private String weight;			//무게
	private String type_cd;		//자재유형(제품,반제품,소모품…)
	private String grp1_cd;		//분류코드1
	private String grp2_cd;		//분류코드2
	private String grp3_cd;		//분류코드3
	
	public MBasMatMstVO() {
	}

	public String getMatCd() {
		return mat_cd;
	}


	public void setMatCd(String mat_cd) {
		this.mat_cd = mat_cd;
	}


	public String getMatNm() {
		return mat_nm;
	}


	public void setMatNm(String mat_nm) {
		this.mat_nm = mat_nm;
	}


	public String getMatSnm() {
		return mat_snm;
	}


	public void setMatSnm(String mat_snm) {
		this.mat_snm = mat_snm;
	}


	public String getUnitCd() {
		return unit_cd;
	}


	public void setUnitCd(String unit_cd) {
		this.unit_cd = unit_cd;
	}

	public String getSpec() {
		return spec;
	}


	public void setSpec(String spec) {
		this.spec = spec;
	}

	public String getWeight() {
		return weight;
	}


	public void setWeight(String weight) {
		this.weight = weight;
	}


	public String getTypeCd() {
		return type_cd;
	}


	public void setTypeCd(String type_cd) {
		this.type_cd = type_cd;
	}


	public String getGrp1Cd() {
		return grp1_cd;
	}


	public void setGrp1Cd(String grp1_cd) {
		this.grp1_cd = grp1_cd;
	}


	public String getGrp2Cd() {
		return grp2_cd;
	}


	public void setGrp2Cd(String grp2_cd) {
		this.grp2_cd = grp2_cd;
	}


	public String getGrp3Cd() {
		return grp3_cd;
	}


	public void setGrp3Cd(String grp3_cd) {
		this.grp3_cd = grp3_cd;
	}

}
