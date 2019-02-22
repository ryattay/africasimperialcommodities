// Canvas dimensions
var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 760 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Set the ranges
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .05);

var y = d3.scale.linear()
    .range([height, 0]);

// Define the axis
var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(10);

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10,0])
  .html(function(d) {
    return d.vx + " metric tons";
  });

// add the SVG element
var svg3 = d3.select("#svg3")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

scg3.call(tip);

// load the data
d3.json("./data/animalSkins_nigeria.json", function(error, data) {

  // scale the range of the data
  x.domain(data.map(function(d) { return d.year; }));
  y.domain([0, d3.max(data, function(d) { return d.vx; })]);

  // add axis
  svg3.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg3.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Metric tons");

  // chart.append("g")
  //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  //     .selectAll(".textlabel")
  //     .data(data)
  //   .enter().append("text")
  //     .style("fill", "black")
  //     .attr("class", "textlabel")
  //     .attr("y", function(d) { return y(d.vx) - 3; });

  // Add bar chart
  svg3.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "steelblue")
      .attr("x", function(d) { return x(d.year); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.vx); })
      .attr("height", function(d) { return height - y(d.vx); })
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide)
});
