// Código para gerar os dados e exibir o gráfico
// Por Pedro Pereira & Juliano Garcia, IME-USP
/*Control variables:
 * updateInterval (miliseconds to update the data)
 * dataLength (initial number of tries displayed in the graph)
 */
 // Auxiliar functions to convert colors
 function rgbToHex(R,G,B) {return toHex(R)+toHex(G)+toHex(B)}

 // Convert number to a RGB value (between 0 and 255)
 function toHex(n) {
  //Separate the number in two digits
  n = parseInt(n,10);
  if (isNaN(n)) return "00";
  n = Math.max(0,Math.min(n,255));
  //Using mod to get the right character in the position
  return "0123456789ABCDEF".charAt((n-n%16)/16)
       + "0123456789ABCDEF".charAt(n%16);
 }

window.onload = function () {
    var flag = false;
    var randInt1 =MRG32k3a().uint32;
    console.log(1+randInt1()%6);
    $( "#redS" ).slider({
        orientation: "horizontal",
        max : 200,
        min : 1,
        value:30,
        range: "min",
        start: stopGraph,
        stop: addDataPointsAndRender,
        slide: refreshBkg,
        change: refreshBkg

    });
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
      //Time interval
      var updateInterval = 201 - $( "#redS" ).slider("value");
      /* ---Desvios---
       * MRG32k3a = 0.0008961519541594268 | 0.000798489405440844 | 0.0008644396968574041
       * KISS07 = 0.0007846344364230665 | 0.0005626272316698236 | 0.0009459454931575798
       * Kybos = 0.0011625152125679893 | 0.0009636965703402947 | 0.0013364640777434038 *BEM LIXO
       * LFib = 0.0006664579270579404 | 0.0005714188146330138 | 0.0015376604648969865
       * LFIB4 = 0.0009912363003575161 | 0.0009892226135640022 | 0.000995251451175317
       * Alea = 0.0005696713523923849 | 0.0010072008711408743 | 0.0007782551888171341
       */
      var updateChart = function (count) {
        if (xVal > nHTML) {
            console.log("--------TERMINOU!-------");
            console.log("Face 1 = "+dFreqs[0]/xVal);
            console.log("Face 2 = "+dFreqs[1]/xVal);
            console.log("Face 3 = "+dFreqs[2]/xVal);
            console.log("Face 4 = "+dFreqs[3]/xVal);
            console.log("Face 5 = "+dFreqs[4]/xVal);
            console.log("Face 6 = "+dFreqs[5]/xVal);
            var variancia = 0;
            for (var i = 0; i < dFreqs.length; i++) {
                variancia += Math.pow(((dFreqs[i]/xVal) - 0.16666666666),2);
            }
            variancia = variancia/xVal;
            console.log("Desvio Padrao: "+Math.sqrt(variancia));
          clearInterval(graphInterval);
      }
          count = count || 1;
          // count is number of times loop runs to generate random dataPoints.
          for (var j = 0; j < count; j++) {
              var rnd = 1+randInt1()%6;
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
    // Refresh the background-color of the slider
    function refreshBkg() {
      var color = $( "#redS" ).slider("value");
      /* -> color slider transition!*/
      if(color<100)
        hex = rgbToHex(0,Math.ceil(6.375*color-382.5),Math.ceil(-2.55*color+255));
      else
        hex = rgbToHex(Math.ceil(2.55*color-255), Math.ceil(-5.375*color+892,5),0);

      $( "#redS .ui-slider-range" ).css( "background-color", "#" + hex );
    }
    // Start or Stop the graph, and set the correct text in the button
    function startOrStop() {
        var bText = flag ? 'Stop' : 'Restart';
        if (flag)
            addDataPointsAndRender();
        else
            stopGraph();
        $("#startStopButton").html(bText);
        flag = !flag;
    }
    // If key is "Enter", then executes the code
    function proccessInput(key) {
        if(key.keyCode == 13){
            stopGraph();
            addDataPointsAndRender();
        }
    }
    var renderButton = document.getElementById("renderButton");
    var dLengthButton = document.getElementById("dLengthButton");
    var maxNButton = document.getElementById("numberX");
    var startNButton = document.getElementById("numberL");
    var sliderHolder = document.getElementById("slider");
    var startStopButton =  document.getElementById("startStopButton");
    renderButton.addEventListener("click", addDataPointsAndRender);
    dLengthButton.addEventListener("click", addDataPointsAndRender);
    startNButton.addEventListener("keydown",proccessInput);
    maxNButton.addEventListener("keydown",proccessInput);
    startStopButton.addEventListener("click", startOrStop);

}
function stopGraph() {
    clearInterval(graphInterval);
}
