import { useWriter } from "./hook-utils/hooks";
import styled from "styled-components";
import { writers as initialWriters } from "./data";
import { useState } from "react";
import { Button } from "./Button";
import { FormBase, InputLabel, InputBase } from "./form-utils/forms";
import { NewWriter } from "./NewWriter";
import { useContext } from "react";
import { WriterContext } from "./contexts/WriterContext";

const LoginBase = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const authenticate = (username, password) => {
    let localStorageWriters = JSON.parse(localStorage.getItem('writers'))
    localStorageWriters = (localStorageWriters != null)
                        ? localStorageWriters
                        : initialWriters

    for (let writer of localStorageWriters){
        if (writer.username === username && writer.password === password){
            return writer;
        }
    }

    return false;
}

export const Login = ({
    setIsLoggedIn = () => {}
}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {saveWriter} = useContext(WriterContext);
    const [isSiginingUp, setIsSigningUp] = useState(false);

    const onClickLogin = (username, password) => {
        const writer = authenticate(username, password);

        if (writer){
            saveWriter(writer);
            setIsLoggedIn(true);

        }else{
            alert('login failed');
        }
    }
    
    const onClickSignUp = () => {
        setIsSigningUp(false)
    }
    
    return (
        <FormBase>
            <LoginBase>
                {isSiginingUp &&
                    <NewWriter 
                        onClickSignUp={onClickSignUp}
                    />
                }
                <h3>Welcome!</h3>
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
                <Button
                    buttonText={'로그인'} 
                    onclick={() => onClickLogin(username, password)}
                />
                <Button
                    buttonText={'아이디 생성'} 
                    onclick={() => setIsSigningUp(true)}
                />
            </LoginBase>
        </FormBase>    
    )
}