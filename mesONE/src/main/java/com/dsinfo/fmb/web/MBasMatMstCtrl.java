package com.dsinfo.fmb.web;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.dsinfo.fmb.service.*;
import com.dsinfo.bcf.service.*;

@RestController
public class MBasMatMstCtrl {
	private static final Logger log = LoggerFactory.getLogger(MBasMatMstCtrl.class);

    /** 
     * MyBatis SqlSession 媛앹껜	
     */
	@Autowired(required = false)
	@Qualifier("sqlSession")
	protected SqlSessionTemplate sqlSession;

	/**
	 * MyBatis�� �̿��� ������ ������ ���� �ֻ��� ����ó�� ��ü 
	
	@Autowired
	private MBcfBizService mBcfBizService;
	 **/
	
	
	/*
	 * ǰ���������� ����� ��ȸ�Ѵ�
	 * @param id �ý��� �޴� id
	 * @param searchVO ��ȸ ���� ������ ��� �ִ� VO
	 * @exception Exception 
	 */
    @SuppressWarnings("unchecked")
	@RequestMapping(value = "/bas/selectMBasMatMst.do", method = RequestMethod.POST)
	public ResponseEntity<List<MBasMatMstVO>> selectMBasMatMst(@RequestBody MBasMatMstVO vo)  {
		List<MBasMatMstVO> mBasMatMstVO = null;
		
		try {
			sqlSession.selectList("", "test");
			
			//mBasMatMstVO = (List<MBasMatMstVO>) mBcfBizService.select("sql-bas-info.selectMBasMatMst", vo);
			log.info(vo.getMatCd());
			log.error(vo.getMatNm());
			
			return new ResponseEntity<List<MBasMatMstVO>>(mBasMatMstVO, HttpStatus.OK);
		} catch (Exception ie) {
			log.error("MBasMatMstController:selectMBasMatMst=>" +  ie.toString());
			return new ResponseEntity<List<MBasMatMstVO>>(mBasMatMstVO, HttpStatus.OK);
		}
	}

}
