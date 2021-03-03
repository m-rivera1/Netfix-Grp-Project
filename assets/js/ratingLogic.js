// NIGUEL COPY FROM HERE!!!
// bar graph
// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 50, left: 70 },
    width = 1050 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var toolTip = d3.tip() // method from the d3.tip library not native to d3 
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")


    .offset([90, -60])
    .html(function (d) {
        return (`<strong>Movies:</strong>${d.Movie}<br><hr><strong>Shows:</strong>${d.TV_Show}`);
    });

// append the svg object to the body of the page
var svg = d3.select(".chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")

// Append group element
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Parse the Data
d3.csv("./data/rating_data_combined.csv").then(function (ratingData) {


    // List of subgroups = header of the csv files = soil condition here
    var subgroups = ratingData.columns.slice(1)

    //  console.log(subgroups)

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    var groups = d3.map(ratingData, function (d) { return (d.Rating) }).keys()

    //  console.log(groups)

    // Add X axis
    var x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.2])
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSizeOuter(0));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 3000])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#FA8072', '#DC143C'])

    //stack the data? --> stack per subgroup
    var stackedData = d3.stack()
        .keys(subgroups)
        (ratingData)

    svg.call(toolTip);

    //   Show the bars
    svg.append("g")
        .selectAll("g")
        // Enter in the stack data = loop key per key = group per group
        .data(stackedData)
        .enter().append("g")
        .attr("fill", function (d) { return color(d.key); })
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data(function (d) { return d; })
        .enter().append("rect")
        .attr("x", function (d) { return x(d.data.Rating); })
        .attr("y", function (d) { return y(d[1]); })
        .attr("height", function (d) { return y(d[0]) - y(d[1]); })
        .attr("width", x.bandwidth())
        .on("mouseover", function (d) {
            toolTip.show(d.data, this);
        })
        .on("mouseout", function (d) {
            toolTip.hide(d);

        });
    // Create axes labels    
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left - 2)
        .attr("x", 0 - (height / 1.5))
        .attr("dy", "1em") // NOTE 'em' is 10px units and 'd'  is like a 'delta' up the y-axis in this case
        .style("fill", "white")
        .text("Number of Titles in Library");
    svg.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 25})`)
        .style("fill", "white")
        .text("Rating");

}).catch(function (error) {
    console.log(error);
});
