// src/WelcomePage.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { HiLightBulb, HiOutlineLightBulb } from 'react-icons/hi';
import { FaLinkedin, FaGithub, FaFileDownload } from 'react-icons/fa';

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  position: relative;
  background: ${props => props.isLightMode ? 
    '#ffffff' : 
    'linear-gradient(45deg, #000000, #2b2b2b, #4f4f4f, #727272, #4f4f4f, #2b2b2b, #000000)'};
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  transition: background 0.3s ease;
`;

const ThemeToggle = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  color: ${props => props.isLightMode ? '#000000' : '#ffffff'};
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${props => props.isLightMode ? 
      'rgba(0, 0, 0, 0.1)' : 
      'rgba(255, 255, 255, 0.1)'};
  }
`;

const WelcomeContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10vh;
`;

const WelcomeText = styled.h1`
  color: ${props => props.isLightMode ? '#000000' : '#ffffff'};
  font-size: 28px;
  font-weight: 500;
  margin-right: 14px;
  letter-spacing: 7px;
  text-transform: uppercase;
`;

const Letter = styled(motion.span)`
  display: inline-block;
`;

const Hand = styled(motion.span)`
  font-size: 28px;
`;

const MainContent = styled(motion.div)`
  text-align: center;
  width: 100%;
  max-width: 800px;
  padding: 0 20px;
  margin-top: 15vh;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${props => props.isLightMode ? 
    'rgba(0, 0, 0, 0.15)' : 
    'rgba(255, 255, 255, 0.15)'};
  margin: 30px auto;
`;

const Name = styled.h2`
  color: ${props => props.isLightMode ? '#000000' : '#ffffff'};
  font-size: 32px;
  letter-spacing: 10px;
  margin: 0;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
`;

const Title = styled.h3`
  color: ${props => props.isLightMode ? 
    'rgba(0, 0, 0, 0.7)' : 
    'rgba(255, 255, 255, 0.7)'};
  font-size: 12px;
  letter-spacing: 2px;
  margin: 20px 0;
  font-weight: 400;
  text-align: center;
`;

const Navigation = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background-color: ${props => props.isLightMode ? 
      'rgba(0, 0, 0, 0.15)' : 
      'rgba(255, 255, 255, 0.15)'};
    z-index: 0;
  }
`;

const NavContainer = styled.div`
  display: inline-flex;
  border: 1px solid ${props => props.isLightMode ? 
    'rgba(0, 0, 0, 0.15)' : 
    'rgba(255, 255, 255, 0.15)'};
  position: relative;
  z-index: 1;
  background-color: ${props => props.isLightMode ? 
    'rgba(255, 255, 255, 1)' : // Changed to fully opaque
    'rgba(0, 0, 0, 1)'}; // Changed to fully opaque
`;

const NavButton = styled.button`
  background: transparent;
  border: none;
  border-right: 1px solid ${props => props.isLightMode ? 
    'rgba(0, 0, 0, 0.15)' : 
    'rgba(255, 255, 255, 0.15)'};
  color: ${props => props.isLightMode ? '#000000' : '#ffffff'};
  padding: 12px 25px;
  cursor: pointer;
  font-size: 11px;
  letter-spacing: 2px;
  transition: all 0.3s ease;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;

  &:last-child {
    border-right: none;
  }

  &:hover {
    background: ${props => props.isLightMode ? 
      'rgba(0, 0, 0, 0.05)' : 
      'rgba(255, 255, 255, 0.05)'};
  }
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 20px;
  color: ${props => props.isLightMode ? 
    'rgba(0, 0, 0, 0.5)' : 
    'rgba(255, 255, 255, 0.5)'};
  font-size: 10px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;

const FooterText = styled.span`
  &::after {
    content: 'ALL RIGHTS RESERVED';
    text-decoration: underline;
    margin-left: 5px;
    opacity: 0.7;
  }
