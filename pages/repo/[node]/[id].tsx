import { GetStaticProps } from "next";
import { Organization } from "../../../generated/graphql";
import { GET_REPOS } from "../../../graphql/queries";


import BaseLayout from "../../../compoenents/BaseLayout";
import SearchResult from "../../../compoenents/SearchResult";
import { Client } from "../..";

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

  const query = 

  const res = await Client.query({query: GET_REPOS});
  const repo = await res;
  // By returning { props: repo }
  // will receive `repo` as a prop at build time
  return {
    props: {
      repo,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await Client.query({ query: GET_REPOS });
  const org: Organization = await res.data.organization;
  const paths = org.repositories.edges.map(({node}) => ({
    params: { [node]: { id: node.name } },
  }));
  return { paths, fallback: false };
};

export default Repo;
