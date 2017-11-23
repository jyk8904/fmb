(function() {
    "use strict";
    var AmCharts = window.AmCharts;

    AmCharts.GaugeArrow = AmCharts.Class({

        construct: function(theme) {
            var _this = this;
            _this.cname = "GaugeArrow";
            _this.color = "#000000";
            _this.alpha = 1;
            _this.nailAlpha = 1;
            _this.nailRadius = 8;
            _this.startWidth = 8;
            _this.endWidth = 0;
            _this.borderAlpha = 1;
            _this.radius = "90%";
            _this.innerRadius = 0;
            _this.nailBorderAlpha = 0;
            _this.nailBorderThickness = 1;
            _this.frame = 0;

            AmCharts.applyTheme(_this, theme, "GaugeArrow");
        },

        setValue: function(value) {
            var _this = this;
            var chart = _this.chart;
            if (!chart) {
                _this.value = value;
                _this.previousValue = value;
            } else {
                if (chart.setValue) {
                    chart.setValue(this, value);
                } else {
                    _this.value = value;
                    _this.previousValue = value;
                }
            }
        }

    });

    AmCharts.GaugeBand = AmCharts.Class({
        construct: function() {
            var _this = this;
            _this.cname = "GaugeBand";
            _this.frame = 0;
        },

        draw: function(startValue, endValue) {
            var _this = this;

            var axis = _this.axis;

            if (_this.bandGraphics) {
                _this.bandGraphics.remove();
            }

            var chart = axis.chart;
            var startAngle = axis.startAngle;
            var radius = axis.radiusRealReal;
            var singleValueAngle = axis.singleValueAngle;
            var container = chart.container;
            var minorTickLength = axis.minorTickLength;

            var bandStartValue = startValue;
            var bandEndValue = endValue;
            var bandRadius = AmCharts.toCoordinate(_this.radius, radius);

            if (isNaN(bandRadius)) {
                bandRadius = axis.minorTickRadius;
            }

            var bandInnerRadius = AmCharts.toCoordinate(_this.innerRadius, radius);
            if (isNaN(bandInnerRadius)) {
                bandInnerRadius = bandRadius - minorTickLength;
            }

            var bandStartAngle = startAngle + singleValueAngle * (bandStartValue - axis.startValue);

            var bandArc = singleValueAngle * (bandEndValue - bandStartValue);

            var outlineColor = _this.outlineColor;
            if (outlineColor === undefined) {
                outlineColor = axis.bandOutlineColor;
            }

            var outlineThickness = _this.outlineThickness;
            if (isNaN(outlineThickness)) {
                outlineThickness = axis.bandOutlineThickness;
            }

            var outlineAlpha = _this.outlineAlpha;
            if (isNaN(outlineAlpha)) {
                outlineAlpha = axis.bandOutlineAlpha;
            }

            var bandAlpha = _this.alpha;
            if (isNaN(bandAlpha)) {
                bandAlpha = axis.bandAlpha;
            }

            var attr = {
                "fill": _this.color,
                "stroke": outlineColor,
                "stroke-width": outlineThickness,
                "stroke-opacity": outlineAlpha
            };

            if (_this.url) {
                attr.cursor = "pointer";
            }

            var gradientRatio = _this.gradientRatio;
            if (!gradientRatio) {
                gradientRatio = axis.bandGradientRatio;
            }

            var bandGraphics = AmCharts.wedge(container, axis.centerXReal, axis.centerYReal, bandStartAngle, bandArc, bandRadius, bandRadius, bandInnerRadius, 0, attr, gradientRatio, undefined, undefined, "radial");
            AmCharts.setCN(chart, bandGraphics.wedge, "axis-band");
            if (_this.id !== undefined) {
                AmCharts.setCN(chart, bandGraphics.wedge, "axis-band-" + _this.id);
            }

            bandGraphics.setAttr("opacity", bandAlpha);

            axis.bandSet.push(bandGraphics);

            _this.bandGraphics = bandGraphics;

            _this.currentStartValue = startValue;
            _this.currentEndValue = endValue;

            axis.addEventListeners(bandGraphics, _this);
        },

        update: function() {
            var _this = this;
            var axis = _this.axis;
            var chart = axis.chart;
            if (axis) {
                if (axis.value2angle) {
                    var endValue;
                    var startValue;
                    if (_this.frame >= chart.totalFrames) {
                        endValue = _this.endValue;
                        startValue = _this.startValue;
                    } else {
                        _this.frame++;

                        var effect = AmCharts.getEffect(chart.startEffect);
                        startValue = AmCharts[effect](0, _this.frame, _this.previousStartValue, _this.startValue - _this.previousStartValue, chart.totalFrames);
                        endValue = AmCharts[effect](0, _this.frame, _this.previousEndValue, _this.endValue - _this.previousEndValue, chart.totalFrames);

                        if (isNaN(startValue)) {
                            startValue = _this.startValue;
                        }
                        if (isNaN(endValue)) {
                            endValue = _this.endValue;
                        }
                    }
                    if (startValue != _this.currentStartValue || endValue != _this.currentEndValue) {
                        _this.draw(startValue, endValue);
                    }
                }
            }
        },

        setStartValue: function(value) {
            var _this = this;
            _this.previousStartValue = _this.startValue;
            _this.startValue = value;
            _this.frame = 0;
        },

        setEndValue: function(value) {
            var _this = this;
            _this.previousEndValue = _this.endValue;
            _this.endValue = value;
            _this.frame = 0;
        }

    });
})();