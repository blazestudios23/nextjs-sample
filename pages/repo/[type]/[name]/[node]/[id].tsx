import { GetStaticProps } from "next";
import { Organization, Repository } from "../../../../../generated/graphql";
import { GET_REPOS } from "../../../../../graphql/queries";

import BaseLayout from "../../../../../compoenents/BaseLayout";
import SearchResult from "../../../../../compoenents/SearchResult";
import { Client } from "../../../..";
import { Node } from "../../../../../utils/types";
import {
  getSubNodeEdge,
  getSubNode,
  getRepository,
} from "../../../../../utils/functions";
import { INodeData } from "../../../../../utils/interfaces";

interface IProps {
  type: string;
  node: string;
  [Node.repository]: Repository;
  [Node.issue]: INodeData;
  [Node.issues]: INodeData[];
  [Node.stargazer]: INodeData;
  [Node.stargazers]: INodeData[];
  [Node.watcher]: INodeData;
  [Node.watchers]: INodeData[];
}

const Repo = (props: IProps) => {
  console.log(props);

  return (
    <BaseLayout>
      <SearchResult data={props[Node[props.node]]} />
    </BaseLayout>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  const { type, node, id, name } = context.params;

  const res = await Client.query({ query: GET_REPOS });
  const org: Organization = await res.data.organization;
  const repo = getRepository(name, org);
  // By returning { props: repo }
  // will receive `repo` as a prop at build time
  return {
    props: {
      type,
      node,
      [Node.repository]: node === Node.repository && repo,
      [Node.issue]: node === Node.issue && getSubNode(node, id, repo),
      [Node.issues]: node === Node.issues && getSubNodeEdge(node, repo),
      [Node.stargazer]: node === Node.stargazer && getSubNode(node, id, repo),
      [Node.stargazers]: node === Node.stargazers && getSubNodeEdge(node, repo),
      [Node.watcher]: node === Node.watcher && getSubNode(node, id, repo),
      [Node.watchers]: node === Node.watchers && getSubNodeEdge(node, repo),
    },
  };
};

export const getStaticPaths = async () => {
  const res = await Client.query({ query: GET_REPOS });
  const org: Organization = await res.data.organization;
  const paths = org.repositories?.edges.map(({ node }) => ({
    params: {
      [Node.repository]: { id: node.name },
      [Node.issue]: node?.issues?.edges.map(({ node }) => node),
      [Node.issues]: node?.issues?.edges.map(({ node }) => ({ id: node.id })),
      [Node.stargazer]: node?.stargazers?.edges.map(({ node }) => node),
      [Node.stargazers]: node?.stargazers?.edges.map(({ node }) => ({
        id: node.id,
      })),
      [Node.watcher]: node?.watchers?.edges.map(({ node }) => node),
      [Node.watchers]: node?.watchers?.edges.map(({ node }) => ({
        id: node.id,
      })),
    },
  }));
  return { paths, fallback: false };
};

export default Repo;
