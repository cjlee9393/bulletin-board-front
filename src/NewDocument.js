import styled from "styled-components";
import { Button } from "./Button";
import { useState } from "react";
import { FormBase, TransparentBackground } from './form-utils/forms'

const InputLabel = styled.label`
    font-weight: bold;
    font-size: 1.2em;
`

const NameInput = styled.input`
    font-size: 1.4em;
    border: none;
    width: 99%;
    margin-bottom: 20px;
`

const ContentInput = styled.textarea`
    font-size: 1.2em;
    border: none;
    width: 99%;
    margin-bottom: 20px;
`

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: right;
`

export const NewDocument = ({ 
    writer,
    onClickCancel,
    onClickSave
}) => {
    const [documentname, setDocumentname] = useState();
    const [content, setContent] = useState();

    return (
        <>
            <TransparentBackground onClick={() => onClickCancel()} />
            <FormBase>
                <InputLabel>{'제목'}</InputLabel>
                <NameInput 
                    role='name-input'
                    placeholder='제목 입력..'
                    onChange={(e) => setDocumentname(e.target.value)}
                />
                <InputLabel>{'내용'}</InputLabel>
                <ContentInput 
                    role='content-input'
                    placeholder='내용 입력..'
                    cols={'50'}
                    rows={'20'}
                    onChange={(e) => setContent(e.target.value)}
                />
                <ButtonsContainer>
                    <Button buttonText='취소' onclick={() => onClickCancel()} />
                    <Button buttonText='저장' onclick={() => onClickSave(documentname, content)} />
                </ButtonsContainer>
                
            </FormBase>    
        </>
    )
}