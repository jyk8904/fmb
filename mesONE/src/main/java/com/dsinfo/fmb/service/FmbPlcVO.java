package com.dsinfo.fmb.service;


/*PLC모니터링VO*/

public class FmbPlcVO extends MBasAbsVO {

	private String eqpt_cd;
	private String eqpt_nm;
	private String fact_id;
	private String line_cd;
	private String line_nm;
	private String op_cd;
	private String op_nm;
	private String item_cd;
	private String jisino;
	private String jisino_count;
	private String plc_id;
	private String eqpt_sts;
	private String eqpt_sts3;
	private String sts_dttm;
	private String prod_dt;
	private String tag_id;
	private String str_dttm;
	private String end_dttm;
	private String alam_nm;
	private String d_count;
	private String n_count;
	private String t_count;
	private String c_count;
	
	//생성자
	public FmbPlcVO() {
	}

	//메소드명 지정방식 :  Camel Case
	
	

	public String getTagId() {
		return tag_id;
	}

	public void setTagId(String tag_id) {
		this.tag_id = tag_id;
	}

	public String getStrDttm() {
		return str_dttm;
	}

	public void setStrDttm(String str_dttm) {
		this.str_dttm = str_dttm;
	}

	public String getEndDttm() {
		return end_dttm;
	}

	public void setEndDttm(String end_dttm) {
		this.end_dttm = end_dttm;
	}

	public String getAlamNm() {
		return alam_nm;
	}

	public void setAlamNm(String alam_nm) {
		this.alam_nm = alam_nm;
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

	public String getFactId() {
		return fact_id;
	}

	public void setFactId(String fact_id) {
		this.fact_id = fact_id;
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

	public String getJisino() {
		return jisino;
	}

	public void setJisino(String jisino) {
		this.jisino = jisino;
	}

	public String getJisinoCount() {
		return jisino_count;
	}

	public void setJisinoCount(String jisino_count) {
		this.jisino_count = jisino_count;
	}

	public String getPlcId() {
		return plc_id;
	}

	public void setPlcCount(String plc_id) {
		this.plc_id = plc_id;
	}

	public String getEqptSts() {
		return eqpt_sts;
	}

	public void setEqptSts(String eqpt_sts) {
		this.eqpt_sts = eqpt_sts;
	}
	public String getEqptSts3() {
		return eqpt_sts3;
	}

	public void setEqptSts3(String eqpt_sts3) {
		this.eqpt_sts3 = eqpt_sts3;
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

	public void setProDt(String prod_dt) {
		this.prod_dt = prod_dt;
	}

	public String getDCount() {
		return d_count;
	}

	public void setDCount(String d_count) {
		this.d_count = d_count;
	}

	public String getNCount() {
		return n_count;
	}

	public void setNCount(String n_count) {
		this.n_count = n_count;
	}

	public String getTCount() {
		return t_count;
	}

	public void setTCount(String t_count) {
		this.t_count = t_count;
	}

	public String getCCount() {
		return c_count;
	}

	public void setCCount(String c_count) {
		this.c_count = c_count;
	}
	

}
