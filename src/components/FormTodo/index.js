import React, {useEffect, useState} from 'react';
import css from './index.module.css';
import {useDispatch} from 'react-redux';
import {createTodo, getTodo, updateTodo} from '../../store/todo/todo.reducer';
import {toast} from 'react-hot-toast';

const FormTodo = ({todo, setShowForm}) => {


    const [title, setTitle] = useState('');
    const [is_finished, setIsFinished] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        try {
            if (todo) {
                await dispatch(updateTodo({title, is_finished, _id: todo._id}));
                setShowForm(false);
                dispatch(getTodo());
                toast.success('Update todo success!');

            } else {
                await dispatch(createTodo({title, is_finished}));
                setShowForm(false);
                dispatch(getTodo());
                toast.success('Create todo success!');
            }
        } catch (error) {
            toast.error('This didn\'t work.');
        }


    };

    useEffect(() => {
        if (todo) {
            setTitle(todo.title);
            setIsFinished(todo.is_finished);
        } else {
            setTitle('');
            setIsFinished(false);
        }
    }, [todo]);

    return (
        <div className={css.form}>
            <form style={{width: 500}}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>

                    <input className="form-control"
                           value={title}
                           type={'text'}
                           id={'title'}
                           name={'title'}
                           onChange={(e) => setTitle(e.target.value)}
                    />

                </div>
                <div className="form-group">
                    <label htmlFor="is_finished">State</label>
                    <select id="is_finished" className="form-control" value={is_finished}
                            onChange={(e) => setIsFinished(e.target.value)}>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </select>
                </div>
                <div className={css["control-btn"]}>
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    <button type="button" className="btn btn-danger" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
            </form>
        </div>

    );
};

export default FormTodo;
