import styled from "styled-components";

const ButtonBase = styled.button`
    display: flex;
    justify-content: space-around;
    align-items: center;

    width: 110px;
    height: 35px;
    
    border: none;
    background-color: rgb(59, 194, 251);

    font-weight: bold;
    color: white;

    :hover {
        cursor: pointer;
    }
`

const ImageBox = styled.div`
    width: 20px;
    height: 20px;
`

export const Button = ({ buttonText, imgFileName = 'logo192.png', onclick=() => {} }) => {
    
    return (
        <ButtonBase onClick={onclick}>
            <ImageBox>
                <img src={`${process.env.PUBLIC_URL}/${imgFileName}`}/>
            </ImageBox>
            {buttonText}
        </ButtonBase>
    )

}