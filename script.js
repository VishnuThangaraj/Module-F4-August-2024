let cryptoData = [];

// Buttons
const sortByMkt = document.getElementById(`sort_by_MKT`);
const sortByPercentage = document.getElementById(`sort_by_percentage`);

const searchBox = document.getElementById(`search_box`);
const parentTable = document.getElementById(`table_data`);

// Functionality for Buttons
sortByMkt.addEventListener("click", function () {
  const tempData = cryptoData.sort(
    (a, b) =>
      Math.trunc(b.market_cap_change_24h) - Math.trunc(a.market_cap_change_24h)
  );
  appendToWebsite(tempData); // change
});

sortByPercentage.addEventListener("click", function () {
  const tempData = cryptoData.sort(
    (a, b) =>
      Math.trunc(b.price_change_percentage_24h) -
      Math.trunc(a.price_change_percentage_24h)
  );
  appendToWebsite(tempData);
});

// Search Functionality
searchBox.addEventListener("input", function () {
  const inputValue = searchBox.value.toLowerCase();
  const searchResult = [];
  cryptoData.forEach((coin) => {
    let coinName = coin.name.toLowerCase();
    let coinSymbol = coin.symbol.toLowerCase();
    if (coinName.includes(inputValue) || coinSymbol.includes(inputValue)) {
      searchResult.push(coin);
    }
  });
  appendToWebsite(searchResult);
});

// Function to append API Data to Website
function appendToWebsite(data) {
  const crypto = [...data];
  parentTable.innerHTML = "";

  crypto.forEach((coin) => {
    const containerHolder = document.createElement("div");
    containerHolder.classList.add("container_holder");

    // Create individual elements for each coin property
    const coinLogo = document.createElement("div");
    coinLogo.classList.add("coin_logo", "col-1");
    const img = document.createElement("img");
    img.src = `${coin.image}`;
    img.classList.add("image_size");
    coinLogo.appendChild(img);

    const coinName = document.createElement("div");
    coinName.classList.add("coin_name", "col-2");
    coinName.textContent = coin.name;

    const coinCode = document.createElement("div");
    coinCode.classList.add("coin_code", "col-1");
    coinCode.textContent = coin.symbol.toUpperCase();

    const coinValue = document.createElement("div");
    coinValue.classList.add("coin_value", "col-2");
    coinValue.textContent = "$" + `${coin.current_price}`;

    const coinVolume = document.createElement("div");
    coinVolume.classList.add("coin_volume", "col-2");
    coinVolume.textContent = "$" + ` ${coin.total_volume}`;

    const coinPercentage = document.createElement("div");
    coinPercentage.textContent = `${coin.price_change_percentage_24h} %`;

    if (coin.price_change_percentage_24h < 0) {
      coinPercentage.classList.add("coin_percentage", "col-2", "text-danger");
    } else {
      coinPercentage.classList.add("coin_percentage", "col-2", "text-success");
      containerHolder.classList.add("green", "container_holder");
    }

    const coinMKT = document.createElement("div");
    coinMKT.classList.add("coin_MKT", "col-2");
    coinMKT.textContent =
      "MKT : $" + ` ${Math.trunc(coin.market_cap_change_24h)}`;

    // Append individual elements to the container holder
    containerHolder.appendChild(coinLogo);
    containerHolder.appendChild(coinName);
    containerHolder.appendChild(coinCode);
    containerHolder.appendChild(coinValue);
    containerHolder.appendChild(coinVolume);
    containerHolder.appendChild(coinPercentage);
    containerHolder.appendChild(coinMKT);

    // Append the container holder to the table_data section
    parentTable.appendChild(containerHolder);
  });
}

// Fetch Data From API
async function fetchData() {
  try {
    const response = await fetch("/cryptoData.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    cryptoData = await response.json();
    appendToWebsite(cryptoData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();
alert("Data Fetched from JSON file, as the given API is not accessable");
