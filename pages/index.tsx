import Head from "next/head";
import BaseLayout from "../compoenents/BaseLayout";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const Home = () => {
  return (
    <BaseLayout>
      <Form inline>
        <Label for="search" hidden>
          Password
        </Label>
        <Input name="search" id="search" placeholder="search..." />

        <Button>Submit</Button>
      </Form>
    </BaseLayout>
  );
};
export default Home;
