package com.dsinfo.fmb.service;


/*PLC모니터링VO*/

public class FmbRankAndonInfoVO extends MBasAbsVO {


	private int rownum;
	private int qcm_bad_count;
	private String qcm_bad_tm;
	private String qcm_bad_dur;
	private String qcm_bad_nm;
	private String qcm_bad_eqpt;
	private int mat_miss_count;
	private String mat_miss_tm;
	private String mat_miss_dur;
	private String mat_miss_nm;
	private String mat_miss_eqpt;
	private int item_cha_count;
	private String item_cha_tm;
	private String item_cha_dur;
	private String item_cha_nm;
	private String item_cha_eqpt;
	private int rework_count;
	private String rework_tm;
	private String rework_dur;
	private String rework_nm;
	private String rework_eqpt;
	
	
    public FmbRankAndonInfoVO() {
    }


	public int getRownum() {
		return rownum;
	}

	public void setRownum(int rownum) {
		this.rownum = rownum;
	}

	public int getQcmBadCount() {
		return qcm_bad_count;
	}

	public void setQcmBadCount(int qcm_bad_count) {
		this.qcm_bad_count = qcm_bad_count;
	}

	public String getQcmBadTm() {
		return qcm_bad_tm;
	}

	public void setQcmBadTm(String qcm_bad_tm) {
		this.qcm_bad_tm = qcm_bad_tm;
	}

	public String getQcmBadDur() {
		return qcm_bad_dur;
	}

	public void setQcmBadDur(String qcm_bad_dur) {
		this.qcm_bad_dur = qcm_bad_dur;
	}

	public String getQcmBadNm() {
		return qcm_bad_nm;
	}

	public void setQcmBadNm(String qcm_bad_nm) {
		this.qcm_bad_nm = qcm_bad_nm;
	}

	public String getQcmBadEqpt() {
		return qcm_bad_eqpt;
	}

	public void setQcmBadEqpt(String qcm_bad_eqpt) {
		this.qcm_bad_eqpt = qcm_bad_eqpt;
	}

	public int getMatMissCount() {
		return mat_miss_count;
	}

	public void setMatMissCount(int mat_miss_count) {
		this.mat_miss_count = mat_miss_count;
	}

	public String getMatMissTm() {
		return mat_miss_tm;
	}

	public void setMatMissTm(String mat_miss_tm) {
		this.mat_miss_tm = mat_miss_tm;
	}

	public String getMatMissDur() {
		return mat_miss_dur;
	}

	public void setMatMissDur(String mat_miss_dur) {
		this.mat_miss_dur = mat_miss_dur;
	}

	public String getMatMissNm() {
		return mat_miss_nm;
	}

	public void setMatMissNm(String mat_miss_nm) {
		this.mat_miss_nm = mat_miss_nm;
	}

	public String getMatMissEqpt() {
		return mat_miss_eqpt;
	}

	public void setMatMissEqpt(String mat_miss_eqpt) {
		this.mat_miss_eqpt = mat_miss_eqpt;
	}

	public int getItemChaCount() {
		return item_cha_count;
	}

	public void setItemChaCount(int item_cha_count) {
		this.item_cha_count = item_cha_count;
	}

	public String getItemChaTm() {
		return item_cha_tm;
	}

	public void setItemChaTm(String item_cha_tm) {
		this.item_cha_tm = item_cha_tm;
	}

	public String getItemChaDur() {
		return item_cha_dur;
	}

	public void setItemChaDur(String item_cha_dur) {
		this.item_cha_dur = item_cha_dur;
	}

	public String getItemChaNm() {
		return item_cha_nm;
	}

	public void setItemChaNm(String item_cha_nm) {
		this.item_cha_nm = item_cha_nm;
	}

	public String getItemChaEqpt() {
		return item_cha_eqpt;
	}

	public void setItemChaEqpt(String item_cha_eqpt) {
		this.item_cha_eqpt = item_cha_eqpt;
	}

	public int getReworkCount() {
		return rework_count;
	}

	public void setReworkCount(int rework_count) {
		this.rework_count = rework_count;
	}

	public String getReworkTm() {
		return rework_tm;
	}

	public void setReworkTm(String rework_tm) {
		this.rework_tm = rework_tm;
	}

	public String getReworkDur() {
		return rework_dur;
	}

	public void setReworkDur(String rework_dur) {
		this.rework_dur = rework_dur;
	}

	public String getReworkNm() {
		return rework_nm;
	}

	public void setReworkNm(String rework_nm) {
		this.rework_nm = rework_nm;
	}

	public String getReworkEqpt() {
		return rework_eqpt;
	}

	public void setReworkEqpt(String rework_eqpt) {
		this.rework_eqpt = rework_eqpt;
	}

}
