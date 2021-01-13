import { Organization, Repository } from "../../generated/graphql";
import { TypeName, Node } from "../types";


export const getSubNodeEdge = (
  nodeName: Node,
  repo: Repository
): [{ node: { id: string } }] => repo[nodeName]?.edges;

export const getSubNode = (nodeName: Node, id: string | string[], repo: Repository) =>
  getSubNodeEdge(nodeName, repo).filter(({ node }) => node.id === id)[0].node;

export const getRepository = (
  name: string | string[],
  org: Organization
): Repository =>
  org.repositories?.edges.filter(({ node }) => node.name === name)[0]?.node;

 export const getSignleItemList = (org: Organization, nodeToFind: string) => org.repositories?.edges
    .map(({ node }) => getSubnodeIds(node.issues.edges, node.name, nodeToFind))
    .flat();

export const getSubnodeIds = (edges: any[],
    repoName: string, nodeName: string) => {  
        return edges.map(({ node }) => ({
          params: {
        node: nodeName,
        reponame: repoName,
        id: node.id
    }}))
}
