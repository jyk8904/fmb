package com.dsinfo.fmb.service;


public class FmbEqptStsHisParamVO extends MBasAbsVO {


	private String dt;
	private String plc_id;
	
	public FmbEqptStsHisParamVO() {
	}

	public String getDt() {
		return dt;
	}
	
	public void setDt(String dt) {
		this.dt = dt;
	}

	public String getPlcId() {
		return plc_id;
	}

	public void setPlcId(String plc_id) {
		this.plc_id = plc_id;
	}
}
