import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const NavBar = () => {
    const { progress } = useContext(UserContext);
    return (
        <Footer>
            <Link to='/habitos'><span>Hábitos</span></Link>
            <Link to='/hoje'>
                <Progressbar>
                    <CircularProgressbar background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "#52B6FF",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent"
                        })} value={progress} text={'Hoje'} />
                </Progressbar>
            </Link>

            <Link to='/historico'><span>Histórico</span></Link>

        </Footer>
    );
};



const Footer = styled.footer`
    box-sizing:border-box;
    display: flex;
    justify-content:space-between;
    padding: 20px;
    position: fixed;
    bottom: 0;
    right:0;
    z-index: 2;
    height: 70px;
    width:100%;
    background-color: white;

    a {
        text-decoration: none;
    }

`;

const Progressbar = styled.div`
position: absolute;
bottom: 10px;
left: 50%;
transform: translateX(-50%); 
width: 91px;
height:92px;
`;
export default NavBar;