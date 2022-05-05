import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    todo: null,
    errorCode: '',
    createTodoStatus: '',
    updateTodoStatus: '',
    deleteTodoStatus: ''
};
const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        getTodo: (state) => {
            state.loading = true;
        },
        getTodoSuccess: (state, action) => {
            state.loading = false;
            state.todo = action.payload;
        },
        getTodoFailed: (state, action) => {
            state.loading = false;
            state.errorCode = action.payload;
        },
        createTodo: (state) => {
            state.loading = true;
        },
        createTodoSuccess: (state) => {
            state.loading = false;
            state.createTodoStatus = 'CREATE_SUCCESS';
        },
        createTodoFailed: (state, action) => {
            state.loading = false;
            state.errorCode = action.payload;
            state.createTodoStatus = 'CREATE_FAILED';
        },
        updateTodo: (state) => {
            state.loading = true;
        },
        updateTodoSuccess: (state) => {
            state.loading = false;
            state.updateTodoStatus = 'UPDATE_SUCCESS';
        },
        updateTodoFailed: (state, action) => {
            state.loading = false;
            state.errorCode = action.payload;
            state.updateTodoStatus = 'UPDATE_FAILED';
        },
        deleteTodo: (state) => {
            state.loading = true;
        },
        deleteTodoSuccess: (state) => {
            state.loading = false;
            state.deleteTodoStatus = 'DELETE_SUCCESS';
        },
        deleteTodoFailed: (state, action) => {
            state.loading = false;
            state.errorCode = action.payload;
            state.deleteTodoStatus = 'DELETE_FAILED';
        },
    }
});

export default todoSlice.reducer;
//Action
export const {
    getTodo,
    getTodoSuccess,
    getTodoFailed,
    createTodo,
    createTodoSuccess,
    createTodoFailed,
    updateTodo,
    updateTodoSuccess,
    updateTodoFailed,
    deleteTodo,
    deleteTodoSuccess,
    deleteTodoFailed
} = todoSlice.actions;
