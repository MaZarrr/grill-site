import styled from 'styled-components';

export const Button = styled.button `
    background: rebeccapurple;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    cursor:pointer;
    white-space: nowrap;
    ${props => props.block ? 'display: block; width: 100%;' : 'width: 50%'}

    &:hover{
        background: indigo;
    }
`