import { useState } from "react";
import styled from "styled-components";
import { Button } from './Button';

const TransparentBackground = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,0.2);
    width: 100%;
    height: 100%;
    z-index:1;
`

const NewCommentBase = styled.div`
    width: fit-content;
    height: fit-content;
    padding: 40px;
    background-color: white;
    position: absolute;
    box-shadow: 0px 5px 15px #aaa;
    left: 25%;
    top: 25%;
    z-index:2;
`

const UserNameWrap = styled.div`
    font-size: 1.1em;
    font-weight: bold;
    margin-bottom: 15px;
`

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: right;
`

const TextInput = styled.textarea`
    border: none;
    width: 99%;
`

export const NewComment = ({ writer, onClickCancel, onClickSave }) => {
    const [content, setContent] = useState('');
    
    return (
        <>
            <TransparentBackground onClick={() => alert('background is clicked')} />
            <NewCommentBase>
                <UserNameWrap>
                    {writer.username}
                </UserNameWrap>
                <TextInput 
                    placeholder={'댓글 입력..'}
                    cols={'30'}
                    rows={'10'}
                    onChange={e => setContent(e.target.value)}
                />
                <ButtonsContainer>
                    <Button buttonText={'취소'} onclick={onClickCancel} />
                    <Button buttonText={'저장'} onclick={() => onClickSave(content)} />
                </ButtonsContainer>
            </NewCommentBase>
        </>
    )
}