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
public class FmbLoginCtrl {
	private static final Logger log = LoggerFactory.getLogger(FmbLoginCtrl.class);
	
	/**
	 * MyBatis활용을 위한 최상위 객체
	 **/
	//Autowired:spring에서 자동 생성 및 소멸을 관리
	@Autowired
	private MBcfBizService mBcfBizService;
	
	/*
	 * EqptList를 가져오는 VO
	 * @param id : fmbLogin
	 * @param : FmbEqptParamVO
	 * @exception : Exception 
	 * @return: FmbEqptVO
	 */
    @SuppressWarnings("unchecked")
	@RequestMapping(value = "/bas/fmbLogin.do", method = RequestMethod.POST)
	public ResponseEntity<List<FmbLoginVO>> fmbLogin(@RequestBody FmbLoginVO vo)  {
		List<FmbLoginVO> fmbLoginVO = null;
		System.out.println("fmbLogin.do로 이동");
		try {
			//5. sql-bas-info.xml의  id가 selectFmbPlc인 select 실행
			fmbLoginVO = (List<FmbLoginVO>) mBcfBizService.select("sql-bas-info.fmbLogin", vo);
			System.out.println(fmbLoginVO);
/*			log.info(fmbLoginVO[0].getUserId());
			log.error(fmbLoginVO[0].getUserPw());*/
			
			return new ResponseEntity<List<FmbLoginVO>>(fmbLoginVO, HttpStatus.OK);
		} catch (Exception ie) {
			log.error("FmbEqptController:selectFmbEqpt=>" +  ie.toString());
			return new ResponseEntity<List<FmbLoginVO>>(fmbLoginVO, HttpStatus.OK);
		}
    }
    
}