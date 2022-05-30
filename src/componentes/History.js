import NavBar from "./NavBar";
import TopBar from "./TopBar";
import styled from 'styled-components';
import Calendar from 'react-calendar'
import dayjs from "dayjs";
import { useState, useEffect, useContext } from "react";
import 'react-calendar/dist/Calendar.css';
import UserContext from "../context/UserContext";
import axios from "axios";
import './teste.css'

const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily`;
const History = () => {
    const { config } = useContext(UserContext);
    const [history, setHistory] = useState([]);
    const [completeOrNot, setCompleteOrNot] = useState({complete: [], incomplete: []});
    
    useEffect(() => {
        let aux = {complete: [], incomplete: []};
        history.forEach(x => {
            if (x.habits.map(y => y.done).some(z => z === false)) {
                aux.complete.push(x.day);
            } else {
                aux.incomplete.push(x.day);
            }
        })
        setCompleteOrNot(aux);
    },[history])

    useEffect(() => {
        const getHistory = async () => {
            try {
                const resp = await axios.get(URL, config);
                setHistory(resp.data);   

            } catch (err) {
                console.log(err);
            }
        };
        getHistory();
    }, [config]);

    function tileClassName({ date, view }) {
        // Add class to tiles in month view only
        if (view === 'month') {
            // Check if a date React-Calendar wants to check is on the list of dates to add class to
            if (completeOrNot.incomplete.find(x=> x === dayjs(date).format("DD/MM/YYYY"))) {
                return 'highlight';
            } else if (completeOrNot.complete.find(x=> x === dayjs(date).format("DD/MM/YYYY"))) {
                return 'done';
            }
        }
    }


    return (
        <Container>
            <TopBar />
            <MainContainer>
                <Calendar tileClassName={tileClassName} />
            </MainContainer>

            <NavBar />
        </Container>


    );
};


const Container = styled.main`
    height:100vh;
    background-color:#E5E5E5;
`;

const MainContainer = styled.main`
    display:flex;
    align-items:center;
    justify-content:center;
    padding:100px 0;
`;



export default History;