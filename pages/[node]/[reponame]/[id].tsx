import { GetStaticProps } from "next";
import { Organization, Repository } from "../../../generated/graphql";
import { GET_REPOS } from "../../../graphql/queries";

import BaseLayout from "../../../components/BaseLayout";
import SingleSearchResult from "../../../components/SingleSearchResult";
import { Client } from "../..";
import { Node, NodeArraySingle, NodeArrayList } from "../../../utils/types";
import {
  getSubNode,
  getRepository,
  getSubnodeIds,
  getSignleItemList,
  fixTitle,
  removeTrainingChar,
} from "../../../utils/functions";
import { INodeData, IRouteProps } from "../../../utils/interfaces";

const SingleItemDisplay = (props: IRouteProps) => {
  const { node, reponame } = props;

  return (
    <BaseLayout>
      <h2>{fixTitle(removeTrainingChar({ filter: node, char: "s" }))}</h2>
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

  // turn prop creation into a function, I had to move on
  // const props = NodeArraySingle.reduce(
  //   (obj, i) => {
  //     if (typeof node === "string" && i === node) {
  //       return {
  //         ...obj,
  //         [node]: getSubNode(Node[node], id, repo),
  //       };
  //     }
  //     return;
  //   },
  //   {
  //     reponame,
  //     node,
  //     [Node.repository]: node === Node.repository && repo,
  //   }
  // );

  return {
    props: {
      reponame,
      node,
      [Node.repository]:
        node === Node.repository &&
        Object.keys(repo)
          .filter(key => key !== "owner")
          .reduce((obj, key) => ({ ...obj, [key]: repo[key] }), {}),
      [Node.forks]: node === Node.forks && getSubNode(node, id, repo),
      [Node.issues]: node === Node.issues && getSubNode(node, id, repo),
      [Node.stargazers]: node === Node.stargazers && getSubNode(node, id, repo),
      [Node.watchers]: node === Node.watchers && getSubNode(node, id, repo),
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
  const listOfPaths = NodeArrayList.map(node =>
    getSignleItemList(org, node)
  ).flat();

  const paths = [...repository, ...listOfPaths];

  return { paths, fallback: false };
};

export default SingleItemDisplay;
