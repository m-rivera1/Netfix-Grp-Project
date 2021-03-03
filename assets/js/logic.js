
google.charts.load('current', {
  'packages': ['geochart'],
  'mapsApiKey': API_KEY
});
google.charts.setOnLoadCallback(drawRegionsMap);


subArray = [['Country', 'Subscribers']]

d3.csv("Data/Total_Subscribers_by_country_2019_2020.csv").then(function (data) {
  for (var i = 0; i < data.length; i++) {
    var country = data[i].Country;
    var subscriber_count = parseFloat(data[i].Subscribers_2020);
    subArray.push([country, subscriber_count])

  }
});

d3.csv("Data/DataNetflixRevenuebyRegionV2.csv").then(function (data) {
  filter_data = data.filter(d => d.Years == 2020)
  // console.log(filter_data)
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  grouped_data = d3.nest()
    .key(function (d) { return d.Area })
    .rollup(v => d3.sum(v, d => d.Revenue), d => d.Area)
    .entries(filter_data)

  var data = grouped_data;


  var width = 200;
  var height = 260;
  var thickness = 25;


  var radius = Math.min(width, height) / 2;
  var color = d3.scaleOrdinal()
    .domain(data)
    .range(['#FA8072', '#DC143C', '#B22222', '#FF0000']);

  var svg = d3.select("#total_rev")
    .append('svg')
    .attr('class', 'pie')
    .attr('width', width)
    .attr('height', height);

  var g = svg.append('g')
    .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

  var arc = d3.arc()
    .innerRadius(radius - thickness)
    .outerRadius(radius);

  var pie = d3.pie()
    .value(function (d) { return d.value; })
    .sort(null);

  var path = g.selectAll('path')
    .data(pie(data))
    .enter()
    .append("g")
    .on("mouseover", function (d) {
      let g = d3.select(this)
        .style("cursor", "pointer")
        .style("fill", "#fff")
        .append("g")
        .attr("class", "text-group");

      g.append("text")
        .attr("class", "name-text")
        .text(`${d.data.key}`)
        .attr('text-anchor', 'middle')
        .attr('dy', '-1.2em')
        .attr('font-size', '.65em');
      g.append("text")
        .attr("class", "value-text")
        .text(`${formatter.format(d.data.value)}`)
        .attr('text-anchor', 'middle')
        .attr('dy', '.6em');
    })
    .on("mouseout", function (d) {
      d3.select(this)
        .style("cursor", "none")
        .style("fill", color(this._current))
        .select(".text-group").remove();
    })
    .append('path')
    .attr('d', arc)
    .attr('fill', (d, i) => color(i))
    .on("mouseover", function (d) {
      d3.select(this)
        .style("cursor", "pointer")
        .style("fill", "white");
    })
    .on("mouseout", function (d) {
      d3.select(this)
        .style("cursor", "none")
        .style("fill", color(this._current));
    })
    .each(function (d, i) { this._current = i; });


});


function drawRegionsMap() {

  var data = google.visualization.arrayToDataTable(subArray, false);

  var options = {
    backgroundColor: { fill: 'rgb(20,20,20)' },
    colorAxis: { colors: ['#FA8072', '#DC143C', '#B22222', '#FF0000'] },
    explorer: { actions: ['dragToZoom', 'rightClickToReset'] },
    datalessRegionColor: '#d3d3d3',
  };

  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

  chart.draw(data, options);
}

var sel = d3.select('#selDataset'); // Get Element
var sel_value; // Stage empty var
google.charts.load('current', { packages: ['corechart', 'bar'] });
google.charts.setOnLoadCallback(getCatelogData);

function getCatelogData() {
  d3.csv("Data/catelog by country.csv").then(function (data) {
    var country_list = []
    data.forEach(function (item) {
      country_list.push(item.Country)
    })

    country_list.sort()
    country_list.forEach(d => {
      sel.append("option").property("value", d).text(d);
      sel_value = sel.property("value");
    })

    var catelogBarData = data.filter(data => data.Country == sel_value);// Retrieve data based on selection

    var shows = parseInt(catelogBarData[0].Shows.replace(",", ""))
    var movies = parseInt(catelogBarData[0].Films.replace(",", ""))

    var data = google.visualization.arrayToDataTable([
      ['Category', '#', { role: 'style' }],
      ['Movies', movies, 'color: #FF0000'],
      ['TV Shows', shows, 'color: #FA8072']
    ]);
    var options = {
      backgroundColor: { fill: 'transparent' },
      legend: { position: 'none' },
      vAxis: { textStyle: { color: 'white' } },
      hAxis: { textStyle: { color: 'white' } }

    };

    var chart = new google.visualization.BarChart(document.getElementById('bar'));
    chart.draw(data, google.charts.Bar.convertOptions(options));
  });

}


function optionChanged() {

      getCatelogData()
    }