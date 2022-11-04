import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from './Button';
import { useWriter } from "./hook-utils/hooks";

const NavBarBase = styled.div`
    background-color: rgb(60, 195, 250);
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
    color: white;
    margin-right: 20px;
    :hover {
        cursor: pointer;
    }
`

const ImgBox = styled.div`
    width: 30px;
    height: 30px;
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
    boards,
    setIsLoggedIn = () => {},
}) => {
    const navigate = useNavigate();
    const {writer, setWriter} = useWriter();

    let isLoggedIn = (writer !== null);

    const onClickLogout = () => {
        setWriter(null);
        setIsLoggedIn(false);
        isLoggedIn = false;
        navigate(['/']);
    }

    return (
        <NavBarBase>
            <ImgWrap
                role={'home'} 
                onClick={() => navigate('/')}>
                <ImgBox>
                    <img 
                        src={process.env.PUBLIC_URL + '/logo192.png'} 
                        style={{objectFit: 'cover'}} />
                </ImgBox>
                {'게시판 사이트'}
            </ImgWrap>
            <BoardsContainer>
                {boards.map(board => (
                    <BoardWrap key={board.bid} onClick={() => navigate(`/boards/${board.bid}`)}>
                        {board.boardname}
                    </BoardWrap>
                ))}
            </BoardsContainer>
            {isLoggedIn && <Button buttonText={'로그아웃'} onclick={() => onClickLogout()} />}

        </NavBarBase>
    )
}