package com.dsinfo.fmb.service;


/*PLC모니터링VO*/

public class FmbRankRunInfoVO extends MBasAbsVO {


	private int rownum;
	private int norun_count;
	private String norun_tm;
	private String norun_nm;
	private String norun_eqpt;
	private int standby_count;
	private String standby_tm;
	private String standby_nm;
	private String standby_eqpt;
	private int alarm_count;
	private String alarm_tm;
	private String alarm_nm;
	private String alarm_eqpt;
	
	
	
	
	public FmbRankRunInfoVO() {
	}

	public int getRowNum() {
		return rownum;
	}

	public void setRowNum(int rownum) {
		this.rownum = rownum;
	}

	public int getNoRunCount() {
		return norun_count;
	}

	public void setNoRunCount(int norun_count) {
		this.norun_count = norun_count;
	}

	public String getNoRunTm() {
		return norun_tm;
	}

	public void setNorunTm(String norun_tm) {
		this.norun_tm = norun_tm;
	}

	public String getNoRunNm() {
		return norun_nm;
	}

	public void setNoRunNm(String norun_nm) {
		this.norun_nm = norun_nm;
	}

	public String getNoRunEqpt() {
		return norun_eqpt;
	}

	public void setNoRunEqpt(String norun_eqpt) {
		this.norun_eqpt = norun_eqpt;
	}

	public int getStandbyCount() {
		return standby_count;
	}

	public void setStandbyCount(int standby_count) {
		this.standby_count = standby_count;
	}

	public String getStandbyTm() {
		return standby_tm;
	}

	public void setStandbyTm(String standby_tm) {
		this.standby_tm = standby_tm;
	}

	public String getStandbyEqpt() {
		return standby_eqpt;
	}

	public void setStandbyEqpt(String standby_eqpt) {
		this.standby_eqpt = standby_eqpt;
	}

	public int getAlarmCount() {
		return alarm_count;
	}

	public void setAlarmCount(int alarm_count) {
		this.alarm_count = alarm_count;
	}

	public String getAlarmTm() {
		return alarm_tm;
	}

	public void setAlarmTm(String alarm_tm) {
		this.alarm_tm = alarm_tm;
	}

	public String getAlarmNm() {
		return alarm_nm;
	}

	public void setAlarmNm(String alarm_nm) {
		this.alarm_nm = alarm_nm;
	}

	public String getAlarmEqpt() {
		return alarm_eqpt;
	}

	public void setAlarmEqpt(String alarm_eqpt) {
		this.alarm_eqpt = alarm_eqpt;
	}

	public String getStandbysNm() {
		return standby_nm;
	}

	public void setStandbyNm(String standby_nm) {
		this.standby_nm = standby_nm;
	}
	
	
}
