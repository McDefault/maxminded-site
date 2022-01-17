import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private subscriptionUser: Subscription;
  collapsed = true;
  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) { }
  ngOnInit(): void {
    this.subscriptionUser = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    })
  }

  ngOnDestroy(): void {
    this.subscriptionUser.unsubscribe();
  }

  onClickSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onCLickFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }


  onClickLogout() {
    this.authService.logout();
  }
}
