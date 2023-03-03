import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // Initialize
  constructor(private _http: HttpClient) { }

  // Ajout d'employe
  addEmployee(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/employees', data);
  }

  // Liste des employes
  getEmployeeList(): Observable<any> {
    return this._http.get('http://localhost:3000/employees');
  }

  // Suppression d'employe
  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/employees/${id}`);
  }

  // Modification d'employe
  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/employees/${id}`, data);
  }
}
