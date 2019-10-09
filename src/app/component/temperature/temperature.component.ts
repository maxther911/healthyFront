import { Component, OnInit } from '@angular/core';
import {SensorsService} from "../../_services";
import * as $ from 'jquery';
import * as CanvasJS from '../../../assets/js/canvasjs.min.js';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {

  constructor(private _sensors: SensorsService) {
  }

  ngOnInit() {
    this._sensors.getDataSensorsById();
    let dataPoints = [];
    let dpsLength = 0;
    let chart = new CanvasJS.Chart("chartContainer", {
      exportEnabled: true,
      title: {
        text: ""
      },
      data: [{
        type: "spline",
        dataPoints: dataPoints,
      }]
    });

    var pieChart = new CanvasJS.Chart("pieChartContainer", {
      animationEnabled: true,
      title:{
        text: "Email Categories",
        horizontalAlign: "left"
      },
      data: [{
        type: "doughnut",
        startAngle: 60,
        //innerRadius: 60,
        indexLabelFontSize: 17,
        indexLabel: "{label} - #percent%",
        toolTipContent: "<b>{label}:</b> {y} (#percent%)",
        dataPoints: [
          { y: 67, label: "Inbox" },
          { y: 28, label: "Archives" },
          { y: 10, label: "Labels" },
          { y: 7, label: "Drafts"},
          { y: 15, label: "Trash"},
          { y: 6, label: "Spam"}
        ]
      }]
    });
    pieChart.render();

    $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=25&length=20&type=json&callback=?", function (data) {
      $.each(data, function (key, value) {
        dataPoints.push({x: value[0], y: parseInt(value[1])});
      });
      dpsLength = dataPoints.length;
      chart.render();
      updateChart();
    });

    function updateChart() {
      $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=" + (dpsLength + 1) + "&ystart=" + (dataPoints[dataPoints.length - 1].y) + "&length=1&type=json&callback=?", function (data) {
        $.each(data, function (key, value) {
          dataPoints.push({
            x: parseInt(value[0]),
            y: parseInt(value[1])
          });
          dpsLength++;
        });

        if (dataPoints.length > 20) {
          dataPoints.shift();
        }
        chart.render();
        setTimeout(function () {
          updateChart()
        }, 5000);
      });
    }

  }
}
