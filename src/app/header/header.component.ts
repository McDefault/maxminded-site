import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  collapsed = true;
  //Listen from parent component
  @Output() public featureSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  public onSelect(feature: string) {
    this.featureSelected.emit(feature)
  }

  ngOnInit(): void {
  }

}
