import { useState, useMemo, useEffect, useContext } from "react";
import styled from 'styled-components';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import axios from "axios";
import UserContext from "../context/UserContext";
import { BsCheckLg } from 'react-icons/bs';
import NavBar from "./NavBar";
import TopBar from "./TopBar";

const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`;

const Today = () => {
    dayjs.locale('pt-br');
    let now = dayjs().format('dddd, DD/MM');

    const { userInfo, progress } = useContext(UserContext);
    const [todayHabits, setTodayHabits] = useState([]);
    useEffect(() => { console.log(todayHabits) }, [todayHabits]);
    const config = useMemo(() => {
        return {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    }, [userInfo.token]);

    useEffect(() => {
        const getHabits = async () => {
            try {
                const resp = await axios.get(`${URL}/today`, config);
                setTodayHabits(resp.data);

            } catch (err) {
                console.log(err);
            }
        };
        getHabits();
    }, [config])


    return (
        <Container>
            <TopBar />
            <MainContainer>
                <Title>{now}</Title>

                {progress === 0
                    ? <SubTitle>Nenhum hábito concluído ainda</SubTitle>
                    : <SubTitle color="#8FC549">{`${progress}% dos hábitos concluídos`}</SubTitle>}

                <Habits>
                    {todayHabits.map((habit) => <TodayHabit key={habit.id} {...habit} config={config} setTodayHabits={setTodayHabits}/>)}
                </Habits>

            </MainContainer>


            <NavBar />
        </Container>
    )
};

const TodayHabit = ({ id, name, done, currentSequence, highestSequence, setTodayHabits,config }) => {
    const [loading, setLoading] = useState(false);
    const handleClick = (e) => {
       const  handleDone = async () => {
            setLoading(true);
            try {
                
                const check = done ? await axios.post(`${URL}/${e.currentTarget.id}/uncheck`,'',config)
                                   : await axios.post(`${URL}/${e.currentTarget.id}/check`,'',config);
                if(check) {
                    try {
                        const resp = await axios.get(`${URL}/today`, config);
                        setTodayHabits(resp.data);
                        setLoading(false);
                    } catch (err) {
                        console.log(err);
                        setLoading(false);
                    }
                }

            } catch (err) {
                console.log(err)
                setLoading(false);
            }
       };
       handleDone();
    };

    return (
        <Habit>
            <h3>{name}</h3>
            <p>{`Sequência atual: ${currentSequence} dias`}</p>
            <p>{`Seu recorde: ${highestSequence} dias`}</p>
            {done 
            ? <Check disableClick={loading ? 'none' : 'default'} backgColor='#8FC549' id={id} onClick={handleClick}> <BsCheckLg /> </Check>
            : <Check disableClick={loading ? 'none' : 'default'} id={id} onClick={handleClick}> <BsCheckLg /> </Check>}
            
        </Habit>
    )

};

export default Today;



/* CSS */
const Container = styled.div`
height:100vh;
background-color:#E5E5E5;
`;
const MainContainer = styled.main`
    box-sizing:border-box;
    padding: 100px 18px;
`;

const Title = styled.h1`
    font-size: 22px;
    color: #126BA5;
`;

const SubTitle = styled.h2`
    margin-top: 4px;
    font-size: 18px;
    color: ${props => props.color || '#BABABA'};
`;

const Habits = styled.ul`
    
    margin-top: 30px;
    

`;

const Habit = styled.li`
    background-color:white;
    margin: 12px 0;
    padding: 15px;
    border-radius: 5px;
    position: relative;
    h3 {
        margin-bottom: 10px;
        font-size: 20px;
        color: #666666;
    }

    p {
        margin: 4px 0;
        font-size: 12px;
        color: #666666;
    }
`;

const Check = styled.div`
    pointer-events: ${props => props.disableClick || 'default'};
    cursor: pointer;
    color: white;
    font-size: 26px;
    display:flex;
    justify-content:center;
    align-items:center;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    width: 69px;
    height: 69px;
    background-color: ${props => props.backgColor || '#EBEBEB'};
    border-radius: 5px;
`;