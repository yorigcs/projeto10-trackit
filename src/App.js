import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import UserContext from './context/UserContext';
import Login from './componentes/Login';
import SignUp from './componentes/SignUp';
import Habits from './componentes/Habits';
import Today from './componentes/Today';
import GlobalStyle  from './assets/globalStyles'

function App() {
  const [userInfo,setUserInfo] = useState({});
  return (
    <>
    <GlobalStyle />
    <UserContext.Provider value={{userInfo,setUserInfo}}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/cadastro' element={<SignUp />} />
        <Route path='/habitos' element={<Habits />} />
        <Route path='/hoje' element={<Today />} />

      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
    </>
    
    
  );
}

export default App;
