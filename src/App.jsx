import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles.js";
import Button from "./ui/Button.jsx";
import Input from "./ui/Input.jsx";
import Heading from "./ui/Heading.jsx";


const StyledApp = styled.main`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as="h1">The Wild Oasis</Heading>
        <Heading as="h2">Check in and out</Heading>
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
        <Heading as={"h3"}>Form</Heading>
        <Input type={"number"} placeholder={"Number of guests"} />
      </StyledApp>
    </>
  );
}

export default App;
