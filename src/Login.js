import { useWriter } from "./hook-utils/hooks";
import styled from "styled-components";
import { writers } from "./data";
import { useState } from "react";
import { Button } from "./Button";
import { FormBase, TransparentBackground } from "./form-utils/forms";

const InputLabel = styled.label`
    width: 300px;
    font-weight: bold;
    font-size: 1.1em;
`

const InputBase = styled.input`
    font-size: 1.1em;
    width: 300px;
    padding: 10px;
    margin-left: 20px;
    margin-bottom: 50px;
`

const LoginBase = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`


export const authenticate = (username, password) => {
    for (let writer of writers){
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
    const {setWriter, writer: _} = useWriter();

    const onClickLogin = (username, password) => {
        const writer = authenticate(username, password);

        if (writer){
            setWriter(writer);
            setIsLoggedIn(true);

        }else{
            alert('login failed');
        }
    }
    
    return (
        <FormBase>
            <LoginBase>
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
            </LoginBase>
        </FormBase>    
    )
}