import { Table, Button } from "reactstrap";
import Link from "next/link";

interface Props {
  repo: Repo;
}

type Repo = {
  archive_url: string;
  archived: boolean;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  clone_url: string;
  collaborators_url: string;
  comments_url: string;
  commits_url: string;
  compare_url: string;
  contents_url: string;
  contributors_url: string;
  created_at: string;
  description: string;
  has_issues: boolean;
  id: number;
  name: string;
  owner: { login: string; avatar_url: string };
  pushed_at: string;
  stargazers_count: string;
  url: string;
  updated_at: string;
  watchers_count: string;
};

const SearchResults = (props: Props) => BuildTable(props.repo);

const BuildTable = (data: Repo, borderless?: boolean) => {
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
