package com.dsinfo.fmb.service;

import com.dsinfo.bcf.service.*;

public class MBasAbsVO extends MBcfAbsVO {
	private String desc;		//비고사항
	private char act_yn;		//적용여부
	
	/**
	 * 생성자
	 */
	public MBasAbsVO() {
	}


	public String getDesc() {
		return desc;
	}


	public void setDesc(String desc) {
		this.desc = desc;
	}

	public char getActYn() {
		return act_yn;
	}

	public void setActYn(char act_yn) {
		this.act_yn = act_yn;
	}

}
