import { Component, OnInit } from "@angular/core";
import { Sale } from "src/app/models/sale.model";
import { FirestoreService } from "src/app/services/firestore.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  sales: Sale[];

  constructor(private fs: FirestoreService) {}

  ngOnInit() {
    this.fs.getAll("sales").subscribe(data => {
      this.sales = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Sale;
      });
    });
  }
}
