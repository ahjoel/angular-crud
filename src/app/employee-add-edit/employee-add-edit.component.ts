import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.scss']
})
export class EmployeeAddEditComponent implements OnInit{

  empForm: FormGroup;

  // List of education in select form
  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  // Initialize variable of class
  constructor(
    private _fb: FormBuilder, 
    private _empService: EmployeeService, 
    private _dialogRef: MatDialogRef<EmployeeAddEditComponent>,
    // Modification des données
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '', 
      company: '',
      experience: '',
      package: '',
    });
  }

  ngOnInit(): void{
    this.empForm.patchValue(this.data);
  }

  // Soumission du formulaire
  onFormSubmit(){
    if (this.empForm.valid) {

      if (this.data) {
        // Toujours logger pour voir les données envoyées par le formulaire
        // console.log(this.empForm.value);
        this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          // Cas de succès
          next: (val:any) => {
            // alert('Employee updated!');
            this._coreService.openSnackBar('Employee detail updated !');
            // Fermeture du Modal de Formulaire 
            this._dialogRef.close(true);
          },
          // Cas d'erreur
          error: (err: any) => {
            console.error(err);
          }
        })
      } else {
        // Toujours logger pour voir les données envoyées par le formulaire
        // console.log(this.empForm.value);
        this._empService.addEmployee(this.empForm.value).subscribe({
          // Cas de succès
          next: (val:any) => {
            // alert('Employee added successfully');
            this._coreService.openSnackBar('Employee added successfully');
            // Fermeture du Modal de Formulaire 
            this._dialogRef.close(true);
          },
          // Cas d'erreur
          error: (err: any) => {
            console.error(err);
          }
        })
      }
      
    }
  }
  
}
