import React from 'react';
import Todo from './todo';
import NavBar from '../../components/NavBar';

const Home = () => {
    return (
        <div>
            <NavBar/>
            <Todo/>
        </div>
    );
};

export default Home;
