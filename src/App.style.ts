import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center
`;

export const RowBox = styled.div`
  display: flex;
  align-items: center;

  `;
export const Input = styled.input`
  width: 500px;
  height: 32px;
  font-size: 15px;
  border: 0;
  border-radius: 15px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);

    `;  

export const Button = styled.button`
    background-color:#0a0a23;
    color: #fff;
    border:none; 
    border-radius:10px; 
    width: 100px;
    height: 30px;
    
    `;

export const List = styled.ul`
`;

export const Todo = styled.li`
display: flex;
justify-content: space-between;
align-items: flex-end;
width: 300PX;
padding: 5px 0px 5px 5px;
    margin-bottom: 5px;
    border-bottom: 1px solid #dfdfdf;
    font-size: 12px;`;
