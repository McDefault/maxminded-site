import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'maxminded-site';
  loadedFeature = 'recipe';
  disabled;


  onNavigate(feature: string) {
    this.loadedFeature = feature;
    this.disabled=true;
  }
}
