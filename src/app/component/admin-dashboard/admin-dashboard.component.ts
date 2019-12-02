import {Component, OnInit} from '@angular/core';
import {LoginService, UserService} from "../../_services";
import * as CanvasJS from "../../../assets/js/canvasjs.min";
import {User} from "../../_models";
import {DatePipe} from "@angular/common";
import {environment} from "../../../environments/environment";
import * as $ from "jquery";

class DataPoint{y: number; label: string}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  n = 0;
  private env = environment;
  private users: User[];

  constructor(private _user: UserService, private _login: LoginService, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this._login.checkCredentials();
    this._user.checkTokenValidity();

    this._user.getAll().subscribe((res: any) => {
        this._user.users = res;
        this.printPie()
      },
      (error: any) => {
        error.error || 'Server error'
      });
  }

  async sleep(msec) {
    console.log("Waiting done."); // Called 1 second after the first console.log
  }

  async printPie() {
    await this.sleep(5000);
    console.log("Continue."); // Called 1 second after the first console.log
    let dataTempsPoints = [];

    for (let o of this._user.users) {
      let i = 0;
      $(function () {
        // @ts-ignore
        $.getJSON('http://ec2-18-191-27-226.us-east-2.compute.amazonaws.com:8080/healthyDataService/third/sensors/getInformationById/' + o.id, function (data) {
          $.each(data, function (key, value) {
            $.each(value.quantities, function (index, value) {
              dataTempsPoints.push({
                x: value.group.description,
                y: value.value
              });
            });
          });
        });

        var pieChart = new CanvasJS.Chart("pieChartContainer" + o.id, {
          animationEnabled: true,
          data: [{
            type: "doughnut",
            startAngle: 60,
            //innerRadius: 60,
            indexLabelFontSize: 17,
            indexLabel: "{label} - #percent%",
            toolTipContent: "<b>{label}:</b> {y} (#percent%)",
            dataPoints: dataTempsPoints,
            click: function (e) {
              window.location.replace("/data");
            },
          }]
        });
        try {
          pieChart.render();
        } catch (Error) {
          console.warn(Error.message)
        }
      });
    }
  }


  calculateAge(birthDate: Date) {
    console.log(birthDate);
    if (birthDate) {
      var timeDiff = Math.abs(new Date(birthDate).getTime() - Date.now());
      return Math.ceil((timeDiff / (1000 * 3600 * 24)) / 365);
    }
  }

  calculateRisk(r: number) {
      if(r > 0 && r <= 5 ){
        return "Bajo"
      }else if(r > 5 && r < 8 ){
        return "Medio"
      }else{
        return "Alto"
      }
  }
}
