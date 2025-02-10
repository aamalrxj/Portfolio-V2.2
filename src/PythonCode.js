// src/PythonCode.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Space+Mono:wght@400;700&display=swap');
`;

const typing = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const blink = keyframes`
  50% { border-color: transparent }
`;

const Container = styled.div`
  background-color: #1e1e1e;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', monospace;
  position: relative;
  overflow: hidden;
`;

const BackgroundCode = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.03;
  font-family: 'Space Mono', monospace;
  font-size: 14px;
  color: #61dafb;
  pointer-events: none;
  overflow: hidden;
  white-space: pre-wrap;
  padding: 20px;
  line-height: 1.6;
`;

const Title = styled.div`
  color: #61dafb;
  font-size: 32px;
  margin-bottom: 50px;
  text-align: center;
  display: inline-block;
  overflow: hidden;
  border-right: 3px solid #61dafb;
  white-space: nowrap;
  font-weight: 500;
  letter-spacing: 1px;
  animation: 
    ${typing} 3.5s steps(40, end),
    ${blink} 0.75s step-end infinite;
  text-shadow: 0 0 10px rgba(97, 218, 251, 0.3);
`;

const CodeBlock = styled(motion.pre)`
  background-color: #282c34;
  padding: 45px 40px 45px 50px;
  border-radius: 12px;
  font-size: 22px;
  margin-bottom: 45px;
  color: #e06c75;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2),
              0 0 30px rgba(97, 218, 251, 0.1);
  position: relative;
  font-family: 'JetBrains Mono', monospace;
  line-height: 1.6;
  
  &::before {
    content: '1';
    position: absolute;
    left: 20px;
    color: #636d83;
    user-select: none;
    font-size: 14px;
    opacity: 0.7;
  }

  span {
    font-family: 'JetBrains Mono', monospace;
    font-weight: 400;
  }
`;

const RunButton = styled(motion.button)`
  background-color: #98c379;
  color: #282c34;
  border: none;
  padding: 16px 35px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.5px;
  text-transform: uppercase;

  &:hover {
    background-color: #7cb342;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2),
                0 0 20px rgba(152, 195, 121, 0.2);
  }
`;

const PythonCode = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const runCode = () => {
    navigate('/welcome');
  };

  const backgroundCode = `
def welcome_animation():
    print("Initializing...")
    time.sleep(1)
    print("Loading components...")
    time.sleep(0.5)
    print("Starting animation...")
    return "Welcome to my portfolio"
  `.repeat(20);

  return (
    <>
      <GlobalStyle />
      <Container>
        <BackgroundCode>{backgroundCode}</BackgroundCode>
        <Title>Portfolio Initialization</Title>
        <CodeBlock
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.02 }}
        >
          <span style={{color: '#61afef'}}>def</span>{' '}
          <span style={{color: '#98c379'}}>start_portfolio</span>():
          {'\n    '}<span style={{color: '#c678dd'}}>return</span>{' '}
          <span style={{color: '#98c379'}}>"Welcome...!"</span>
        </CodeBlock>
        <RunButton
          onClick={runCode}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Run Code
        </RunButton>
      </Container>
    </>
  );
};

export default PythonCode;
