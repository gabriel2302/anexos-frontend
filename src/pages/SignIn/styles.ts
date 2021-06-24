import styled from 'styled-components';


export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.img`
  height: 100px;
  margin-top: -50px;
  margin-bottom: 30px;
  
  @media screen and (max-width: 950px) {
    
  }
`;

export const LoginContainer = styled.div`
  width: 400px;
  height: 400px;
  background-color: #f5f5f5;
  padding: 20px;
  -webkit-box-shadow: 4px 8px 11px -3px rgba(0,0,0,0.31); 
  box-shadow: 4px 8px 11px -3px rgba(0,0,0,0.31);

  h2 {
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 35px;
  }
`;

export const Form = styled.form`
  input {
    width: 100%;
    height: 50px;
    padding: 0 20px;
    border-radius: 5px;
    border-color: transparent;
    background: #fff;
    font-size: 18px;

    &:focus {
      border: red;
    }
  }

  input + input {
    margin-top: 30px;
  }

  button {
    margin-top: 30px;
    height: 50px;
    width: 100%;
    border: 0;
    border-radius: 5px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 16px;
    background-color: #bdbebd;
    &:hover {
      filter: brightness(0.9);
    }

    &:active {
      filter: brightness(0.7);
    }
  }
`;