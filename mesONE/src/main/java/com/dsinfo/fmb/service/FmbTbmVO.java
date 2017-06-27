package com.dsinfo.fmb.service;


/*PLC모니터링VO*/

public class FmbTbmVO extends MBasAbsVO {


	private String fact_a;
	private String fact_b;
	private String fact_c;
	private String fact_x;
	private String total;
	
	
	public FmbTbmVO() {
	}


	public String getFactA() {
		return fact_a;
	}


	public void setFactA(String fact_a) {
		this.fact_a = fact_a;
	}


	public String getFactB() {
		return fact_b;
	}


	public void setFactB(String fact_b) {
		this.fact_b = fact_b;
	}


	public String getFactC() {
		return fact_c;
	}


	public void setFactC(String fact_c) {
		this.fact_c = fact_c;
	}


	public String getFactX() {
		return fact_x;
	}


	public void setFactX(String fact_x) {
		this.fact_x = fact_x;
	}


	public String getTotal() {
		return total;
	}


	public void setTotal(String total) {
		this.total = total;
	}


}
