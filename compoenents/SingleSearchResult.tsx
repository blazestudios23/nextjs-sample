import { Table, Button } from "reactstrap";
import Link from "next/link";
import { Node, TypeName } from "../utils/types";
import { INodeData } from "../utils/interfaces";

interface IProps {
  data: INodeData | [INodeData];
  node: string;
  reponame: string;
}

const SearchResults = (props: IProps) => BuildTable(props.data, props.reponame);

const BuildTable = (data: INodeData, reponame, borderless?: boolean) => {
  const keys = Object.keys(data).filter(key => key !== "__typename");
  return (
    <Table borderless={borderless} className="table mt-2 pt-2 table-hover">
      <tbody>
        {keys.map(key => (
          <tr key={key} className="d-flex">
            {createLink(data, key, reponame)}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const createLink = (data: IProps["data"], key: string, reponame: string) => {
  if (typeof data[key] === "object" && data[key]) {
    return (
      <>
        <td className={"col"}>{key}</td>
        <td className={"col"}>
          <Link href={`/${key}/${reponame}/`}>
            <Button>View {key}</Button>
          </Link>
        </td>
      </>
    );
  } else if (data[key]) {
    return (
      <>
        <td className={"col"}>{key}</td>
        <td className={"col"}>{data[key]?.toString()}</td>
      </>
    );
  }
  return null;
};

const isURL = (href: string | null) => {
  if (!href) {
    return false;
  }
  const data = href.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
  return data && data[0] ? data[2] : false;
};

export default SearchResults;
