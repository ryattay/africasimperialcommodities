// Canvas dimensions
var margin4 = {top: 20, right: 20, bottom: 40, left: 40},
    width4 = 760 - margin4.left - margin4.right,
    height4 = 500 - margin4.top - margin4.bottom;

// Set the ranges
var x4 = d3.scaleBand()
    .range([0, width4])
    .padding(0.05);

var y4 = d3.scaleLinear()
    .range([height4, 0]);

var tooltip4 = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("text-align", "center")
    .style("width", "200px")
    .style("height", "56px")
    .style("padding-top", "16px")
    .style("font", "8px")
    .style("background", "lightgrey")
    .style("border", "0px")
    .style("border-radius", "8px")
    .style("pointer-events", "none")
    .style("opacity", 0);

// add the SVG element
var chart4 = d3.select(".chart4")
    .attr("width", width4 + margin4.left + margin4.right)
    .attr("height", height4 + margin4.top + margin4.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin4.left + "," + margin4.top + ")");

// load the data
d3.json("./data/animalSkins_senegala.json", function(error, data4) {

  // scale the range of the data
  x4.domain(data4.map(function(d) { return d.year; }));
  y4.domain([0, d3.max(data4, function(d) { return d.vx; })]);

  // Add bar chart
  chart4.selectAll(".bar")
      .data(data4)
    .enter().append("rect")
      .style("fill", "steelblue")
      .attr("class", "bar")
      .attr("x", function(d) { return x4(d.year); })
      .attr("width", x4.bandwidth())
      .attr("y", function(d) { return y4(d.vx); })
      .attr("height", function(d) { return height4 - y4(d.vx); })
      .on("mouseover", function(d) {
        tooltip4.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip4.html("Year: " + d["year"] + "<br/> Quantity: " + d["vx"] + " metric tons")
          .style("left", (d3.event.pageX + 5) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
        tooltip4.transition()
          .duration(500)
          .style("opacity", 0);
      });

  chart4.append("g")
      .attr("transform", "translate(0," + height4 + ")")
      .call(d3.axisBottom(x4))
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.15em")
        .attr("transform", "rotate(-90)");

  chart4.append("g")
      .call(d3.axisLeft(y4));

});
