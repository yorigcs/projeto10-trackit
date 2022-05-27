import styled from 'styled-components';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import trackit from '../assets/TrackIt.svg';
const TopBar = () => {
    const {userInfo} = useContext(UserContext);
    return (
        <Header>
            <img src={trackit} alt='trackit'></img>
            <img src={userInfo.image} alt='userImage' />
        </Header>
    );
};


const Header = styled.header`
    box-sizing:border-box;
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding: 10px;
    height: 70px;
    width:100%;
    position:fixed;
    top:0;
    z-index: 2;

    background-color:#126BA5;

    img:nth-child(2) {
        width:52px;
        height:52px;
        border-radius: 50%;
    }

`;

export default TopBar;