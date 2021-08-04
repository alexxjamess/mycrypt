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
async function onCurrencySelect(rowNo) {
    const selectedCoin = document.getElementById(`coin-token-port-${rowNo}`).value;
    const currentPrice = await getCurrentPriceForCoin(selectedCoin);
    document.getElementById(`current-price-${rowNo}`).innerHTML = currentPrice;
}

async function onCurrencySelectPred(rowNo) {
     const currency = document.getElementById(`coin-token-pred-${rowNo}`).value;
     const currentPrice = await getCurrentPriceForCoin(currency);
     document.getElementById(`current-price-pred-${rowNo}`).innerHTML = currentPrice;
 }
/**
 * If calculate button is clicked this will run a function
 * to calcualte current total value of coin by multipying current price and the users inputed amount
 * for my portfolio
 */
function calculateTotalPortfolioValueForEachCoin() {
    const rows = document.getElementsByClassName("data-row-port");
    for (let idx = 1; idx <= rows.length; idx++) {
        const currentPrice = document.getElementById(`current-price-${idx}`).innerText;
        const coinCount = document.getElementById(`my-amount-input-${idx}`).value;
        const totalCoinValue = parseFloat(currentPrice) * parseFloat(coinCount);
        document.getElementById(`current-value-${idx}`).innerHTML = totalCoinValue;
    }
}
/**
 * If calculate button is clicked this will run a function
 * to calcualte current total value of coin by multipying current price and the users inputed amount
 * for my portfolio
 */
 function calculateTotalPredictorValueForEachCoin() {
    const rows = document.getElementsByClassName("data-row-pred");
    for (let idx = 1; idx <= rows.length; idx++) {

      const currentPricePred = document.getElementById(`current-price-pred-${idx}`);
      const coinCountPred = document.getElementById(`my-amount-input-pred-${idx}`);
      const totalCoinValuePred = parseFloat(currentPricePred.innerText) * parseFloat(coinCountPred.value);
      document.getElementById(`current-value-predictor-${idx}`).innerHTML = totalCoinValuePred;
  }

}
/**
 * function used to add row to my portfolio table
 * inputting the same input fields as prevous row.
 */
//  <tr class="data-row">
//  <td>
//    <input type="text" placeholder="Select a Coin/Token" oninput="onCurrencySelect(1)" class="form-input data-row-port" id="coin-token-port-1" name="coin-token" list="coins" />
//    <datalist id="coins">
//      <option value="bitcoin">BTC</option>
//      <option value="ethereum">ETH</option>
//      <option value="ripple">XRP</option>
//      <option value="cardano">ADA</option>
//      <option value="tether">USDT</option>
//      <option value="dogecoin">DOGE</option>
//    </datalist>
//  </td>
//  <td id="current-price-1" class="data-row-port dollars" ></td>
//  <td><input required id="my-amount-input-1" placeholder="Enter No of Coins/Tokens" class="form-input data-row-port" type="number" min="0" name="my-amount" /></td>
//  <td id="current-value-1" class="data-row-port dollars current-total-value" ></td>
//  <td id="port-value-1" class="data-row-port"></td>
// </tr>
function addCoinPortfolio() {
  const currentRowCount = document.getElementById("portfolio-table").rows.length;
  const myPortfolioTable= document.getElementById("portfolio-table");
  // Append a new row to body
  let newRow = myPortfolioTable.insertRow(currentRowCount);
  newRow.className = "data-row-port";

    // Append column 1
    let coinToken = newRow.insertCell(0);
    coinToken.innerHTML = `<input id="coin-token-port-${currentRowCount}" class="form-input"  placeholder="Select a Coin/Token" type="text" list="coins" oninput="onCurrencySelect(${currentRowCount})"/>`;
    // Append column 2
    let coinCurrentPrice = newRow.insertCell(1);
    coinCurrentPrice.className = "dollars current-total-value"
    coinCurrentPrice.id = `current-price-${currentRowCount}`
    // Append column 3
    let tokenCount = newRow.insertCell(2);
    tokenCount.innerHTML = `<input id="my-amount-input-${currentRowCount}" class="form-input" placeholder="Enter No of Coins/Tokens" type="number" min="0" />`;
    // Append column 4
    let totalValueCoin = newRow.insertCell(3);
    totalValueCoin.className = "dollars"
    totalValueCoin.id = `current-value-${currentRowCount}`
       // Append column 5
    let coinPortfolioValue = newRow.insertCell(4);
    coinPortfolioValue.id = `port-value-${currentRowCount}`

}
/**
 * function used to add row to my predictor table
 * inputting the same input fields as prevous row.
 */
