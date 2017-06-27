package com.dsinfo.fmb.service;


public class FmbDateRunInfoVO extends MBasAbsVO {


	private int norun_count;
	private int standby_count;
	private int alarm_count;
	private String dt;
	
	
	
	public FmbDateRunInfoVO() {
	}

	public int getNoRunCount() {
		return norun_count;
	}

	public void setNoRunCount(int norun_count) {
		this.norun_count = norun_count;
	}

	public int getStandbyCount() {
		return standby_count;
	}

	public void setStandbyCount(int standby_count) {
		this.standby_count = standby_count;
	}
	public int getAlarmCount() {
		return alarm_count;
	}

	public void setAlarmCount(int alarm_count) {
		this.alarm_count = alarm_count;
	}

	public String getDt() {
		return dt;
	}

	public void setDt(String dt) {
		this.dt = dt;
	}
	
}
