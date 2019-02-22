var margin1 = {top: 20, right: 20, bottom: 40, left: 40},
    width1 = 760 - margin1.left - margin1.right,
    height1 = 500 - margin1.top - margin1.bottom;

var xValue1 = function(d) { return d.year;},
    xScale1 = d3.scale.linear().range([0, width1]),
    xMap1 = function(d) { return xScale1(xValue1(d));},
    xAxis1 = d3.svg.axis().scale(xScale1).orient("bottom");

var yValue1 = function(d) { return d.vx;},
    yScale1 = d3.scale.linear().range([height1, 0]),
    yMap1 = function(d) { return yScale1(yValue1(d));},
    yAxis1 = d3.svg.axis().scale(yScale1).orient("left");

var svg1 = d3.select("#svg1")
    .attr("width", width1 + margin1.left + margin1.right)
    .attr("height", height1 + margin1.top + margin1.bottom)
  .append("g")
    .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

var tooltip1 = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

d3.json("./data/animalSkins.json", function(error, data1) {

  xScale1.domain([d3.min(data1, xValue1)-1, d3.max(data1, xValue1)+1]);
  yScale1.domain([d3.min(data1, yValue1)-1, d3.max(data1, yValue1)+1]);

  svg1.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height1 + ")")
      .call(xAxis1)
    .append("text")
      .attr("class", "label")
      .attr("x", width1)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Year");

  svg1.append("g")
      .attr("class", "y axis")
      .call(yAxis1)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Metric tons");

  svg1.selectAll(".dot")
      .data(data1)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", xMap1)
      .attr("cy", yMap1)
      .on("mouseover", function(d) {
        tooltip1.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip1.html("Place of export: " + d["cntr_desc"] + "<br/> Product: " + d["prdt_desc"] + "<br/> Year: " + xValue1(d) + "<br/> Quantity: " + yValue1(d) + " metric tons")
          .style("left", (d3.event.pageX + 5) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
        tooltip1.transition()
          .duration(500)
          .style("opacity", 0);
      });

});
