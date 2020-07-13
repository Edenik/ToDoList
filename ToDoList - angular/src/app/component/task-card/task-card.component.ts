import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Task } from 'src/app/core/models/task';
import { ApiService } from 'src/app/core/services/api.service';
import { MDBModalService, MDBModalRef } from 'ng-uikit-pro-standard';
import { AddEditModalComponent } from '../add-edit-modal/add-edit-modal.component';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input() task:Task;
  constructor(private api:ApiService, private modalService: MDBModalService) { }
  @Output() delete = new EventEmitter<number>();
  modalRef: MDBModalRef;

  deleteTask(){
    this.api.deleteTask(this.task.id).subscribe(res =>{
      this.delete.emit(this.task.id)

    }, err => {

    }, () => {

    })
  }

  openEditProductModal() {
    let modalOptions = {
      class: 'modal-dialog modal-dialog-scrollable modal-notify modal-warning',
      data: {
        task: this.task,
        formType: 'editTask'
      },
      ignoreBackdropClick: true
    }
    this.modalRef = this.modalService.show(AddEditModalComponent, modalOptions);
    this.modalRef.content.action.subscribe((result: Task) => {
      this.task = result;
    });
  }
  ngOnInit(): void {
  }

}
