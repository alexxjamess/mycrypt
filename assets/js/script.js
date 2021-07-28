

/**
 * This will find current price based on chosen item drop down list 
 * this should be an API but couldnt get it to work
 */
  // api url
const api_url =
"https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd";

// Defining async function
async function getapi(url) {

// Storing response
const response = await fetch(url);

// Storing data in form of JSON
var data = await response.json();
console.log(data);
if (response) {
    
}
show(data);
}
// Calling that async function
getapi(api_url);


// Function to define innerHTML for HTML table
function show(data) {

let tab = data
		
	}
	// Setting innerHTML as tab variable
	document.getElementById("current-price1").innerHTML = tab;


 




/**
 * If calculate button is clicked this will run a function
 * to calcualte current value by multipying current price and the users inputed amount
 */
 const currentPriceRef = document.querySelector("#current-price1")
 const myAmountRef = document.querySelector("#my-amount-input")

    const calculateCurrentValue = () => {
    const results = +currentPriceRef.value * +myAmountRef.value
    document.getElementById("current-value1").innerHTML = results
        
}

/**
* If Add Coin button is pressed this will add a row
* to table for my portfolio
*/

function addCoin()
{
var x=document.getElementById('portfolio-table').insertRow(2);
var coinToken = x.insertCell(0);
var currentPrice1 = x.insertCell(1);
var myAmount1 = x.insertCell(2);
var currentValue1 = x.insertCell(3);
var percPort1 = x.insertCell(4);

coinToken.innerHTML=document.getElementById("coin-token-input");
currentPrice1.innerHTML="5";
myAmount1.innerHTML=document.getElementById("my-amount-input");
currentValue1.innerHTML="=Current Price * My Amount";
percPort1.innerHTML="";

}
/**
* If Add Coin button is pressed this will add a row
* to table for my predicotr
*/
function addCoinPred()
{
var x=document.getElementById('predictor-table').insertRow(2);
var coinTokenPred = x.insertCell(0);
var currentPricePred = x.insertCell(1);
var myAmountPred = x.insertCell(2);
var currentValuePred = x.insertCell(3);
var futurePrice1 = x.insertCell(4);
var futureValue1 = x.insertCell(5);
var percChange1 = x.insertCell(6);

coinTokenPred.innerHTML=document.getElementById("coin-token-pred");
currentPricePred.innerHTML="5";
myAmountPred.innerHTML=document.getElementById("my-amount-input-pred");
currentValuePred.innerHTML="No. of Coins/Tokens * Current Price";
futurePrice1.innerHTML=document.getElementById("future-price-input");
futureValue1.innerHTML="=No of Coins/Tokens * Future Price";
percChange1.innerHTML="=(Future Value-Current Value) / Current Value × 100";

}
/**
* Function to draw chart of portfolio
* used from Google Charts 
*/
 // Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});
          
// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);
          
// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
          
// Create the data table.
    var data = new google.visualization.DataTable();
        data.addColumn('string', 'Coin/Token');
        data.addColumn('number', 'Percentage');
        data.addRows([
          [document.getElementById("coin-token"), document.getElementById("current-value1")],
          ['XRP', 1],
          ['ADA', 1],
          ['ETH', 1],
          ['DOGE', 2]
]);
          
// Set chart options
    var options = {
        'title':'My Portfolio',
        is3D:true,
        colors:['#76ffdd','#5eccb1','#479985','#2f6658','#18332c'],
        'width':500,
        'height':400};
                                 
// Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart-div'));
    chart.draw(data, options);
                }
/**
* Function to calculate the future value of coin/token
* Users input of Number of Coins * User Input of Future Value
*/
function calculateFutureValue(){
    futurePrice = document.getElementById('future-price-input').value;
    myAmountPred = document.getElementById('my-amount-input-pred').value;
	result = futurePrice * myAmountPred;
	document.getElementById("future-value").innerHTML = result
}