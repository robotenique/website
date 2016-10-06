// Código para gerar os dados e exibir o gráfico
// Por Pedro Pereira & Juliano Garcia, IME-USP
/*Control variables:
 * updateInterval (miliseconds to update the data)
 * dataLength (initial number of tries displayed in the graph)
 */
window.onload = function () {
    // Data points matrix :
    // dtp[0]=side 1, dtp[1]=side 2, dtp[2]=side 3, dtp[3]=side 4, dtp[4]=side 5, dtp[5]=side 6
    var dtp =[[], [], [], [], [], []]
    // Data frequency matrix
    var dFreqs = [[0], [0], [0], [0], [0], [0]]
    var chart = new CanvasJS.Chart("chartContainer",{
        title :{
            text: "Great numbers law"
        },
        axisY: {
            maximum: 1
        },
        data: [{
            type: "line",
            dataPoints: dtp[0],
        },
        {
            type: "line",
            dataPoints: dtp[1],
        },
        {
            type: "line",
            dataPoints: dtp[2],
        },
        {
            type: "line",
            dataPoints: dtp[3],
        },
        {
            type: "line",
            dataPoints: dtp[4],
        },
        {
            type: "line",
            dataPoints: dtp[5],
        }
    ]
    });
    var xVal = 1;
    // These are the entry
    var updateInterval = 10;
    var dataLength = 10; // number of dataPoints visible at any point

    var updateChart = function (count) {
        count = count || 1;
        // count is number of times loop runs to generate random dataPoints.
        for (var j = 0; j < count; j++) {
            var rnd = Math.floor(Math.random() * 6 + 1);
            dFreqs[rnd-1] ++;
            for(var i = 0; i < 6; i++) {
                dtp[i].push({
                    x: xVal,
                    y: dFreqs[i]/xVal
                });

            }
            xVal++;
        };


        chart.render();

    };



    // generates first set of dataPoints
    updateChart(dataLength);

    // update chart after specified time.
    graphInterval = setInterval(function(){updateChart()}, updateInterval);
}
function stopGraph() {
    clearInterval(graphInterval);
}
