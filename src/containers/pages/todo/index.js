import React, {useCallback, useEffect, useState} from 'react';
import css from './Todo.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {deleteTodo, getTodo} from '../../../store/todo/todo.reducer';
import FormTodo from '../../../components/FormTodo';
import {toast} from 'react-hot-toast';
import Pagination from '../../../components/Pagination';

const Todo = () => {
    const [showForm, setShowForm] = useState(false);
    const [updateTodo, setUpdateTodo] = useState(undefined);
    const [listTodo, setListTodo] = useState([]);
    const dispatch = useDispatch();
    const {todo,deleteTodoStatus} = useSelector(state => state.todo);

    useEffect(() => {
        dispatch(getTodo());
    }, [deleteTodoStatus, dispatch]);

    useEffect(() => {
        setListTodo(todo);
    }, [todo]);

    const handleDeleteTodo = useCallback(async (id) => {
        await dispatch(deleteTodo(id));
        toast.success('Delete todo success!')
        dispatch(getTodo());
    },[dispatch])



    const renderListTodo = useCallback(() => {
        return listTodo?.data && listTodo.data.map((todo, index) =>{
            const created_at = new Date(todo.created_at).toLocaleDateString("en-US");
               return (
                    <tr key={index}>
                        <th scope="row">{index}</th>
                        <td>{todo.title}</td>
                        <td>{todo.is_finished.toString()}</td>
                        <td>{todo.created_by.username}</td>
                        <td>{created_at}</td>
                        <td className={css.control}>
                            <button type="button" className={`btn btn-primary ${css['control-btn']}`} onClick={() => {
                                setShowForm(true);
                                setUpdateTodo(todo);
                            }}>Update
                            </button>
                            <button type="button" className={`btn btn-danger ${css['control-btn']}`} onClick={()=>handleDeleteTodo(todo._id)}>Delete
                            </button>
                        </td>
                    </tr>
                )
        }

        );
    }, [handleDeleteTodo, listTodo]);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <>
            <button type="button" className="btn btn-success" onClick={() => {
                setUpdateTodo(undefined);
                toggleForm();
            }}>Add Todo
            </button>
            {showForm && <FormTodo todo={updateTodo} setShowForm={setShowForm}/>}
            <div className={css.main}>
                <table className="col-md-10 table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Finished</th>
                        <th scope="col">Created By</th>
                        <th scope="col">Created At</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderListTodo()}
                    </tbody>
                </table>
                <Pagination count={listTodo?.count}/>
            </div>
        </>
    );
};

export default Todo;
