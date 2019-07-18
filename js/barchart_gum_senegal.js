// Canvas dimensions
var margin2 = {top: 20, right: 20, bottom: 40, left: 40},
    width2 = 760 - margin2.left - margin2.right,
    height2 = 500 - margin2.top - margin2.bottom;

// Set the ranges
var x2 = d3.scaleBand()
    .range([0, width2])
    .padding(0.05);

var y2 = d3.scaleLinear()
    .range([height2, 0]);

var tooltip2 = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("text-align", "center")
    .style("width", "200px")
    .style("height", "56px")
    .style("padding-top", "8px")
    .style("font", "8px")
    .style("background", "lightgrey")
    .style("border", "0px")
    .style("border-radius", "8px")
    .style("pointer-events", "none")
    .style("opacity", 0);

// add the SVG element
var chart2 = d3.select("#chart2")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin2.left + "," + margin2.top + ")");

// load the data
d3.json("./data/gum_senegal.json", function(error, data2) {

  // scale the range of the data
  x2.domain(data2.map(function(d) { return d.year; }));
  y2.domain([0, d3.max(data2, function(d) { return d.vx; })]);

  // Add bar chart
  chart2.selectAll(".bar")
      .data(data2)
    .enter().append("rect")
      .style("fill", "steelblue")
      .attr("class", "bar")
      .attr("x", function(d) { return x2(d.year); })
      .attr("width", x2.bandwidth())
      .attr("y", function(d) { return y2(d.vx); })
      .attr("height", function(d) { return height2 - y2(d.vx); })
      .on("mouseover", function(d) {
        tooltip2.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip2.html("Year: " + d["year"] + "<br/> Quantity: " + d["vx"] + " metric tons")
          .style("left", (d3.event.pageX + 5) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
        tooltip2.transition()
          .duration(500)
          .style("opacity", 0);
      });

  chart2.append("g")
      .attr("transform", "translate(0," + height2 + ")")
      .call(d3.axisBottom(x2))
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.15em")
        .attr("transform", "rotate(-90)");

  chart2.append("g")
      .call(d3.axisLeft(y2));

});
