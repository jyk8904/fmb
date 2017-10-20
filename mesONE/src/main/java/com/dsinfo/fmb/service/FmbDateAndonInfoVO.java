package com.dsinfo.fmb.service;


public class FmbDateAndonInfoVO extends MBasAbsVO {


	private int qcm_bad_count;
	private int qcm_bad_tm;
	private int qcm_bad_dur;
	private int mat_miss_count;
	private int mat_miss_tm;
	private int mat_miss_dur;
	private int rework_count;
	private int rework_tm;
	private int rework_dur;
	private int item_cha_count;
	private int item_cha_tm;
	private int item_cha_dur;
	private String dt;
	
	
	
	public FmbDateAndonInfoVO() {
	}



    public int getQcmBadCount() {
        return qcm_bad_count;
    }



    public void setQcmBadXount(int qcm_bad_count) {
        this.qcm_bad_count = qcm_bad_count;
    }



    public int getQcmBadTm() {
        return qcm_bad_tm;
    }



    public void setQcmBadTm(int qcm_bad_tm) {
        this.qcm_bad_tm = qcm_bad_tm;
    }



    public int getQcmBadDur() {
        return qcm_bad_dur;
    }



    public void setQcmBadDur(int qcm_bad_dur) {
        this.qcm_bad_dur = qcm_bad_dur;
    }



    public int getMatMissCount() {
        return mat_miss_count;
    }



    public void setMatMissCount(int mat_miss_count) {
        this.mat_miss_count = mat_miss_count;
    }



    public int getMatMissTm() {
        return mat_miss_tm;
    }



    public void setMatMissTm(int mat_miss_tm) {
        this.mat_miss_tm = mat_miss_tm;
    }



    public int getMatMissDur() {
        return mat_miss_dur;
    }



    public void setMatMissDur(int mat_miss_dur) {
        this.mat_miss_dur = mat_miss_dur;
    }



    public int getReworkCount() {
        return rework_count;
    }



    public void setReworkCount(int rework_count) {
        this.rework_count = rework_count;
    }



    public int getReworkTm() {
        return rework_tm;
    }



    public void setReworkTm(int rework_tm) {
        this.rework_tm = rework_tm;
    }



    public int getReworkDur() {
        return rework_dur;
    }



    public void setReworkDur(int rework_dur) {
        this.rework_dur = rework_dur;
    }

    public int getItemChaCount() {
        return item_cha_count;
    }

    public void setItemChaCount(int item_cha_count) {
        this.item_cha_count = item_cha_count;
    }

    public int getItemChaTm() {
        return item_cha_tm;
    }

    public void setItemChaTm(int item_cha_tm) {
        this.item_cha_tm = item_cha_tm;
    }

    public int getItemChaDur() {
        return item_cha_dur;
    }

    public void setItemChaDur(int item_cha_dur) {
        this.item_cha_dur = item_cha_dur;
    }

    public String getDt() {
        return dt;
    }

    public void setDt(String dt) {
        this.dt = dt;
    }
}
