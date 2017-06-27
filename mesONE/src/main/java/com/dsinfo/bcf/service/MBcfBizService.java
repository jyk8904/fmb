package com.dsinfo.bcf.service;

import java.util.List;

import com.dsinfo.bcf.service.MBcfAbsVO;
import com.dsinfo.bcf.service.impl.MBcfTransactionManager;
import com.dsinfo.sys.service.MSysRtnMsgVO;

/**
 * @Class Name : MBcfBizService.java
 * @Description : �봽�젅�엫�썙�겕 怨듯넻 �꽌鍮꾩뒪 �겢�옒�뒪
 * @Modification Information
 * @  �닔�젙�씪            �닔�젙�옄              �닔�젙�궡�슜
 * @ ----------------------------------------------------
 * @ @ 2017.03.03  KB.SHIN     - 理쒖큹�깮�꽦
 * 
 * @author KB.SHIN
 * @since 2017.03.23
 * @version 1.0
 * @see
 * 
 * Copyright (C) by Brit Consortium All right reserved.
 */
public interface MBcfBizService {
	/**
	 * MyBatis �듃�옖�옲�뒯 媛앹껜 �뼸湲� 
	 * @return MBcfTransactionManager 媛앹껜
	 * @exception Exception
	 */
	public MBcfTransactionManager getTransactionManager() throws Exception;
	
	/**
	 * LIST로 받는 select 구문
	 * @param MBasCltMstVO - 
	 * @return List
	 * @exception Exception
	 */	
	 public List<?> select(String sqlID, MBcfAbsVO vo) throws Exception;
	 	
	 public List<?> selectAll(String sqlID) throws Exception;
	 	
	 
		/**
	    * 데이터를 등록한다.
	    * @param <MBasCltMstVO>
	    * @param vo - 등록할 정보가 담긴 VO 객체
	    * @return 등록 결과
	    * @exception Exception
	    */
	    public void insert(String sqlID, MBcfAbsVO vo) throws Exception;

	    /**
	     * 데이터를 수정한다.
	     * @param vo - 수정할 정보가 담긴 VO 객체
	     * @return void형
	     * @exception Exception
	     */
	    public void update(String sqlID, MBcfAbsVO vo) throws Exception;

	    /**
	     * 데이터를 삭제한다.
	     * @param vo - 삭제할 정보가 담긴 VO
	     * @return void형
	     * @exception Exception
	     */
	    public void delete(String sqlID, MBcfAbsVO vo) throws Exception;
		/**
		 * LIST로 받는 select 구문
		 * @param MBasCltMstVO - 
		 * @return List
		 * @exception Exception
		 */
		 public MSysRtnMsgVO getMSysRtnMsgVO();
	    
}




