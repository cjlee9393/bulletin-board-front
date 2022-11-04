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
    comment = {},
    actions = [],
}) => {
    const [content, setContent] = useState(comment.content || '');

    const getComment = () => ({
        ...comment,
        content: content,
    })
    
    return (
        <>
            <TransparentBackground />
            <FormBase>
                <TextLabel>
                    {'댓글'}
                </TextLabel>
                <TextInput
                    role={'content-input'}
                    placeholder={'댓글 입력..'}
                    defaultValue={content}
                    cols={'30'}
                    rows={'10'}
                    onChange={e => setContent(e.target.value)}
                />
                <ButtonsContainer>
                    {actions.map(action => (
                        <Button key={action.actionName} buttonText={action.actionName} onclick={() => action.onAction(getComment())} />
                    ))}
                </ButtonsContainer>
            </FormBase>
        </>
    )
}