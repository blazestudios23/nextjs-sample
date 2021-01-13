import { GetStaticProps } from "next";
import { Organization, Repository } from "../../../generated/graphql";
import { GET_REPOS } from "../../../graphql/queries";

import BaseLayout from "../../../compoenents/BaseLayout";
import SingleSearchResult from "../../../compoenents/SingleSearchResult";
import { Client } from "../..";
import { Node, TypeName } from "../../../utils/types";
import {
  getSubNodeEdge,
  getSubNode,
  getRepository,
} from "../../../utils/functions";
import { INodeData, IRouteProps } from "../../../utils/interfaces";

const Repo = (props: IRouteProps) => {
  // console.log(props);
  const { node, reponame } = props;

  return (
    <BaseLayout>
      <SingleSearchResult
        data={props[Node[props.node]]}
        node={node}
        reponame={reponame}
      />
    </BaseLayout>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  // console.log(context.params);

  const { type, id, node } = context.params;
  const name = context.params.repo;

  const res = await Client.query({ query: GET_REPOS });
  const org: Organization = await res.data.organization;
  const repo = getRepository(name, org);
  // By returning { props: repo }
  // will receive `repo` as a prop at build time
  return {
    props: {
      type,
      node,
      [Node.issues]: node === Node.issues && getSubNodeEdge(node, repo),
      [Node.stargazers]: node === Node.stargazers && getSubNodeEdge(node, repo),
      [Node.watchers]: node === Node.watchers && getSubNodeEdge(node, repo),
    },
  };
};

export const getStaticPaths = async () => {
  const res = await Client.query({ query: GET_REPOS });
  const org: Organization = await res.data.organization;
  const paths = org.repositories?.edges.map(({ node }) => ({
    params: {
      [node.name]: {
        [TypeName.single]: { [Node.repository]: { id: node.name } },
      },
      [node.name]: {
        [TypeName.single]: {
          [Node.issue]: { id: node?.issues?.edges.map(({ node }) => node.id) },
        },
      },
      [node.name]: {
        [TypeName.list]: {
          [Node.issues]: node?.issues?.edges.map(({ node }) => ({
            id: 0,
          })),
        },
      },
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
