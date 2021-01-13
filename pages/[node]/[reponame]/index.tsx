import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Organization } from "../../../generated/graphql";
import { GET_REPOS } from "../../../graphql/queries";

import BaseLayout from "../../../components/BaseLayout";

import { Client } from "../..";
import { Node, NodeArrayList } from "../../../utils/types";

import {
  getSubNodeEdge,
  getRepository,
  fixTitle,
} from "../../../utils/functions";
import { IRouteProps } from "../../../utils/interfaces";

const Repo = (props: IRouteProps) => {
  const router = useRouter();
  const { node, reponame } = props;

  const results = props[node]?.map(({ node }) => node);

  const cols = Object.keys(results[0])
    .filter(
      key =>
        results[0][key] &&
        key !== "__typename" &&
        typeof results[0][key] !== "object"
    )
    .map(title => ({
      dataField: title,
      text: fixTitle(title),
      sort: true,
    }));

  const onClick = (e, row) => {
    e.preventDefault();

    return router.push(`/${node}/${reponame}/${row.id}`);
  };
  return (
    <BaseLayout>
      <h2>{fixTitle(node)}</h2>
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
        // history={router}
        rowEvents={{ onClick }}
        pagination={paginationFactory()}
        defaultSorted={[
          {
            dataField: "id",
            order: "desc",
          },
        ]}
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
  // By returning { props: repo }
  // will receive `repo` as a prop at build time
  return {
    props: {
      reponame,
      node,
      [Node.author]: node === Node.author && getSubNodeEdge(node, repo),
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
      NodeArrayList.map(nodeName => ({
        params: {
          node: nodeName,
          reponame: node.name,
        },
      }))
    )
    .flat();

  return { paths, fallback: false };
};

export default Repo;
