fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
  .then((data) => {
    // console.log(data);  json format
    return data.json(); //  converted to object
  })
  .then((objectData) => {
   // console.log(objectData[0]);


    let tableData = "";
    // using map method

    objectData.map((values) => {
      tableData += `<tr>
    <td><div class="hero"><img src="${values.images.sm}"/></div></td>
    <td>${values.name}</td>
    <td>${values.biography.fullName}</td>
    <td>${values.powerstats.combat}</td>
    <td>${values.appearance.race}</td>
    <td>${values.appearance.gender}</td>
    <td>${values.appearance.height[1]}</td>
    <td>${values.appearance.weight[1]}</td>
    <td>${values.biography.placeOfBirth}</td>
    <td>${values.biography.alignment}</td>
  </tr>`;
    });
    document.getElementById("table_body").innerHTML = tableData;
  })
  .catch((err) => {
    console.log(err);
    // tableData= `<h1>${values.slug}</h1>`
  });

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

  