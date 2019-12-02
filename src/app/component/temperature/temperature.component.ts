import {Component, OnInit} from '@angular/core';
import {SensorsService, UserService} from "../../_services";
import * as $ from 'jquery';
import * as CanvasJS from '../../../assets/js/canvasjs.min.js';
import {environment} from "../../../environments/environment";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {
  private env = environment;
  private id : string;
  temp: number = 0;

  constructor(private _sensors: SensorsService, private _user: UserService,
              private route : ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this._sensors.getDataSensorsById(this.id);
    let dataPoints = [];
    let dataTempsPoints = [];
    let dpsLength = 0;
    let tempIndex = 0;
    let y = 0;
    if (this._sensors.dataSensors && this._sensors.dataSensors.length > 0) {

    }

    let chart = new CanvasJS.Chart("chartContainer", {
      exportEnabled: true,
      data: [{
        type: "spline",
        dataPoints: dataPoints,
      }]
    });

    let chartTemp = new CanvasJS.Chart("chartTempContainer", {
      exportEnabled: true,
      data: [{
        type: "spline",
        dataPoints: dataTempsPoints,
      }]
    });


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

    // @ts-ignore
    $.getJSON(this.env.sensorsDataUrl + this.env.third + this.env.sensors + this.env.getInformationById + this.id, function (data) {
      $.each(data, function (key, value) {
        $.each(value.quantities, function (index, value) {
          tempIndex = tempIndex + 1;
          dataTempsPoints.push({
            x: tempIndex,
            y: value.value
          });
          dpsLength++;
        });
      });
      chartTemp.render();
    })

    var pieChart = new CanvasJS.Chart("pieChartContainer", {
      animationEnabled: true,
      data: [{
        type: "doughnut",
        startAngle: 60,
        //innerRadius: 60,
        indexLabelFontSize: 17,
        indexLabel: "{label} - #percent%",
        toolTipContent: "<b>{label}:</b> {y} (#percent%)",
        dataPoints: [
          {y: 67, label: "HTA"},
          {y: 28, label: "Infarto"},
          {y: 10, label: "TEP"},
          {y: 7, label: "Normal"},
          {y: 15, label: "Trash"},
          {y: 6, label: "Spam"}
        ],
        click: function (e) {
          window.location.replace("/data");
        },
      }]
    });
    pieChart.render();
  }
}
