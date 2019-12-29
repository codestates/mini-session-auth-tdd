describe("end of the test", () => {
  test("empthy mock test", () => {
    expect(true).toEqual(true);
  });
});

afterAll(() => {
  return process.exit(1);
});
