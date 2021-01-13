import { Node } from "../types"
import {  Repository } from "../../generated/graphql";


export interface INodeData {
  id: string;
  [key: string]: any;
}

export interface IRouteProps {
  reponame: string;
  node: Node;
  [Node.repository]: Repository;
  [Node.issue]: INodeData;
  [Node.issues]: [INodeData];
  [Node.stargazer]: INodeData;
  [Node.stargazers]: [INodeData];
  [Node.watcher]: INodeData;
  [Node.watchers]: [INodeData];
}