import { z } from "zod";

export const TestFailureSchema = z.object({
  name: z.string(),
  file: z.string().optional(),
  line: z.number().optional(),
  message: z.string(),
  expected: z.string().optional(),
  actual: z.string().optional(),
  stack: z.string().optional(),
});

export type TestFailure = z.infer<typeof TestFailureSchema>;

export const TestRunSchema = z.object({
  framework: z.enum(["pytest", "jest", "vitest"]),
  summary: z.object({
    total: z.number(),
    passed: z.number(),
    failed: z.number(),
    skipped: z.number(),
    duration: z.number(),
  }),
  failures: z.array(TestFailureSchema),
});

export type TestRun = z.infer<typeof TestRunSchema>;

export const CoverageFileSchema = z.object({
  file: z.string(),
  lines: z.number(),
  branches: z.number().optional(),
  functions: z.number().optional(),
  uncoveredLines: z.array(z.number()).optional(),
});

export const CoverageSchema = z.object({
  framework: z.enum(["pytest", "jest", "vitest"]),
  summary: z.object({
    lines: z.number(),
    branches: z.number().optional(),
    functions: z.number().optional(),
  }),
  files: z.array(CoverageFileSchema),
});

export type Coverage = z.infer<typeof CoverageSchema>;
