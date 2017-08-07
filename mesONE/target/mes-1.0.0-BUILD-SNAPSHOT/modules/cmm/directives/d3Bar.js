/**
 * 
 */


'use strict';
angular.module('app') // Angular Module Name
    .directive('d3Bar', function () { // Angular Directive
        return {
            restrict: 'A', // Directive Scope is Attribute
            scope: {
                datajson: '=datajson' ,
                xaxisName: '=',
                xaxisPos: '=',
                yaxisName: '=',
                yaxisPos: '=',
                d3Format: '='
                // All the Angular Directive Vaiables used as d3.js parameters
            },
            link: function (scope, elem, attrs) {
                // The d3.js code for generation of bar graph. further reading should be done from http://d3js.org/
                var margin = {top: 20, right: 20, bottom: 30, left: 40},
                    width = 960 - margin.left - margin.right,
                    height = 500 - margin.top - margin.bottom;

                console.log(scope.datajson)
            /*    var formatPercent = d3.format(scope.d3Format); // formatting via angular variable
*/
                var x = d3.scale.ordinal()
                       .rangeRoundBands([0, width], .1);

               var y = d3.scale.linear()
                       .range([height, 0]);

               var xAxis = d3.svg.axis()
                       .scale(x)
                       .orient("bottom");

               var yAxis = d3.svg.axis()
                       .scale(y)
                       .orient("left");
                       /*.tickFormat(formatPercent);*/

               var svg = d3.select("#"+elem[0].id).append("svg") // selecting the DOM element by d3.js 
                                                                 // - getting from Angular context   
                   .attr("width", width + margin.left + margin.right)
                   .attr("height", height + margin.top + margin.bottom)
                   .append("g")
                       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

     /*         d3.json(scope.datajson, function(error, data) { // external data filename- angular directive variable
                  if (error) return console.warn(error);

                  x.domain(data.map(function(d) { return d.lineNm; }));
                  y.domain([0, d3.max(data, function(d) { return d.curCountPer; })]);
*/
                  svg.append("g")
                      .attr("class", "x axis")
                      .attr("transform", "translate(0," + height + ")")
                      .call(xAxis)
                      .append("text")
                          .attr("x", scope.xaxisPos)
                          .attr("dx", ".71em")
                          .style("text-anchor", "end")
                          .text(scope.xaxisName);
                  // x axis legend setting from angular variables
                  svg.append("g")
                      .attr("class", "y axis")
                      .call(yAxis)
                      .append("text")
                          .attr("transform", "rotate(-90)")
                          .attr("y", scope.yaxisPos)
                          .attr("dy", ".71em")
                          .style("text-anchor", "end")
                          .text(scope.yaxisName);
                  // y axis legend setting from angular variables
                  svg.selectAll(".bar")
                      .data(scope.datajson)
                      .enter().append("rect")
                      .attr("class", "bar")
                      .attr("x", function(d) { return x(d.lineNm); })
                      .attr("width", x.rangeBand())
                      .attr("y", function(d) {console.log(d); return y(d.curCountPer*1);} )
                      .attr("height", function(d) {console.log(d.curCountPer); return height - y(d.curCountPer*1);});
              /*    });*/
              }
           }
       });