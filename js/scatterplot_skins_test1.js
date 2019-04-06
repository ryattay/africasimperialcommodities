var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

d3.json("./data/animalSkins.json", function(error, data) {

  var x = d3.scaleLinear()
    .domain([1825, 1950])
    .range([0, width]);

  var xAxis = chart.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  var y = d3.scaleLinear()
    .domain([0, 2250])
    .range([height, 0]);

  var yAxis = chart.append("g")
    .call(d3.axisLeft(y));

  var clip = chart.append("defs").append("chart:clipPath")
    .attr("id", "clip")
    .append("SVG:rect")
    .attr("width", width)
    .attr("height", height)
    .attr("x", 0)
    .attr("y", 0);

  chart.append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      .call(zoom);

  var zoom = d3.zoom()
      .scaleExtent([0.5, 20])
      .extent([[0, 0], [width, height]])
      .on("zoom", updateChart);

  var scatter = chart.append("g")
    .attr("clip-path", "url(#clip)");

  scatter.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 4)
      .attr("cx", function (d) { return x(d.year); })
      .attr("cy", function (d) {return y(d.vx); })
      .on("mouseover", function(d) {
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip.html("Place of export: " + d["cntr_desc"] + "<br/> Product: " + d["prdt_desc"] + "<br/> Year: " + d["year"] + "<br/> Quantity: " + d["vx"] + " metric tons")
          .style("left", (d3.event.pageX + 5) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });

    function updateChart() {

      var newX = d3.event.transform.rescaleX(x);
      var newY = d3.event.transform.rescaleY(y);

      xAxis.call(d3.axisBottom(newX))
      yAxis.call(d3.axisLeft(newY))

      scatter.selectAll("circle")
        .attr("cx", function(d) {return newX(d.year)})
        .attr("cy", function(d) {return newY(d.vx)});

    }

})
