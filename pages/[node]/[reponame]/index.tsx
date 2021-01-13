import { GetStaticProps } from "next";
import BootstrapTable from "react-bootstrap-table-next";
import { Organization, Repository } from "../../../generated/graphql";
import { GET_REPOS } from "../../../graphql/queries";

import BaseLayout from "../../../compoenents/BaseLayout";
import SingleSearchResult from "../../../compoenents/SingleSearchResult";
import { Client } from "../..";
import { Node, NodeArrayList } from "../../../utils/types";

import {
  getSubNodeEdge,
  getSubNode,
  getRepository,
} from "../../../utils/functions";
import { INodeData, IRouteProps } from "../../../utils/interfaces";

const Repo = (props: IRouteProps) => {
  // console.log(props);
  const { node, reponame } = props;
  console.log(props.issue);

  return (
    <BaseLayout>
      <BootstrapTable
        hover
        bordered={false}
        classes="mt-2 pt-2"
        bootstrap4
        data-test="logs-type-table"
        keyField={"id"}
        data={results}
        columns={cols}
        headerClasses="thead-dark"
        history={history}
        rowEvents={{ onClick }}
        pagination={paginationFactory()}
        defaultSorted={[
          {
            dataField: "id",
            order: "desc",
          },
        ]}
      />
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
  const { id, node, reponame } = context.params;

  const res = await Client.query({ query: GET_REPOS });
  const org: Organization = await res.data.organization;
  const repo = getRepository(reponame, org);
  // By returning { props: repo }
  // will receive `repo` as a prop at build time
  return {
    props: {
      reponame,
      node,
      [Node.forks]: node === Node.forks && getSubNodeEdge(node, repo),
      [Node.issues]: node === Node.issues && getSubNodeEdge(node, repo),
      [Node.stargazers]: node === Node.stargazers && getSubNodeEdge(node, repo),
      [Node.watchers]: node === Node.watchers && getSubNodeEdge(node, repo),
    },
  };
};

export const getStaticPaths = async () => {
  const res = await Client.query({ query: GET_REPOS });
  const org: Organization = await res.data.organization;
  const paths = org.repositories?.edges
    .map(({ node }) =>
      NodeArrayList.map(
        nodeName => ({
          params: {
            node: nodeName,
            reponame: node.name,
          },
        }),
        {}
      )
    )
    .flat();

  return { paths, fallback: false };
};

export default Repo;
