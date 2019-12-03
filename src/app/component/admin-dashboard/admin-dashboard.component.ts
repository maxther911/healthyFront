import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AlertService, LoginService, UserService} from "../../_services";
import {Router} from "@angular/router";
import * as CanvasJS from "../../../assets/js/canvasjs.min";
import {User} from "../../_models";
import {environment} from "../../../environments/environment";
import * as $ from "jquery";

class DataPoint {
  y: number;
  label: string
}


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  n = 0;
  private env = environment;
  private users: User[];

  @Output() emit = new EventEmitter<User>();
  private diseasesDataPoint = [];

  constructor(
    private _user: UserService,
    private _login: LoginService,
    private alert: AlertService,
    private _router: Router) {
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
      let diseasesDataPoint = [];
      $(function () {

        $.getJSON('http://localhost:9002/healthyDataService/' + 'users/' + 'get/' + o.id, function (data) {
          $.each(data.diagnostic.diseases, function (key, value) {
            diseasesDataPoint.push({
              y: value.risk,
              label: value.code
            });
          });
          let pieChart = new CanvasJS.Chart("pieChartContainer" + o.id, {
            animationEnabled: true,
            data: [{
              type: "doughnut",
              startAngle: 60,
              //innerRadius: 60,
              indexLabelFontSize: 17,
              indexLabel: "{label} - #percent%",
              toolTipContent: "<b>{label}:</b> {y} (#percent%)",
              dataPoints: diseasesDataPoint,
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
      });
    }
  }


  showMore(user: User) {
    console.log('Selected User: ' + user.id);
    this._router.navigate(['/dashboard', {id: user.id}]);
  }

  contact(user: User) {
    if (!user.contact) {
      this.alert.error("Paciente no cuenta con contacto registrado.")
    }
  }

  calculateRisk(r: number) {
    if (r > 0 && r <= 5) {
      return "Bajo"
    } else if (r > 5 && r < 8) {
      return "Medio"
    } else {
      return "Alto"
    }
  }
}
