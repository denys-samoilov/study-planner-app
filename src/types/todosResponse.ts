import {type ApiTodo} from './apiTodo'

export type TodosResponse = {
  todos: ApiTodo[];
  total: number;
  skip: number;
  limit: number;
};
