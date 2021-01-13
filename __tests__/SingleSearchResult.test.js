import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SingleSearchResult from "../components/SingleSearchResult";
import { findByTestAttr } from "../utils/functions"


// interface IProps {
//   data: INodeData | [INodeData];
//   node: string;
//   reponame: string;
// }
const testData = 
    { 
      id: 1, name: "test", description: "testing", nullTest: null, owner: {
        avatarUrl: "/", login: "test name"
      } 
    }

test("It renders inner text", () => {
  const { getByText } = render(<SingleSearchResult data={testData} node={"forks"} reponam={"magic"} />);
  // findByTestAttr(render(<Home />))
  // const component = findByTestAttr(render(<Home />), 'nav-header');
  // expect(component.length).toBeTruthy();
  expect(getByText("test")).toBeInTheDocument();
  expect(getByText("testing")).toBeInTheDocument();
});
it("Renders appropriately", () => {
  render(<SingleSearchResult data={testData} node={"forks"} reponam={"magic"}/>);
  expect(
    screen.getByRole("button", { name: "View owner" })
  ).toBeInTheDocument();
});