package com.dsinfo.fmb.service;

/*PLC모니터링VO*/

public class FmbGaugeRunRateVO extends MBasAbsVO {

	private int linegauge;
	private int digitgauge;

	public FmbGaugeRunRateVO() {
	}

	public int getLineGauge() {
		return linegauge;
	}

	public void setLineGauge(int linegauge) {
		this.linegauge = linegauge;
	}

	public int getDigitGauge() {
		return digitgauge;
	}

	public void setDigitGauge(int digitgauge) {
		this.digitgauge = digitgauge;
	}

}
