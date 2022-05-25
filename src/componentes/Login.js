import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from '../assets/logo.svg';

const Login = () => {
    return (
        <Container>
            <img src={logo} alt="Tracklt"></img>

            <LoginForm>

                <input type='text' placeholder="email" required></input>
                <input type='password' placeholder="senha" required></input>
                <button type="submit">Entrar</button>

            </LoginForm>

            <Link to='/cadastro'>Não tem uma conta? Cadastre-se!</Link>

        </Container>
    )

};


const Container = styled.div`
 margin-top: 100px;
 display:flex;
 flex-direction:column;
 align-items: center;
 justify-content: center;
 
 img{
     width: 180px;
     height: 180px
 }
 a {
     color: #52B6FF;
 }
`;

const LoginForm = styled.form`
 *{
    box-sizing:border-box;
 }
 margin-top: 30px;
 margin-bottom: 25px;
 display:flex;
 flex-direction:column;
 align-items: center;
 justify-content: center;
 gap:6px;
 
 input{
     width: 300px;
     height: 45px;
     font-family: 'Lexend Deca', sans-serif;
     font-size: 20px;
     border: 1px solid #D5D5D5;
     border-radius: 5px;
 }
 input::placeholder{
     color:#DBDBDB;  
 }

 button {
    cursor:pointer;
    width: 300px;
    height: 45px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 20px;
    background-color: #52B6FF;
    border:none;
    color: #ffffff;

 }


`;





export default Login;