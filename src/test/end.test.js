describe("end of the test", () => {
  test("empthy mock test", () => {
    expect(true).toEqual(true);
  });
});

afterAll(() => {
  console.log("here", process);
  return process.exit(0);
});
