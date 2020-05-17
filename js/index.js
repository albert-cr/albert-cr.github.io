const canvas = document.getElementById('myCanvas');
const ctx0 = canvas.getContext('2d');

const myCanvas1 = document.getElementById('myCanvas2');
const ctx1 = myCanvas1.getContext('2d');

var chart0 = new Chart(ctx0, {
    type: 'doughnut',
    data: {},
    options: {},
});

var chart1 = new Chart(ctx1, {
    type: 'doughnut',
    data: {},
    options: {},
});

var chartArray = [chart0, chart1];
var ctxArray = [ctx0, ctx1];

window.onload = init

function init() {
    configure();
    getCarteraExample();
}

function getCarteraExample() {
    var fileName = "exampleCartera.json";
    var request = new XMLHttpRequest();
    request.open("GET", fileName);
    request.onload = function() {
        if (request.status == 200) {
            var cartera = JSON.parse(request.responseText);
            drawCartera(cartera.Cartera);
        }
    };      
    request.send(null);
}

function drawCartera(carteraArray) {
    var simplerCarteraArray = filterCarteraResults(carteraArray);
    var tickers = getArrayOfTickers(simplerCarteraArray);
    
    var amounts = getArrayOfAmounts(simplerCarteraArray);
    var totalAmount = roundToTwo(sumElements(amounts));
    var amountsPercentage = getArrayPercentage(amounts, totalAmount);
    generateChart(tickers, amountsPercentage, 0, "Cartera % Inversion inicial");

    var actualValues = getArrayOfActualValue(simplerCarteraArray);
    var totalValue = roundToTwo(sumElements(actualValues));
    var valuesPercentage = getArrayPercentage(actualValues, totalValue);
    generateChart(tickers, valuesPercentage, 1, "Cartera % valor actual");

}

function getArrayOfTickers(cartera) {
    var values =  new Array();
    for(empresa of cartera) {
        values.push(empresa.Ticker);
    }
    return values;
}

function getArrayOfAmounts(cartera) {
    var values =  new Array();
    for(empresa of cartera) {
        values.push(Number(empresa.Inversio));
    }
    return values;
}

function getArrayOfActualValue(cartera) {
    var values =  new Array();
    for(empresa of cartera) {
        var actualValue = empresa.Titols * empresa.PreuEur
        values.push(Number(actualValue));
    }
    return values;
}

function getArrayPercentage(amounts, total) {
    var amountsPercentage = new Array();
    for (amount of amounts) {
        amountsPercentage.push(roundToTwo(amount/total*100));
    }
    return amountsPercentage;
}

function filterCarteraResults(carteraArray) {
    var filteredCartera =  new Array();
    for(empresa of carteraArray) {
        if (empresa.Ticker && empresa.Titols && empresa.Inversio) {
            filteredCartera.push(empresa);
        }
    }
    return filteredCartera;
}

function getTotalAmount(carteraArray) {
    for(empresa of carteraArray) {
        if (empresa.Ticker === "Total") {
            return empresa.Inversio;
        }
    }
}

function sumElements(amounts) {
    var total = 0;
    for(amount of amounts) {
        total += amount;
    }
    return total;
}

function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}
