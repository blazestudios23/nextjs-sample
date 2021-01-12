import { GetStaticProps } from "next";

import BaseLayout from "../compoenents/BaseLayout";
import SearchResults from "../compoenents/SearchResults";

import { Form, Label, Input, Button } from "reactstrap";

const Home = props => {
  return (
    <BaseLayout>
      <SearchResults repos={props.repos} />
    </BaseLayout>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  const res = await fetch("https://api.github.com/users/intuit/repos");
  const repos = await res.json();
  // By returning { props: repos }
  // will receive `repos` as a prop at build time
  return {
    props: {
      repos,
    },
  };
};

export default Home;
