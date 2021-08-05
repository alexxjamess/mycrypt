
      /** 
      google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable
            data.addColumn("string", "Coin/Token"),
            data.addColumn("number", "Percentage"),
            data.addRows([
                [document.getElementById(`coin-token-port-${0}`).value, document.getElementById(`current-value-${1}`)],
                [document.getElementById(`coin-token-port-${1}`).value, document.getElementById(`current-value"${2}`)],
                [document.getElementById(`coin-token-port-${2}`).value, document.getElementById(`current-value"${3}`)],
                [document.getElementById(`coin-token-port-${3}`).value, document.getElementById(`current-value"${4}`)],
                [document.getElementById(`coin-token-port-${4}`).value, document.getElementById(`current-value"${5}`)],
        ]);
      

        var options = {
            title: "My Portfolio",
            is3D: true,
            colors: ["#76ffdd", "#5eccb1", "#479985", "#2f6658", "#18332c"],
            width: 500,
            height: 400,
        };

        let chart = new google.visualization.PieChart(document.getElementById("chart-div"));
        chart.draw(data, options);
      }
   */