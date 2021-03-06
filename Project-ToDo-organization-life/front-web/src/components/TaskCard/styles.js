import styled from 'styled-components';

export const Container = styled.div`
    width: 250px;
    height: 200px;
    box-shadow: -4px -7px 13px 0px rgba(0,0,0,0.49);
    border-radius: 10px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    opacity: ${props => props.done ? 0.5 : 1};

    margin: 60px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover{
        opacity: 0.5;
    }
`

export const TopCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const BottomCard = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;

    strong {
        color: #EE6B26;
        font-weight: bold;
    }

    span {
        color: #707070;
    }
`