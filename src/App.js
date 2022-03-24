import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthorApp from './AuthorApp';
import TodoApp from './TodoApp';

function App() {
    return (
        <div className='App diffFont'>
            <h1>Welcome. We have a Todo App and Author App</h1>
            <BrowserRouter>
                <Link to='/todo' className='col-lg-6 btn btn-primary'>
                    <b>Todo App</b>
                </Link>
                <Link to='/author' className='col-lg-6 btn btn-primary'>
                    <b>Author App</b>
                </Link>
                <Routes>
                    <Route path='/todo' element={<TodoApp />} />
                    <Route path='/author' element={<AuthorApp />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
