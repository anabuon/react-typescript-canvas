import styled from "styled-components";
import { Props } from "./App.interface";



export const S = {
    AppWrapper : styled.div<Props>`
        width: ${props => 42*props.width}px;
        display: flex;
        flex-wrap: wrap;
    `,

    Square : styled.div`
        width: 40px; 
        height: 40px; 
        border: solid 1px black;
        text-align: center;
        background: ${props => props.color}
    `,
}

