package com.dsinfo.fmb.web;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.dsinfo.bcf.service.MBcfBizService;
import com.dsinfo.bcf.service.impl.MBcfTransactionManager;
import com.dsinfo.fmb.service.FmbBgImageVO;
import com.dsinfo.fmb.service.FmbImageVO;
import com.dsinfo.sys.service.MSysRtnMsgVO;
import com.mysql.fabric.Response;

@RestController
public class FmbImageSaveCtrl {
    private static final Logger log = LoggerFactory.getLogger(FmbImageSaveCtrl.class);
    
    /**
     * MyBatis활용을 위한 최상위 객체
     **/
    //Autowired:spring에서 자동 생성 및 소멸을 관리
    @Autowired
    private MBcfBizService mBcfBizService;
    
    /*
     * PLCList를 가져오는 VO
     * @param id : selectFmbPlc
     * @param : FmbPlcParamVO
     * @exception : Exception 
     * @return: FmbPlcVO
     */
    @SuppressWarnings("unchecked")
    //4.매핑된 주소를 통해 요기로 이동
    @RequestMapping(value = "/bas/saveImage.do", method = RequestMethod.POST)
    public Map saveImage(HttpServletRequest req, HttpServletResponse rep)  {
        //RequestBody : JSON형태로 보낸 vo를 컬럼명이 똑같으면 FmbPlcParamVO형태로 알아서 매핑,변환
        MBcfTransactionManager transaction = null;
        String sqlID = null;
        
        /*String path =  "C://Program Files/Apache Software Foundation/Tomcat 8.5/webapp/assets/img/system";*/
        String path =  "D://git/fmb/mesONE/src/main/webapp/assets/img/system";
        String logicalPath = "assets/img/system/";
        
        Map returnObject = new HashMap();
        
        
        try {
            transaction = mBcfBizService.getTransactionManager();
            transaction.start();
            
            MultipartHttpServletRequest mhsr = (MultipartHttpServletRequest) req;
            
            Iterator iter = mhsr.getFileNames();
            
            MultipartFile mfile = null;
            String fieldName = "";
            List resultList = new ArrayList();
            
            File dir = new File(path);
            if (!dir.isDirectory()){
                dir.mkdir();
            }
            
            while (iter.hasNext()) {
                fieldName = (String) iter.next();
                mfile = mhsr.getFile(fieldName);
                String origName;
                
                origName = new String(mfile.getOriginalFilename().getBytes("8859_1"), "UTF-8");
                
                if ("".equals(origName)) {
                    continue;
                }
                
                String ext = origName.substring(origName.lastIndexOf('.'));
                String saveFileName = getUuid() + ext;
                
                File serverFile = new File(path + File.separator + saveFileName);
                mfile.transferTo(serverFile);
                Map file = new HashMap();
                file.put("origName", origName);
                file.put("sfile", serverFile);
                resultList.add(file);
                
                /* System.out.println("file_name : " + serverFile.getName());
                System.out.println("file_physical_path : " + serverFile.getAbsolutePath());
                System.out.println("file_size : " + serverFile.length());
                System.out.println("file_origName : " + origName);
                System.out.println("file_logical_path : " + logicalPath +serverFile.getName());*/
                
                FmbImageVO vo = new FmbImageVO();
                
                vo.setFile_name(serverFile.getName());
                vo.setFile_p_path(serverFile.getAbsolutePath());
                vo.setFile_l_path(logicalPath + serverFile.getName());
                vo.setFile_size(serverFile.length());
                vo.setFile_origin_name(origName);
                
                mBcfBizService.insert("sql-bas-info.insertFmbImageData", vo);
            }
            
            returnObject.put("files", resultList);
            returnObject.put("params", mhsr.getParameterMap());
            
            transaction.commit();

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (IllegalStateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception ie) {
            log.error("mbEqptController:saveFmbModEqpt:" + sqlID + "=>" +  ie.toString());
            if (transaction != null) 
                transaction.rollback();
          //  mBcfBizService.insertSysErrMsg(sqlID, ie.toString());
        } finally {
            if (transaction != null) 
                transaction.end();
        }
        return null;
    }
    
    @RequestMapping(value = "/bas/selectFmbImage.do", method = RequestMethod.POST)
    public ResponseEntity<List<FmbImageVO>> selectFmbImage()  {
        //RequestBody : JSON형태로 보낸 vo를 컬럼명이 똑같으면 FmbTotalParamVO형태로 알아서 매핑,변환
        List<FmbImageVO> FmbImageVO = null;
        System.out.println("selectFmbImage로 이동");
        try {
            //mBcfBizService : select, insert, delete, update 구문과 vo를 정형화 해놓음
            //
            //5. sql-bas-info.xml의  id가 selectFmbTotal인 select 실행
        
            FmbImageVO = (List<FmbImageVO>) mBcfBizService.selectAll("sql-bas-info.selectFmbImages");
            //System.out.println("vo" +vo.getEqptCd());
            log.info("success");
            log.error("fail");
            
            return new ResponseEntity<List<FmbImageVO>>(FmbImageVO, HttpStatus.OK);
            //7.응답받은 result 리턴
        } catch (Exception ie) {
            log.error("FmbTotalController:selectFmbTotal=>" +  ie.toString());
            return new ResponseEntity<List<FmbImageVO>>(FmbImageVO, HttpStatus.OK);
        }
    }
    
    @RequestMapping(value = "/bas/saveBgImage.do", method = RequestMethod.POST)
    public ResponseEntity<MSysRtnMsgVO> saveBgImage(@RequestBody FmbBgImageVO vo)  {
        MBcfTransactionManager transaction = null;
        String sqlID = null;
        try {
            transaction = mBcfBizService.getTransactionManager();
            transaction.start();
            
            System.out.println("컨트롤러에서 데이터 : "+ vo);
            sqlID = "sql-bas-info.updateFmbBgImage";
            mBcfBizService.update("sql-bas-info.updateFmbBgImage", vo);
                

            transaction.commit();
        } catch (Exception ie) {
            log.error("mbEqptController:saveBgImage:" + sqlID + "=>" +  ie.toString());
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
    
    
    
    @RequestMapping(value = "/bas/delFmbImage.do", method = RequestMethod.POST)
    public ResponseEntity<List<String>> delImage(@RequestBody FmbImageVO vo)  {
        //RequestBody : JSON형태로 보낸 vo를 컬럼명이 똑같으면 FmbPlcParamVO형태로 알아서 매핑,변환 
        MBcfTransactionManager transaction = null;
      
        List list = new ArrayList();
        String message = "";
        String imgSeq = vo.getFile_p_path();        //db 삭제용 파라미터
        File file = new File(vo.getFile_p_path());  //파일 삭제용 파라미터
        
        try {
            transaction = mBcfBizService.getTransactionManager();
            transaction.start();
            mBcfBizService.delete("sql-bas-info.delFmbImage", vo);
            
        }  catch (Exception ie) {
            log.error("FmbImageSaveController:delFmbImage:" +  ie.toString());
            //  mBcfBizService.insertSysErrMsg(sqlID, ie.toString());
            if (transaction != null) 
                transaction.rollback();
        }finally{
             if( file.exists() ){
                 if(file.delete()){
                     message = "파일이 삭제되었습니다.";
                     transaction.commit();
                 }else{
                     message = "삭제 실패하였습니다.";
                     if (transaction != null) 
                         transaction.rollback();
                 }
             }else{
                message = "파일이 존재하지 않습니다.";
                if (transaction != null) 
                    transaction.rollback();
             }
                         
             if (transaction != null) 
                 transaction.end();
        }
        list.add(message);
        return new ResponseEntity<List<String>>(list, HttpStatus.OK);
    }
    //uuid생성 
    public static String getUuid() { return UUID.randomUUID().toString().replaceAll("-", ""); }


}
