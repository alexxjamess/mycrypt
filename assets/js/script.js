// Base API URL for CoinGecko
const API_BASE_URL = "https://api.coingecko.com/api/v3/simple/price";
// Function to call any API and return response
async function makeAPICall(url) {
    // Storing response
    const response = await fetch(url);
    // Storing data in form of JSON
    let data = await response.json();
    return data;
}
/**
 * This will find current price based on chosen item drop down list
 * this should be an API but couldnt get it to work
 */
async function getCurrentPriceForCoin(coin, outputCurrency = "usd") {
    const data = await makeAPICall(`${API_BASE_URL}?ids=${coin}&vs_currencies=${outputCurrency}`);
    return data[coin][outputCurrency];
}
/**Event Listeners for buttons*/
async function onCurrencySelect() {
    const selectedCoin = document.getElementById(`coin-token-port`).value;
    const currentPrice = await getCurrentPriceForCoin(selectedCoin);
    document.getElementById(`current-price1`).innerHTML = currentPrice;
}

async function onCurrencySelectPred() {
     const currency = document.getElementById("coin-token-pred").value;
     const currentPrice = await getCurrentPriceForCoin(currency);
     document.getElementById("current-price").innerHTML = currentPrice;
 }
/**
 * If calculate button is clicked this will run a function
 * to calcualte current total value of coin by multipying current price and the users inputed amount
 * for my portfolio
 */
function calculateTotalPortfolioValueForEachCoin() {
    const rows = document.getElementsByClassName("data-row");
    for (let idx = 0; idx < rows.length; idx++) {
        const currentPrice = document.getElementById(`current-price1-${idx}`);
        const coinCount = document.getElementById(`my-amount-input-${idx}`);
        const totalCoinValue = parseFloat(currentPrice.innerText) * parseFloat(coinCount.value);
        document.getElementById(`current-value1-${idx}`).innerHTML = totalCoinValue;
    }
}
/**
 * If calculate button is clicked this will run a function
 * to calcualte current total value of coin by multipying current price and the users inputed amount
 * for my portfolio
 */
 function calculateTotalPredictorValueForEachCoin() {
  
      const currentPricePred = document.getElementById(`current-price`);
      const coinCountPred = document.getElementById(`my-amount-input-pred`);
      const totalCoinValuePred = parseFloat(currentPricePred.innerText) * parseFloat(coinCountPred.value);
      document.getElementById(`current-value-predictor`).innerHTML = totalCoinValuePred;
  }




function addCoin() {
    const currentRowCount = document.getElementsByClassName("data-row").length;
    // Append a new row to body
    let newRow = document.getElementById("my-portfolio-table-body").insertRow(currentRowCount + 1);
    newRow.className = "data-row";
    // Append column 1
    let coinToken = newRow.insertCell(0);
    coinToken.innerHTML = `<input id="coin-list-${currentRowCount + 1}" class="form-input" type="text" list="coins" oninput="onCurrencySelect(${currentRowCount + 1})"/>`;
    // Append column 2
    newRow.insertCell(1);
    // Append column 3
    let tokenCount = newRow.insertCell(2);
    tokenCount.innerHTML = `<input id="my-amount-input-${currentRowCount + 1}" class="form-input" type="number" min="0" />`;
    // Append column 4
    newRow.insertCell(3);
    // Append column 5
    newRow.insertCell(4);
}

/**
 * Function to draw chart of portfolio
 * used from Google Charts
 
// Load the Visualization API and the corechart package.
google.charts.load("current", {
    packages: ["corechart"],
});
// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);
// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
    // Create the data table.
    let data = new google.visualization.DataTable();
    data.addColumn("string", "Coin/Token");
    data.addColumn("number", "Percentage");
    data.addRows([
        [document.getElementById("coin-token").value, document.getElementById("current-value1")],
        ["XRP", 1],
        ["ADA", 1],
        ["ETH", 1],
        ["DOGE", 2],
    ]);
    // Set chart options
    let options = {
        title: "My Portfolio",
        is3D: true,
        colors: ["#76ffdd", "#5eccb1", "#479985", "#2f6658", "#18332c"],
        width: 500,
        height: 400,
    };
    // Instantiate and draw our chart, passing in some options.
    let chart = new google.visualization.PieChart(document.getElementById("chart-div"));
    chart.draw(data, options);
}*/
/**
 * Function to calculate the future value of coin/token
 * Users input of Number of Coins * User Input of Future Value
 */
function calculateFutureValue() {
    const futurePricePred = document.getElementById("future-price-input").value;
    const myAmountPred = document.getElementById("my-amount-input-pred").value;
    const resultFutureValue = futurePricePred * myAmountPred;
    document.getElementById("future-value").innerHTML = resultFutureValue;
}
/**
 * function used to calculate percentage change
 * from current value to future value my predictor page
 */
function calculatePercentageChange() {
    const futureValuePredictor = document.getElementById("future-value");
    const currentValuePredictor = document.getElementById(`current-value-predictor`);
    const resultPercentageChange = (parseFloat(futureValuePredictor.value) - parseFloat(currentValuePredictor.innerText))/ parseFloat(currentValuePredictor.innerText)* 100;
    document.getElementById("percentage-change").innerHTML = resultPercentageChange;
    console.log(resultPercentageChange);
}
