import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from './Button';
import { useContext } from "react";
import { WriterContext } from "./contexts/WriterContext";
import { useEffect } from "react";
import { getData } from "./api";
import { useState } from "react";

const NavBarBase = styled.div`
    background-color: rgb(242, 162, 70);
    min-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const BoardsContainer = styled.div`
    display: flex;
`

const BoardWrap = styled.div`
    font-weight: bold;
    font-size: 1.2em;
    color: white;
    margin-right: 40px;
    :hover {
        cursor: pointer;
    }
`

const ImgBox = styled.div`
    width: 40px;
    height: 40px;
    margin: 20px;
`

const TextBox = styled.div`
    display: flex;
    flex-direction: column;
`

const TextTop = styled.div`
    font-size: 0.8em;
    text-align: center;
`

const TextBottom = styled.div`
    font-size: 1.2em;
`

const ImgWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 1.3em;
    color: white;

    :hover {
        cursor: pointer;
    }
`

export const NavBar = ({
    setIsLoggedIn = () => {},
}) => {
    const navigate = useNavigate();
    const {writer, saveWriter} = useContext(WriterContext);
    const [isLoading, setIsLoading] = useState(true);
    const [boards, setBoards] = useState([]);

    let isLoggedIn = (writer !== null);

    const onClickLogout = () => {
        saveWriter(null);
        setIsLoggedIn(false);
        isLoggedIn = false;
        navigate(['/']);
    }

    useEffect(() => {
        getData(`boards`, writer.token_auth)
        .then((data) => {
            console.log(data);
            setBoards(data);
            setIsLoading(false);
        })
    }, [])

    return (
        <NavBarBase>
            <ImgWrap
                role={'home'} 
                onClick={() => navigate('/')}>
                <ImgBox>
                    <img 
                        src={process.env.PUBLIC_URL + '/company.png'} 
                        style={{objectFit: 'cover'}} />
                </ImgBox>
                <TextBox>
                    <TextTop>{'직장인SNS'}</TextTop>
                    <TextBottom>{'컴퍼니픽'}</TextBottom>
                </TextBox>
            </ImgWrap>
            {!isLoading && 
                <BoardsContainer>
                    {boards.map(board => (
                        <BoardWrap key={board.bid} onClick={() => navigate(`/boards/${board.bid}`)}>
                            {board.boardname}
                        </BoardWrap>
                    ))}
                </BoardsContainer>}
            {isLoggedIn && <Button buttonText={'로그아웃'} imgFileName={'logout.png'} onclick={() => onClickLogout()} />}

        </NavBarBase>
    )
}