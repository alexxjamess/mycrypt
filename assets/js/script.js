/* 
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getElementById('calculate-port'))
                calculateCurrentValue();
            if (this.getElementById('add-coin'))
                addCoin()
            } else {
            
            }
        });
    }

/**
 * If calculate button is clicked this will run a function
 * to calcualte current value by multipying current price and the users inputed amount
 */
/*
 function calculateCurrentValue() {

    let currentPrice =(document.getElementById('current-price1').innerHTML);
    let myAmount =(document.getElementById('my-amount').innerHTML);
    let currentValue =(document.getElementbById('current-value1').innerHTML)
   
    if (myAmount => 0) {
        return currentValue.innerHTML= [currentPrice * myAmount];
    
    } else {
        alert('Please Enter a Value Greater Than Zero');
        throw 'Please Enter a Value Greater Than Zero';
    };
 }
 
/**
* If Add Coin button is pressed this will add a row
* to table as above
*/

function calculateCurrentValue(){
    currentPrice =document.getElementById('current-price1').value;
    myAmount =document.getElementById('my-amount-input').value;
	result = currentPrice * myAmount;
	document.getElementById("current-value1").value = result
}

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