/**
 * This will find current price based on chosen item drop down list
 * this should be an API but couldnt get it to work
 */
 const API_BASE_URL = 'https://api.coingecko.com/api/v3/simple/price';
 // Defining async function
 async function makeAPICall(url) {
     // Storing response
     const response = await fetch(url);
     // Storing data in form of JSON
     let data = await response.json();
     return data;
 
 };
 async function getCurrentPriceForCurrency(currency) {
     const data = await makeAPICall(
         `${API_BASE_URL}?ids=${currency}&vs_currencies=usd`
     );
     return data[currency].usd;
 }
 async function onCurrencySelect() {
     const currency = document.getElementById('coin-token-port').value;
     const currentPrice = await getCurrentPriceForCurrency(currency);
     document.getElementById('current-price1').innerHTML = currentPrice;
 }
 /**
  * If calculate button is clicked this will run a function
  * to calcualte current value by multipying current price and the users inputed amount predictor page
  */
 async function onCurrencySelectPred() {
     const currency = document.getElementById('coin-token-pred').value;
     const currentPrice = await getCurrentPriceForCurrency(currency);
     document.getElementById('current-price').innerHTML = currentPrice;
 }
 /**
  * If calculate button is clicked this will run a function
  * to calcualte current value by multipying current price and the users inputed amount
  */
 const currentPriceRef = document.getElementById("current-price");
 const myAmountRef = document.getElementById('my-amount-input');
 
 function calculateCurrentValue() {
     const results = +currentPriceRef.value * +myAmountRef.value;
     document.getElementById('current-value1').innerHTML = results;
     console.log(results)
 };
 /**
  * Function to calculate percentage of portfolio
  * to table for my portfolio
  */
 
 /**
  * If Add Coin button is pressed this will add a row
  * to table for my portfolio
  */
 function addCoin() {
     let x = document.getElementById('portfolio-table').insertRow(2);
     let coinToken = x.insertCell(0);
     let currentPrice1 = x.insertCell(1);
     let myAmount1 = x.insertCell(2);
     let currentValue1 = x.insertCell(3);
     let percPort1 = x.insertCell(4);
     coinToken.innerHTML = document.getElementById('coins');
     currentPrice1.innerHTML = '5';
     myAmount1.innerHTML = document.getElementById('my-amount-input');
     currentValue1.innerHTML = '=Current Price * My Amount';
     percPort1.innerHTML = '';
 }
 /**
  * If Add Coin button is pressed this will add a row
  * to table for my predicotr
  */
 function addCoinPred() {
     let x = document.getElementById('predictor-table').insertRow(2);
     let coinTokenPred = x.insertCell(0);
     let currentPricePred = x.insertCell(1);
     let myAmountPred = x.insertCell(2);
     let currentValuePred = x.insertCell(3);
     let futurePrice1 = x.insertCell(4);
     let futureValue1 = x.insertCell(5);
     let percChange1 = x.insertCell(6);
     coinTokenPred.innerHTML = document.getElementById('coin-token-pred');
     currentPricePred.innerHTML = '5';
     myAmountPred.innerHTML = document.getElementById('my-amount-input-pred');
     currentValuePred.innerHTML = 'No. of Coins/Tokens * Current Price';
     futurePrice1.innerHTML = document.getElementById('future-price-input');
     futureValue1.innerHTML = '=No of Coins/Tokens * Future Price';
     percChange1.innerHTML = '=(Future Value-Current Value) / Current Value × 100';
 }
 /**
  * Function to draw chart of portfolio
  * used from Google Charts
  */
 // Load the Visualization API and the corechart package.
 google.charts.load('current', {
     packages: ['corechart']
 });
 // Set a callback to run when the Google Visualization API is loaded.
 google.charts.setOnLoadCallback(drawChart);
 // Callback that creates and populates a data table,
 // instantiates the pie chart, passes in the data and
 // draws it.
 function drawChart() {
     // Create the data table.
     let data = new google.visualization.DataTable();
     data.addColumn('string', 'Coin/Token');
     data.addColumn('number', 'Percentage');
     data.addRows([
         [
             document.getElementById('coin-token'),
             document.getElementById('current-value1'),
         ],
         ['XRP', 1],
         ['ADA', 1],
         ['ETH', 1],
         ['DOGE', 2],
     ]);
     // Set chart options
     let options = {
         title: 'My Portfolio',
         is3D: true,
         colors: ['#76ffdd', '#5eccb1', '#479985', '#2f6658', '#18332c'],
         width: 500,
         height: 400,
     };
     // Instantiate and draw our chart, passing in some options.
     let chart = new google.visualization.PieChart(
         document.getElementById('chart-div')
     );
     chart.draw(data, options);
 }
 /**
  * Function to calculate the future value of coin/token
  * Users input of Number of Coins * User Input of Future Value
  */
 function calculateFutureValue() {
     const futurePricePred = document.getElementById('future-price-input').value;
     const myAmountPred = document.getElementById('my-amount-input-pred').value
     const resultFutureValue = futurePricePred * myAmountPred;
     document.getElementById('future-value').innerHTML = resultFutureValue;
 }
 
 /**
  * function used to calculate percentage change
  * from current value to future value my predictor page
  */
 
 function calculatePercentageChange() {
     const futureValuePredictor = document.getElementById('future-value').value;
     const currentValuePredictor = document.getElementById('current-value-predictor').value
     const resultPercentageChange = ((futureValuePredictor - currentValuePredictor) / currentValuePredictor * 100);
     document.getElementById('percentage-change').innerHTML = resultPercentageChange;
     console.log(result)
 }