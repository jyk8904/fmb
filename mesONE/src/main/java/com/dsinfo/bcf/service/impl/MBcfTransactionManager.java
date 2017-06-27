package com.dsinfo.bcf.service.impl;

/**
 * @Class Name : MBcfTransactionManager.java
 * @Description : MyBatis TransactionManager 援ы쁽 �겢�옒�뒪
 * @Modification Information
 * @  �닔�젙�씪            �닔�젙�옄              �닔�젙�궡�슜
 * @ ----------------------------------------------------
 * @ 2017.03.08  kb.shin    - 理쒖큹�깮�꽦
 *
 * @author kb.shin
 * @since 2016.03.28
 * @version 1.0
 *
 *  Copyright (C) by Brit Consortium All right reserved.
 */


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionException;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

@Service
@Scope("prototype")
public class MBcfTransactionManager extends DefaultTransactionDefinition {
	private static final long serialVersionUID = -1375151959664915520L;
	 
	@Autowired
	PlatformTransactionManager transactionManager;
	 
	TransactionStatus status;
	 
	public void start() throws TransactionException {
		status = transactionManager.getTransaction(this);
	}
	 
	public void commit() throws TransactionException {
		if (!status.isCompleted()) {
			transactionManager.commit(status);
		}
	}
	
	
	public void rollback() throws TransactionException {
		if (!status.isCompleted()) {
			transactionManager.rollback(status);
		}
	}
	 
	 public void end() throws TransactionException {
		 rollback();
	 }
}
