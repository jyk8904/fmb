package com.dsinfo.fmb.service;


/*PLC모니터링VO*/

public class FmbEqptVO extends MBasAbsVO {

	//DB컬럼이름과 같게 지정
	private String fact_id;		// 공장 ID
	private String eqpt_cnm;  	// 설비클래스명
	private String eqpt_type; 	// 타입(PLC/SPC/COUNT/ANDON)
	private String id;    		// ID
	private String css_top;		// css top
	private String css_left;	// css left
	private String css_width;	// css width
	private String css_height;	// css height
	private String css_zindex;	// css z-index
	private String sts_img0;	// 비가동 이미지
	private String sts_img1;	// 가동 이미지
	private String sts_img2;	// 대기 이미지
	private String sts_img3;	// 수리 이미지
	private String sts_img4;	// 알람 이미지
	private String sts_img5;	// 
	//생성자
	public FmbEqptVO() {
	}
	
	//메소드명 지정방식 :  Camel Case

	public String getFactId() {
		return fact_id;
	}

	public void setFactId(String fact_id) {
		this.fact_id = fact_id;
	}

	public String getEqptCnm() {
		return eqpt_cnm;
	}

	public void setEqptCnm(String eqpt_cnm) {
		this.eqpt_cnm = eqpt_cnm;
	}

	public String getEqptType() {
		return eqpt_type;
	}

	public void setEqptType(String eqpt_type) {
		this.eqpt_type = eqpt_type;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCssTop() {
		return css_top;
	}

	public void setCssTop(String css_top) {
		this.css_top = css_top;
	}

	public String getCssLeft() {
		return css_left;
	}

	public void setCssLeft(String css_left) {
		this.css_left = css_left;
	}

	public String getCssWidth() {
		return css_width;
	}

	public void setCssWidth(String css_width) {
		this.css_width = css_width;
	}

	public String getCssHeight() {
		return css_height;
	}

	public void setCssHeight(String css_height) {
		this.css_height = css_height;
	}

	public String getCssZindex() {
		return css_zindex;
	}

	public void setCssZindex(String css_zindex) {
		this.css_zindex = css_zindex;
	}

	public String getStsImg0() {
		return sts_img0;
	}

	public void setStsImg0(String sts_img0) {
		this.sts_img0 = sts_img0;
	}

	public String getStsImg1() {
		return sts_img1;
	}

	public void setStsImg1(String sts_img1) {
		this.sts_img1 = sts_img1;
	}

	public String getStsImg2() {
		return sts_img2;
	}

	public void setStsImg2(String sts_img2) {
		this.sts_img2 = sts_img2;
	}

	public String getStsImg3() {
		return sts_img3;
	}

	public void setStsImg3(String sts_img3) {
		this.sts_img3 = sts_img3;
	}

	public String getStsImg4() {
		return sts_img4;
	}

	public void setStsImg4(String sts_img4) {
		this.sts_img4 = sts_img4;
	}

	public String getStsImg5() {
		return sts_img5;
	}

	public void setStsImg5(String sts_img5) {
		this.sts_img5 = sts_img5;
	}

	
}