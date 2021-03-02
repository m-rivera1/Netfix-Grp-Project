



d3.csv("Data/Research-Visualizing_Netflix-Movies_IMDB.csv").then(function (movies){
    for (var i = 0; i < movies.length; i++){
      movies.push([movies[i].Country,movies[i].Continent,movies[i].Total_Titles_Available_on_Netflix,
                    movies[i].Avg_IMDb_Audience_Ranking])

      }
    });

console.log(movies)