import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) { }

  //Tasks  
  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${environment.api}/TasksDetails/${id}`)
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.api}/TasksDetails/`);
  }

  getTasksByQuery(query): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.api}/TasksDetails?${query}`);
  }

  addTask(Task: Task) {
    return this.http.post<Task>(`${environment.api}/TasksDetails/`, Task)
  }

  editTask(id, newParams: Task) {
    return this.http.put<Task>(`${environment.api}/TasksDetails/${id}`, newParams)
  }

  deleteTask(id) {
    return this.http.delete<Task>(`${environment.api}/TasksDetails/${id}`)
  }

}
