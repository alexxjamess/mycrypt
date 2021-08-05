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
  const selectedCoin = document.getElementById(`coin-token-pred-${rowNo}`).value;
  const currentPrice = await getCurrentPriceForCoin(selectedCoin);
  document.getElementById(`current-price-pred-${rowNo}`).innerHTML = currentPrice;
}
/**
 * If calculate button is clicked this will run a function
 * to calcualte current total value of coin by multipying current price and the users inputed amount
 * for my portfolio
 */
function calculateTotalPortfolioValueForEachCoin() {
  const rowPort = document.getElementsByClassName("data-row-port");
  for (let idx = 1; idx <= rowPort.length; idx++) {
    const currentPrice = document.getElementById(`current-price-${idx}`).innerText;
    const coinCount = document.getElementById(`my-amount-input-${idx}`).value;
    const totalCoinValue = parseFloat(currentPrice) * parseFloat(coinCount);
    document.getElementById(`current-value-${idx}`).innerHTML = totalCoinValue;
    /**
     * function used to calculate portfolio percentage
     *  Sum of Current Value Per Coin  / Sum of Current Value
     */
    var table = document.getElementById("portfolio-table"),
      sumTotalValue = 0;
    for (var i = 1; i < table.rows.length; i++) {
      sumTotalValue = sumTotalValue + parseFloat(table.rows[i].cells[3].innerHTML);
      const portfolioPercentage = (totalCoinValue / sumTotalValue) * 100;
      document.getElementById(`port-value-${idx}`).innerHTML = parseFloat(portfolioPercentage).toFixed(2);
    }
  }
}

/**
 * If calculate button is clicked this will run a function
 * to calcualte current total value of coin by multipying current price and the users inputed amount
 * for my portfolio
 * to calcualte future total value of coin by multipying future price inputted by user and the users inputed amount
 * to calcualte percentage change of coin taking the difference of the current and future value/ current value *100
 */
function calculateTotalPredictorValueForEachCoin() {
  const rowPred = document.getElementsByClassName("data-row-pred");
  for (let idx = 1; idx <= rowPred.length; idx++) {
    const currentPricePred = document.getElementById(`current-price-pred-${idx}`).innerText;
    const coinCountPred = document.getElementById(`my-amount-input-pred-${idx}`).value;
    const totalCoinValuePred = parseFloat(currentPricePred) * parseFloat(coinCountPred);
    document.getElementById(`current-value-predictor-${idx}`).innerHTML = totalCoinValuePred;
    // Future Total Value
    const futurePricePred = document.getElementById(`future-price-input-${idx}`).value;
    const myAmountPred = document.getElementById(`my-amount-input-pred-${idx}`).value;
    const totalFutureValue = parseFloat(futurePricePred) * parseFloat(myAmountPred);
    document.getElementById(`future-value-${idx}`).innerHTML = totalFutureValue;
    //Percentage Change
    const futureValuePredictor = document.getElementById(`future-value-${idx}`).innerHTML;
    const currentValuePredictor = document.getElementById(`current-value-predictor-${idx}`).innerHTML;
    const resultPercentageChange = ((parseFloat(futureValuePredictor) - parseFloat(currentValuePredictor)) / parseFloat(currentValuePredictor)) * 100;
    document.getElementById(`percentage-change-${idx}`).innerHTML = resultPercentageChange.toFixed(2);
  }
}
/**
 * function used to add row to my portfolio table
 * inputting the same input fields as prevous row.
 */

function addCoinPortfolio() {
  const currentRowCount = document.getElementById("portfolio-table").rows.length;
  const myPortfolioTable = document.getElementById("portfolio-table");
  // Append a new row to body
  let newRow = myPortfolioTable.insertRow(currentRowCount);
  newRow.className = "data-row-port";

  // Append column 1
  let coinToken = newRow.insertCell(0);
  coinToken.innerHTML = `<input id="coin-token-port-${currentRowCount}" class="form-input"  placeholder="Select a Coin/Token" type="text" list="coins" oninput="onCurrencySelect(${currentRowCount})"/>`;
  // Append column 2
  let coinCurrentPrice = newRow.insertCell(1);
  coinCurrentPrice.className = "dollars current-total-value";
  coinCurrentPrice.id = `current-price-${currentRowCount}`;
  // Append column 3
  let tokenCount = newRow.insertCell(2);
  tokenCount.innerHTML = `<input id="my-amount-input-${currentRowCount}" class="form-input" placeholder="Enter No of Coins/Tokens" type="number" min="0" />`;
  // Append column 4
  let totalValueCoin = newRow.insertCell(3);
  totalValueCoin.className = "dollars";
  totalValueCoin.id = `current-value-${currentRowCount}`;
  // Append column 5
  let coinPortfolioValue = newRow.insertCell(4);
  coinPortfolioValue.id = `port-value-${currentRowCount}`;
  coinPortfolioValue.className = "percentage";
}
/**
 * function used to add row to my predictor table
 * inputting the same input fields as prevous row.
 */
function addCoinPred() {
  const currentRowCountPred = document.getElementById("predictor-table").rows.length;
  const myPredictorTable = document.getElementById("predictor-table");
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
  tokenCountPred.innerHTML = `<input id="my-amount-input-pred-${currentRowCountPred}" class="form-input" placeholder="Enter No of Coins/Tokens" type="number" min="0" />`;
  // Append column 4
  let totalValueCoinPred = newRowPred.insertCell(3);
  totalValueCoinPred.className = "dollars";
  totalValueCoinPred.id = `current-value-predictor-${currentRowCountPred}`;
  // Append column 5
  let coinFutureValue = newRowPred.insertCell(4);
  coinFutureValue.className = "dollars";
  coinFutureValue.innerHTML = `<input id="future-price-input-${currentRowCountPred}" class="form-input" placeholder="Enter future Price" type="number" min="0" />`;
  // Append column 6
  let coinFutureValueTotal = newRowPred.insertCell(5);
  coinFutureValueTotal.className = "dollars";
  coinFutureValueTotal.id = `future-value-${currentRowCountPred}`;
  // Append column 7
  let coinPercentageChange = newRowPred.insertCell(6);
  coinPercentageChange.id = `percentage-change-${currentRowCountPred}`;
  coinPercentageChange.className = "percentage";
}
