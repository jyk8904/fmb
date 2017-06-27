package com.dsinfo.fmb.service;


/*PLC모니터링 parameter*/

public class FmbPlcParamVO extends MBasAbsVO {

	private String fact_id;
	private String plc_id;
	
	public  FmbPlcParamVO () {
	}

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
}
