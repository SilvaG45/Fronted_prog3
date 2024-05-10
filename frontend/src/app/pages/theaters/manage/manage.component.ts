import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Theater } from "src/app/models/theater.model";
import { TheaterService } from "src/app/services/theater.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number; // 1->view, 2->Create, 3->Update
  theater: Theater;
  theFormGroup: FormGroup;
  trysend: boolean;
  constructor(
    private activateRoute: ActivatedRoute,
    private service: TheaterService, //se borro el formbuilder
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.trysend = false;
    this.mode = 1;
    this.theater = {
      id: 0,
      capacity: 0,
      location: "",
    };
    this.configFormGroup();
  }
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      capacity: [
        0,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      location: ["", [Validators.required, Validators.minLength(2)]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  //   getTheaterData(){
  //     this.theater.capacity = this.getTheFormGroup.capacity.value;
  //     this.theater.location = this.getTheFormGroup.location.value;
  //   }
  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join("/");

    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.theater.id = this.activateRoute.snapshot.params.id;
      this.getTheater(this.theater.id);
    }
  }
  getTheater(id: number) {
    this.service.view(id).subscribe((data) => {
      this.theater = data;
    });
  }
  create() {
    if (this.theFormGroup.invalid) {
      this.trysend = true;
      Swal.fire(
        "Error en el formulario",
        "Ingrese correctamente los datos solicitados",
        "error"
      );
      return;
    }
    this.service.create(this.theater).subscribe((data) => {
      Swal.fire(
        "Creación Exitosa",
        "Se ha creado un nuevo registro",
        "success"
      );
      this.router.navigate(["theaters/list"]);
    });
  }
  update() {
    if (this.theFormGroup.invalid) {
      this.trysend = true;
      Swal.fire(
        "Error en el formulario",
        "Ingrese correctamente los datos solicitados",
        "error"
      );
      return;
    }
    this.service.update(this.theater).subscribe((data) => {
      Swal.fire(
        "Actualización Exitosa",
        "Se ha actualizado un nuevo registro",
        "success"
      );
      this.router.navigate(["theaters/list"]);
    });
  }
}
