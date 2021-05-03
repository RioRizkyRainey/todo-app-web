import todostore from '../models/todostore';

async function initStore() {
    if (!todostore.isInitialized) {
        await todostore.initialize()
    }
}

async function getTodos() {
    await initStore()
    return todostore.data
}

async function setCreatedTodo(todo) {
    await initStore()
    todostore.addItem({ todo }, {
        "id": "rio",
        "email": "rizkyrainey@gmail.com",
        "clientId": "6d7297f2-73ba-4faf-8fc2-52d5069918ed"
    })
    todostore.upload()
}

async function getUpdatedTodo(todo) {
    await initStore()
    console.log(todo)
    return todostore.editItem(todo._id, todo)
}

async function getDeletedTodo(id) {
    await initStore()
    return todostore.deleteItem(id)
}

export { getTodos, setCreatedTodo, getUpdatedTodo, getDeletedTodo, initStore };