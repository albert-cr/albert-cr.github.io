const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let chart = new Chart(ctx, {
    type: 'doughnut',
    data: {},
    options: {},
});

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
            drawCartera(cartera.Cartera, fileName);
        }
    };      
    request.send(null);
}

function drawCartera(carteraArray, fileName) {
    var simplerCarteraArray = filterCarteraResults(carteraArray);

    var tickers = getArrayOfTickers(simplerCarteraArray);
    var amounts = getArrayOfAmounts(simplerCarteraArray);
    var totalAmount = roundToTwo(getTotalAmount(carteraArray));

    var amountsPercentage = new Array();
    for (amount of amounts) {
        amountsPercentage.push(roundToTwo(amount/totalAmount*100));
    }
    generateCanvasGraph(tickers, amountsPercentage, fileName);
}

function generateCanvasGraph(tickers, amountsPercentage, fileName) {
    //Destroy chart before using a new one
    chart.destroy()

    var colorsPie = ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", 
    "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA", "#FF8800, #FF886B", "#FF88B9", "#FFD7B9",
    "#6DD7B9", "#6DD77F", "#6D677F"]

    var titleText = "Cartera % Inversion inicial (from " + fileName + ")";

    chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
        labels: tickers,
        datasets: [{
            backgroundColor: colorsPie,
            data: amountsPercentage
        }]
    },
    options: {
        title: {
            display: true,
            text: titleText,
            padding: 30,
            fontSize: 30,
        },
        responsive: true,
        scaleBeginAtZero: true,
        maintainAspectRatio: false,
        legend : {
            position : "left",
        },
        plugins: {
            datalabels: {
                formatter: function(value, ctx) {
                    var label = ctx.chart.data.labels[ctx.dataIndex];
        	        return label.split(":")[1] + " \n " + value + "%";
                },
                anchor: 'end',
                clamp : true,
                align : 'start',
                offset : 10,
                font: {
                    size: 12,
                    weight: 600
                },
                color: 'black',
            }
        }
    },
    });
    
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
        values.push(empresa.Inversió);
    }
    return values;
}

function filterCarteraResults(carteraArray) {
    var filteredCartera =  new Array();
    for(empresa of carteraArray) {
        if (empresa.Ticker && empresa.Títols && empresa.Inversió) {
            filteredCartera.push({
                Ticker : empresa.Ticker,
                Inversió : empresa.Inversió,
            });
        }
    }
    return filteredCartera;
}

function getTotalAmount(carteraArray) {
    for(empresa of carteraArray) {
        if (empresa.Ticker === "Total") {
            return empresa.Inversió;
        }
    }
}

function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}
