import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {getTodo} from '../../store/todo/todo.reducer';

const Pagination = ({count}) => {
    const dispatch = useDispatch();
    const [currentPage,setCurrentPage] =useState(1);
    const dataEachPage = (Math.floor(count/10));
    const page = (count/10)%1 === 0 ? dataEachPage : 1+dataEachPage;

    const pageItem = () =>{
        const arrPageItem = [];
        if (count){
            for (let i =1;i<=page;i++){
                const pageItemStyle = currentPage === i ?{backgroundColor:"#007bff",color:"white"}:{}
                arrPageItem.push(<li key={i} className="page-item" onClick={()=>handlePagination("NUMBER",i)}><span style={pageItemStyle} className="page-link">{i}</span></li>)
            }
        }
        return arrPageItem
    }

    useEffect(()=>{
        setCurrentPage(1)
    },[])

    const handlePagination = (type,number) =>{
        switch (type){
            case "PRV":{
                if (currentPage>1){
                    dispatch(getTodo(currentPage-1))
                    setCurrentPage(state=>state-1);
                }
                break;
            }
            case "NEXT":{
                if(currentPage<page){
                    dispatch(getTodo(currentPage+1));
                    setCurrentPage(state=>state+1);
                }
                break;
            }
            case "NUMBER":{
                dispatch(getTodo(number))
                setCurrentPage(number);
                break;
            }
            default:{
                break;
            }
        }
    }


    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item">
                    <div className="page-link" onClick={()=>handlePagination("PRV")}>
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only" >Previous</span>
                    </div>
                </li>
                {pageItem()}
                <li className="page-item">
                    <div className="page-link" onClick={()=>handlePagination("NEXT")} >
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
