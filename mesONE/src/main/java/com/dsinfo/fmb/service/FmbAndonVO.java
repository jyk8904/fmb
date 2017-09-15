package com.dsinfo.fmb.service;


/*PLC모니터링VO*/

public class FmbAndonVO extends MBasAbsVO {

	//DB컬럼이름과 같게 지정
	private String eqpt_cd;
	private String eqpt_nm;
	private String fact_id;		// 공장 ID
	private String line_cd;
	
	private String line_nm;
	private String op_cd;
	private String op_nm;
	private String item_cd;
	private String plc_id;
	private String aplc_id;
	private String eqpt_sts;
	private String sts_dttm;
	private String prod_dt;
	private String mat_miss_sts;
	private String mat_miss_dttm;
	private String qcm_bad_sts;
	private String qcm_bad_dttm;
	private String item_cha_sts;
	private String item_cha_dttm;
	private String rework_sts;
	private String rework_dttm;
	private String remark;
	private String c_user;
	private String c_date;
	private String m_user;
	private String m_date;

	//생성자
	public FmbAndonVO() {
	}
	
	//메소드명 지정방식 :  Camel Case

	public String getFactId() {
		return fact_id;
	}

	public void setFactId(String fact_id) {
		this.fact_id = fact_id;
	}

	public String getEqptCd() {
		return eqpt_cd;
	}

	public void setEqptCd(String eqpt_cd) {
		this.eqpt_cd = eqpt_cd;
	}

	public String getEqptNm() {
		return eqpt_nm;
	}

	public void setEqptNm(String eqpt_nm) {
		this.eqpt_nm = eqpt_nm;
	}

	public String getLineCd() {
		return line_cd;
	}

	public void setLineCd(String line_cd) {
		this.line_cd = line_cd;
	}

	public String getLineNm() {
		return line_nm;
	}

	public void setLineNm(String line_nm) {
		this.line_nm = line_nm;
	}

	public String getOpCd() {
		return op_cd;
	}

	public void setOpCd(String op_cd) {
		this.op_cd = op_cd;
	}

	public String getOpNm() {
		return op_nm;
	}

	public void setOpNm(String op_nm) {
		this.op_nm = op_nm;
	}

	public String getItemCd() {
		return item_cd;
	}

	public void setItemCd(String item_cd) {
		this.item_cd = item_cd;
	}

	public String getPlcId() {
		return plc_id;
	}

	public void setPlcId(String plc_id) {
		this.plc_id = plc_id;
	}

	public String getAplcId() {
		return aplc_id;
	}

	public void setAplcId(String aplc_id) {
		this.aplc_id = aplc_id;
	}

	public String getEqptSts() {
		return eqpt_sts;
	}

	public void setEqptSts(String eqpt_sts) {
		this.eqpt_sts = eqpt_sts;
	}

	public String getStsDttm() {
		return sts_dttm;
	}

	public void setStsDttm(String sts_dttm) {
		this.sts_dttm = sts_dttm;
	}

	public String getProdDt() {
		return prod_dt;
	}

	public void setProdDt(String prod_dt) {
		this.prod_dt = prod_dt;
	}

	public String getMatMissSts() {
		return mat_miss_sts;
	}

	public void setMatMissSts(String mat_miss_sts) {
		this.mat_miss_sts = mat_miss_sts;
	}

	public String getMatMissDttm() {
		return mat_miss_dttm;
	}

	public void setMatMissDttm(String mat_miss_dttm) {
		this.mat_miss_dttm = mat_miss_dttm;
	}

	public String getQcmBadSts() {
		return qcm_bad_sts;
	}

	public void setQcmBadSts(String qcm_bad_sts) {
		this.qcm_bad_sts = qcm_bad_sts;
	}

	public String getQcmBadSttm() {
		return qcm_bad_dttm;
	}

	public void setQcmBadSttm(String qcm_bad_dttm) {
		this.qcm_bad_dttm = qcm_bad_dttm;
	}

	public String getItemChaSts() {
		return item_cha_sts;
	}

	public void setItemChaSts(String item_cha_sts) {
		this.item_cha_sts = item_cha_sts;
	}

	public String getItemChaDttm() {
		return item_cha_dttm;
	}

	public void setItemChaDttm(String item_cha_dttm) {
		this.item_cha_dttm = item_cha_dttm;
	}

	public String getReworkSts() {
		return rework_sts;
	}

	public void setReworkSts(String rework_sts) {
		this.rework_sts = rework_sts;
	}

	public String getReworkDttm() {
		return rework_dttm;
	}

	public void setReworkDttm(String rework_dttm) {
		this.rework_dttm = rework_dttm;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getCUser() {
		return c_user;
	}

	public void setCUser(String c_user) {
		this.c_user = c_user;
	}

	public String getCDate() {
		return c_date;
	}

	public void setCDate(String c_date) {
		this.c_date = c_date;
	}

	public String getMUser() {
		return m_user;
	}

	public void setMUser(String m_user) {
		this.m_user = m_user;
	}

	public String getMDate() {
		return m_date;
	}

	public void setMDate(String m_date) {
		this.m_date = m_date;
	}

	
	
}