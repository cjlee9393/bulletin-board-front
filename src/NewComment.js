import { useState } from "react";
import styled from "styled-components";
import { Button } from './Button';
import { TransparentBackground, FormBase } from './form-utils/forms';

const TextLabel = styled.label`
    font-size: 1.2em;
    font-weight: bold;
`

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: right;
`

const TextInput = styled.textarea`
    border: none;
    width: 99%;
`

export const NewComment = ({ 
    writer, 
    onClickCancel, 
    onClickSave 
}) => {
    const [content, setContent] = useState('');
    
    return (
        <>
            <TransparentBackground onClick={() => onClickCancel()} />
            <FormBase>
                <TextLabel>
                    {'댓글'}
                </TextLabel>
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
            </FormBase>
        </>
    )
}