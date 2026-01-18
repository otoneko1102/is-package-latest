import { isPackageLatest } from "../src/index";

describe("isPackageLatest", () => {
  it("should return isLatest true for the latest version", async () => {
    // Fetch latest version from npm registry
    const res = await fetch("https://registry.npmjs.org/axios");
    const data = await res.json();
    const latest = data["dist-tags"].latest;
    const result = await isPackageLatest({
      name: "axios",
      version: latest
    });
    expect(result.success).toBe(true);
    expect(result.name).toBe("axios");
    expect(result.isLatest).toBe(true);
    expect(result.currentVersion).toBe(latest);
    expect(result.latestVersion).toBe(latest);
  });

  it("should return isLatest false for an old version", async () => {
    const result = await isPackageLatest({
      name: "axios",
      version: "0.21.1"
    });
    expect(result.success).toBe(true);
    expect(result.name).toBe("axios");
    expect(result.isLatest).toBe(false);
    expect(result.currentVersion).toBe("0.21.1");
    expect(result.latestVersion).not.toBe("0.21.1");
  });

  it("should return success false for a non-existent package name", async () => {
    const result = await isPackageLatest({
      name: "this-package-does-not-exist-xyz",
      version: "1.0.0"
    });
    expect(result.success).toBe(false);
    expect(result.isLatest).toBe(false);
    expect(result.latestVersion).toBeNull();
    expect(result.error).toBeDefined();
  });
});
