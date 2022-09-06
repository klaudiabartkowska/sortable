let data, table, sortCol;

fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
  .then((data) => {
    //console.log(data);  //json format
    return data.json(); //  converted to object
  })
  .then((objectData) => {
    data = objectData;
    renderT();
  })
  .catch((err) => {
    console.log(err);
  });
// console.log(objectData[0]);

//   let tableData = "";

//   objectData.forEach((values) => {
//     tableData += `<tr>
//   <td><div class="hero"><img src="${values.images.sm}"/></div></td>
//   <td>${values.name}</td>
//   <td>${values.biography.fullName}</td>
//   <td>${values.powerstats.combat}</td>
//   <td>${values.powerstats.durability}</td>
//   <td>${values.powerstats.intelligence}</td>
//   <td>${values.powerstats.power}</td>
//   <td>${values.powerstats.speed}</td>
//   <td>${values.powerstats.strength}</td>
//   <td>${values.appearance.race}</td>
//   <td>${values.appearance.gender}</td>
//   <td>${values.appearance.height[1]}</td>
//   <td>${values.appearance.weight[1]}</td>
//   <td>${values.biography.placeOfBirth}</td>
//   <td>${values.biography.alignment}</td>
// </tr>`;
//   });
//   document.getElementById("table_body").innerHTML = tableData;
// })

document.addEventListener("DOMContentLoaded", init, false);
document.getElementById("page-view").onchange = changePageSize;
//an event Listener, when the value is changed in the drop down, it calls the function change Page Size. and then change page size updates the variable
//and re renders the table.

let sortAsc = false;
async function init() {
  let tableHead = document.getElementById("tableHead");
  Array.from(tableHead.children).forEach((th) => {
    th.addEventListener("click", sort, false);
  });
  //iterates through
}

function sort(e) {
  let thisSort = e.target.dataset.sort;
  if (sortCol === thisSort) sortAsc = !sortAsc; // if the col already being sorted is the same as you clicked on
  sortCol = thisSort;



  data.sort((a, b) => {
    let aVal, bVal;
    let property = sortCol.split(".");
    if (property.length > 1) {
      aVal = a[property[0]][property[1]];
      bVal = b[property[0]][property[1]];
    } else {
      aVal = a[sortCol];
      bVal = b[sortCol];
    }
    if (sortCol === "appearance.weight"){
      console.log(aVal[0].split(" ")[0])
      // console.log(bVal[0].split(" ")[0])

      if (parseInt(aVal[0].split(" ")[0]) < parseInt(bVal[0].split(" ")[0])) return sortAsc ? 1 : -1;
      if (parseInt(aVal[0].split(" ")[0]) > parseInt(bVal[0].split(" ")[0])) return sortAsc ? -1 : 1;
    }

    if (sortCol === "appearance.height"){
      if (parseInt(aVal[0]) < parseInt(bVal[0])) return sortAsc ? 1 : -1; 
      if (parseInt(aVal[0]) > parseInt(bVal[0])) return sortAsc ? -1 : 1;
    }

    if (aVal === "" || aVal === null || aVal === "-" || aVal === "(Galan) Taa; (Galactus) the Cosmic Egg") {
      return 1;
    }
    if (bVal === "" || bVal === null || bVal === "-" || bVal === "(Galan) Taa; (Galactus) the Cosmic Egg") {
      return -1;
    }
    if (aVal[0] === "Shaker Heights, Ohio" || aVal[0] === "-") {
      return 1;
    }
    if (bVal[0] === "Shaker Heights, Ohio" || bVal[0] === "-") {
      return -1;
    }
    if (aVal[0] === "- lb" || aVal  === "Shaker Heights, Ohio") {
      return 1;
    }
    if (bVal[0]  === "- lb" || bVal === "Shaker Heights, Ohio") {
      return -1;
    }


    if (aVal < bVal) return sortAsc ? 1 : -1;
    if (aVal > bVal) return sortAsc ? -1 : 1;

    if (aVal[0] < bVal[0]) return sortAsc ? 1 : -1;
    if (aVal[0] > bVal[0]) return sortAsc ? -1 : 1;

    return 0;
  });
  renderT();
}

function myFunction() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("table_body");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
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

let pageSize = 20;
let curPage = 1;

document
  .querySelector("#nextButton")
  .addEventListener("click", nextPage, false);
document
  .querySelector("#prevButton")
  .addEventListener("click", previousPage, false);

function previousPage() {
  if (curPage > 1) curPage--;
  renderT();
}

function nextPage() {
  if (curPage * pageSize < data.length) curPage++;
  renderT();
}

function changePageSize() {
  pageSize = document.getElementById("page-view").value;
  curPage = 1;
  renderT();
}

function renderT() {
  // create html
  let result = "";
  data
    .filter((row, index) => {
      let start = (curPage - 1) * pageSize;
      let end = curPage * pageSize;
      if (index >= start && index < end) return true;
    })
    .forEach((values) => {
      result += `<tr>
      <td><div class="hero"><img src="${values.images.md}"/></div></td>
      <td>${values.name}</td>
      <td>${values.biography.fullName}</td>
      <td>${values.powerstats.combat}</td>
      <td>${values.powerstats.durability}</td>
      <td>${values.powerstats.intelligence}</td>
      <td>${values.powerstats.power}</td>
      <td>${values.powerstats.speed}</td>
      <td>${values.powerstats.strength}</td>
      <td>${values.appearance.race}</td>
      <td>${values.appearance.gender}</td>
      <td>${values.appearance.height[0]} ft</td>
      <td>${values.appearance.weight[0]}</td>
      <td>${values.biography.placeOfBirth}</td>
      <td>${values.biography.alignment}</td>
    </tr>`;
    });
  document.getElementById("table_body").innerHTML = result;
}
