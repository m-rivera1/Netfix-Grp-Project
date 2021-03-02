 d3.csv('/data/Netflix_movies.csv').then(function(demoData) {

         // Step 1: Parse Data/Cast as numbers
      // ==============================
      demoData.forEach(function(data) {
          data.title = data.title
          data.director = data.director
          data.cast = data.cast
          data.Country_Produced = data.Country_Produced
          data.Year_added = data.Year_added
          data.Month_added = data.Month_added
          data.release_year = data.release_year
          data.rating = data.rating
          data.duration_min = +data.duration_min
          data.listed_in = data.listed_in
          data.description = data.description


        //   console.log('Movie Title:',data.title, 'Director:', data.director,
        //    'Cast:', data.cast, 'Country Produced:', data.Country_Produced, data.Year_added,
        //    data.Month_added, data.release_year)

      });
    })


    d3.csv('/data/netflix_shows.csv').then(function(demoData) {

        // Step 1: Parse Data/Cast as numbers
     // ==============================
     demoData.forEach(function(data) {
         data.title = data.title
         data.director = data.director
         data.cast = data.cast
         data.Country_Produced = data.Country_Produced
         data.Year_added = data.Year_added
         data.Month_added = data.Month_added
         data.release_year = data.release_year
         data.rating = data.rating
         data.Seasons = data.Seasons
         data.listed_in = data.listed_in
         data.description = data.description


        //  console.log('Show Title:',data.title, 'Director:', data.director,
        //   'Cast:', data.cast, 'Country Produced:', data.Country_Produced, data.Year_added,
        //   data.Month_added, data.release_year, 'Seasons', data.Seasons)



    });
  })
 
  
  d3.csv('/data/subscribers_by_region.csv').then(function(demoData) {

    // Step 1: Parse Data/Cast as numbers
 // ==============================
 demoData.forEach(function(data) {
     data.Area = data.Area
     data.Q1_2018 = data.Q1_2018
     data.Q2_2018 = data.Q2_2018
     data.Q3_2018 = data.Q3_2018 
     data.Q4_2018 = data.Q4_2018 
     data.Q1_2019 = data.Q1_2019
     data.Q2_2019 = data.Q2_2019
     data.Q3_2019 = data.Q3_2019 
     data.Q4_2019 = data.Q4_2019 
     data.Q1_2020 = data.Q1_2020 
     data.Q1_2020 = data.Q1_2020


     console.log('Area:',data.Area, 'Q1 2020:', data.Q1_2020)
    });
})

d3.csv('/data/Total_Subscribers_by_country_2019_2020.csv').then(function(demoData) {

    // Step 1: Parse Data/Cast as numbers
 // ==============================
 demoData.forEach(function(data) {
     data.Country = data.Country
     data.Subscribers_2019 = data.Subscribers_2019
     data.Subscribers_2020 = data.Subscribers_2020
  


    //  console.log('Country:', data.Country, 'Subs:', data.Subscribers_2019, data.Subscribers_2020)
    });
})

// // Use this link to get the geojson data.
// var link = "/data/custom.geo.json";

  
// // determine colors for countries
// function chooseColor(countryName) {

// switch (countryName) {
//   case "United States":
//     return "yellow";
//   case "Brazil":
//     return "red";
//   case "United Kingdom":
//     return "orange";
//   case "Mexico":
//     return "green";
//   case "France":
//     return "purple";
//   case "Canada":
//     return "aqua";
//   case "Germany":
//     return "slateblue";
//   case "Australia":
//     return "lawngreen";
//   case "Argentina":
//     return "mediumblue";
//   case "78219":
//     return "deepskyblue";
//   case "78244":
//     return "magenta";
//   case "78201":
//     return "darkorange";
//   default:
//     return "black";
//   }
// }

// // Grabbing our GeoJSON data..
// d3.json(link, function(data) {
//   // Creating a geoJSON layer with the retrieved data
//   L.geoJson(data, {
//     // Style each feature (in this case a neighborhood)
//     style: function(feature) {
//       return {
//         color: "white",
//         // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
//         fillColor: chooseColor(feature.properties.name),
//         fillOpacity: 0.5,
//         weight: 1.5
//       };
//     },
//     // Called on each feature
//     onEachFeature: function(feature, layer) {
//       // Set mouse events to change map styling
//       layer.on({
//         // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
//         mouseover: function(event) {
//           layer = event.target;
//           layer.setStyle({
//             fillOpacity: 0.9
//           });
        
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        // mouseout: fun


// bar graph
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 50, left: 70},
    width = 650 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select(".chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("/data/rating_data_combined.csv").then(function(ratingData) {

console.log(ratingData)

 // List of subgroups = header of the csv files = soil condition here
 var subgroups = ratingData.columns.slice(1)

 console.log(subgroups)

 // List of groups = species here = value of the first column called group -> I show them on the X axis
 var groups = d3.map(ratingData, function(d){return(d.Rating)}).keys()

 console.log(groups)

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
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#FA8072','#DC143C'])

  //stack the data? --> stack per subgroup
  var stackedData = d3.stack()
    .keys(subgroups)
    (ratingData)
    // for (var i = 0; i < ratingData.length; i++){
    // console.log(ratingData[i].Movie)
    // }
//   Show the bars
  svg.append("g")
    .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(stackedData)
    .enter().append("g")
      .attr("fill", function(d) { return color(d.key); })
      .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data(function(d) { return d; })
      .enter().append("rect")
        .attr("x", function(d) { return x(d.data.Rating); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width",x.bandwidth());

// Create axes labels    
svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left - 5)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em") // NOTE 'em' is 10px units and 'd'  is like a 'delta' up the y-axis in this case
  .attr("class", "axisText")
  .text("Number of Titles in Library");
svg.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 25})`)
  .attr("class", "axisText")
  .text("Rating");

// Append group element
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 1: Initialize Tooltip
var toolTip = d3.tip() // method from the d3.tip library not native to d3 
.attr("class", "tooltip")
.offset([80, -60])
.html(function(d) {
  return (`<strong>${(d.Movie)}<strong><hr>${(d.TV_Show)}`);
  console.log(d.Movie)
});

// Step 2: Create the tooltip in chartGroup.
chartGroup.call(toolTip);

// Step 3: Create "mouseover" event listener to display tooltip
chartGroup.on("mouseover", function(d) {
toolTip.show(d, this);
})
// Step 4: Create "mouseout" event listener to hide tooltip
.on("mouseout", function(d) {
  toolTip.hide(d);
});

// var tip = d3.tip()
//   .attr('class', 'd3-tip')
//   .offset([-10, 0])
//   .html(function(d) {
//     return "<strong>Count:</strong> <span style='color:red'>" + d.Movie + "</span> <strong>Count:</strong> <span style='color:red'>" + d.TV_Show + "</span>";
//   })
// var chartGroup = d3.select("body").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// chartGroup.call(tip);

    }).catch(function(error) {
        console.log(error);
       });
      