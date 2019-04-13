// Canvas dimensions
var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Set the ranges
var x = d3.scaleBand()
    .range([0, width])
    .padding(0.05);

var y = d3.scaleLinear()
    .range([height, 0]);

var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// add the SVG element
var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// load the data
d3.json("./data/animalSkins_senegal2.json", function(error, data) {

  // scale the range of the data
  x.domain(data.map(function(d) { return d.year; }));
  y.domain([0, d3.max(data, function(d) { return d.vx; })]);

  // Add bar chart
  chart.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "steelblue")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.year); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.vx); })
      .attr("height", function(d) { return height - y(d.vx); })
      .on("mouseover", function(d) {
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip.html("Year: " + d["year"] + "<br/> Quantity: " + d["vx"] + " metric tons")
          .style("left", (d3.event.pageX + 5) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });

  chart.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  chart.append("g")
      .call(d3.axisLeft(y));

});
