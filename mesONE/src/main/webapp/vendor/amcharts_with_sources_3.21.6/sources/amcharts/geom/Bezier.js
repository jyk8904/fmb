(function() {
    "use strict";
    var AmCharts = window.AmCharts;
    AmCharts.Bezier = AmCharts.Class({
        construct: function(container, x, y, color, alpha, thickness, fillColor, fillAlpha, dashLength, endStr, gradientRotation) {

            var chart = container.chart;

            var tensionX = AmCharts.bezierX;
            var tensionY = AmCharts.bezierY;

            if(!isNaN(chart.bezierX)){
                tensionX = chart.bezierX;
            }

            if(!isNaN(chart.bezierY)){
                tensionY = chart.bezierY;
            }            

            if(isNaN(tensionX)){
                if(chart.rotate){
                    tensionX = 20;
                    tensionY = 4;
                }
                else{
                    tensionY = 20;
                    tensionX = 4;
                }
            }
            

            var _this = this;
            var fillColors;
            var gradient;
            if (typeof(fillColor) == "object") {
                if (fillColor.length > 1) {
                    gradient = true;
                    fillColors = fillColor;
                    fillColor = fillColor[0];
                }
            }
            if (typeof(fillAlpha) == "object") {
                fillAlpha = fillAlpha[0];
            }
            if (fillAlpha === 0) {
                fillColor = "none";
            }
            var attr = {
                "fill": fillColor,
                "fill-opacity": fillAlpha,
                "stroke-width": thickness
            };

            if (dashLength !== undefined && dashLength > 0) {
                attr["stroke-dasharray"] = dashLength;
            }

            if (!isNaN(alpha)) {
                attr["stroke-opacity"] = alpha;
            }

            if (color) {
                attr.stroke = color;
            }

            var lineStr = "M" + Math.round(x[0]) + "," + Math.round(y[0]) + " ";
            var points = [];
            var i;

            for (i = 0; i < x.length; i++) {
                if(isNaN(x[i]) || isNaN(y[i])){
                    lineStr += _this.drawSegment(points, tensionX, tensionY);
                    if(i < x.length - 1){
                        lineStr += "L" + x[i + 1] + "," + y[i + 1] + " ";
                    }
                    points = [];
                }
                else{
                    points.push({
                        x: Number(x[i]),
                        y: Number(y[i])
                    });
                }
            }

            lineStr += _this.drawSegment(points, tensionX, tensionY);

            if (endStr) {
                lineStr += endStr;
            } else {
                if (!AmCharts.VML) {
                    // end string is to create area
                    // this is the fix to solve straight line in chrome problem
                    lineStr += "M0,0 L0,0";
                }
            }


            _this.path = container.path(lineStr).attr(attr);
            _this.node = _this.path.node;

            if (gradient) {
                _this.path.gradient("linearGradient", fillColors, gradientRotation);
            }            
        },

        /// http://schepers.cc/getting-to-the-point
        // catmullRom2bezier

        drawSegment:function(points, tensionX, tensionY) {
            var path = "";
            if(points.length > 2){
                for (var i = 0; i < points.length - 1; i++) {
                    var p = [];

                    var p0 = points[i - 1];
                    var p1 = points[i];
                    var p2 = points[i + 1];
                    var p3 = points[i + 2];


                    if (i === 0) {
                        p0 = p1;
                        p.push({ x: p1.x, y: p1.y });
                        p.push({ x: p1.x, y: p1.y });
                        p.push({ x: p2.x, y: p2.y });
                        p.push({ x: p3.x, y: p3.y });                    
                    } else if (i >= points.length - 2) {
                        p.push({ x: p0.x, y: p0.y });
                        p.push({ x: p1.x, y: p1.y });
                        p.push({ x: p2.x, y: p2.y });
                        p.push({ x: p2.x, y: p2.y });
                        p3 = p2;
                    } else {
                        p.push({ x: p0.x, y: p0.y });
                        p.push({ x: p1.x, y: p1.y });
                        p.push({ x: p2.x, y: p2.y });
                        p.push({ x: p3.x, y: p3.y });
                    }

                    var bp = [];

                    var round = Math.round;

                    bp.push({ x: round(p[1].x), y: round(p[1].y) });
                    bp.push({ x: round((-p[0].x + tensionX * p[1].x + p[2].x) / tensionX), y: round((-p[0].y + tensionY * p[1].y + p[2].y) / tensionY) });
                    bp.push({ x: round((p[1].x + tensionX * p[2].x - p[3].x) / tensionX), y: round((p[1].y + tensionY * p[2].y - p[3].y) / tensionY) });
                    bp.push({ x: round(p[2].x), y: round(p[2].y)});

                    path += "C" + bp[1].x + "," + bp[1].y + "," + bp[2].x + "," + bp[2].y + "," + bp[3].x + "," + bp[3].y + " ";
                }
            }
            else if (points.length > 1){
                path += "L" + points[1].x + "," + points[1].y;
            }
            return path;
            
        }
    });
})();