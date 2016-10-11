// Código para gerar os dados e exibir o gráfico
// Por Pedro Pereira & Juliano Garcia, IME-USP
/*Control variables:
 * updateInterval (miliseconds to update the data)
 * dataLength (initial number of tries displayed in the graph)
 */
window.onload = function () {
  function addDataPointsAndRender() {
      nHTML =  Number(document.getElementById("numberX").value);
      dataLength = Number(document.getElementById("numberL").value);
      if(isNaN(nHTML) || isNaN(dataLength)) {
        alert("ERROR: You must provide an Integer number!")
        return;
    }
      if(!nHTML)
        nHTML = 1000;
      if(!dataLength)
        dataLength = 10; // number of dataPoints visible at any point
      // Data points matrix :
      // dtp[0]=side 1, dtp[1]=side 2, dtp[2]=side 3, dtp[3]=side 4, dtp[4]=side 5, dtp[5]=side 6
      var dtp =[[], [], [], [], [], []]
      var realProb = []
      // Data frequency matrix
      var dFreqs = [[0], [0], [0], [0], [0], [0]]
      var chart = new CanvasJS.Chart("chartContainer",{
          title :{
              text: ""
          },
          axisY: {
              maximum: 1
          },
          axisX: {
            minimum: 1,
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
          },
          {
            type: "line",
            color: "black",
            markerType: "none",
            legendText: "Real probability (1/6)",
            name: "Real Probability",
            showInLegend: true,
            dataPoints: realProb,
          }
      ]
      });
      var xVal = 1;
      // These are the entry
      var updateInterval = 10;

      var updateChart = function (count) {
        if (xVal > nHTML)
          clearInterval(graphInterval);

          count = count || 1;
          // count is number of times loop runs to generate random dataPoints.
          for (var j = 0; j < count; j++) {
              var rnd = Math.ceil(Math.random() * 6);
              dFreqs[rnd-1] ++;
              for(var i = 0; i < 6; i++) {
                  dtp[i].push({
                      x: xVal,
                      y: dFreqs[i]/xVal
                  });

              }
              realProb.push({
                x: xVal,
                y: 1.0/6,//Parsing to float
              });
              xVal++;
          };
          chart.render();
      };

      // generates first set of dataPoints
      updateChart(dataLength);

      // update chart after specified time.
      graphInterval = setInterval(function(){updateChart()}, updateInterval);
  }
    addDataPointsAndRender();
    var renderButton = document.getElementById("renderButton");
    var dLengthButton = document.getElementById("dLengthButton");
    var runInput = document.getElementById("numberX");
    var runInput2 = document.getElementById("numberL");
    renderButton.addEventListener("click", addDataPointsAndRender);
    dLengthButton.addEventListener("click", addDataPointsAndRender);
    runInput.addEventListener("keydown",function(key) {
        if(key.keyCode == 13){
          stopGraph();
          addDataPointsAndRender();
        }
    });
}


function stopGraph() {
    clearInterval(graphInterval);
}
