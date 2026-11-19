import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient } from "@tanstack/react-query";
import App from "@/App";
import { makeUnit } from "@/test/fixtures";
import { fetchProperties, fetchPropertyById } from "@/services/properties";

// The app reads from Supabase. Tests replace the data layer with fixed test units
// so the journey runs offline and gives the same result every time.
vi.mock("@/services/properties", () => ({
  fetchProperties: vi.fn(),
  fetchPropertyById: vi.fn(),
}));

const units = [
  makeUnit({ id: "1", building_name: "Maple Court", unit_number: "2B", neighborhood: "Capitol Hill" }),
  makeUnit({ id: "2", building_name: "Cedar House", unit_number: "101", neighborhood: "Capitol Hill", roll_in_shower: "N" }),
];

// Fresh cache per test, and no automatic retries so failures show immediately.
const renderApp = () =>
  render(<App queryClient={new QueryClient({ defaultOptions: { queries: { retry: false } } })} />);

beforeEach(() => {
  window.history.pushState({}, "", "/");
  vi.mocked(fetchProperties).mockImplementation(async (q) =>
    units.filter((u) => u.neighborhood?.toLowerCase().includes((q ?? "").toLowerCase())),
  );
  vi.mocked(fetchPropertyById).mockImplementation(async (id) => units.find((u) => u.id === id) ?? null);
});

test("open site, search, view results, open property details", async () => {
  const user = userEvent.setup();

  // Open site
  renderApp();
  expect(screen.getByRole("heading", { level: 1, name: /ADA Housing Finder/i })).toBeInTheDocument();

  // Search properties
  await user.type(screen.getByLabelText(/neighborhood/i), "Capitol Hill");
  await user.click(screen.getByRole("button", { name: /search/i }));
  expect(fetchProperties).toHaveBeenCalledWith("Capitol Hill");

  // View results
  expect(await screen.findByText("Maple Court")).toBeInTheDocument();
  expect(screen.getByText("Cedar House")).toBeInTheDocument();

  // Open property details
  await user.click(screen.getByRole("link", { name: /view details for Cedar House, unit 101/i }));
  expect(await screen.findByRole("heading", { level: 1, name: "Cedar House" })).toBeInTheDocument();
  expect(fetchPropertyById).toHaveBeenCalledWith("2");

  const accessibility = screen.getByRole("region", { name: /accessibility features/i });
  expect(within(accessibility).getByText("Roll-in shower").nextSibling).toHaveTextContent("No");
  expect(within(accessibility).getByText("Grab bars").nextSibling).toHaveTextContent("No");
  expect(screen.getByText("leasing@example.com")).toBeInTheDocument();

  // Back returns to the same results
  await user.click(screen.getByRole("button", { name: /back to results/i }));
  expect(await screen.findByText("Maple Court")).toBeInTheDocument();
  expect(screen.getByLabelText(/neighborhood/i)).toHaveValue("Capitol Hill");
});

test("shows a message when no units match", async () => {
  const user = userEvent.setup();
  renderApp();

  await user.type(screen.getByLabelText(/neighborhood/i), "Ballard");
  await user.click(screen.getByRole("button", { name: /search/i }));

  expect(await screen.findByText(/No units found in Ballard/i)).toBeInTheDocument();
});

test("shows not found for an unknown unit", async () => {
  window.history.pushState({}, "", "/units/999");
  renderApp();

  expect(await screen.findByRole("heading", { name: /unit not found/i })).toBeInTheDocument();
});

test("shows only the error, not 'no units found', when the search fails", async () => {
  vi.mocked(fetchProperties).mockRejectedValue(new Error("Load failed"));
  const user = userEvent.setup();
  renderApp();

  await user.type(screen.getByLabelText(/neighborhood/i), "Capitol Hill");
  await user.click(screen.getByRole("button", { name: /search/i }));

  expect(await screen.findByText(/error fetching properties/i)).toBeInTheDocument();
  expect(screen.queryByText(/No units found/i)).not.toBeInTheDocument();
});
