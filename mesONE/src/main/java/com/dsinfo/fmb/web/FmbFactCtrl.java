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
public class FmbFactCtrl {
	private static final Logger log = LoggerFactory.getLogger(FmbFactCtrl.class);
	
	/**
	 * MyBatis활용을 위한 최상위 객체
	 **/
	//Autowired:spring에서 자동 생성 및 소멸을 관리
	@Autowired
	private MBcfBizService mBcfBizService;
	
	/*
	 * FactList를 가져오는 VO
	 * @sql id : selectFmbLine
	 * @exception : Exception 
	 * @return: FmbLineVO
	 */
	
	
	 @SuppressWarnings("unchecked")
	    //4.매핑된 주소를 통해 요기로 이동
	    
	    @RequestMapping(value = "/bas/selectFmbFact.do", method = RequestMethod.POST)
		public ResponseEntity<List<FmbLineVO>> selectFmbFact(@RequestBody FmbLineVO vo)  {
	    	//RequestBody : JSON형태로 보낸 vo를 컬럼명이 똑같으면 FmbLineParamVO형태로 알아서 매핑,변환
			List<FmbLineVO> fmbLineVO = null;
			System.out.println("FmbFact.do로 이동");
			try {
				//mBcfBizService : select, insert, delete, update 구문과 vo를 정형화 해놓음
				//
				//5. sql-bas-info.xml의  id가 selectFmbLine인 select 실행
			
				fmbLineVO = (List<FmbLineVO>) mBcfBizService.select("sql-bas-info.selectFmbFact", vo);
				System.out.println("vo" +vo.getLineCd());
				log.info(vo.getLineCd());
				log.error(vo.getFactId());
				
				return new ResponseEntity<List<FmbLineVO>>(fmbLineVO, HttpStatus.OK);
				//7.응답받은 result 리턴
			} catch (Exception ie) {
				log.error("FmbLineController:selectFmbFacte=>" +  ie.toString());
				return new ResponseEntity<List<FmbLineVO>>(fmbLineVO, HttpStatus.OK);
			}
		}
	    
	    
	 
	@SuppressWarnings("unchecked")
    //4.매핑된 주소를 통해 요기로 이동
    
    @RequestMapping(value = "/bas/selectFmbFactAll.do", method = RequestMethod.POST)
	public ResponseEntity<List<FmbFactVO>> selectFmbFactAll()  {
    	//RequestBody : JSON형태로 보낸 vo를 컬럼명이 똑같으면 FmbLineParamVO형태로 알아서 매핑,변환
		List<FmbFactVO> fmbFactVO = null;
		System.out.println("FmbFactAll.do로 이동");
		try {
			fmbFactVO = (List<FmbFactVO>) mBcfBizService.selectAll("sql-bas-info.selectFmbFactAll");
			log.info("success");
			log.error("error");
			
			return new ResponseEntity<List<FmbFactVO>>(fmbFactVO, HttpStatus.OK);
			//7.응답받은 result 리턴
		} catch (Exception ie) {
			log.error("FmbLineController:selectFmbLine=>" +  ie.toString());
			return new ResponseEntity<List<FmbFactVO>>(fmbFactVO, HttpStatus.OK);
		}
	}

}
