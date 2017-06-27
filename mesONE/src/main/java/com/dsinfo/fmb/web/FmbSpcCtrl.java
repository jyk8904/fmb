package com.dsinfo.fmb.web;

import java.util.HashMap;
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
public class FmbSpcCtrl {
	private static final Logger log = LoggerFactory.getLogger(FmbSpcCtrl.class);
	
	/**
	 * MyBatis활용을 위한 최상위 객체
	 **/
	//Autowired:spring에서 자동 생성 및 소멸을 관리
	@Autowired
	private MBcfBizService mBcfBizService;
	
	/*
	 * SpcList를 가져오는 VO
	 * @param id : selectFmbSpc
	 * @param : FmbSpcVO
	 * @exception : Exception 
	 * @return: FmbSpcVO
	 */
    @SuppressWarnings("unchecked")
    //4.매핑된 주소를 통해 요기로 이동
    
    
/*	@RequestMapping(value = "/bas/selectFmbSpc.do", method = RequestMethod.POST)
	public ResponseEntity<List<FmbSpcVO>> selectFmbSpc(@RequestBody FmbSpcParamVO vo)  {
    	//RequestBody : JSON형태로 보낸 vo를 컬럼명이 똑같으면 FmbSpcParamVO형태로 알아서 매핑,변환
		List<FmbSpcVO> fmbSpcVO = null;
		System.out.println("FmbSpc.do로 이동");
		try {
			//mBcfBizService : select, insert, delete, update 구문과 vo를 정형화 해놓음
			//
			//5. sql-bas-info.xml의  id가 selectFmbSpc인 select 실행
		
			fmbSpcVO = (List<FmbSpcVO>) mBcfBizService.select("sql-bas-info.selectFmbSpc", vo);
			System.out.println("vo" +vo.getLineCd());
			log.info(vo.getLineCd());
			log.error(vo.getOpCd());
			
			return new ResponseEntity<List<FmbSpcVO>>(fmbSpcVO, HttpStatus.OK);
			//7.응답받은 result 리턴
		} catch (Exception ie) {
			log.error("FmbSpcController:selectFmbSpc=>" +  ie.toString());
			return new ResponseEntity<List<FmbSpcVO>>(fmbSpcVO, HttpStatus.OK);
		}
	}*/
    @RequestMapping(value = "/bas/selectFmbSpc.do", method = RequestMethod.POST)
	public ResponseEntity<List<FmbSpcVO>> selectFmbSpc(@RequestBody FmbSpcParamVO vo)  {
    	//RequestBody : JSON형태로 보낸 vo를 컬럼명이 똑같으면 FmbSpcParamVO형태로 알아서 매핑,변환
		List<FmbSpcVO> fmbSpcVO = null;
		System.out.println("FmbSpc.do로 이동");
		try {
			//mBcfBizService : select, insert, delete, update 구문과 vo를 정형화 해놓음
			//
			//5. sql-bas-info.xml의  id가 selectFmbSpc인 select 실행
		
			fmbSpcVO = (List<FmbSpcVO>) mBcfBizService.select("sql-bas-info.selectFmbSpc", vo);
			System.out.println("vo" +vo.getLineCd());
			log.info(vo.getLineCd());
			log.error(vo.getOpCd());
			
			return new ResponseEntity<List<FmbSpcVO>>(fmbSpcVO, HttpStatus.OK);
			//7.응답받은 result 리턴
		} catch (Exception ie) {
			log.error("FmbSpcController:selectFmbSpc=>" +  ie.toString());
			return new ResponseEntity<List<FmbSpcVO>>(fmbSpcVO, HttpStatus.OK);
		}
    }
    
    
    
    @RequestMapping(value = "/bas/selectFmbSpc2.do", method = RequestMethod.POST)
   	public ResponseEntity<List<FmbSpc2VO>> selectFmbSpc2(@RequestBody FmbSpcParamVO vo)  {
       	//RequestBody : JSON형태로 보낸 vo를 컬럼명이 똑같으면 FmbSpc2ParamVO형태로 알아서 매핑,변환
   		List<FmbSpc2VO> fmbSpc2VO = null;
   		System.out.println("FmbSpc2.do로 이동");
   		try {
   			//mBcfBizService : select, insert, delete, update 구문과 vo를 정형화 해놓음
   			//
   			//5. sql-bas-info.xml의  id가 selectFmbSpc2인 select 실행
   		
   			fmbSpc2VO = (List<FmbSpc2VO>) mBcfBizService.select("sql-bas-info.selectFmbSpc2", vo);
   			System.out.println("vo" +vo.getLineCd());
   			log.info(vo.getLineCd());
   			log.error(vo.getOpCd());
   			
   			return new ResponseEntity<List<FmbSpc2VO>>(fmbSpc2VO, HttpStatus.OK);
   			//7.응답받은 result 리턴
   		} catch (Exception ie) {
   			log.error("FmbSpc2Controller:selectFmbSpc2=>" +  ie.toString());
   			return new ResponseEntity<List<FmbSpc2VO>>(fmbSpc2VO, HttpStatus.OK);
   		}
       }
}
