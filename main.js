// JavaScript code
document.getElementById("mainTitle").textContent = `Movie Search`;
let isFirstRecord = true; // Variable to track if it's the first record added
let logMovies = []; // Array to store logged movies

function addNewRecord(data) {
  if (logMovies.includes(data.Title)) { // Check if the movie is already in the list
    alert("Movie is already in the list");
    return;
  } else {
    logMovies.push(data.Title); // Add the movie to the list
  }

  // Get the table body element
  let tableBody = document.querySelector(".list tbody");

  // Insert a new row at the beginning of the table body
  let newRow = tableBody.insertRow(0);

  // Insert cells into the new row
  let titleCell = newRow.insertCell(0);
  let yearCell = newRow.insertCell(1);
  let posterCell = newRow.insertCell(2);
  let overviewCell = newRow.insertCell(3);
  let directorCell = newRow.insertCell(4);

  // Set the content of each cell with data from the API response
  titleCell.textContent = data.Title;
  yearCell.textContent = data.Year;
  posterCell.innerHTML = `<img src="${data.Poster}">`;
  overviewCell.textContent = data.Plot;
  directorCell.textContent = data.Director;
}

function setData(data) {
  if (isFirstRecord) {
    isFirstRecord = false; // Update the isFirstRecord flag if it's the first record
  }
  addNewRecord(data); // Add the new record to the table
}

async function main() {
  try {
    const movieName = document.querySelector("#movieName").value;
    if (movieName.length === 0) {
      throw new Error("Please enter a movie name");
    }
    const apiKey = "d6eef0b9";
    const url = `https://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`;

    // Fetch movie data from the API
    const response = await fetch(url);
    const data = await response.json();

    if (data.Error) {
      throw new Error("Movie not found");
    }
    setData(data); // Set the data in the table
  } catch (error) {
    alert(error); // Display any errors occurred during the process
  }
}

// Add event listeners to the button and input field
document.querySelectorAll("button")[0].addEventListener("click", main);
document.querySelector("input").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    main();
  }
});
