function generateChart(tickers, values, chartArrayIndex, titleText) {
    var chart = chartArray[chartArrayIndex];
    //Destroy chart before using a new one
    chart.destroy()

    var colorsPie = ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", 
    "#01FF70", "#85144b", "#F012BE", "#3D9970", "#b3ffb3", "#AAAAAA", "#FF8800, #FF886B", "#FF88B9", "#FFD7B9",
    "#6DD7B9", "#6DD77F", "#6D677F"]

    chart = new Chart(ctxArray[chartArrayIndex], {
        type: 'doughnut',
        data: {
        labels: tickers,
        datasets: [{
            backgroundColor: colorsPie,
            data: values
        }]
    },
    options: {
        title: {
            display: true,
            text: titleText,
            padding: 30,
            fontSize: 30,
        },
        maintainAspectRatio: false,
        legend : {
            position : "bottom",
        },
        plugins: {
            datalabels: {
                formatter: function(value, ctx) {
                    var label = ctx.chart.data.labels[ctx.dataIndex];
        	        return label.split(":")[1] + " \n " + value + "%";
                },
                anchor: 'end',
                align : 'start',
                offset : 10,
                font: {
                    size: 12,
                    weight: 550
                },
                color: 'black',
            }
        }
    },
    });

    updateChartArrayWithNewChartObject(chart, chartArrayIndex);
}

function updateChartArrayWithNewChartObject(chart, arrayIndex) {
    chartArray[arrayIndex] = chart;
}
