import {Component, OnInit} from '@angular/core';
import {LoginService, UserService} from "../../_services";
import * as CanvasJS from "../../../assets/js/canvasjs.min";
import {User} from "../../_models";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  n = 0;
  private users: User[];

  constructor(private _user: UserService, private _login: LoginService) {
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

    for (let o of this._user.users) {
      let i = 0;
      $(function () {

        var pieChart = new CanvasJS.Chart("pieChartContainer" + o.id, {
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
        try {
          pieChart.render();
          console.log(o)
          console.log(i)
          i = i+ 1
        } catch (Error) {
          console.warn(Error.message)
        }
      });
    }
  }


}
