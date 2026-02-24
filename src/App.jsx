import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles.js";
import Button from "./ui/Button.jsx";
import Input from "./ui/Input.jsx";

const H1 = styled.h1`
  font-size: 32px;
  font-weight: 600;
  background-color: yellow;
`;

const StyledApp = styled.main`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>The Wild Oasis</H1>
        <Button
          type={"button"}
          onClick={() => alert("Checked in successfully. Enjoy your stay.")}
        >
          Check In
        </Button>
        <Button
          type={"button"}
          onClick={() => alert("Checked out successfully.")}
        >
          Check Out
        </Button>
        <Input type={"number"} placeholder={"Number of guests"} />
      </StyledApp>
    </>
  );
}

export default App;
