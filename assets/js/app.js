

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

// Use this link to get the geojson data.
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
//         },
//         // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
//         mouseout: fun