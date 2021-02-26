google.charts.load('current', {
  'packages': ['geochart'],
  'mapsApiKey': API_KEY
});
google.charts.setOnLoadCallback(drawRegionsMap);

var subs = [['Country','Subscribers']]

d3.csv("Data/Total_Subscribers_by_country_2019_2020.csv").then(function (data){
  for (var i = 0; i < data.length; i++){
    subs.push([data[i].Country,data[i].Subscribers_2020])

  }
});


console.log(subs)

function drawRegionsMap() {

  var data = google.visualization.arrayToDataTable(subs);

  var options = {
      backgroundColor: { stroke: '#fd7e14' }
  };

  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

  chart.draw(data, options);
}
