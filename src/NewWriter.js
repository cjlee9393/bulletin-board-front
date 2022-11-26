import { useState } from "react";
import styled from "styled-components";
import { Button } from './Button';
import { TransparentBackground, FormBase, InputLabel, InputBase } from './form-utils/forms';
import { writers as initialWriters } from "./data";
import { v4 as uuid } from 'uuid';

export const NewWriter = ({ 
    onClickSignUp = () => {}
}) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [passwordRepeat, setPasswordRepeat] = useState();

    const checkPasswordRepeat = (password, passwordRepeat) => {
        return (password == passwordRepeat)
    }

    const saveWriter = (writer) => {
        let localStorageWriters = JSON.parse(localStorage.getItem('writers'))

        localStorageWriters = (localStorageWriters != null)
                            ? localStorageWriters
                            : initialWriters
        
        const updatedWriters = [...localStorageWriters, writer]

        localStorage.setItem('writers', JSON.stringify(updatedWriters))
    }
    
    return (
        <>
            <TransparentBackground />
            <FormBase>
                <InputLabel>아이디</InputLabel>
                <InputBase
                    role='username-input'
                    placeholder='아이디 입력..'
                    onChange={e => setUsername(e.target.value)}
                />
                <InputLabel>패스워드</InputLabel>
                <InputBase
                    role='password-input'
                    type='password'
                    placeholder='패스워드 입력..'
                    onChange={e => setPassword(e.target.value)}
                />
                <InputLabel>패스워드 확인</InputLabel>
                <InputBase
                    role='password-repeat-input'
                    type='password'
                    placeholder='패스워드 입력..'
                    onChange={e => setPasswordRepeat(e.target.value)}
                />
                <Button
                    buttonText={'계정 생성'} 
                    onclick={() => {
                        if (checkPasswordRepeat(password, passwordRepeat)) {
                            saveWriter({
                                wid: uuid(),
                                username: username,
                                password: password,
                                token: '<to-be-implemented>'
                            })
                            onClickSignUp()
                        }else{
                            alert('password and passwordRepeat does not match')
                        }
                    }}
                />
            </FormBase>
        </>
    )
}