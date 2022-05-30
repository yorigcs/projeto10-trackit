import styled from 'styled-components'
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri'
import { ThreeDots } from "react-loader-spinner";
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import NavBar from './NavBar';
const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';

const daysStatic = [
    { dia: 'D', id: 0 },
    { dia: 'S', id: 1 },
    { dia: 'T', id: 2 },
    { dia: 'Q', id: 3 },
    { dia: 'Q', id: 4 },
    { dia: 'S', id: 5 },
    { dia: 'S', id: 6 }
];

const Habits = () => {
    const { handleProgress, config } = useContext(UserContext);
    const [showBox, setShowBox] = useState(false);
    const [habit, setHabit] = useState({ name: '', days: [] });
    const [myHabits, setMyHabits] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //get myHabits
    useEffect(() => {
        async function getHabits() {
            try {
                const resp = await axios.get(URL, config);
                setMyHabits(resp.data);
                handleProgress();
            } catch (err) {
                switch (err.response.status) {
                    case 401:
                        alert('Sua sessão expirou!');
                        localStorage.removeItem('userInfo');
                        navigate('../', { replace: true });
                        break;
                    default:
                        alert('Um erro desconhecido ocorreu, tente novamente!');
                        break;
                }
            }
        }
        getHabits()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // create habits
    const handleChange = (e) => {
        setHabit({ ...habit, name: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        async function createHabit() {
            try {
                const respGet = await axios.post(URL, habit, config);
                setLoading(false);
                setHabit({ name: '', days: [] });
                setShowBox(false);
                if (respGet) {
                    try {
                        const resp = await axios.get(URL, config);
                        setMyHabits(resp.data);
                        handleProgress();
                    } catch (err) {
                        console.log(err.response.status);
                    }
                }

            } catch (err) {
                console.log(err.response.status);
                setLoading(false);
            }
        };
        createHabit();
    };

    const getMyHabits = () => {
        if (myHabits.length > 0) {
            return (
                myHabits.map((habit) =>
                    <RenderMyHabits key={habit.id} {...habit} config={config} setMyHabits={setMyHabits} handleProgress={handleProgress} />)
            )
        }
        return <EmptyHabits>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</EmptyHabits>
    };

    return (
        <>
            <TopBar />

            <MainContent>
                <CreateHabit>
                    <NewHabit>
                        <span>Meus Hábitos</span>
                        <span onClick={() => { setShowBox(!showBox) }}>+</span>
                    </NewHabit>
                    {showBox
                        ? <FormCreateHabit onSubmit={handleSubmit}>
                            <input type='text' disabled={loading} value={habit.name} onChange={handleChange} placeholder='Nomedo do hábito'></input>
                            <Days click={loading ? 'none' : 'default'}>
                                {daysStatic.map((day) => (<ListDay key={day.id} {...day} habit={habit} setHabit={setHabit} />))}
                            </Days>
                            <Buttons>
                                <button type='button' onClick={() => { setShowBox(false) }}>Cancelar</button>
                                <button disabled={loading} type='submit'>{loading ? <ThreeDots color="#FFFFFF" height={40} width={40} /> : 'Salvar'}</button>
                            </Buttons>

                        </FormCreateHabit>
                        : null}
                </CreateHabit>

                {getMyHabits()}

            </MainContent>
            <NavBar />
        </>
    )
};

const ListDay = ({ dia, id, habit, setHabit }) => {
    const handleClick = (e) => {
        if (habit.days.some(id => id === Number(e.target.id))) {
            setHabit({ ...habit, days: habit.days.filter(id => id !== Number(e.target.id)) });
        } else {
            setHabit({ ...habit, days: [...habit.days, Number(e.target.id)] });
        }
    };
    return (
        <>
            {habit.days.some((idDay) => idDay === id)
                ? <Day selectColor='#FFFFFF' selectBackgColor='#CFCFCF' id={id} onClick={handleClick}>{dia}</Day>
                : <Day id={id} onClick={handleClick}>{dia}</Day>}
        </>
    );
};

const RenderMyHabits = ({ id, name, days, config, setMyHabits,handleProgress }) => {

    const handleDelete = (e) => {

        if (window.confirm('Você tem certeza que gostaria de apagar esse hábito?')) {
            async function deleteHabit() {
                try {
                    const respDel = await axios.delete(`${URL}/${e.currentTarget.id}`, config);

                    if (respDel) {
                        try {
                            const resp = await axios.get(URL, config);
                            if(resp) {
                                setMyHabits(resp.data);
                                handleProgress();
                            }
                            
                        } catch (err) {
                            console.log(err.response.status);
                        }
                    }
                } catch (err) {
                    console.log(err.response.status);
                }
            }
            deleteHabit();
        }

    };
    return (
        <Habit>
            <IconDelete id={id} onClick={handleDelete}> <RiDeleteBin6Line /> </IconDelete>

            <span>{name}</span>
            <Days>
                {daysStatic.map((day) => {
                    if (days.some((d) => d === day.id)) {
                        return <Day key={day.id} cursor='default' selectColor='#FFFFFF' selectBackgColor='#CFCFCF' id={id} >{day.dia}</Day>
                    }
                    return <Day key={day.id} cursor='default' id={id}>{day.dia}</Day>
                })}
            </Days>
        </Habit>
    );
};

/* CSS */

const EmptyHabits = styled.div`
    font-size: 18px;
    color: #666666;
    margin-top: 30px;
`;

const Habit = styled.div`
    position: relative;
    margin: 12px 0;
    padding: 18px;
    display:flex;
    flex-direction:column;
    background-color: white;
    border-radius:5px;

    > span {
        font-size: 20px;
        color: #666666;
    }
`;

const IconDelete = styled.div`
    cursor:pointer;
    position: absolute;
    top: 10px;
    right: 10px;
`;



const MainContent = styled.main`
    height:100vh;
    background-color:#E5E5E5;
    box-sizing:border-box;
    padding: 20px;
    
`;

const CreateHabit = styled.div`
    margin-top: 80px;
    
`;

const NewHabit = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    font-size: 22px;



    span:first-child {
        
        color: #126BA5;

    }
    span:nth-child(2){
        display:flex;
        align-items:center;
        justify-content:center;
        border-radius: 4px;
        width: 40px;
        height:35px;
        background-color: #52B6FF;
        color: white;
        cursor:pointer;
    }
`;

const FormCreateHabit = styled.form`
    *{
        box-sizing:border-box;
    }
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    margin-top: 22px;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    input {
        font-size: 20px;
        height:45px;
        width: 302px;
        border-radius: 5px;
        border: 1px solid #D5D5D5;
    }

    input::placeholder{
        color: #DBDBDB;
    }
    input:disabled {
     background-color:#F2F2F2;
    }

    button:disabled {
        filter: grayscale(40%);
    }
`;

const Days = styled.div`
    pointer-events: ${props => props.click || 'default'};
    margin-top:10px;
    display: flex;
    width:100%;
    justify-content:flex-start;
    gap: 6px;
`;

const Day = styled.span`
    cursor: ${props => props.cursor || 'pointer'};
    display:flex;
    align-items:center;
    justify-content:center;
    width:30px;
    height:30px;
    border-radius: 5px;
    border: 1px solid #D5D5D5;
    color: ${props => props.selectColor || '#D5D5D5'};
    background-color: ${props => props.selectBackgColor || 'transparent'};
    font-size: 20px;
`;


const Buttons = styled.div`
    margin-top: 20px;
    width:100%;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    font-size: 16px;


    button {
        display: flex;
        align-items:center;
        justify-content: center;
        font-family: 'Lexend Deca',sans-serif;
        width: 84px;
        height: 35px;
        border-radius: 4px;
        border: none;
        cursor:pointer;
    }

    button:first-child {
        background-color:transparent;
        color:#52B6FF;
    }

    button:nth-child(2) {
        color: white;
        background-color: #52B6FF
    }
`;

export default Habits;

