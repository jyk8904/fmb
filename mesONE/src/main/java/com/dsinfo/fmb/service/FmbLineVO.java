package com.dsinfo.fmb.service;


/*LINE별 생산실적 모니터링 VO*/

public class FmbLineVO extends MBasAbsVO {

	private String fact_id;
	private String line_cd;
	private String line_nm;
	private String d_goal;
	private String n_goal;
	private String eqpt_sts;
	private String d_count;
	private String n_count;
	private String d_rate;
	private String n_rate;
	private String line_top_nm;
	private String line_mid_nm;
	private String line_bot_nm;
	
	//생성자
	public FmbLineVO() {
	}

	//메소드명 지정방식 :  Camel Case

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
	
	public String getDGoal() {
		return d_goal;
	}

	public void setDGoal(String d_goal) {
		this.d_goal = d_goal;
	}

	public String getNGoal() {
		return n_goal;
	}

	public void setNGoal(String n_goal) {
		this.n_goal = n_goal;
	}

	public String getEqptSts() {
		return eqpt_sts;
	}

	public void setEqptSts(String eqpt_sts) {
		this.eqpt_sts = eqpt_sts;
	}

	public String getDRate() {
		return d_rate;
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


	public void setDRate(String d_rate) {
		this.d_rate = d_rate;
	}

	public String getNRate() {
		return n_rate;
	}

	public void setNRate(String n_rate) {
		this.n_rate = n_rate;
	}

	public String getLineTopNm() {
		return line_top_nm;
	}

	public void setLineTopNm(String line_top_nm) {
		this.line_top_nm = line_top_nm;
	}

	public String getLineMidNm() {
		return line_mid_nm;
	}

	public void setLineMidNm(String line_mid_nm) {
		this.line_mid_nm = line_mid_nm;
	}

	public String getLineBotNm() {		
		return line_bot_nm;
	}

	public void setLineBotNm(String line_bot_nm) {
		this.line_bot_nm = line_bot_nm;
	}

	
}

	