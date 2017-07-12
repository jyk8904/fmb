package com.dsinfo.fmb.service;

/*PLC모니터링VO*/

public class FmbImageVO extends MBasAbsVO {

    private String seq;
    private String file_name;
    private String file_p_path;
    private String file_l_path;
    private String file_origin_name;
    private long file_size;

    public FmbImageVO() {
    }
    
    public String getSeq() {
        return seq;
    }

    public void setSeq(String seq) {
        this.seq = seq;
    }
    public String getFile_name() {
        return file_name;
    }

    public void setFile_name(String file_name) {
        this.file_name = file_name;
    }

    public String getFile_p_path() {
        return file_p_path;
    }

    public void setFile_p_path(String file_p_path) {
        this.file_p_path = file_p_path;
    }

    public String getFile_l_path() {
        return file_l_path;
    }

    public void setFile_l_path(String file_l_path) {
        this.file_l_path = file_l_path;
    }

    public String getFile_origin_name() {
        return file_origin_name;
    }

    public void setFile_origin_name(String file_origin_name) {
        this.file_origin_name = file_origin_name;
    }

    public long getFile_size() {
        return file_size;
    }

    public void setFile_size(long file_size) {
        this.file_size = file_size;
    }



}
