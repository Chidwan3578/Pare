import { z } from "zod";

export const NpmInstallSchema = z.object({
  added: z.number(),
  removed: z.number(),
  changed: z.number(),
  duration: z.number(),
  packages: z.number().describe("Total packages after install"),
  vulnerabilities: z
    .object({
      total: z.number(),
      critical: z.number(),
      high: z.number(),
      moderate: z.number(),
      low: z.number(),
      info: z.number(),
    })
    .optional(),
  funding: z.number().optional(),
});

export type NpmInstall = z.infer<typeof NpmInstallSchema>;

export const NpmAuditVulnSchema = z.object({
  name: z.string(),
  severity: z.enum(["critical", "high", "moderate", "low", "info"]),
  title: z.string(),
  url: z.string().optional(),
  range: z.string().optional(),
  fixAvailable: z.boolean(),
});

export const NpmAuditSchema = z.object({
  vulnerabilities: z.array(NpmAuditVulnSchema),
  summary: z.object({
    total: z.number(),
    critical: z.number(),
    high: z.number(),
    moderate: z.number(),
    low: z.number(),
    info: z.number(),
  }),
});

export type NpmAudit = z.infer<typeof NpmAuditSchema>;

export const NpmOutdatedEntrySchema = z.object({
  name: z.string(),
  current: z.string(),
  wanted: z.string(),
  latest: z.string(),
  location: z.string().optional(),
  type: z.string().optional(),
});

export const NpmOutdatedSchema = z.object({
  packages: z.array(NpmOutdatedEntrySchema),
  total: z.number(),
});

export type NpmOutdated = z.infer<typeof NpmOutdatedSchema>;

export const NpmListDepSchema: z.ZodType<NpmListDep> = z.object({
  version: z.string(),
  resolved: z.string().optional(),
});

export interface NpmListDep {
  version: string;
  resolved?: string;
}

export const NpmListSchema = z.object({
  name: z.string(),
  version: z.string(),
  dependencies: z.record(z.string(), NpmListDepSchema),
  total: z.number(),
});

export type NpmList = z.infer<typeof NpmListSchema>;
