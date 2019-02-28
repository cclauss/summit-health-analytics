
function updateGraph(chartLabels, chartData, dataLabel) {
    document.getElementById("myChart").remove();
    var chartDiv = document.getElementById("chart");
    var newCanvas = document.createElement('canvas');
    newCanvas.setAttribute('id','myChart');
    newCanvas.setAttribute('width','500px');
    newCanvas.setAttribute('height','500px');
    chartDiv.appendChild(newCanvas);
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartLabels,
            datasets: [{
                label: dataLabel,
                data: chartData,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}

function updateStats(dataType, data, allergy, dataValueType) {
    var titleDiv = document.getElementById('statTitle');
    var minDiv = document.getElementById('min');
    var maxDiv = document.getElementById('max');
    var meanDiv = document.getElementById('mean');

    switch (dataType) {
        case "population":
            titleDiv.innerHTML = "Population stats";

            switch (dataValueType) {
                case "total":  
                    minDiv.innerHTML = "Min: " + data.populationStats.min.population + " (" + data.populationStats.min.city + ")";
                    maxDiv.innerHTML = "Max: " + data.populationStats.max.population + " (" + data.populationStats.max.city + ")";
                    meanDiv.innerHTML = "Mean: " + data.populationStats.mean;
                    break;
                case "percentage":
                    minDiv.innerHTML = "Min: " + data.populationStats.min.percentage*100 + "% (" + data.populationStats.min.city + ")";
                    maxDiv.innerHTML = "Max: " + data.populationStats.max.percentage*100 + "% (" + data.populationStats.max.city + ")";
                    meanDiv.innerHTML = "Mean: " + (1/data.populationStats.cities.length)*100 + "%";
                    break;
                default:
            }
            break;
        case "type":
            titleDiv.innerHTML = "Allergy stats for cities with " + allergy + " allergy";

            for (let i = 0; i < data.allergyStats.stats.developed.length; i++) {
                if (allergy == data.allergyStats.stats.developed[i].allergy) {
                    minDiv.innerHTML = "Min: " + data.allergyStats.stats.developed[i].min.min + " (" + data.allergyStats.stats.developed[i].min.city + ")";
                    maxDiv.innerHTML = "Max: " + data.allergyStats.stats.developed[i].max.max + " (" + data.allergyStats.stats.developed[i].max.city + ")";
                    meanDiv.innerHTML = "Mean: " + data.allergyStats.stats.developed[i].mean;
                }
            }

            break;
        case "outgrown":
            titleDiv.innerHTML = "Outgrowing allergy stats for cities with " + allergy + " allergy";
            
            for (let i = 0; i < data.allergyStats.stats.outgrown.length; i++) {
                if (allergy == data.allergyStats.stats.outgrown[i].allergy) {
                    minDiv.innerHTML = "Min: " + data.allergyStats.stats.outgrown[i].min.min + " (" + data.allergyStats.stats.outgrown[i].min.city + ")";
                    maxDiv.innerHTML = "Max: " + data.allergyStats.stats.outgrown[i].max.max + " (" + data.allergyStats.stats.outgrown[i].max.city + ")";
                    meanDiv.innerHTML = "Mean: " + data.allergyStats.stats.outgrown[i].mean;
                }
            }

            break;
        default:
    }
}