import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parsePytestOutput, parsePytestCoverage } from "../src/lib/parsers/pytest.js";

const fixture = (name: string) => readFileSync(join(__dirname, "fixtures", name), "utf-8");

describe("parsePytestOutput", () => {
  it("parses all-pass output", () => {
    const result = parsePytestOutput(fixture("pytest-pass.txt"));

    expect(result.framework).toBe("pytest");
    expect(result.summary.total).toBe(12);
    expect(result.summary.passed).toBe(12);
    expect(result.summary.failed).toBe(0);
    expect(result.summary.skipped).toBe(0);
    expect(result.summary.duration).toBe(0.47);
    expect(result.failures).toHaveLength(0);
  });

  it("parses output with failures", () => {
    const result = parsePytestOutput(fixture("pytest-fail.txt"));

    expect(result.framework).toBe("pytest");
    expect(result.summary.total).toBe(12);
    expect(result.summary.passed).toBe(10);
    expect(result.summary.failed).toBe(2);
    expect(result.summary.duration).toBe(0.83);
    expect(result.failures).toHaveLength(2);

    expect(result.failures[0].file).toBe("tests/test_api.py");
    expect(result.failures[0].name).toBe("test_create_user");
    expect(result.failures[0].message).toContain("assert 201 == 200");

    expect(result.failures[1].file).toBe("tests/test_models.py");
    expect(result.failures[1].name).toBe("test_post_model");
    expect(result.failures[1].message).toContain("missing required field");
  });

  it("handles empty output gracefully", () => {
    const result = parsePytestOutput("");

    expect(result.summary.total).toBe(0);
    expect(result.failures).toHaveLength(0);
  });
});

describe("parsePytestCoverage", () => {
  it("parses coverage report", () => {
    const result = parsePytestCoverage(fixture("pytest-coverage.txt"));

    expect(result.framework).toBe("pytest");
    expect(result.summary.lines).toBe(88);
    expect(result.files).toHaveLength(4);

    expect(result.files[0]).toEqual({ file: "src/auth.py", lines: 92 });
    expect(result.files[1]).toEqual({ file: "src/api.py", lines: 80 });
    expect(result.files[2]).toEqual({ file: "src/models.py", lines: 90 });
    expect(result.files[3]).toEqual({ file: "src/utils.py", lines: 100 });
  });
});
