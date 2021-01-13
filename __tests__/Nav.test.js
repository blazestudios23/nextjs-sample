import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Nav from "../components/Nav";
import { findByTestAttr } from "../utils/functions"


it("Renders appropriately", () => {
  const { getByText } =render(<Nav />);
  expect(getByText("Link")).toBeInTheDocument();
  
});