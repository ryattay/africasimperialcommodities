// Canvas dimensions
var margin3 = {top: 20, right: 20, bottom: 40, left: 40},
    width3 = 760 - margin3.left - margin3.right,
    height3 = 500 - margin3.top - margin3.bottom;

// Set the ranges
var x3 = d3.scale.ordinal()
    .rangeRoundBands([0, width3], .05);

var y3 = d3.scale.linear()
    .range([height3, 0]);

// Define the axis
var xAxis3 = d3.svg.axis()
  .scale(x3)
  .orient("bottom");

var yAxis3 = d3.svg.axis()
  .scale(y3)
  .orient("left")
  .ticks(10);

var tip3 = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10,0])
  .html(function(d) {
    return d.vx + " metric tons";
  });

// add the SVG element
var svg3 = d3.select("#svg3")
    .attr("width", width3 + margin3.left + margin3.right)
    .attr("height", height3 + margin3.top + margin3.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin3.left + "," + margin3.top + ")");

svg3.call(tip3);

// load the data
d3.json("./data/peanuts_nigeria.json", function(error, data) {

  // scale the range of the data
  x3.domain(data.map(function(d) { return d.year; }));
  y3.domain([0, d3.max(data, function(d) { return d.vx; })]);

  // add axis
  svg3.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height3 + ")")
      .call(xAxis3)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg3.append("g")
      .attr("class", "y axis")
      .call(yAxis3)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Metric tons");

  // Add bar chart
  svg3.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "steelblue")
      .attr("x", function(d) { return x3(d.year); })
      .attr("width", x3.rangeBand())
      .attr("y", function(d) { return y3(d.vx); })
      .attr("height", function(d) { return height3 - y3(d.vx); })
      .on("mouseover", tip3.show)
      .on("mouseout", tip3.hide)
});