`;

const matrixAnimation = keyframes`
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
`;

const PopupOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const PopupContent = styled(motion.div)`
  background: ${(props) => (props.isLightMode ? '#ffffff' : 'rgba(0, 0, 0, 0.95)')};
  padding: 60px;
  border-radius: 10px;
  width: ${(props) => (props.activePopup === 'PROJECTS' ? '70%' : '50%')};
  height: ${(props) => (props.activePopup === 'PROJECTS' ? '80vh' : '60vh')};
  position: relative;
  color: ${(props) => (props.isLightMode ? '#000000' : '#ffffff')};
  overflow-y: auto;
  
  &::before {
    content: '<div> {code} </div>';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    opacity: ${(props) => (props.isLightMode ? '0.02' : '0.04')};
    font-family: 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.6;
    white-space: pre;
    pointer-events: none;
    background: linear-gradient(
      transparent,
      ${(props) => (props.isLightMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)')} 
      transparent
    );
    background-size: 200% 200%;
    animation: ${matrixAnimation} infinite linear;
    z-index: -1; /* Behind content */
  }
`;

const PopupTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 30px;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: ${props => props.isLightMode ? '#000000' : '#ffffff'};
`;

const IntroText = styled.div`
  text-align: left;
  line-height: 1.8;
  font-size: 15px;
  max-width: 90%;
  margin: 20px auto;
  letter-spacing: 1px;
  color: ${props => props.isLightMode ? '#000000' : '#ffffff'};
`;

const SkillSection = styled.div`
  margin-bottom: 30px;
  width: 100%;
`;

const SkillCategory = styled.h3`
  font-size: 20px;
  margin-bottom: 15px;
  letter-spacing: 2px;
  color: ${props => props.isLightMode ? '#000000' : '#ffffff'};
`;

const SkillGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;
`;

const SkillItem = styled.div`
  background: ${props => props.isLightMode ? 
    'rgba(0, 0, 0, 0.05)' : 
    'rgba(255, 255, 255, 0.05)'};
  padding: 15px;
  border-radius: 8px;
`;

const SkillTitle = styled.h4`
  font-size: 16px;
  margin-bottom: 10px;
  color: ${props => props.isLightMode ? '#000000' : '#ffffff'};
`;

const SkillList = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: ${props => props.isLightMode ? 
    'rgba(0, 0, 0, 0.8)' : 
    'rgba(255, 255, 255, 0.8)'};
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }

  li {
    font-weight: bold;
  }
`;

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
`;

const ContactItem = styled.div`
  margin: 20px 0;
  font-size: 19px; 
  color: ${props => props.isLightMode ? '#000000' : '#ffffff'};
  line-height: 0.7;
`;

const ContactInfo = styled.div`
  text-align: center;
  width: 100%;
  padding: 20px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const SocialLink = styled.a`
  color: ${props => props.isLightMode ? '#000000' : '#ffffff'};
  font-size: 24px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 6px;
  background: ${props => props.isLightMode ? 
    'rgba(0, 0, 0, 0.05)' : 
    'rgba(255, 255, 255, 0.05)'};

  &:hover {
    background: ${props => props.isLightMode ? 
      'rgba(0, 0, 0, 0.1)' : 
      'rgba(255, 255, 255, 0.1)'};
    transform: translateY(-2px);
  }
`;

const ResumeButton = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 25px;
  border-radius: 8px;
  background: ${props => props.isLightMode ? '#000000' : '#ffffff'};
  color: ${props => props.isLightMode ? '#ffffff' : '#000000'};
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  margin-top: 5px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  color: ${props => props.isLightMode ? '#000000' : '#ffffff'};
  font-size: 28px;
  cursor: pointer;
  padding: 10px;
  transition: all 0.3s ease;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${props => props.isLightMode ? 
      'rgba(0, 0, 0, 0.1)' : 
      'rgba(255, 255, 255, 0.1)'};
  }
`;

const SoftSkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  margin-top: 15px;
`;

const SoftSkillItem = styled.div`
  background: ${props => props.isLightMode ? 
    'rgba(0, 0, 0, 0.05)' : 
    'rgba(255, 255, 255, 0.05)'};
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  color: ${props => props.isLightMode ? 
    'rgba(0, 0, 0, 0.8)' : 
    'rgba(255, 255, 255, 0.8)'};
`;

const ProjectsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;  // Increased gap between projects
  padding: 20px;
