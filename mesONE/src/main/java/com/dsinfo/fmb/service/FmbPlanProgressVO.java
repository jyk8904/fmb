package com.dsinfo.fmb.service;


/*LINE별 생산실적 모니터링 VO*/

public class FmbPlanProgressVO extends MBasAbsVO {

	private String line_cd;
	private String line_nm;
	private String line_mid_nm;
	private int tot_count;
	private int avg_count;
	private int goal_count;
	private int cur_count_per;
	private int avg_count_per;
	private int goal_count_per;
	
	//생성자
	public FmbPlanProgressVO() {
	}
	

	//메소드명 지정방식 :  CamelCase
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

	
	public String getLineMidNm() {
		return line_mid_nm;
	}


	public void setLineMidNm(String line_mid_nm) {
		this.line_mid_nm = line_mid_nm;
	}


	public int getTotCount() {
		return tot_count;
	}

	public void setTotCount(int tot_count) {
		this.tot_count = tot_count;
	}

	public int getAvgCount() {
		return avg_count;
	}

	public void setAvgCount(int avg_count) {
		this.avg_count = avg_count;
	}

	public int getGoalCount() {
		return goal_count;
	}

	public void setGoalCount(int goal_count) {
		this.goal_count = goal_count;
	}

	public int getCurCountPer() {
		return cur_count_per;
	}

	public void setCurCountPer(int cur_count_per) {
		this.cur_count_per = cur_count_per;
	}

	public int getAvgCountPer() {
		return avg_count_per;
	}

	public void setAvgCountPer(int avg_count_per) {
		this.avg_count_per = avg_count_per;
	}

	public int getGoalCountPer() {
		return goal_count_per;
	}

	public void setGoalCountPer(int goal_count_per) {
		this.goal_count_per = goal_count_per;
	}


	
}

	