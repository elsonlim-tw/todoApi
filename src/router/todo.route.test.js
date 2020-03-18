const supertest = require("supertest");
const app = require("../app");

describe("/todo", () => {
  let request, todos, todoItem, todoItem2, getTodoItems;

  beforeEach(() => {
    request = supertest(app);
    todos = db.collection("todos");

    todoItem = {
      title: "new todo",
      isDone: false
    };

    todoItem2 = {
      title: "todo2",
      isDone: false
    };

    getTodoItems = () => [todoItem, todoItem2].map(item => ({ ...item }));
  });

  it("POST / should create a new todo item", async () => {
    await request
      .post("/todo")
      .send(todoItem)
      .set("Content-Type", "application/json");

    const todo = await todos.findOne(todoItem);

    expect(todo.title).toBe(todoItem.title);
    expect(todo.isDone).toBe(todoItem.isDone);
  });

  it("GET / should get back all items", async () => {
    await todos.insertMany(getTodoItems());

    const res = await request.get("/todo");

    expect(res.body).toMatchObject(getTodoItems());
  });

  it("DELETE /:id should delete an item", async () => {
    await todos.insertMany(getTodoItems());
    const todoToDelete = await todos.findOne();

    await request.delete(`/todo/${todoToDelete._id}`);

    const updateTodo = await todos.findOne({ _id: todoToDelete._id });

    expect(updateTodo).toBe(null);
  });

  it("PATCH /:id should update an item isDone value", async () => {
    await todos.insertMany(getTodoItems());
    const todoToUpdate = await todos.findOne();

    await request
      .patch(`/todo/${todoToUpdate._id}`)
      .send({ isDone: true })
      .set("Content-Type", "application/json");

    const updateTodo = await todos.findOne({ _id: todoToUpdate._id });
    expect(updateTodo).toMatchObject({
      ...todoToUpdate,
      isDone: true
    });
  });

  it("PATCH /:id should update an item title", async () => {
    await todos.insertMany(getTodoItems());
    const todoToUpdate = await todos.findOne();

    await request
      .patch(`/todo/${todoToUpdate._id}`)
      .send({ title: "new title" })
      .set("Content-Type", "application/json");

    const updateTodo = await todos.findOne({ _id: todoToUpdate._id });
    expect(updateTodo).toMatchObject({
      ...todoToUpdate,
      title: "new title"
    });
  });

  it("PATCH /:id should not update an item with invalid field", async () => {
    await todos.insertMany(getTodoItems());
    const todoToUpdate = await todos.findOne();

    await request
      .patch(`/todo/${todoToUpdate._id}`)
      .send({ apple: "apple" })
      .set("Content-Type", "application/json");

    const updateTodo = await todos.findOne({ _id: todoToUpdate._id });
    expect(updateTodo.apple).toBe(undefined);
  });
});
