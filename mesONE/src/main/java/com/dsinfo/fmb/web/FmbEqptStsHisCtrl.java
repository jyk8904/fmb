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
public class FmbEqptStsHisCtrl {
	private static final Logger log = LoggerFactory.getLogger(FmbEqptStsHisCtrl.class);
	
	/**
	 * MyBatis활용을 위한 최상위 객체
	 **/
	//Autowired:spring에서 자동 생성 및 소멸을 관리
	@Autowired
	private MBcfBizService mBcfBizService;
	
	
    @SuppressWarnings("unchecked")
	@RequestMapping(value = "/bas/selectEqptStsHis.do", method = RequestMethod.POST)
	public ResponseEntity<List<FmbEqptStsHisVO>> selectFmbEqpt(@RequestBody FmbEqptStsHisParamVO vo)  {
		List<FmbEqptStsHisVO> fmbEqptStsHisVO = null;
		System.out.println("FmbEqptStsHis.do로 이동");
		try {
			fmbEqptStsHisVO = (List<FmbEqptStsHisVO>) mBcfBizService.select("sql-bas-info.selectFmbEqptStsHis", vo);
			System.out.println("vo" +vo.getPlcId());
			log.info("success");
			log.error("fail");
			
			return new ResponseEntity<List<FmbEqptStsHisVO>>(fmbEqptStsHisVO, HttpStatus.OK);
		} catch (Exception ie) {
			log.error("FmbEqptStsHisController:selectFmbEqptStsHis=>" +  ie.toString());
			return new ResponseEntity<List<FmbEqptStsHisVO>>(fmbEqptStsHisVO, HttpStatus.OK);
		}
	}   
}
