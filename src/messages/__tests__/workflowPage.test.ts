import { describe, expect, it } from "vitest";
import en from "@/messages/en-US.json";
import zh from "@/messages/zh-CN.json";

describe("workflowPage translations", () => {
  it("keep workflow steps aligned across locales", () => {
    const expectedSteps = (en.home.workflow.steps as Array<unknown>).length;
    expect((en.workflowPage.steps.list as Array<unknown>).length).toBe(expectedSteps);
    expect((zh.workflowPage.steps.list as Array<unknown>).length).toBe(expectedSteps);
  });

  it("provide resource links with internal hrefs", () => {
    const enResources = en.workflowPage.resources.items as Array<{ href: string }>;
    const zhResources = zh.workflowPage.resources.items as Array<{ href: string }>;

    [...enResources, ...zhResources].forEach((resource) => {
      expect(resource.href.startsWith("/")).toBe(true);
    });
  });

  it("expose resource CTA label in both locales", () => {
    expect(typeof en.workflowPage.cta.viewResource).toBe("string");
    expect(en.workflowPage.cta.viewResource.length).toBeGreaterThan(0);
    expect(typeof zh.workflowPage.cta.viewResource).toBe("string");
    expect(zh.workflowPage.cta.viewResource.length).toBeGreaterThan(0);
  });
});
