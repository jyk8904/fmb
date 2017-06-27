package com.dsinfo.sys.service;

/**
 * @Class Name : MSysErrMsgVO.java
 * @Description : 오류 메시지  VO 객체
 * @Modification Information
 * @
 * @  수정일            수정자              수정내용
 * @ ----------------------------------------------------
 * @ 2017.03.28  kb.shin    - 최초생성
 *
 * @author kb.shin
 * @since 2017.03.28
 * @version 1.0
 * @see
 * 
 *  Copyright (C) by Brit Consortium All right reserved.
 */

public class MSysRtnMsgVO  {
	private String msg_id;		/* 메시지 결과값 OK/NG */
	private String msg_nm;		/* 메시지 내용. 오류 시에는 오류내용  */

	
	public MSysRtnMsgVO() {
	}


	public String getMsgId() {
		return msg_id;
	}


	public void setMsgId(String msg_id) {
		this.msg_id = msg_id;
	}


	public String getMsgNm() {
		return msg_nm;
	}


	public void setMsgNm(String msg_nm) {
		this.msg_nm = msg_nm;
	}
	
}
