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
public class FmbPlcCtrl2 {
	private static final Logger log = LoggerFactory.getLogger(FmbPlcCtrl2.class);
	
	/**
	 * MyBatis활용을 위한 최상위 객체
	 **/
	//Autowired:spring에서 자동 생성 및 소멸을 관리
	@Autowired
	private MBcfBizService mBcfBizService;
	
    @SuppressWarnings("unchecked")
    //4.매핑된 주소를 통해 요기로 이동
	@RequestMapping(value = "/bas/test123.do", method = RequestMethod.POST)
	public String selectFmbPlc(@RequestBody FmbPlcVO2 vo)  {
    	System.out.println("bas/test123.do로 이동");
		try {
			log.info("plc=" + vo.getPlcId());
			log.info("plc_id=" + vo.getPlcIp());
			
			return "success";
		} catch (Exception ie) {
			return "false";
		}
	}



}
