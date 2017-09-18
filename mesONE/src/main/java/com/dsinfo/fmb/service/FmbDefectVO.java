package com.dsinfo.fmb.service;


/*블량정보VO*/

public class FmbDefectVO extends MBasAbsVO {

	//DB컬럼이름과 같게 지정
	private String defect_cd;   	// 차트 불량코드
	private String defect_nm; 		// 차트 불량 정보명
	private String defect_count;    // 차트 불량 정보 횟수
	private String rownum;  		// 차트 넘버
	private String item_cd;			// 그리드 품목코드
	private String item_nm;			// 그리드 품목명
	private String rank_count;		// 그리드 카운트
	private String rank_num;		// 그리드 순번
	private String whole_rate;		// 전체 불량률
		
	//생성자
	public FmbDefectVO() {
	}

	public String getDefectCd() {
		return defect_cd;
	}

	public void setDefectCd(String defect_cd) {
		this.defect_cd = defect_cd;
	}

	public String getDefectNm() {
		return defect_nm;
	}

	public void setDefectNm(String defect_nm) {
		this.defect_nm = defect_nm;
	}

	public String getDefectCount() {
		return defect_count;
	}

	public void setDefectCount(String defect_count) {
		this.defect_count = defect_count;
	}

	public String getRownum() {
		return rownum;
	}

	public void setRownum(String rownum) {
		this.rownum = rownum;
	}

	public String getItemCd() {
		return item_cd;
	}

	public void setItemCd(String item_cd) {
		this.item_cd = item_cd;
	}

	public String getItemNm() {
		return item_nm;
	}

	public void setItemNm(String item_nm) {
		this.item_nm = item_nm;
	}

	public String getRankCount() {
		return rank_count;
	}

	public void setRankCount(String rank_count) {
		this.rank_count = rank_count;
	}

	public String getRankNum() {
		return rank_num;
	}

	public void setRankNum(String rank_num) {
		this.rank_num = rank_num;
	}

	public String getWholeRate() {
		return whole_rate;
	}

	public void setWholeRate(String whole_rate) {
		this.whole_rate = whole_rate;
	}

	
}