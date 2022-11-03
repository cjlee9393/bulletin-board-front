import styled from "styled-components";
import { Button } from "./Button";
import { useState } from "react";

const DocumentListHeaderBase = styled.div`
    display: flex;
    justify-content: space-between;
`

const SearchTextInput = styled.input`
    width: 200px;
    height: 30px;
    margin-right: 10px;
`

const SearchWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const DocumentListHeader = ({ onClickWrite = () => {}, onClickSearch = (searchText) => {console.log(searchText)} }) => {
    const [searchText, setSearchText] = useState('');

    return (
        <DocumentListHeaderBase>
            <Button buttonText={'글쓰기'} onclick={onClickWrite} />
            <SearchWrap>
                <SearchTextInput 
                    role={'input'}
                    placeholder={'검색어'}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Button buttonText={'검색'} onclick={() => {
                    onClickSearch(searchText);
                }} />
            </SearchWrap>
        </DocumentListHeaderBase>
    )
}