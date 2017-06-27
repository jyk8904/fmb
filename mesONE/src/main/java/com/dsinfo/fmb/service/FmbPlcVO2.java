package com.dsinfo.fmb.service;


/*PLC모니터링VO*/

public class FmbPlcVO2 extends MBasAbsVO {


	private String PLC_ID;
	private String PLC_IP;
	private String FACT_ID;
	private String plc;
	
	
	public String getPlc() {
		return plc;
	}


	public void setPlc(String plc) {
		this.plc = plc;
	}


	public FmbPlcVO2() {
	}


	public String getPlcId() {
		return PLC_ID;
	}

	public void setPlcId(String pLC_ID) {
		PLC_ID = pLC_ID;
	}

	
	public String getPlcIp() {
		return PLC_IP;
	}


	public void setPlcIp(String pLC_IP) {
		PLC_IP = pLC_IP;
	}


	public String getFactId() {
		return FACT_ID;
	}


	public void setFactId(String fACT_ID) {
		FACT_ID = fACT_ID;
	}
	

}
