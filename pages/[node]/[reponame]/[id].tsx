import { GetStaticProps } from "next";
import { Organization, Repository } from "../../../generated/graphql";
import { GET_REPOS } from "../../../graphql/queries";

import BaseLayout from "../../../compoenents/BaseLayout";
import SingleSearchResult from "../../../compoenents/SingleSearchResult";
import { Client } from "../..";
import { Node } from "../../../utils/types";
import { getSubNode, getRepository } from "../../../utils/functions";
import { INodeData } from "../../../utils/interfaces";

interface IProps {
  reponame: string;
  node: Node;
  [Node.repository]: Repository;
  [Node.issue]: INodeData;
  [Node.stargazer]: INodeData;
  [Node.watcher]: INodeData;
}

const SingleItemDisplay = (props: IProps) => {
  console.log(props);
  const { node } = props;
  return (
    <BaseLayout>
      <SingleSearchResult data={props[Node[props.node]]} />
    </BaseLayout>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  console.log(context.params);

  const { id, node, reponame } = context.params;

  const res = await Client.query({ query: GET_REPOS });
  const org: Organization = await res.data.organization;
  const repo = getRepository(reponame, org);
  // By returning { props: reponame }
  // will receive `repo` as a prop at build time
  return {
    props: {
      reponame,
      node,
      [Node.repository]: node === Node.repository && repo,
      [Node.issue]: node === Node.issue && getSubNode(node, id, repo),
      [Node.stargazer]: node === Node.stargazer && getSubNode(node, id, repo),
      [Node.watcher]: node === Node.watcher && getSubNode(node, id, repo),
    },
  };
};

export const getStaticPaths = async () => {
  const res = await Client.query({ query: GET_REPOS });
  const org: Organization = await res.data.organization;
  const paths = org.repositories?.edges.map(({ node }) => ({
    params: {
      [Node.repository]: { [node.name]: { id: node.name } },
      [Node.issue]: {
        [node.name]: node?.issues?.edges.map(({ node }) => ({ id: node.id })),
      },
      [Node.stargazer]: {
        [node.name]: node?.stargazers?.edges.map(({ node }) => ({
          id: node.id,
        })),
      },
      [Node.watcher]: {
        [node.name]: node?.watchers?.edges.map(({ node }) => ({ id: node.id })),
      },
    },
  }));
  return { paths, fallback: false };
};

export default SingleItemDisplay;
