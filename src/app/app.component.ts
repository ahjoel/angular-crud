import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeAddEditComponent } from './employee-add-edit/employee-add-edit.component';
import { EmployeeService } from './service/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  // title = 'crud';

  // Configure datasource
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email',
  'dob', 'gender', 'education', 'company', 'experience',
  'package', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  // Initialisation du Modal
  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _coreService: CoreService
  ) {}

  // Initialisation de l'attribut getEmployeeList 
  // avec l'interface OnInit qui définit la form structure de 
  // de l'objet getemployeeList à partir de son service
  ngOnInit(): void {
      this.getEmployeeList();
  }

  // Ouverture du Modal d'ajout et d'édition des employes
  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmployeeAddEditComponent)
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  // Liste des employes
  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        // console.log(res);
        // Load data in dataSource
        this.dataSource = new MatTableDataSource(res);
        // Load data for search and filter
        this.dataSource.sort = this.sort;
        // Load data for pagination
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    })
  }

  // Application des filtres
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  // Suppression d'employe
  deleteEmployee(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        // alert('Employee delete!');
        this._coreService.openSnackBar('Employee delete!', 'done');
        this.getEmployeeList();
      },
      error: console.log,
    })
  }

  // Modification d'employe
  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmployeeAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      }
    })
  }
}
