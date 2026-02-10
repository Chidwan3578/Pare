import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseVitestJson } from "../src/lib/parsers/vitest.js";

const fixture = (name: string) => readFileSync(join(__dirname, "fixtures", name), "utf-8");

describe("parseVitestJson", () => {
  it("parses JSON output with one failure", () => {
    const result = parseVitestJson(fixture("vitest-json.json"));

    expect(result.framework).toBe("vitest");
    expect(result.summary.total).toBe(10);
    expect(result.summary.passed).toBe(9);
    expect(result.summary.failed).toBe(1);
    expect(result.summary.skipped).toBe(0);
    expect(result.failures).toHaveLength(1);

    const fail = result.failures[0];
    expect(fail.name).toBe("parser > parses nested structures");
    expect(fail.file).toContain("parser.test.ts");
    expect(fail.line).toBe(28);
    expect(fail.expected).toContain('{"nested": true}');
    expect(fail.actual).toContain('{"nested": false}');
  });
});
