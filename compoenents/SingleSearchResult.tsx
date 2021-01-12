import { Table, Button } from "reactstrap";
import Link from "next/link";
import { Node, TypeName } from "../utils/types";
import { INodeData } from "../utils/interfaces";

interface Props {
  data: INodeData;
}

const SearchResults = (props: Props) => BuildTable(props.data);

const BuildTable = (data: INodeData, borderless?: boolean) => {
  console.log(data);
  return null;
  const keys = Object.keys(data);
  return (
    <Table borderless={borderless}>
      <tbody>
        {keys.map(key => (
          <tr key={key}>
            <td>{key}</td>
            <td>
              {typeof data[key] === "object" && data[key]
                ? BuildTable(data[key], true)
                : data[key]?.toString()}
              {/* : createButton(data[key]?.toString(), key)} */}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const createButton = (testString: string | null, key: string) =>
  isURL(testString) ? <Button> View {key} </Button> : testString;

const isURL = (href: string | null) => {
  if (!href) {
    return false;
  }
  const data = href.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
  return data && data[0] ? data[2] : false;
};

export default SearchResults;