function addCoinPred() {
    const currentRowCountPred = document.getElementById("predictor-table").rows.length;
    const myPredictorTable= document.getElementById("predictor-table");
    // Append a new row to body
    let newRowPred = myPredictorTable.insertRow(currentRowCountPred);
    newRowPred.className = "data-row-pred";

      // Append column 1
      let coinTokenPred = newRowPred.insertCell(0);
      coinTokenPred.innerHTML = `<input id="coin-token-pred-${currentRowCountPred}" class="form-input"  placeholder="Select a Coin/Token" type="text" list="coins" oninput="onCurrencySelectPred(${currentRowCountPred})"/>`;
      // Append column 2
      let coinCurrentPricePred = newRowPred.insertCell(1);
      coinCurrentPricePred.className = "dollars current-total-value";
      coinCurrentPricePred.id = `current-price-pred-${currentRowCountPred}`;
      // Append column 3
      let tokenCountPred = newRowPred.insertCell(2);
      tokenCountPred.innerHTML = `<input id="my-amount-input-pred-${currentRowCountPred }" class="form-input" placeholder="Enter No of Coins/Tokens" type="number" min="0" />`;
      // Append column 4
      let totalValueCoinPred = newRowPred.insertCell(3);
      totalValueCoinPred.className = "dollars";
      totalValueCoinPred.id = `current-value-predictor-${currentRowCountPred}`
      // Append column 5
      let coinFutureValue = newRowPred.insertCell(4);
      coinFutureValue.className = "dollars";
      coinFutureValue.innerHTML = `<input id="future-price-input-${currentRowCountPred}" class="form-input" placeholder="Enter future Price" type="number" min="0" />`;
      // Append column 6
      let coinFutureValueTotal = newRowPred.insertCell(5);
      coinFutureValueTotal.className = "dollars";
      coinFutureValueTotal.id =`future-value-${currentRowCountPred}`
      // Append column 7
      let coinPercentageChange = newRowPred.insertCell(6);
      coinPercentageChange.id = `percentage-change-${currentRowCountPred}`;


  }
/**
 * function used to calculate future value by
 * multiplying future price inputted by user and no of coins inputted by user.
 */

function calculateFutureValue() {
    const rows = document.getElementsByClassName("data-row-pred");
    for (let idx = 1; idx <= rows.length; idx++) {
        
    const futurePricePred = document.getElementById(`future-price-input-${idx}`).value;
    const myAmountPred = document.getElementById(`my-amount-input-pred-${idx}`).value;
    const resultFutureValue = futurePricePred * myAmountPred;
    document.getElementById(`future-value-${idx}`).innerHTML = resultFutureValue;
    }
}


/**
 * function used to calculate percentage change
 * from current value to future value my predictor page
 */
function calculatePercentageChange() {
    const futureValuePredictor = document.getElementById("future-value");
    const currentValuePredictor = document.getElementById('current-value-predictor');
    const resultPercentageChange = parseFloat(futureValuePredictor.value) - parseFloat(currentValuePredictor.innerText);
    document.getElementById("percentage-change").innerHTML = resultPercentageChange;
    console.log(resultPercentageChange);
}
/**
 * function used to calculate portfolio percentage
 *  Sum of Current Value Per Coin  /Number of Rows
 */
function calcualtePortfolioPercentagePerCoin() {
    const portfolioPercentage = 1
}
/**
 * Function to draw chart of portfolio
 * used from Google Charts

// Load the Visualization API and the corechart package.
google.charts.load("current", {
    packages: ["corechart"],
});
/**
// Set a callback to run when the Google Visualization API is loaded.
// google.charts.setOnLoadCallback(drawChart);
// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
    // Create the data table.
    let data = new google.visualization.DataTable();
    data.addColumn("string", "Coin/Token");
    data.addColumn("number", "Percentage");
    data.addRows([
        [document.getElementById(`coin-token-port-${0}`).value, document.getElementById(`current-value-${1}`)],
        [document.getElementById(`coin-token-port-${1}`).value, document.getElementById(`current-value"${2}`)],
        [document.getElementById(`coin-token-port-${2}`).value, document.getElementById(`current-value"${3}`)],
        [document.getElementById(`coin-token-port-${3}`).value, document.getElementById(`current-value"${4}`)],
        [document.getElementById(`coin-token-port-${4}`).value, document.getElementById(`current-value"${5}`)],
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
}
*/