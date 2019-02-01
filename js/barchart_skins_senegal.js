// Canvas dimensions
var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 960 - margin.left - margin.right,
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

// add the SVG element
var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// load the data
d3.json("./data/animalSkins_senegal.json", function(error, data) {

  // scale the range of the data
  x.domain(data.map(function(d) { return d.year; }));
  y.domain([0, d3.max(data, function(d) { return d.vx; })]);

  // add axis
  chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Metric tons");

  chart.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .selectAll(".textlabel")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "textlabel")
      .attr("y", function(d) { return y(d.vx) - 3; });

  // Add bar chart
  chart.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "steelblue")
      .attr("x", function(d) { return x(d.year); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.vx); })
      .attr("height", function(d) { return height - y(d.vx); })
      .on("mouseover", function (d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("opacity", 0.5)
      })
      .on("mouseout", function () {
          d3.select(this)
            .transition()
            .duration(500)
            .attr("opacity", 1)
      });
});
