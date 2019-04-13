// Canvas dimensions
var margin3 = {top: 20, right: 20, bottom: 40, left: 40},
    width3 = 760 - margin3.left - margin3.right,
    height3 = 500 - margin3.top - margin3.bottom;

// Set the ranges
var x3 = d3.scaleBand()
    .range([0, width3])
    .padding(0.05);

var y3 = d3.scaleLinear()
    .range([height3, 0]);

var tooltip3 = d3.select("body").append("div")
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
var chart3 = d3.select("#chart3")
    .attr("width", width3 + margin3.left + margin3.right)
    .attr("height", height3 + margin3.top + margin3.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin3.left + "," + margin3.top + ")");

// load the data
d3.json("./data/animalSkins_senegalb.json", function(error, data3) {

  // scale the range of the data
  x3.domain(data3.map(function(d) { return d.year; }));
  y3.domain([0, d3.max(data3, function(d) { return d.vx; })]);

  // Add bar chart
  chart3.selectAll(".bar")
      .data(data3)
    .enter().append("rect")
      .style("fill", "steelblue")
      .attr("class", "bar")
      .attr("x", function(d) { return x3(d.year); })
      .attr("width", x3.bandwidth())
      .attr("y", function(d) { return y3(d.vx); })
      .attr("height", function(d) { return height2 - y3(d.vx); })
      .on("mouseover", function(d) {
        tooltip3.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip3.html("Year: " + d["year"] + "<br/> Quantity: " + d["vx"] + " metric tons")
          .style("left", (d3.event.pageX + 5) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
        tooltip3.transition()
          .duration(500)
          .style("opacity", 0);
      });

  chart3.append("g")
      .attr("transform", "translate(0," + height3 + ")")
      .call(d3.axisBottom(x3))
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.15em")
        .attr("transform", "rotate(-90)");

  chart3.append("g")
      .call(d3.axisLeft(y3));

});
