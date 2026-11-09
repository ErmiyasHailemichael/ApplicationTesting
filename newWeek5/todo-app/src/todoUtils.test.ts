import { createTodo, addTodo, countDone } from "./todoUtils";
import type { Todo } from "./todoUtils";

describe("createTodo statement coverage", () => {
  it("creates a todo object from the given text", () => {
    const todo = createTodo("Buy milk");

    expect(todo.text).toBe("Buy milk");
    expect(todo.done).toBe(false);
    expect(typeof todo.id).toBe("number");
  });
});

describe("addTodo branch coverage", () => {
  it("returns the list unchanged when the text is blank", () => {
    const todos: Todo[] = [];
    const result = addTodo(todos, "   ");

    expect(result).toEqual([]);
  });

  it("adds a new todo when the text is not blank", () => {
    const todos: Todo[] = [];
    const result = addTodo(todos, "Buy milk");

    expect(result).toHaveLength(1);
    expect(result[0].text).toBe("Buy milk");
    expect(result[0].done).toBe(false);
  });
});

describe("countDone loop coverage", () => {
  it("returns 0 when the list is empty (loop runs zero times)", () => {
    const todos: Todo[] = [];
    const result = countDone(todos);

    expect(result).toBe(0);
  });

  it("counts one finished todo (loop runs once)", () => {
    const todos: Todo[] = [{ id: 1, text: "Buy milk", done: true }];

    const result = countDone(todos);

    expect(result).toBe(1);
  });

  it("counts only the finished todos (loop runs several times)", () => {
    const todos: Todo[] = [
      { id: 1, text: "Buy milk", done: true },
      { id: 2, text: "Walk the dog", done: false },
      { id: 3, text: "Write tests", done: true },
    ];

    const result = countDone(todos);

    expect(result).toBe(2);
  });
});
