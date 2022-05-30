import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import UserContext from './context/UserContext';
import Login from './componentes/Login';
import SignUp from './componentes/SignUp';
import Habits from './componentes/Habits';
import Today from './componentes/Today';
import History from './componentes/History'
import GlobalStyle from './assets/globalStyles'

function App() {
  const [userInfo, setUserInfo] = useState({});
  const [progress, setProgress] = useState(0);
  const [todayHabits, setTodayHabits] = useState([]);

  const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`;
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`
    }
  };

  useEffect(() => {
    let total = (todayHabits.filter(habit => habit.done === true).length / todayHabits.length) * 100;
    setProgress(total);
  }, [todayHabits, setProgress]);

  const handleProgress = async () => {
    try {
      const resp = await axios.get(`${URL}/today`, config);
      if (resp) {
        setTodayHabits(resp.data);
      }
    } catch (err) {
      console.log(err);
    }

  };

  return (
    <>
      <GlobalStyle />
      <UserContext.Provider value={{ userInfo, setUserInfo, progress, setProgress, todayHabits, setTodayHabits, handleProgress,config }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/cadastro' element={<SignUp />} />
            <Route path='/habitos' element={<Habits />} />
            <Route path='/hoje' element={<Today />} />
            <Route path='/historico' element={<History />} />

          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>


  );
}

export default App;
