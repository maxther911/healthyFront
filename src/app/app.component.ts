
import { Component } from '@angular/core';

import '../assets/app.css';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
    moduleId: module.id.toString(),
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent {
  faCoffee = faCoffee;
    title = ':.:Healty';
}

