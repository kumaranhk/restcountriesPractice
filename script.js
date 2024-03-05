let countryEle = document.getElementById("contry-container");
let currentpage = 1;
let itemsPage = 10;

function check(arr,continent){
  return arr.continents[0] === continent
}

async function fetchCountries(continent,sort) {
  try {
    countryEle.innerHTML = "";
    let startIndex = (currentpage - 1) * itemsPage;
    let endIndex = startIndex + itemsPage;
    let res = await fetch("https://restcountries.com/v3.1/all");
    let data = await res.json();
    // console.log(data[0].continents[0]);
    if (sort != ""){
      var d = (sort == 'aesc') ? data.sort((a,b) => a.name.common.localeCompare(b.name.common)) : data.sort((a,b) => b.name.common.localeCompare(a.name.common));
    }
    if (continent != ""){ 
      d = data.filter(obj => {
        return obj.continents[0] === continent;
      })
      d.slice(startIndex, endIndex).forEach((ele) => {
        createDataCard(ele);
      });
    }

    else
      data.slice(startIndex, endIndex).forEach((ele) => {
        createDataCard(ele);
      });
  } 

  catch (error) {
    countryEle.innerHTML += `
    <h1 style="text-align:center">Error Occured Sorry 😥</h1>
    `;
    console.log(error);
  }
}

function createDataCard(ele) {
  countryEle.innerHTML += `
          <div class="container">
          <img id="flag" src=${ele.flags.png} alt="somename" />
          <div class="card-info">
            <h2>${ele.name.common}</h2>
            <p><span>Population :</span>${ele.population}</p>
            <p><span>Region :</span>${ele.region}</p>
            <p><span>Continent :</span>${ele.continents}</p>
            <p><span>Capital :</span>${ele.capital ? ele.capital[0] : ""}</p>
          </div>
        </div>
        `;
}

function get_value(){
  fetchCountries(document.getElementById('continents').value, document.getElementById('view-dropdown').value);
}
get_value();

function prevButton() {
  if (currentpage > 1) {
    currentpage--; //1
    fetchCountries(document.getElementById('continents').value);
  }
}

function nextButton() {
  currentpage++;
  fetchCountries(document.getElementById('continents').value);
}

