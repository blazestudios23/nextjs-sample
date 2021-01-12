import { GetStaticProps } from "next";

import BaseLayout from "../../compoenents/BaseLayout";
import SearchResult from "../../compoenents/SearchResult";

import { Form, Label, Input, Button } from "reactstrap";

const Repo = props => {
  return (
    <BaseLayout>
      <SearchResult repo={props.repo} />
    </BaseLayout>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  const res = await fetch(
    `https://api.github.com/repos/intuit/${context.params.name}`
  );
  const repo = await res.json();
  // By returning { props: repo }
  // will receive `repo` as a prop at build time
  return {
    props: {
      repo,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch("https://api.github.com/users/intuit/repos");
  const repos = await res.json();
  const paths = repos.map(repo => ({
    params: { name: repo.name },
  }));
  return { paths, fallback: false };
};

export default Repo;
