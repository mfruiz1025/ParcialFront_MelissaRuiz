import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Clinica } from '../model/Clinica';
import { Doctores } from '../model/Doctores';

@Injectable({
  providedIn: 'root'
})

export class ClinicaService {
  private readonly httpBaseUrl = 'http://localhost:8080/api/clinicas';
  private readonly store = new BehaviorSubject<Clinica[]>([]);
  readonly list$ = this.store.asObservable();
  readonly items$ = this.list$;

  constructor(private http: HttpClient) {
    this.loadFromBackend();
  }

  // MÉTODOS DE CONSULTA
  list(): Observable<Clinica[]> { return this.list$; }
  getAll(): Observable<Clinica[]> { return this.list$; }
  getclinics(): Observable<Clinica[]> { return this.list$; }
  get(id: number): Observable<Clinica | undefined> {
    return this.list$.pipe(map(list => list.find(a => a.id === id)));
  }

  // CRUD - BACKEND
  create(payload: Omit<Clinica, 'id'>): Observable<Clinica> {
    return this.http.post<Clinica>(this.httpBaseUrl, payload).pipe(
      tap(created => {
        const current = this.store.value;
        this.store.next([...current, created]);
      })
    );
  }

  update(clinica: Clinica): Observable<Clinica> {
    return this.http.put<Clinica>(this.httpBaseUrl, clinica).pipe(
      tap(updated => {
        const current = this.store.value;
        const index = current.findIndex(a => a.id === clinica.id);
        if (index !== -1) {
          const newList = [...current];
          newList[index] = updated;
          this.store.next(newList);
        }
      })
    );
  }

  move(clinica: Clinica): Observable<Clinica> {
    return this.update(clinica);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.httpBaseUrl}/${id}`).pipe(
      tap(() => {
        const current = this.store.value;
        this.store.next(current.filter(a => a.id !== id));
      })
    );
  }

  getById(id: number): Observable<Clinica> {
    return this.http.get<Clinica>(`${this.httpBaseUrl}/${id}`);
  }

  private loadFromBackend(): void {
    this.http.get<Clinica[]>(this.httpBaseUrl).pipe(
      tap(clinicas => this.store.next(clinicas))
    ).subscribe({
      next: () => console.log('[ClinicaService] Clinicas loaded from backend'),
      error: (err) => console.error('[ClinicaService] Error loading clinicas:', err)
    });
  }


  // ALIASES PARA COMPATIBILIDAD
  add(payload: Omit<Clinica, 'id'>) { return this.create(payload); }
  new(payload: Omit<Clinica, 'id'>) { return this.create(payload); }
  save(payload: Clinica) { return this.update(payload); }
  put(payload: Clinica) { return this.update(payload); }
  set(payload: Clinica) { return this.update(payload); }
  remove(id: number) { return this.delete(id); }
}
