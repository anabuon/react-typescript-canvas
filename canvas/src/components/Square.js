import React from "react";
import styled from "styled-components";

const SquareStyle = styled.div`
    width: 40px; 
    height: 40px; 
    border: solid 1px black;
    text-align: center;
    background: ${props => props.color}
`

  const Square = (props) =>  {

  
      return (
        <SquareStyle color={props.color}>{props.text}</SquareStyle>
      )
    
  }

  export default Square
