import styled from "styled-components";
import { useState, useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import UserContext from "../context/UserContext";

import logo from '../assets/logo.svg';


const Login = () => {
    const [values, setValues] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const {setUserInfo} = useContext(UserContext);
    let navigate = useNavigate();

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        async function userLogin() {
            try {
                const resp = await axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login',values);
                setUserInfo(resp.data);
                navigate('../hoje', {replace: true});

            } catch (err) {
                switch(err.response.status) {
                    case 401:   
                        alert('O email ou a senha digitada estão incorretos');
                        break;
                    default:
                        alert('Um erro desconhecido ocorreu, tente novamente!');
                        break;
                }
                setLoading(false);
            }
        }
        userLogin();
    };
    return (
        <Container>
            <img src={logo} alt="Tracklt"></img>

            <LoginForm onSubmit={handleSubmit}>

                <input type='email' disabled={loading} name="email" value={values.email} onChange={handleChange} placeholder="email" required></input>
                <input type='password' disabled={loading} name="password" value={values.password} onChange={handleChange} placeholder="senha" required></input>

                <button type="submit">{loading ? <ThreeDots color="#FFFFFF" height={40} width={40} /> : 'Entrar'}</button>

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
    display: flex;
    align-items:center;
    justify-content: center;
    cursor:pointer;
    width: 300px;
    height: 45px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 20px;
    background-color: #52B6FF;
    border:none;
    color: #ffffff;

 }

 input:disabled {
     background-color:#F2F2F2;
 }
 button:disabled {
    filter: grayscale(40%);
 }


`;





export default Login;