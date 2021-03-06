import { GetStaticProps } from "next";
import fetch from "cross-fetch";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { Organization } from "../generated/graphql";

import BaseLayout from "../components/BaseLayout";
import SearchResults from "../components/SearchResults";
import { GET_REPOS } from "../graphql/queries";

const Home = props => {
  return (
    <BaseLayout data-test="home-page">
      <SearchResults repos={props.repos} />
    </BaseLayout>
  );
};

export const Client = new ApolloClient({
  // link: new HttpLink({ uri: "https://api.github.com/graphq", fetch }),
  uri: "https://api.github.com/graphql",
  headers: { Authorization: `bearer ${process.env.NEXT_APP_GITHUB_API_KEY}` },
  cache: new InMemoryCache(),
});

export const getStaticProps: GetStaticProps = async context => {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  // const res = await fetch("https://api.github.com/users/intuit/repos");
  const res = await Client.query({ query: GET_REPOS });

  const org: Organization = await res.data.organization;

  // By returning { props: repos }
  // will receive `repos` as a prop at build time
  return {
    props: {
      repos: org.repositories.edges,
    },
  };
};

export default Home;