`;

const ProjectCard = styled.div`
  background: ${props => props.isLightMode ? 
    'rgba(0, 0, 0, 0.05)' : 
    'rgba(255, 255, 255, 0.05)'};
  padding: 35px;  // Increased padding inside cards
  border-radius: 12px;
  width: 90%;
  border: 1px solid ${props => props.isLightMode ? 
    'rgba(0, 0, 0, 0.1)' : 
    'rgba(255, 255, 255, 0.1)'};
`;

const ProjectTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 15px;
  color: ${props => props.isLightMode ? '#000000' : '#ffffff'};
  letter-spacing: 1.5px;
`;

const ProjectDescription = styled.p`
  font-size: 14px;
  line-height: 1.8;
  margin-bottom: 15px;
  color: ${props => props.isLightMode ? 
    'rgba(0, 0, 0, 0.8)' : 
    'rgba(255, 255, 255, 0.8)'};
`;

const TechStack = styled.div`
  font-size: 13px;
  color: ${props => props.isLightMode ? 
    'rgba(0, 0, 0, 0.6)' : 
    'rgba(255, 255, 255, 0.6)'};
  letter-spacing: 0.5px;
  font-style: italic;
  border-top: 1px solid ${props => props.isLightMode ? 
    'rgba(0, 0, 0, 0.1)' : 
    'rgba(255, 255, 255, 0.1)'};
  padding-top: 15px;
  margin-top: 15px;
`;

