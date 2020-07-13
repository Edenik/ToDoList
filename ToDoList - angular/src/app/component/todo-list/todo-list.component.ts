import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/core/models/task';
import { ApiService } from 'src/app/core/services/api.service';
import { MDBModalService, MDBModalRef } from 'ng-uikit-pro-standard';
import { AddEditModalComponent } from '../add-edit-modal/add-edit-modal.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  constructor(private api:ApiService,
    private modalService: MDBModalService) { }
  tasks:Task[];
  modalRef: MDBModalRef;
  nullTask:Task = {id:null,name:null,dateAdded:null,description:null}
  getTasks(){
    this.tasks = [];
    this.api.getAllTasks().subscribe(res => {
      this.tasks = res;
      console.error(res)
    })
  }

  openAddProductModal() {
    let modalOptions = {
      class: 'modal-dialog modal-dialog-scrollable modal-notify modal-warning',
      data: {
        task: this.nullTask,
        formType: 'addTask'
      },
      ignoreBackdropClick: true
    }
    this.modalRef = this.modalService.show(AddEditModalComponent, modalOptions);
    this.modalRef.content.action.subscribe((result: Task) => {
      this.tasks = this.tasks.filter(ele => ele.id != result.id)
      this.tasks.push(result)
    });
  }

  deleteTask(id){
    this.tasks = this.tasks.filter(task => task.id != id);
  }
  ngOnInit(): void {
    this.getTasks();
  }

}
