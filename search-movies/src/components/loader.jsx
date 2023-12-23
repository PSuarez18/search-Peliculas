import React from 'react';
import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Ajusta la altura según tus necesidades */
`;

const LoaderCircle = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid transparent;
  border-top-color: green;
  border-radius: 50%;
  animation: ${spinAnimation} 1s linear infinite;
`;

const Loader = () => {
  return (
    <LoaderWrapper>
      <LoaderCircle />
    </LoaderWrapper>
  );
};

export default Loader;

