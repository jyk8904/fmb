package com.dsinfo.bcf.service.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.dsinfo.bcf.service.MBcfAbsVO;
import com.dsinfo.bcf.service.MBcfBizService;
import com.dsinfo.fmb.service.FmbPlcParamVO;
import com.dsinfo.fmb.service.FmbPlcVO;
import com.dsinfo.sys.service.MSysRtnMsgVO;


@Service("MBcfBizTransServiceImpl")
@Repository
public class MBcfBizServiceImpl extends MBcfAbsServiceImpl implements MBcfBizService 
{
    /** 
     * MyBatis SqlSession 
     */
    @Autowired(required = false)
    @Qualifier("sqlSession")
    protected SqlSessionTemplate sqlSession;

    
    @Autowired
    ApplicationContext applicationContext;


    private MSysRtnMsgVO mSysRtnMsgVO = new MSysRtnMsgVO();
    /**
     * MyBatis 트랜젝션사용 
     */
    public MBcfTransactionManager getTransactionManager() throws Exception {
        try {
            // 리턴 객체의 초기값을 설정한다 
            mSysRtnMsgVO.setMsgId("OK");
            mSysRtnMsgVO.setMsgNm("데이터가 저장되었습니다");
            
            return applicationContext.getBean(MBcfTransactionManager.class);
        } catch (Exception ie) {
            bcfLog.error(ie.getClass().toString() + ":" + "getTransactionManager=>" + ie.getLocalizedMessage());
            throw ie;
        }
    }
    

    public MBcfBizServiceImpl() 
    {
    }
     public List<?> select(String sqlID, MBcfAbsVO vo) throws Exception
    {
         try {
            //6. sql-bas-info.xml로 연결되어 sql문 처리
            return sqlSession.selectList(sqlID, vo);
         }  catch (Exception ie) {
            bcfLog.error(ie.getClass().toString() + ":" + "select=>" + ie.getLocalizedMessage());
            throw ie;
         }
    }
     
     
     public List<?> selectAll(String sqlID) throws Exception
     {
         try {
            return sqlSession.selectList(sqlID);
         }  catch (Exception ie) {
            bcfLog.error(ie.getClass().toString() + ":" + "select=>" + ie.getLocalizedMessage());
            throw ie;
         }
     }
     
     
     
     /**
         * 데이터를 등록한다.
         * @param vo - 등록할 정보가 담긴  MBcfAbsVO를 상속받은 VO객체
         * @return 등록 결과
         * @exception Exception
         */
        public void insert(String sqlID, MBcfAbsVO vo) throws Exception
        {
            try {
                sqlSession.insert(sqlID, vo);
            } catch (Exception ie) {
                bcfLog.error(ie.getClass().toString() + ":" + "insert=>" + ie.getLocalizedMessage());         
                
                mSysRtnMsgVO.setMsgId("NG");
                mSysRtnMsgVO.setMsgNm(ie.toString());
                
                throw ie;
            }
        }
        
        
        /**
         * 데이터를 수정한다.
         * @param vo - 수정할 정보가 담긴 MBcfAbsVO를 상속받은 VO객체
         * @return void형
         * @exception Exception
         */
        public void update(String sqlID, MBcfAbsVO vo) throws Exception
        {
            try {

                sqlSession.update(sqlID, vo);
            } catch (Exception ie) {
                bcfLog.error(ie.getClass().toString() + ":" + "update=>" + ie.getLocalizedMessage());
                
                mSysRtnMsgVO.setMsgId("NG");
                mSysRtnMsgVO.setMsgNm(ie.toString());
                
                throw ie;
            }
        }
        
        
        /**
         * 데이터를 삭제한다.
         * @param vo - 삭제할 정보가 담긴 MBcfAbsVO를 상속받은 VO객체
         * @return void형
         * @exception Exception
         */
        public void delete(String sqlID, MBcfAbsVO vo) throws Exception
        {
            try {

                sqlSession.delete(sqlID, vo);
            } catch (Exception ie) {
                bcfLog.error(ie.getClass().toString() + ":" + "delete=>" + ie.getLocalizedMessage());
                
                mSysRtnMsgVO.setMsgId("NG");
                mSysRtnMsgVO.setMsgNm(ie.toString());
                throw ie;
            }
        }
        
        /**
         * 웹에 리턴할 객체의 속성값을 리턴
         */
        public MSysRtnMsgVO getMSysRtnMsgVO() {
            return mSysRtnMsgVO;
        }
}
