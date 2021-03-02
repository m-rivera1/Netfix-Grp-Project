var sel = d3.select('#selDataset'); // Get Element
var sel_value; // Stage empty var

populateCountryDropDown()
function populateCountryDropDown() {
    d3.json("Data/CountryCode.json").then(function (data) {
        data.forEach(function (item) {
            sel.append("option").property("value", item.Code).text(item.Name);
            sel_value = sel.property("value");
        })
        getAPINetflixData(sel_value)
    });
}
function getAPINetflixData(cData) {
    var nData = []
    var country = cData
    console.log(cData)
    fetch(`https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get%3Anew7%3A${country}&p=1&t=ns&st=adv`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "37c9f27854msh06da57228f81f86p19df09jsnce75a4804c01",
            "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
            'content-type': 'application/json'
        }
    })
        .then(response => {
            response.json().then(data => nData.push(data.ITEMS))
        })
        .catch(err => {
            console.error(err);
        });
        renderLayout(nData)
}
const main = document.getElementById("main");
function renderLayout(countryData){
    countryData.forEach(d => {console.log(d.title)})
    // console.log(countryData)

    countryData.forEach(element => {
        // Creating elemnts for our data inside the main tag. 
          const el = document.createElement('div');
          const image = document.createElement('img');
          const text = document.createElement('h2');
          text.innerHTML = `${element.title}`;
          image.src = element.image;
          console.log(image)
          el.appendChild(image);
          el.appendChild(text);
          main.appendChild(el);
      }); 
}

function optionChanged() {

    populateCountryDropDown()
}


