import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles.js";
import Button from "./ui/Button.jsx";
import Input from "./ui/Input.jsx";
import Heading from "./ui/Heading.jsx";
import Row from "./ui/Row.jsx";

const StyledApp = styled.main`
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row $type={"horizontal"}>
            <Heading as="h1">The Wild Oasis</Heading>

            <div>
              <Heading as="h2">Check in and out</Heading>
              <Button
                type={"button"}
                onClick={() =>
                  alert("Checked in successfully. Enjoy your stay.")
                }
                $size={"medium"}
                $variation={"primary"}
              >
                Check In
              </Button>
              <Button
                type={"button"}
                onClick={() => alert("Checked out successfully.")}
                $size={"medium"}
                $variation={"secondary"}
              >
                Check Out
              </Button>
            </div>
          </Row>
          <Row>
            <Heading as={"h3"}>Form</Heading>
            <form action="">
              <Input type={"number"} placeholder={"Number of guests"} />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
