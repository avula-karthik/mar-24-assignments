import axios from 'axios';
import { useState, useEffect } from 'react';

const TodoApp = () => {
    let [todos, setTodos] = useState([{ item: 'eat', status: 'completed' }]);
    useEffect(() => {
        getTodos();
    }, []);
    const getTodos = () => {
        axios
            .get('/todomysql')
            .then((res) => {
                setTodos(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const createTable = () => {
        axios
            .get('/todomysql/createtable')
            .then((res) => alert('Table added'))
            .catch((e) => console.log(e));
    };
    const addTodo = (e) => {
        e.preventDefault();
        let todoObj = {
            item: e.target.item.value,
            status: e.target.status.value,
        };
        axios
            .post('/todomysql', todoObj)
            .then((res) => getTodos())
            .catch((e) => console.log(e));
    };
    const deleteTodo = (item) => {
        axios
            .delete('/todomysql/' + item)
            .then((res) => console.log(res.data))
            .catch((e) => console.log(e));
        getTodos();
    };
    const deleteAllTodos = () => {
        axios
            .get('todomysql/deleteall')
            .then((res) => getTodos())
            .catch((e) => console.log(e));
    };
    return (
        <div>
            <form className='todoform' onSubmit={addTodo}>
                <h3>
                    <label>Todo</label>
                </h3>
                <input
                    type='text'
                    name='item'
                    placeholder='enter todo..'
                    className='form-control'
                />
                <h3 className='displayinline'>
                    <label>Status</label>
                </h3>
                <select className='form-select' name='status'>
                    <option value='completed'>completed</option>
                    <option value='incomplete'>incomplete</option>
                </select>
                <br />
                <div className='text-center'>
                    <button className='btn btn-primary'>Add todo</button>
                </div>
            </form>
            <div className='displayinline'>
                <button className='btn btn-primary' onClick={createTable}>
                    Create Todo Table
                </button>
                <button className='btn btn-danger' onClick={deleteAllTodos}>
                    Delete all todos
                </button>
            </div>
            {todos.map((val, index) => {
                return (
                    <div>
                        <h3>{val.item}</h3>
                        <p>{val.status}</p>
                        <button
                            className='btn btn-warning'
                            onClick={() => {
                                deleteTodo(val.item);
                            }}
                        >
                            delete this todo
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
export default TodoApp;
