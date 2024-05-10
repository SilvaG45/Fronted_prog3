import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { log } from "console";
import { Theater } from "src/app/models/theater.model";
import { TheaterService } from "src/app/services/theater.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  theaters: Theater[];
  constructor(private service: TheaterService, private router: Router) {
    this.theaters = [];
  }

  ngOnInit(): void {
    this.list();
  }
  view(id: number) {
    this.router.navigate(["theaters/view/" + id]);
  }
  create() {
    this.router.navigate(["theaters/create"]);
  }
  update(id: number) {
    this.router.navigate(["theaters/update/" + id]);
  }
  list() {
    this.service.list().subscribe((data) => {
      this.theaters = data;
    });
  }
  delete(id: number) {
    Swal.fire({
      title: "Eliminar Teatro",
      text: "Está seguro que quiere eliminar el Teatro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe((data) => {
          Swal.fire(
            "Eliminado!",
            "El Teatro ha sido eliminado correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
