var sel = d3.select('#selDataset'); // Get Element
var sel_value; // Stage empty var

populateCountryDropDown()
function populateCountryDropDown() {
    d3.json("./data/CountryCode.json").then(function (data) {
        data.forEach(function (item) {
            sel.append("option").property("value", item.Code).text(item.Name);
            sel_value = sel.property("value");
        })
        getAPINetflixData(sel_value)
    });
}
function getAPINetflixData(cData) {
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
            response.json().then(data => {
                data.ITEMS.forEach(function (item) {
                    if (item.rating === ""){
                        item.rating = 'N/A'
                    // console.log(item.title)
                    // console.log(item.rating)
                    }
                    renderLayout(item)
                })
            })
        })
        .catch(err => {
            console.error(err);
        });

}
const main = document.getElementById("main");
function renderLayout(countryData) {
    // console.log(countryData)
    // Creating elemnts for our data inside the main tag. 
    const el = document.createElement('li');
    const image = document.createElement('img');
    const div = document.createElement('div')
    const span = document.createElement('span')

    div.className = "tooltipme";
    span.className = "tooltiptext"

    // var test = []
    // test.push(countryData)
    //     console.log(test)


    span.innerHTML = ('<strong>Title: </strong>'  + countryData.title + '<br>' + '<strong>Rating: </strong>' + countryData.rating + '<br>' + '<strong>Release Yr: </strong>' + countryData.released + '<br>' + '<strong>Length: </strong>' + countryData.runtime)
    image.src = countryData.image;

    el.appendChild(div);
    div.appendChild(image);
    div.appendChild(span)
    main.appendChild(el);

}

function optionChanged() {
    populateCountryDropDown()

    var div = document.getElementById("main");

    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}


