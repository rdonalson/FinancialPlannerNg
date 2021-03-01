import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Todo } from '../common/models/todo';
import { TodoService } from '../common/services/todo.service';

@Component({
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent implements OnInit {

  todo: Todo = {
    id: 1,
    description: 'undefined',
    status: false,
  };

  constructor(private route: ActivatedRoute, private router: Router, private service: TodoService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      // tslint:disable-next-line: no-non-null-assertion
      const id = +params.get('id')!;
      this.service.getTodo(+id).subscribe((response: Todo) => {
        this.todo = response;
      });
    });
  }

  editTodo(todo: Todo): void {
    this.todo.description = todo.description;
    this.service.editTodo(this.todo).subscribe(() => {
      this.router.navigate(['../../view'], { relativeTo: this.route });
    });
  }

}
