import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BaseLayout from "../components/BaseLayout";
import { findByTestAttr } from "../utils/functions"

test("It renders inner text", () => {
  const { getByText } = render(<BaseLayout ><p>Test</p> </BaseLayout>);
  // findByTestAttr(render(<Home />))
  // const component = findByTestAttr(render(<Home />), 'nav-header');
  // expect(component.length).toBeTruthy();
  expect(getByText("Test")).toBeInTheDocument();
});
it("Renders appropriately", () => {
  render(<BaseLayout />);
  expect(
    screen.getByRole("heading", { name: "Search GitHub" })
  ).toBeInTheDocument();
});