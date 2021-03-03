  // Import Data
  d3.csv('./data/Research-Visualizing_Netflix-Movies_IMDB.csv').then(function(movieData) {


  // Parse the data
    movieData.forEach(function(data) {
        //  data.Country = data.Country
        data.Continent = data.Continent
        data.Total_Titles_Available_on_Netflix = +data.Total_Titles_Available_on_Netflix
        data.Avg_Metacritic_Critics_Score = +data.Avg_Metacritic_Critics_Score
        data.Avg_IMDb_Audience_Ranking = +data.Avg_IMDb_Audience_Ranking

    console.log('Country:',data.Country, 'Continent:', data.Continent,
            'Total Titles:', data.Total_Titles_Available_on_Netflix, 
                'Mediacritics Score:', data.Avg_Metacritic_Critics_Score)
           
   });



// use D3 to select the table body and create a variable for it
var tbody = d3.select("tbody");
// console.log(movieData); --just to check data

// start of loop to get the data into the individual table rows
movieData.forEach(function(movies) {

 
  //create variable to be used to append to each table row
    var row = tbody.append("tr");
  //cycling through each object in the array key and value 
    Object.entries(movies).forEach(function([key, value]) {

      //append table data to each table row
        var cell = row.append("td");
      //grab the text values
        cell.text(value);
    });

})})

function myFunction() {
    
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    tr.className("text-white")
    // Loop through all table rows to find the cells that match
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }