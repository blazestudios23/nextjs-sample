import { Organization, Repository } from "../../generated/graphql";
import { TypeName, Node } from "../types";


export const getSubNodeEdge = (
  nodeName: Node,
  repo: Repository
): [{ node: { id: string } }] => repo[nodeName]?.edges;

export const getSubNode = (nodeName: Node, id: string | string[], repo: Repository) =>{
  // console.log(getSubNodeEdge(nodeName, repo));
  
  return getSubNodeEdge(nodeName, repo).filter(({ node }) => node.id === id)[0].node;
}

export const getRepository = (
  name: string | string[],
  org: Organization
): Repository =>
  org.repositories?.edges.filter(({ node }) => node.name === name)[0]?.node;

 export const getSignleItemList = (org: Organization, nodeToFind: string) => {
  //  console.log(nodeToFind, org.repositories?.edges[0].node[nodeToFind].edges[0].node.id);
   
   return org.repositories?.edges
    .map(({ node }) => getSubnodeIds(node[nodeToFind].edges, node.name, nodeToFind))
    .flat();
 }

export const getSubnodeIds = (edges: any[],
    repoName: string, nodeName: string) => {  
        return edges.map(({ node }) => ({
          params: {
        node: nodeName,
        reponame: repoName,
        id: node.id
    }}))
}

/**
 * turns text in to title text such as `Title Of Page`
 * @function fixTitle
 * @param {string} str - string to parse and transform
 * @returns {string} - new string
 */
export const fixTitle = (str: string) =>
  String(str)
    .replace(/_/g, " ")
    .replace(/(?: |\b)(\w)/g, str => str.toUpperCase());

    /**
 * @function removeTrainingChar
 * @param {object} data - object
 * @param {string} data.filter - name of filter
 * @param {string} data.char - chars to remove
 * @returns {string} -
 */
export const removeTrainingChar = ({
  filter,
  char
}: {
  filter: string;
  char: string;
}) => {
  let newFilter = filter;
  const reversed = char
    .split("")
    .reverse()
    .join("");

  for (const i of reversed) {
    newFilter =
      newFilter.slice(newFilter.length - 1, newFilter.length) === i
        ? newFilter.slice(0, newFilter.length - 1)
        : newFilter;
  }
  return newFilter;
};

/**
 * Return node(s) with the given data-test attribute.
 * @param {ShallowWrapper} wrapper - Enzyme shallow ShallowWrapper
 * @param {string} val - Value of data-test attribute for search.
 * @return {ShallowWrapper}
 */
export const findByTestAttr = (wrapper: any, val: string) =>
  wrapper.find(`[data-test="${val}"]`);