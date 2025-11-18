import { Doctores } from "./Doctores";

export interface Clinica {
  id?: number;
  name: string;
  direccion: string;
  cantidad_camaras: number;
  telefono: number;
  ciudad: string;
  fecha_creacion: Date;
  doctores?: Doctores;
  status: string;
}
