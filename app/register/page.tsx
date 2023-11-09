import FormWrap from "../components/FormWrapper";
import Container from "../components/Container";
import RegisterForm from "./RegisterForm";


const Register = async () => {

  return (
    <Container>
      <FormWrap>
    <RegisterForm />
      </FormWrap>
    </Container>
  );
};

export default Register;
