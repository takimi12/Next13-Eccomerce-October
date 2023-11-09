import FormWrap from "../components/FormWrapper";
import Container from "../components/Container";
import LoginForm from "./LoginForm";

const Login = async () => {

  return (
    <Container>
      <FormWrap>
        <LoginForm  />
      </FormWrap>
    </Container>
  );
};

export default Login;
