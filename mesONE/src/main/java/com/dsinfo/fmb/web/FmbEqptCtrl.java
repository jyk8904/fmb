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
public class FmbEqptCtrl {
	private static final Logger log = LoggerFactory.getLogger(FmbEqptCtrl.class);
	
	/**
	 * MyBatis활용을 위한 최상위 객체
	 **/
	//Autowired:spring에서 자동 생성 및 소멸을 관리
	@Autowired
	private MBcfBizService mBcfBizService;
	
	/*
	 * EqptList를 가져오는 VO
	 * @param id : selectFmbEqpt
	 * @param : FmbEqptParamVO
	 * @exception : Exception 
	 * @return: FmbEqptVO
	 */
    @SuppressWarnings("unchecked")
	@RequestMapping(value = "/bas/selectFmbEqpt.do", method = RequestMethod.POST)
	public ResponseEntity<List<FmbEqptVO>> selectFmbEqpt(@RequestBody FmbEqptParamVO vo)  {
		List<FmbEqptVO> fmbEqptVO = null;
		System.out.println("FmbEqpt.do로 이동");
		try {
			//5. sql-bas-info.xml의  id가 selectFmbPlc인 select 실행
			fmbEqptVO = (List<FmbEqptVO>) mBcfBizService.select("sql-bas-info.selectFmbEqpt", vo);

			log.info(vo.getEqptType());
			log.error(vo.getFactId());
			
			return new ResponseEntity<List<FmbEqptVO>>(fmbEqptVO, HttpStatus.OK);
		} catch (Exception ie) {
			log.error("FmbEqptController:selectFmbEqpt=>" +  ie.toString());
			return new ResponseEntity<List<FmbEqptVO>>(fmbEqptVO, HttpStatus.OK);
		}
	}
    
    @RequestMapping(value = "/bas/selectFmbBgImage.do", method = RequestMethod.POST)
    public ResponseEntity<List<FmbBgImageVO>> selectFmbBgImage(@RequestBody FmbEqptParamVO vo)  {
        List<FmbBgImageVO> fmbEqptVO = null;
        System.out.println("FmbEqpt.do로 이동");
        try {
            //5. sql-bas-info.xml의  id가 selectFmbPlc인 select 실행
            fmbEqptVO = (List<FmbBgImageVO>) mBcfBizService.select("sql-bas-info.selectFmbBgImage", vo);
            log.info(vo.getFactId());
            
            return new ResponseEntity<List<FmbBgImageVO>>(fmbEqptVO, HttpStatus.OK);
        } catch (Exception ie) {
            log.error("FmbEqptController:selectFmbEqpt=>" +  ie.toString());
            return new ResponseEntity<List<FmbBgImageVO>>(fmbEqptVO, HttpStatus.OK);
        }
    }
 
    @RequestMapping(value = "/bas/saveFmbEqpt.do", method = RequestMethod.POST)
    public ResponseEntity<MSysRtnMsgVO> saveMBasLneMst(@RequestBody List<FmbModEqptVO> pVO)  {
        MBcfTransactionManager transaction = null;
        String sqlID = null;
        System.out.println("saveFmbEqpt.do로 이동");
        try {
            transaction = mBcfBizService.getTransactionManager();
            transaction.start();
            
            System.out.print("vo는!!!! " + pVO.size());
            for (int i=0; i < pVO.size(); i++) {
                FmbModEqptVO vo = pVO.get(i);
                System.out.println("컨트롤러에서 데이터 : "+vo.getId()+vo.getCssTop()+vo.getStatus());
                 
                if (vo.getStatus().equals("update")) {
                    sqlID = "sql-bas-info.updateFmbEqpt";
                    mBcfBizService.update("sql-bas-info.updateFmbEqpt", vo);
                } else if (vo.getStatus().equals("delete")) {
                    sqlID = "sql-bas-info.deleteFmbEqpt";
                    mBcfBizService.delete("sql-bas-info.deleteFmbEqpt", vo);
                } else if (vo.getStatus().equals("insert")) {
                    sqlID = "sql-bas-info.insertFmbEqpt";
                    mBcfBizService.insert("sql-bas-info.insertFmbEqpt", vo);
                } else {
                    sqlID = "sql-bas-info.xxxxxxMBasLneMst";
                    //mBcfBizService.insertSysErrMsg(sqlID, "데이터 처리 구분 식별자가 정의되어 있지 않습니다");
                }
            }
            transaction.commit();
        } catch (Exception ie) {
            log.error("mbEqptController:saveFmbModEqpt:" + sqlID + "=>" +  ie.toString());
            if (transaction != null) 
                transaction.rollback();
          //  mBcfBizService.insertSysErrMsg(sqlID, ie.toString());
        } finally {
            if (transaction != null) 
                transaction.end();
        }
        
        return new ResponseEntity<MSysRtnMsgVO>(mBcfBizService.getMSysRtnMsgVO(), HttpStatus.OK);
        //return new ResponseEntity<MSysRtnMsgVO>(mBcfBizService.getMSysRtnMsgVO(), HttpStatus.OK);
    }

    
    
}
