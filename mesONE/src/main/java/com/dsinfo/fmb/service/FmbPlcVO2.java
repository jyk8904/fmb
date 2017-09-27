package com.dsinfo.fmb.service;


/*PLC모니터링VO*/

public class FmbPlcVO2 extends MBasAbsVO {


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
	private String sts_dttm;
	private String prod_dt;
	private String d_count;
	private String n_count;
	private String t_count;
	private String c_count;
	private String remark;
	private String c_user;
	private String c_date;
	private String m_user;
	private String m_date;
	private String eqpt_sts_nm;
	private String count_time;
	private String norunsum;
	private String runsum;
	private String s_runsum;
	private String s_norunsum;
	private String operating_rate;
	private String taketime;
	private String uph;
	private String alramcnt;
	private String alramsum;
	private String asset_no;
	
	
	public FmbPlcVO2() {
		// TODO Auto-generated constructor stub
	}
	
	public String getEqptCd() {
		return eqpt_cd;
	}
	
	public void setEqptCd(String eqpt_cd) {
		this.eqpt_cd = eqpt_cd;
	}

	public String getNorunsum() {
		return norunsum;
	}

	public void setNorunsum(String norunsum) {
		this.norunsum = norunsum;
	}

	public String getAlramcnt() {
		return alramcnt;
	}

	public void setAlramcnt(String alramcnt) {
		this.alramcnt = alramcnt;
	}

	public String getUph() {
		return uph;
	}

	public void setUph(String uph) {
		this.uph = uph;
	}

	public String getEqptNm() {
		return eqpt_nm;
	}

	public void setEqptNm(String eqpt_nm) {
		this.eqpt_nm = eqpt_nm;
	}

	public String getFactI() {
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

	public void setPlcId(String plc_id) {
		this.plc_id = plc_id;
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


	public String getEqptStsNm() {
		return eqpt_sts_nm;
	}

	public void setEqptStsNm(String eqpt_sts_nm) {
		this.eqpt_sts_nm = eqpt_sts_nm;
	}

	public String getCountTime() {
		return count_time;
	}

	public void setCountTime(String count_time) {
		this.count_time = count_time;
	}

	public String getRunsum() {
		return runsum;
	}

	public void setRunsum(String runsum) {
		this.runsum = runsum;
	}

	public String getSRunsum() {
		return s_runsum;
	}

	public void setSRunsum(String s_runsum) {
		this.s_runsum = s_runsum;
	}

	public String getSNorunsum() {
		return s_norunsum;
	}

	public void setSNorunsum(String s_norunsum) {
		this.s_norunsum = s_norunsum;
	}

	public String getOperatingRate() {
		return operating_rate;
	}

	public void setOperatingRate(String operating_rate) {
		this.operating_rate = operating_rate;
	}

	public String getTaketime() {
		return taketime;
	}

	public void setTaketime(String taketime) {
		this.taketime = taketime;
	}

	public String getAlramsum() {
		return alramsum;
	}

	public void setAlramsum(String alramsum) {
		this.alramsum = alramsum;
	}

	public String getAssetNo() {
		return asset_no;
	}

	public void setAssetNo(String asset_no) {
		this.asset_no = asset_no;
	}

	public String getMDate() {
		return m_date;
	}

	public void setMDate(String m_date) {
		this.m_date = m_date;
	}

	
}
