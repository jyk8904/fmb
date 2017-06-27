package com.dsinfo.fmb.web;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.dsinfo.fmb.service.*;
import com.dsinfo.bcf.service.*;

@RestController
public class FmbTbmCtrl {
	private static final Logger log = LoggerFactory.getLogger(FmbTbmCtrl.class);
	
	/**
	 * MyBatis활용을 위한 최상위 객체
	 **/
	//Autowired:spring에서 자동 생성 및 소멸을 관리
	@Autowired
	private MBcfBizService mBcfBizService;
	
	/*
	 * TbmList를 가져오는 VO
	 * @param id : selectFmbTbm
	 * @param : FmbTbmParamVO
	 * @exception : Exception 
	 * @return: FmbTbmVO
	 */
    @SuppressWarnings("unchecked")
    //4.매핑된 주소를 통해 요기로 이동
	@RequestMapping(value = "/bas/selectFmbTbm.do", method = RequestMethod.GET)
	public ResponseEntity<List<FmbTbmVO>> selectFmbTbm()  {
    	//RequestBody : JSON형태로 보낸 vo를 컬럼명이 똑같으면 FmbPlcParamVO형태로 알아서 매핑,변환
		List<FmbTbmVO> fmbTbmVO = null;
		System.out.println("FmbTbm.do로 이동");
		try {
			fmbTbmVO = (List<FmbTbmVO>) mBcfBizService.selectAll("sql-bas-info.selectFmbTbm");
			log.info("success");
			log.error("fail");
			
			return new ResponseEntity<List<FmbTbmVO>>(fmbTbmVO, HttpStatus.OK);
			//7.응답받은 result 리턴
		} catch (Exception ie) {
			log.error("FmbTbmController:selectFmbTbm=>" +  ie.toString());
			return new ResponseEntity<List<FmbTbmVO>>(fmbTbmVO, HttpStatus.OK);
		}
	}

}
