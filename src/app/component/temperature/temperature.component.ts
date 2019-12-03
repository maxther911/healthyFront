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
  private id: string;
  temp: number = 0;

  constructor(private _sensors: SensorsService, private _user: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this._sensors.getDataSensorsById(this.id);
    this._sensors.getDiagnosticById(this.id);
    let dataPoints = [];
    let dataTempsPoints = [];
    let ambientDataPoint = [];
    let diseasesDataPoints = [];
    let sisDataPoints = [];
    let oximeterDataPoints = [];
    let diasDataPoints = [];
    let dpsLength = 0;
    let ambientTemp = 0;
    let htaTemp = 1;
    let corporalTemp = 0;
    let oximeterTemp = 0;
    let y = 0;

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

    let ambChart = new CanvasJS.Chart("chartAmbientContainer", {
      exportEnabled: true,
      data: [{
        type: "spline",
        dataPoints: ambientDataPoint,
      }]
    });

    //TODO HTA Chart
    let htaChart = new CanvasJS.Chart("htaChartContainer", {
      animationEnabled: true,

      axisX: {},
      axisY: {
        title: "HTA (in MMHg)",
        includeZero: false,
        suffix: " °MMHg"
      },
      legend: {
        cursor: "pointer",
        fontSize: 16,
        itemclick: toggleDataSeries
      },
      toolTip: {
        shared: true
      },
      data: [{
        name: "Sistole",
        type: "spline",
        yValueFormatString: "#0.## °C",
        showInLegend: true,
        dataPoints: diasDataPoints
      },
        {
          name: "Diastole",
          type: "spline",
          yValueFormatString: "#0.## °C",
          showInLegend: true,
          dataPoints: sisDataPoints
        }]
    });

    function toggleDataSeries(e) {
      if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      htaChart.render();
    }

    // TODO fin HTA Chart

    $.getJSON('http://localhost:9002/healthyDataService/third/sensors/getInformationById/' + this.id, function (data) {
      $.each(data, function (key, value) {
        $.each(value.quantities, function (index, value) {
          switch (value.group.code) {
            case 17:
              htaTemp = htaTemp + 1;
              let data = value.value.split('-');
              sisDataPoints.push({x: htaTemp, y: parseInt(data[0])});
              diasDataPoints.push({x: htaTemp, y: parseInt(data[1])});
              break;
            case 19:
              ambientTemp = ambientTemp + 1;
              ambientDataPoint.push({x: ambientTemp, y: parseInt(value.value)});
              break;
            case 20:
              corporalTemp = corporalTemp + 1;
              dataPoints.push({x: corporalTemp, y: parseInt(value.value)});
              break;
            case 21:
              oximeterTemp = oximeterTemp + 1;
              oximeterDataPoints
              break;
            default:
              //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
              break;
          }
        });

      });
      chart.render();
      ambChart.render();
      htaChart.render();
      chartTemp.render();
    });

    function updateChart() {

      $.getJSON('http://localhost:9002/healthyDataService/third/sensors/getInformationById/' + this.id, function (data) {
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
          //updateChart()
        }, 5000);
      });
    }

    let pieChart = new CanvasJS.Chart("pieChartContainer", {
      animationEnabled: true,
      data: [{
        type: "doughnut",
        startAngle: 60,
        //innerRadius: 60,
        indexLabelFontSize: 17,
        indexLabel: "{label} - #percent%",
        toolTipContent: "<b>{label}:</b> {y} (#percent%)",
        dataPoints: diseasesDataPoints,
        click: function (e) {
          window.location.replace("/data");
        },
      }]
    });

    $.getJSON(this.env.sensorsDataUrl + this.env.userUri + this.env.get + this.id, function (data) {
      $.each(data.diagnostic.diseases, function (key, value) {
        diseasesDataPoints.push({
          y: value.risk,
          label: value.code
        });
      });
      pieChart.render();
    });


  }


}
