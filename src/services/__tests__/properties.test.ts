import { fetchProperties, fetchPropertyById } from "../properties";

const respond = (status: number, body: unknown) =>
  vi.fn().mockResolvedValue(new Response(JSON.stringify(body), { status }));

afterEach(() => vi.unstubAllGlobals());

test("searches listings by neighborhood", async () => {
  const fetchMock = respond(200, [{ id: "1" }]);
  vi.stubGlobal("fetch", fetchMock);

  expect(await fetchProperties("Capitol Hill")).toEqual([{ id: "1" }]);
  expect(fetchMock).toHaveBeenCalledWith("/api/listings?neighborhood=Capitol+Hill");
});

test("returns null for an unknown unit", async () => {
  vi.stubGlobal("fetch", respond(404, { error: "Listing not found" }));
  expect(await fetchPropertyById("999")).toBeNull();
});

test("throws when the backend fails", async () => {
  vi.stubGlobal("fetch", respond(500, {}));
  await expect(fetchProperties("Ballard")).rejects.toThrow(/500/);
});
