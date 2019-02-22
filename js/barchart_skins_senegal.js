// Canvas dimensions
var margin2 = {top: 20, right: 20, bottom: 40, left: 40},
    width2 = 760 - margin2.left - margin2.right,
    height2 = 500 - margin2.top - margin2.bottom;

// Set the ranges
var x2 = d3.scale.ordinal()
    .rangeRoundBands([0, width2], .05);

var y2 = d3.scale.linear()
    .range([height2, 0]);

// Define the axis
var xAxis2 = d3.svg.axis()
  .scale(x2)
  .orient("bottom");

var yAxis2 = d3.svg.axis()
  .scale(y2)
  .orient("left")
  .ticks(10);

var tip2 = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10,0])
  .html(function(d) {
    return d.vx2 + " metric tons";
  });

// add the SVG element
var svg2 = d3.select(".chart")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin2.left + "," + margin2.top + ")");

svg2.call(tip2);

// load the data
d3.json("./data/animalSkins_senegal.json", function(error, data2) {

  // scale the range of the data
  x2.domain(data2.map(function(d) { return d.year2; }));
  y2.domain([0, d3.max(data2, function(d) { return d.vx2; })]);

  // add axis
  svg2.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height2 + ")")
      .call(xAxis2)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg2.append("g")
      .attr("class", "y axis")
      .call(yAxis2)
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
  svg2.selectAll(".bar")
      .data(data2)
    .enter().append("rect")
      .style("fill", "steelblue")
      .attr("x", function(d) { return x2(d.year2); })
      .attr("width", x2.rangeBand())
      .attr("y", function(d) { return y2(d.vx2); })
      .attr("height", function(d) { return height2 - y2(d.vx2); })
      .on("mouseover", tip2.show)
      .on("mouseout", tip2.hide)
});
