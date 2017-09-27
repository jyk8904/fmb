package com.dsinfo.fmb.service;


/*반(Fact)별 생산실적 모니터링 VO*/

public class FmbFactVO extends MBasAbsVO {
	private String prod_dt;
	private String fact_id;
	private int d_goal;
	private int n_goal;
	private int goal_count;
	private int d_count;
	private int n_count;
	private float d_rate;
	private float n_rate;
	private int defect_count;
	
	private int d_goal_mon;
	private int n_goal_mon;
	private int goal_count_mon;
	private int d_count_mon;
	private int n_count_mon;
	private float d_rate_mon;
	private float n_rate_mon;
	private int defect_count_mon;
	
	

	//생성자
	public FmbFactVO() {
	}

	//메소드명 지정방식 :  Camel Case

	public String getProdDt() {
		return prod_dt;
	}
	
	public void setProdDt(String prod_dt) {
		this.prod_dt = prod_dt;
	}
	
	public String getFactId() {
		return fact_id;
	}

	public void setFactId(String fact_id) {
		this.fact_id = fact_id;
	}


	public int getDGoal() {
		return d_goal;
	}

	public void setDGoal(int d_goal) {
		this.d_goal = d_goal;
	}

	public int getNGoal() {
		return n_goal;
	}

	public void setNGoal(int n_goal) {
		this.n_goal = n_goal;
	}
	
	public int getGoalCount() {
		return goal_count;
	}

	public void setGoalCount(int goal_count) {
		this.goal_count = goal_count;
	}

	public float getDRate() {
		return d_rate;
	}
	public void setDRate(float d_rate) {
		this.d_rate = d_rate;
	}
	public int getDCount() {
		return d_count;
	}

	public void setDCount(int d_count) {
		this.d_count = d_count;
	}

	public int getNCount() {
		return n_count;
	}

	public void setNCount(int n_count) {
		this.n_count = n_count;
	}


	public float getNRate() {
		return n_rate;
	}

	public void setNRate(float n_rate) {
		this.n_rate = n_rate;
	}
	public int getDefectCount() {
		return defect_count;
	}

	public void setDefectCount(int defect_count) {
		this.defect_count = defect_count;
	}
	
	public int getDGoalMon() {
		return d_goal_mon;
	}

	public void setDGoalMon(int d_goal_mon) {
		this.d_goal_mon = d_goal_mon;
	}

	public int getNGoalMon() {
		return n_goal_mon;
	}

	public void setNGoalMon(int n_goal_mon) {
		this.n_goal_mon = n_goal_mon;
	}

	public int getGoalCountMon() {
		return goal_count_mon;
	}

	public void setGoalCountMon(int goal_count_mon) {
		this.goal_count_mon = goal_count_mon;
	}

	public int getDCountMon() {
		return d_count_mon;
	}

	public void setDCountMon(int d_count_mon) {
		this.d_count_mon = d_count_mon;
	}

	
	public int getNCountMon() {
		return n_count_mon;
	}

	public void setNCountMon(int n_count_mon) {
		this.n_count_mon = n_count_mon;
	}

	public float getDRateMon() {
		return d_rate_mon;
	}

	public void setDRateMon(float d_rate_mon) {
		this.d_rate_mon = d_rate_mon;
	}

	public float getNRateMon() {
		return n_rate_mon;
	}

	public void setNRateMon(float n_rate_mon) {
		this.n_rate_mon = n_rate_mon;
	}

	public int getDefectCountMon() {
		return defect_count_mon;
	}

	public void setDefectCountMon(int defect_count_mon) {
		this.defect_count_mon = defect_count_mon;
	}

}

	