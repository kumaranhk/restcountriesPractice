let countryEle = document.getElementById("contry-container");
const searchButton = document.querySelector('.search-btn');
let pageButton = document.querySelectorAll('.page');
let currentpage = 1;
let itemsPage = 10;

function paginationButton(val){
  pageButton.forEach(ele => {
    ele.style.display = val;
  });
}

async function fetchCountries(continent,sort,country) {
  let d;
  try {
    countryEle.innerHTML = "";
    let startIndex = (currentpage - 1) * itemsPage;
    let endIndex = startIndex + itemsPage;
    let res = await fetch("https://restcountries.com/v3.1/all");
    let data = await res.json();

    if (sort != ""){
      d = (sort == 'aesc') ? data.sort((a,b) => a.name.common.localeCompare(b.name.common)) : data.sort((a,b) => b.name.common.localeCompare(a.name.common));
    }

    if (continent != ""){ 
      d = data.filter(obj => {
        return obj.continents[0] === continent;
      })
      if (country != ""){
        d = d.filter(obj => {
          return obj.name.common.toLowerCase() === (country.toLowerCase());
        });
      }
      d.slice(startIndex, endIndex).forEach((ele) => {
        createDataCard(ele);
      });
      
      d.length <= itemsPage ? paginationButton('none') : paginationButton('block')
      if (d.length == 0){
        countryEle.innerHTML += `
          <h6 style="text-align:center">No data</h6>
        `;
        paginationButton('none')
      }
    }

    else
      if (country != ""){
        d = data.filter(obj => {
          return obj.name.common.toLowerCase() === (country.toLowerCase());
        })
        if (d.length == 0){
          countryEle.innerHTML += `
            <h6 style="text-align:center">No data</h6>
          `;
        }
        else {
          createDataCard(d[0]);
        }
      } 
      else{
        data.slice(startIndex, endIndex).forEach((ele) => {
          createDataCard(ele);
        });
      }
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
        <div class="card container g-col-4" style="width: 18rem;">
          <img src="${ele.flags?.png}" class="card-img-top" alt="somename" id="flag">
          <div class="card-body card-info">
            <h2 class="card-title">${ele.name?.common}</h2>
            <p class="card-text"><span>Population :</span>${ele?.population}</p>
            <p class="card-text"><span>Region :</span>${ele?.region}</p>
            <p class="card-text"><span>Continent :</span>${ele?.continents}</p>
            <p class="card-text"><span>Capital :</span>${ele?.capital ? ele?.capital[0] : ""}</p>
          </div>
        </div>
        `;
}

function get_value(){
  fetchCountries(document.getElementById('continents').value, document.getElementById('view-dropdown').value, document.querySelector('.search-box').value);
}
get_value();

function prevButton() {
  if (currentpage > 1) {
    currentpage--; //1
    fetchCountries(document.getElementById('continents').value, document.getElementById('view-dropdown').value, document.querySelector('.search-box').value);
  }
}

function nextButton() {
  currentpage++;
  fetchCountries(document.getElementById('continents').value, document.getElementById('view-dropdown').value, document.querySelector('.search-box').value);
}

searchButton.addEventListener('click',() => {
  fetchCountries(document.getElementById('continents').value, document.getElementById('view-dropdown').value, document.querySelector('.search-box').value);
});
