import { Component, OnInit } from '@angular/core';
import { ClinicaService } from '../../service/clinica.service';
import { Clinica } from '../../model/Clinica';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal implements OnInit {

  clinicas: Clinica[] = [];

  nuevaClinica: Clinica = {
    name: '',
    direccion: '',
    cantidad_camaras: 0,
    telefono: 0,
    ciudad: '',
    fecha_creacion: new Date(),
    status: 'active'
  };

  constructor(private clinicaService: ClinicaService) {}

  ngOnInit(): void {
  this.clinicaService.list().subscribe((data: Clinica[]) => {
    this.clinicas = data;
  });
}


  crearClinica(): void {
    this.clinicaService.create(this.nuevaClinica).subscribe(() => {
      this.nuevaClinica = {
        name: '',
        direccion: '',
        cantidad_camaras: 0,
        telefono: 0,
        ciudad: '',
        fecha_creacion: new Date(),
        status: 'active'
      };
    });
  }
}
