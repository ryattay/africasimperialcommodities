var margin1 = {top: 20, right: 20, bottom: 40, left: 40},
    width1 = 760 - margin.left - margin.right,
    height1 = 500 - margin.top - margin.bottom;

var xValue1 = function(d) { return d.year;},
    xScale1 = d3.scale.linear().range([0, width]),
    xMap1 = function(d) { return xScale(xValue(d));},
    xAxis1 = d3.svg.axis().scale(xScale).orient("bottom");

var yValue1 = function(d) { return d.vx;},
    yScale1 = d3.scale.linear().range([height, 0]),
    yMap1 = function(d) { return yScale(yValue(d));},
    yAxis1 = d3.svg.axis().scale(yScale).orient("left");

var svg1 = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tooltip1 = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

d3.json("./data/animalSkins.json", function(error, data) {

  xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
  yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

  svg1.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Year");

  svg1.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Metric tons");

  svg1.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .on("mouseover", function(d) {
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip.html("Place of export: " + d["cntr_desc"] + "<br/> Product: " + d["prdt_desc"] + "<br/> Year: " + xValue(d) + "<br/> Quantity: " + yValue(d) + " metric tons")
          .style("left", (d3.event.pageX + 5) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });

});
