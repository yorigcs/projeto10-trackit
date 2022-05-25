import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.svg';
import axios from "axios";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

const SignUp = () => {
    const [values, setValues] = useState({ email: '', name: '', image: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState({ image: true });
    let navigate = useNavigate();
    //useEffect(()=> {console.log(values)}, [values]);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });

        //check valid url image
        if (e.target.name === 'image') {
            // eslint-disable-next-line no-useless-escape
            const re = new RegExp('^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$');
            if (re.test(e.target.value)) {
                setIsValid({ ...isValid, image: true });
            } else {
                setIsValid({ ...isValid, image: false });
            }
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        async function registerUser() {
            try {
                const resp = await axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', values);
                console.log(resp.data);
                navigate("../", { replace: true });
            } catch (err) {
                switch(err.response.status) {
                    case 409:   
                        alert('Esse e-mail já está cadastrado em nosso sistema!');
                        break;
                    default:
                        alert('Um erro desconhecido ocorreu, tente novamente!');
                        break;
                }
                console.log();
                setLoading(false);
            }
        }
        registerUser();

    };

    return (
        <Container>
            <img src={logo} alt="Tracklt"></img>

            <SignUpForm onSubmit={handleSubmit}>

                <input type='email' placeholder="email" onChange={handleChange} disabled={loading} name='email' value={values.email} required></input>

                <input type='password' placeholder="senha" name="password" onChange={handleChange} disabled={loading} value={values.password} required></input>
                <input type='text' placeholder="nome" name='name' onChange={handleChange} disabled={loading} value={values.name} required></input>
                <URLImage>
                    <input type='text' placeholder="foto" name="image" onChange={handleChange} disabled={loading} value={values.image} required></input>
                    {isValid.image ? null : <span>Digite um URL de imagem válido!</span>}
                </URLImage>

                <button type="submit" disabled={loading || !isValid.image}>{loading ? <ThreeDots color="#FFFFFF" height={40} width={40} /> : 'Cadastrar'}</button>

            </SignUpForm>

            <Link to='/'>Já tem uma conta? Faça login!</Link>

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

const SignUpForm = styled.form`
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

const URLImage = styled.div`
 input{
     display: block;
 }

 span {
     color:red;
     font-size: 12px;
 }
`;





export default SignUp;