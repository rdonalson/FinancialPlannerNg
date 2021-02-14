import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';
import * as auth from '../../../../shared/auth-config.json';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  url = auth.resources.todoListApi.resourceUri;

  constructor(private http: HttpClient) { }

  getTodos() {
    return this.http.get<Todo[]>(this.url);
  }

  getTodo(id: number) {
    return this.http.get<Todo>(this.url + '/' +  id);
  }

  postTodo(todo: Todo) {
    return this.http.post<Todo>(this.url, todo);
  }

  deleteTodo(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  editTodo(todo: Todo) {
    return this.http.put<Todo>(this.url + '/' + todo.id, todo);
  }
}
