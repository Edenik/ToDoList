import { Component, OnInit } from '@angular/core';
import { MDBModalRef, ToastService } from 'ng-uikit-pro-standard';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject } from 'rxjs';
import { Task } from 'src/app/core/models/task';
import { ApiService } from 'src/app/core/services/api.service';



@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrls: ['./add-edit-modal.component.scss']
})
export class AddEditModalComponent implements OnInit {

  constructor(
    private modalRef: MDBModalRef,
    private api:ApiService
  ) { }
  task:Task;
  formType:string;
  validatingForm: FormGroup;
  action: Subject<any> = new Subject();

  closeModal() {
    this.modalRef.hide();
  }

  get editTaskName() {
    return this.validatingForm.get('editTaskName');
  }

  get editTaskDescription() {
    return this.validatingForm.get('editTaskDescription');
  }

  save(){
    console.error(this.validatingForm.value)
    let newTask:Task = {
      name: this.validatingForm.value.editTaskName, 
      description:this.validatingForm.value.editTaskDescription,
      dateAdded: String(new Date())
    }

    this.api.addTask(newTask).subscribe(res => {
      this.action.next(res);
      this.modalRef.hide();
    }, err => {

    }, () => {

    })

  }
  ngOnInit(): void {
    this.validatingForm = new FormGroup({
      editTaskName: new FormControl(this.task.name, Validators.required),
      editTaskDescription: new FormControl(this.task.description, Validators.required),
    });
  }

}
