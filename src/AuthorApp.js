import axios from 'axios';
import { useState, useEffect } from 'react';

const AuthorApp = () => {
    let [authors, setAuthors] = useState([]);
    useEffect(() => {
        getAuthors();
    }, []);
    const getAuthors = () => {
        axios
            .get('/authorsmysql')
            .then((res) => {
                setAuthors(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const createTable = () => {
        axios.get('/authorsmysql/createtable');
    };
    const addAuthor = (e) => {
        e.preventDefault();
        let authorObj = {
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            dob: e.target.dob.value,
            dod: e.target.dod.value,
        };
        axios
            .post('/authorsmysql', authorObj)
            .then((res) => getAuthors())
            .catch((e) => console.log(e));
    };
    const deleteAuthor = (first_name) => {
        axios
            .delete('/authorsmysql/' + first_name)
            .then((res) => console.log(res.data))
            .catch((e) => console.log(e));
        getAuthors();
    };
    const deleteAllAuthors = () => {
        axios
            .get('/authorsmysql/deleteall')
            .then((res) => getAuthors())
            .catch((e) => console.log(e));
        getAuthors();
    };
    const editAuthor = (first_name) => {
        axios
            .put('/authorsmysql/edit' + first_name)
            .then((res) => getAuthors())
            .catch((e) => console.log(e));
        getAuthors();
    };
    return (
        <div>
            {createTable()}
            <form className='todoform' onSubmit={addAuthor}>
                <h3>
                    <label>firstName</label>
                </h3>
                <input
                    required
                    type='text'
                    name='first_name'
                    placeholder='enter first_name..'
                    className='form-control'
                />
                <h3>
                    <label>lastName</label>
                </h3>
                <input
                    required
                    type='text'
                    name='last_name'
                    placeholder='enter last_name..'
                    className='form-control'
                />

                <p className='displayinline'>
                    <label>Date of Birth</label>
                </p>
                <input type='date' name='dob' required />
                <br />
                <p className='displayinline'>
                    <label>Date of death</label>
                </p>
                <input type='date' name='dod' required />

                <br />
                <div className='text-center'>
                    <button className='btn btn-primary'>Add Author</button>
                </div>
            </form>
            <div className='displayinline'>
                <button className='btn btn-primary' onClick={createTable}>
                    Create Author Table
                </button>
                <button className='btn btn-danger' onClick={deleteAllAuthors}>
                    Delete all Authors
                </button>
            </div>
            {authors.map((val, index) => {
                return (
                    <div>
                        <h3>{val.first_name}</h3>
                        <p>{val.last_name}</p>
                        <p>{val.dob}</p>
                        <p>{val.dod}</p>
                        <button
                            className='btn btn-warning'
                            onClick={() => {
                                deleteAuthor(val.first_name);
                            }}
                        >
                            del
                        </button>
                        <button
                            className='btn btn-info'
                            onClick={() => editAuthor(val.first_name)}
                        >
                            Edit
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
export default AuthorApp;
