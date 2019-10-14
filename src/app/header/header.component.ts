import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataStorageServices } from "../shared/data-storage.services";
import { authService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  constructor(
    private dataServices: DataStorageServices,
    private authService: authService
  ) {}
  isAthunticated: boolean = false;
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAthunticated = !!user;
    });
  }
  onSaveData() {
    this.dataServices.storeRecipie();
  }
  onFetchData() {
    this.dataServices.fetchData().subscribe();
  }
}