const WelcomePage = () => {
  const [text, setText] = useState('');
  const [showHand, setShowHand] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [activePopup, setActivePopup] = useState(null);
  const fullText = 'Welcome...!';

  const getPopupContent = (section) => {
    switch(section) {
      case 'INTRO':
      return (
        <>
          <PopupTitle isLightMode={isLightMode}>About Me</PopupTitle>
          <IntroText isLightMode={isLightMode}>
            A highly skilled and versatile software developer specializing in web development (front-end and back-end), Python programming, and SQL database management. Currently pursuing Master's in Computer Applications through online education, balancing professional development with academic excellence. Proficient in modern web frameworks, delivering responsive, scalable, and user-friendly applications. Strong experience in back-end development using Python and databases (MySQL, PostgreSQL). Passionate about leveraging technology to solve real-world problems while continuously expanding knowledge through advanced studies in computer applications.
          </IntroText>
        </>
      );

      case 'PROJECTS':
  return (
    <>
      <PopupTitle isLightMode={isLightMode}>My Projects</PopupTitle>
      <ProjectsContainer>
      <ProjectCard isLightMode={isLightMode}>
        <ProjectTitle isLightMode={isLightMode}>InView AI</ProjectTitle>
        <ProjectDescription isLightMode={isLightMode}>
          An AI-driven mock interview platform under development, designed to help users enhance interview skills through real-time simulations, feedback, and resources for resume building and interview readiness.
        </ProjectDescription>
        <TechStack isLightMode={isLightMode}>
          Technologies: PHP, JavaScript, HTML, CSS, MySQL | Platform: VS Code | Hosted on XAMPP
        </TechStack>
      </ProjectCard>
      </ProjectsContainer>
      
      <ProjectsContainer>
      <ProjectCard isLightMode={isLightMode}>
        <ProjectTitle isLightMode={isLightMode}>Healthify (Hack-Elite Hackathon)</ProjectTitle>
        <ProjectDescription isLightMode={isLightMode}>
          A reminder app assisting elderly users with medication schedules, meal times, and appointments to maintain health routines.
        </ProjectDescription>
        <TechStack isLightMode={isLightMode}>
          Technologies: Flutter, Java, Kotlin | Platform: Android Studio
        </TechStack>
      </ProjectCard>
      </ProjectsContainer>
     
      <ProjectsContainer>
      <ProjectCard isLightMode={isLightMode}>
        <ProjectTitle isLightMode={isLightMode}>Charity Food Donation Website</ProjectTitle>
        <ProjectDescription isLightMode={isLightMode}>
          Connects donors with charity organizations to distribute surplus food effectively.
        </ProjectDescription>
        <TechStack isLightMode={isLightMode}>
          Technologies: PHP, JavaScript, HTML, CSS, MySQL | Platform: VS Code | Hosted on XAMPP
        </TechStack>
      </ProjectCard>
      </ProjectsContainer>
     
      <ProjectsContainer>
      <ProjectCard isLightMode={isLightMode}>
        <ProjectTitle isLightMode={isLightMode}>Movie Ticket Booking System</ProjectTitle>
        <ProjectDescription isLightMode={isLightMode}>
          A Python-based system providing basic functionality for booking movie tickets with user authentication, seat selection, and payment processing.
        </ProjectDescription>
        <TechStack isLightMode={isLightMode}>
          Technologies: Python, MySQL | Platform: Python IDLE
        </TechStack>
      </ProjectCard>
      </ProjectsContainer>
    </>
  );
      case 'SKILLS':
        return (
          <>
            <PopupTitle isLightMode={isLightMode}>Skills</PopupTitle>
            
            <SkillSection>
              <SkillCategory isLightMode={isLightMode}>Technical Skills</SkillCategory>
              <SkillGrid>
                <SkillItem isLightMode={isLightMode}>
                  <SkillTitle isLightMode={isLightMode}>Web Development</SkillTitle>
                  <SkillList isLightMode={isLightMode}>
                    Node.js, Express.js, Angular, PHP, JavaScript, HTML, CSS, Bootstrap
                  </SkillList>
                </SkillItem>
                <SkillItem isLightMode={isLightMode}>
                  <SkillTitle isLightMode={isLightMode}>Data Analytics</SkillTitle>
                  <SkillList isLightMode={isLightMode}>
                    Pandas, Numpy, Matplotlib, SQL
                  </SkillList>
                </SkillItem>
                <SkillItem isLightMode={isLightMode}>
                  <SkillTitle isLightMode={isLightMode}>Programming & Scripting</SkillTitle>
                  <SkillList isLightMode={isLightMode}>
                    Python, Java, C, C++
                  </SkillList>
                </SkillItem>
                <SkillItem isLightMode={isLightMode}>
                  <SkillTitle isLightMode={isLightMode}>Database Management</SkillTitle>
                  <SkillList isLightMode={isLightMode}>
                    MySQL, PostgreSQL, MongoDB
                  </SkillList>
                </SkillItem>
                <SkillItem isLightMode={isLightMode}>
                  <SkillTitle isLightMode={isLightMode}>Operating Systems</SkillTitle>
                  <SkillList isLightMode={isLightMode}>
                    Windows, Linux (Ubuntu, Kali Linux)
                  </SkillList>
                </SkillItem>
                <SkillItem isLightMode={isLightMode}>
                  <SkillTitle isLightMode={isLightMode}>Other Tools</SkillTitle>
                  <SkillList isLightMode={isLightMode}>
                    Oracle VM VirtualBox, Git, Git Bash
                  </SkillList>
                </SkillItem>
              </SkillGrid>
  
              <SkillCategory isLightMode={isLightMode}>Soft Skills</SkillCategory>
        <SoftSkillsContainer>
          <SoftSkillItem isLightMode={isLightMode}>Communication</SoftSkillItem>
          <SoftSkillItem isLightMode={isLightMode}>Creativity</SoftSkillItem>
          <SoftSkillItem isLightMode={isLightMode}>Problem Solving</SoftSkillItem>
          <SoftSkillItem isLightMode={isLightMode}>Teamwork</SoftSkillItem>
          <SoftSkillItem isLightMode={isLightMode}>Self-Learning</SoftSkillItem>
          <SoftSkillItem isLightMode={isLightMode}>Critical Thinking</SoftSkillItem>
          <SoftSkillItem isLightMode={isLightMode}>Leadership</SoftSkillItem>
          <SoftSkillItem isLightMode={isLightMode}>Time Management</SoftSkillItem>
          <SoftSkillItem isLightMode={isLightMode}>Adaptability</SoftSkillItem>
        </SoftSkillsContainer>
      </SkillSection>
    </>
  );
  case 'CONTACT':
    return (
      <>
        <PopupTitle isLightMode={isLightMode}>Contact Me</PopupTitle>
        <ContactContainer>
          <ContactInfo>
            <ContactItem isLightMode={isLightMode}>
            📧 Email: amalraj.s251@gmail.com
            </ContactItem>
            <ContactItem isLightMode={isLightMode}>
            📱 Phone: +9745694247
            </ContactItem>
            <ContactItem isLightMode={isLightMode}>
            📍 Address: Kozhikode, Kerala – 673525, India
            </ContactItem>
          </ContactInfo>
  
          <SocialLinks>
            <SocialLink 
              href="https://www.linkedin.com/in/amal-raj-praseena-sajeeve-280645251" 
              target="_blank"
              rel="noopener noreferrer"
              isLightMode={isLightMode}
            >
              <FaLinkedin /> LinkedIn
            </SocialLink>
            <SocialLink 
              href="https://github.com/aamalrxj" 
              target="_blank"
              rel="noopener noreferrer"
              isLightMode={isLightMode}
            >
              <FaGithub /> GitHub
            </SocialLink>
          </SocialLinks>
  
          <ResumeButton 
            href="https://drive.google.com/file/d/1997qY8mBqVj-cN1cbPjto74sU4nIx6iz/view?usp=sharing" 
            download
            isLightMode={isLightMode}
          >
            <FaFileDownload /> View Resume
          </ResumeButton>
        </ContactContainer>
      </>
    );
      }
    }

  useEffect(() => {
    const animateText = async () => {
      for (let i = 0; i < fullText.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setText(fullText.slice(0, i + 1));
      }
      setShowHand(true);
      setTimeout(() => setShowContent(true), 1500);
    };
    animateText();
  }, []);

  return (
    <Container isLightMode={isLightMode}>
      <ThemeToggle 
        onClick={() => setIsLightMode(!isLightMode)}
        isLightMode={isLightMode}
      >
        {isLightMode ? <HiLightBulb /> : <HiOutlineLightBulb />}
      </ThemeToggle>
      <WelcomeContainer>
        <WelcomeText isLightMode={isLightMode}>
          <AnimatePresence>
            {text.split('').map((char, index) => (
              <Letter
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {char}
              </Letter>
            ))}
          </AnimatePresence>
        </WelcomeText>
        <AnimatePresence>
          {showHand && (
            <Hand
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: [0, -20, 20, -20, 20, 0] }}
              transition={{ 
                duration: 1,
                scale: { type: "spring", stiffness: 200, damping: 10 },
                rotate: { duration: 1.5, yoyo: Infinity, ease: "easeInOut", delay: 0.5 }
              }}
            >
              👋🏼
            </Hand>
          )}
        </AnimatePresence>
      </WelcomeContainer>
      <AnimatePresence>
        {showContent && (
          <MainContent
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HorizontalLine isLightMode={isLightMode} />
            <Name isLightMode={isLightMode}>AMAL RAJ PRASEENA SAJEEVE</Name>
            <Title isLightMode={isLightMode}>MASTER'S STUDENT IN COMPUTER APPLICATION</Title>
            <Navigation isLightMode={isLightMode}>
              <NavContainer isLightMode={isLightMode}>
                {['INTRO', 'PROJECTS', 'SKILLS', 'CONTACT'].map((section) => (
                  <NavButton 
                    key={section}
                    isLightMode={isLightMode}
                    onClick={() => setActivePopup(section)}
                  >
                    {section}
                  </NavButton>
                ))}
              </NavContainer>
            </Navigation>
          </MainContent>
        )}
      </AnimatePresence>
      <Footer isLightMode={isLightMode}>
        <FooterText>© AMAL RAJ PRASEENA SAJEEVE</FooterText>
      </Footer>

      <AnimatePresence>
        {activePopup && (
          <PopupOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePopup(null)}
          >
            <PopupContent
              isLightMode={isLightMode}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton 
                isLightMode={isLightMode}
                onClick={() => setActivePopup(null)}
              >
                ×
              </CloseButton>
              {getPopupContent(activePopup)}
            </PopupContent>
          </PopupOverlay>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default WelcomePage;