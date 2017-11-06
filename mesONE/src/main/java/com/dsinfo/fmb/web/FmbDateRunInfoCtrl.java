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
import com.dsinfo.sys.service.MSysRtnMsgVO;
import com.dsinfo.bcf.service.*;
import com.dsinfo.bcf.service.impl.MBcfTransactionManager;

@RestController
public class FmbDateRunInfoCtrl {
	private static final Logger log = LoggerFactory.getLogger(FmbDateRunInfoCtrl.class);
	
	/**
	 * MyBatis활용을 위한 최상위 객체
	 **/
	//Autowired:spring에서 자동 생성 및 소멸을 관리
	@Autowired
	private MBcfBizService mBcfBizService;
	
	 //팝업창 날짜별 가동추이
    @SuppressWarnings("unchecked")
    @RequestMapping(value = "/bas/selectDateRunInfo.do", method = RequestMethod.POST)
	public ResponseEntity<List<FmbDateRunInfoVO>> selectDateRunInfo(@RequestBody FmbEqptStsHisParamVO vo)  {
    	System.out.println("selectDateRunInfo.do로 이동 ");
		List<FmbDateRunInfoVO> fmbDateRunInfoVO = null;
		try {
			fmbDateRunInfoVO = (List<FmbDateRunInfoVO>) mBcfBizService.select("sql-bas-info.selectDateRunInfo", vo);
			System.out.println("vo" +vo.getPlcId());
			System.out.println(fmbDateRunInfoVO.get(0));
			log.info("!!!!!");
			log.error("fail");
			return new ResponseEntity<List<FmbDateRunInfoVO>>(fmbDateRunInfoVO, HttpStatus.OK);
		} catch (Exception ie) {
			log.error("FmbTotalController:selectFmbRunInfo=>" +  ie.toString());
			return new ResponseEntity<List<FmbDateRunInfoVO>>(fmbDateRunInfoVO, HttpStatus.OK);
		}
	}
    
}
