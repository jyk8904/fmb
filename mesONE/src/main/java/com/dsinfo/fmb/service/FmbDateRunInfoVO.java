package com.dsinfo.fmb.service;


public class FmbDateRunInfoVO extends MBasAbsVO {


	private int norun_count;
	private int norun_tm;
	private int norun_dur;
	private int standby_count;
	private int standby_tm;
	private int standby_dur;
	private int alarm_count;
	private int alarm_tm;
	private int alarm_dur;
	private String dt;
	
	
	
	public FmbDateRunInfoVO() {
	}



    public int getNorun_count() {
        return norun_count;
    }



    public void setNorun_count(int norun_count) {
        this.norun_count = norun_count;
    }



    public int getNorun_tm() {
        return norun_tm;
    }



    public void setNorun_tm(int norun_tm) {
        this.norun_tm = norun_tm;
    }



    public int getNorun_dur() {
        return norun_dur;
    }



    public void setNorun_dur(int norun_dur) {
        this.norun_dur = norun_dur;
    }



    public int getStandby_count() {
        return standby_count;
    }



    public void setStandby_count(int standby_count) {
        this.standby_count = standby_count;
    }



    public int getStandby_tm() {
        return standby_tm;
    }



    public void setStandby_tm(int standby_tm) {
        this.standby_tm = standby_tm;
    }



    public int getStandby_dur() {
        return standby_dur;
    }



    public void setStandby_dur(int standby_dur) {
        this.standby_dur = standby_dur;
    }



    public int getAlarm_count() {
        return alarm_count;
    }



    public void setAlarm_count(int alarm_count) {
        this.alarm_count = alarm_count;
    }



    public int getAlarm_tm() {
        return alarm_tm;
    }



    public void setAlarm_tm(int alarm_tm) {
        this.alarm_tm = alarm_tm;
    }



    public int getAlarm_dur() {
        return alarm_dur;
    }



    public void setAlarm_dur(int alarm_dur) {
        this.alarm_dur = alarm_dur;
    }



    public String getDt() {
        return dt;
    }



    public void setDt(String dt) {
        this.dt = dt;
    }
	
}