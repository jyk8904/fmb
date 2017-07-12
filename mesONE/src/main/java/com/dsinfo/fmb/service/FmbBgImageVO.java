package com.dsinfo.fmb.service;

/*공장별 뒷배경 저장 VO*/

public class FmbBgImageVO extends MBasAbsVO {

    private String img_seq;
    private String fact_id;
    private String img_path;
    
    public FmbBgImageVO() {
    }
    public String getImgPath() {
        return img_path;
    }

    public void setImgPath(String img_path) {
        this.img_path = img_path;
    }
    public String getImgSeq() {
        return img_seq;
    }

    public void setImgSeq(String img_seq) {
        this.img_seq = img_seq;
    }

    public String getFactId() {
        return fact_id;
    }

    public void setFactId(String fact_id) {
        this.fact_id = fact_id;
    }


}
