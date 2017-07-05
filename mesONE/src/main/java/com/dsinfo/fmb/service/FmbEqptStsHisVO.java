package com.dsinfo.fmb.service;


public class FmbEqptStsHisVO extends MBasAbsVO {


	private String eqpt_cd;
	private String eqpt_nm;
	private String asset_no;
	private String plc_sts;
	private String plc_sts_txt;
	private String str_dttm;
	private String end_dttm;
	private String time_sec;
	private String time_min;
	
	
	public FmbEqptStsHisVO() {
	}

	public String getEqptCd() {
		return eqpt_cd;
	}

	public void setEqptCd(String eqpt_cd) {
		this.eqpt_cd = eqpt_cd;
	}

	public String getEqptNm() {
		return eqpt_nm;
	}

	public void setEqptNm(String eqpt_nm) {
		this.eqpt_nm = eqpt_nm;
	}

	public String getAssetNo() {
		return asset_no;
	}

	public void setAssetNo(String asset_no) {
		this.asset_no = asset_no;
	}

	public String getPlcSts() {
		return plc_sts;
	}

	public void setPlcSts(String plc_sts) {
		this.plc_sts = plc_sts;
	}

	public String getPlcStsTxt() {
		return plc_sts_txt;
	}

	public void setPlcStsTxt(String plc_sts_txt) {
		this.plc_sts_txt = plc_sts_txt;
	}

	public String getStrDttm() {
		return str_dttm;
	}

	public void setStrDttm(String str_dttm) {
		this.str_dttm = str_dttm;
	}

	public String getEndDttm() {
		return end_dttm;
	}

	public void setEndDttm(String end_dttm) {
		this.end_dttm = end_dttm;
	}

	public String getTimeSec() {
		return time_sec;
	}

	public void setTimeSec(String time_sec) {
		this.time_sec = time_sec;
	}

	public String getTimeMin() {
		return time_min;
	}

	public void setTimeMin(String time_min) {
		this.time_min = time_min;
	}
}
