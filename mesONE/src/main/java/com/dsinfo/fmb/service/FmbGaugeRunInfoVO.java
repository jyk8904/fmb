package com.dsinfo.fmb.service;


/*PLC모니터링VO*/

public class FmbGaugeRunInfoVO extends MBasAbsVO {


	private int norun_count;
	private int run_count;
	private int standby_count;
	private int alarm_count;
	
	public FmbGaugeRunInfoVO() {
	}

	public int getNoRunCount() {
		return norun_count;
	}

	public void setNoRunCount(int norun_count) {
		this.norun_count = norun_count;
	}

	public int getRunCount() {
		return run_count;
	}

	public void setRunCount(int run_count) {
		this.run_count = run_count;
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
	
	
	
}
