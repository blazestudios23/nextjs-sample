import { GetStaticProps } from "next";
import { Organization, Repository } from "../../../generated/graphql";
import { GET_REPOS } from "../../../graphql/queries";

import BaseLayout from "../../../compoenents/BaseLayout";
import SingleSearchResult from "../../../compoenents/SingleSearchResult";
import { Client } from "../..";
import { Node, NodeArraySingle } from "../../../utils/types";
import {
  getSubNode,
  getRepository,
  getSubnodeIds,
  getSignleItemList,
} from "../../../utils/functions";
import { INodeData, IRouteProps } from "../../../utils/interfaces";

const SingleItemDisplay = (props: IRouteProps) => {
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

  const repository = org.repositories?.edges.map(({ node }) => ({
    params: {
      node: Node.repository,
      reponame: node.name,
      id: node.name,
    },
  }));

  // generates all routes to be pre-rendered
  const listOfPaths = NodeArraySingle.map(node =>
    getSignleItemList(org, node)
  ).flat();

  const paths = [...repository, ...listOfPaths];

  return { paths, fallback: false };
};

export default SingleItemDisplay;
