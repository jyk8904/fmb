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
public class FmbTotalCtrl {
	private static final Logger log = LoggerFactory.getLogger(FmbTotalCtrl.class);
	
	/**
	 * MyBatis활용을 위한 최상위 객체
	 **/
	//Autowired:spring에서 자동 생성 및 소멸을 관리
	@Autowired
	private MBcfBizService mBcfBizService;
	
	/*
	 * RunRate를 가져오는 VO
	 * @param id : selectPlanProgress
	 * @param : none
	 * @exception : Exception 
	 * @return: FmbPlanProgresVO
	 */
    @SuppressWarnings("unchecked")
    //4.매핑된 주소를 통해 요기로 이동
    
    @RequestMapping(value = "/bas/selectPlanProgress.do", method = RequestMethod.POST)
	public ResponseEntity<List<FmbPlanProgressVO>> selectPlanProgress()  {
    	//RequestBody : JSON형태로 보낸 vo를 컬럼명이 똑같으면 FmbTotalParamVO형태로 알아서 매핑,변환
		List<FmbPlanProgressVO> fmbPlanProgressVO = null;
		System.out.println("selectPlanProgress로 이동");
		try {
			//mBcfBizService : select, insert, delete, update 구문과 vo를 정형화 해놓음
			//
			//5. sql-bas-info.xml의  id가 selectFmbTotal인 select 실행
		
			fmbPlanProgressVO = (List<FmbPlanProgressVO>) mBcfBizService.selectAll("sql-bas-info.selectPlanProgress");
			//System.out.println("vo" +vo.getEqptCd());
			log.info("success");
			log.error("fail");
			
			return new ResponseEntity<List<FmbPlanProgressVO>>(fmbPlanProgressVO, HttpStatus.OK);
			//7.응답받은 result 리턴
		} catch (Exception ie) {
			log.error("FmbTotalController:selectFmbTotal=>" +  ie.toString());
			return new ResponseEntity<List<FmbPlanProgressVO>>(fmbPlanProgressVO, HttpStatus.OK);
		}
	}
    
    
    	   

    
    
   
    @SuppressWarnings("unchecked")
    @RequestMapping(value = "/bas/selectGaugeRunRate.do", method = RequestMethod.POST)
	public ResponseEntity<List<FmbGaugeRunRateVO>> selectGaugeRunRate()  {
		List<FmbGaugeRunRateVO> fmbGaugeRunRateVO = null;
		System.out.println("selectGaugeRunRate로 이동");
		try {
			fmbGaugeRunRateVO = (List<FmbGaugeRunRateVO>) mBcfBizService.selectAll("sql-bas-info.selectGaugeRunRate");
			log.info("success");
			log.error("fail");
			return new ResponseEntity<List<FmbGaugeRunRateVO>>(fmbGaugeRunRateVO, HttpStatus.OK);
		} catch (Exception ie) {
			log.error("FmbTotalController:selectFmbTotal=>" +  ie.toString());
			return new ResponseEntity<List<FmbGaugeRunRateVO>>(fmbGaugeRunRateVO, HttpStatus.OK);
		}
	}
    
    
    
    
    @SuppressWarnings("unchecked")
    @RequestMapping(value = "/bas/selectGaugeRunInfo.do", method = RequestMethod.POST)
	public ResponseEntity<List<FmbGaugeRunInfoVO>> selectGaugeRunInfo()  {
		List<FmbGaugeRunInfoVO> fmbGaugeRunInfoVO = null;
		System.out.println("selectGaugeRunInfo로 이동");
		try {
			fmbGaugeRunInfoVO = (List<FmbGaugeRunInfoVO>) mBcfBizService.selectAll("sql-bas-info.selectGaugeRunInfo");
			log.info("success");
			log.error("fail");
			return new ResponseEntity<List<FmbGaugeRunInfoVO>>(fmbGaugeRunInfoVO, HttpStatus.OK);
		} catch (Exception ie) {
			log.error("FmbTotalController:selectFmbTotal=>" +  ie.toString());
			return new ResponseEntity<List<FmbGaugeRunInfoVO>>(fmbGaugeRunInfoVO, HttpStatus.OK);
		}
	}
    
    
    @SuppressWarnings("unchecked")
    @RequestMapping(value = "/bas/selectRankRunInfo.do", method = RequestMethod.POST)
	public ResponseEntity<List<FmbRankRunInfoVO>> selectRankRunInfo()  {
		List<FmbRankRunInfoVO> fmbRankRunInfoVO = null;
		System.out.println("selectRankRunInfo로 이동");
		try {
			fmbRankRunInfoVO = (List<FmbRankRunInfoVO>) mBcfBizService.selectAll("sql-bas-info.selectRankRunInfo");
			log.info("success");
			log.error("fail");
			return new ResponseEntity<List<FmbRankRunInfoVO>>(fmbRankRunInfoVO, HttpStatus.OK);
		} catch (Exception ie) {
			log.error("FmbTotalController:selectFmbTotal=>" +  ie.toString());
			return new ResponseEntity<List<FmbRankRunInfoVO>>(fmbRankRunInfoVO, HttpStatus.OK);
		}
	}

    
    
    @SuppressWarnings("unchecked")
    @RequestMapping(value = "/bas/selectDateRunInfo.do", method = RequestMethod.POST)
	public ResponseEntity<List<FmbDateRunInfoVO>> selectDateRunInfo()  {
		List<FmbDateRunInfoVO> fmbDateRunInfoVO = null;
		System.out.println("FmbTotal.do로 이동");
		try {
			fmbDateRunInfoVO = (List<FmbDateRunInfoVO>) mBcfBizService.selectAll("sql-bas-info.selectDateRunInfo");
			log.info("success");
			log.error("fail");
			return new ResponseEntity<List<FmbDateRunInfoVO>>(fmbDateRunInfoVO, HttpStatus.OK);
		} catch (Exception ie) {
			log.error("FmbTotalController:selectFmbTotal=>" +  ie.toString());
			return new ResponseEntity<List<FmbDateRunInfoVO>>(fmbDateRunInfoVO, HttpStatus.OK);
		}
	}

    
    
}
