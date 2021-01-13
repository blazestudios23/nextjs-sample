import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SearchResults from "../components/SearchResults";
import { findByTestAttr } from "../utils/functions"

const testData = [
  {
    node: { 
      id: 1, name: "test", description: "testing", owner: {
        avatarUrl: "/", login: "test name"
      } 
    }
  }
]

test("It renders inner text", () => {
  const { getByText } = render(<SearchResults repos={testData}/>);
  // findByTestAttr(render(<Home />))
  // const component = findByTestAttr(render(<Home />), 'nav-header');
  // expect(component.length).toBeTruthy();
  expect(getByText("test")).toBeInTheDocument();
  expect(getByText("testing")).toBeInTheDocument();

});
it("Renders appropriately", () => {
  render(<SearchResults repos={testData}/>);
  expect(
    screen.getByRole("button", { name: "View Repo" })
  ).toBeInTheDocument();
});