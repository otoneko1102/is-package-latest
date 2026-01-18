// src/index.ts
import axios from "axios";
import * as semver from "semver";
function returnFormat(success, name, isLatest, currentVersion, latestVersion = null, error = null) {
  return {
    success,
    name,
    isLatest,
    currentVersion,
    latestVersion,
    error
  };
}
async function isPackageLatest(pkg) {
  if (!pkg || !pkg.name || !pkg.version) {
    throw new Error('The "pkg" object must have a name and a version.');
  }
  const currentVersion = pkg.version;
  const packageName = pkg.name;
  try {
    const res = await axios.get(`https://registry.npmjs.org/${packageName}`);
    const latestVersion = res.data["dist-tags"].latest;
    const isLatest = semver.eq(currentVersion, latestVersion);
    return returnFormat(
      true,
      packageName,
      isLatest,
      currentVersion,
      latestVersion
    );
  } catch (e) {
    return returnFormat(
      false,
      packageName,
      false,
      currentVersion,
      null,
      // @ts-ignore
      e?.message
    );
  }
}
export {
  isPackageLatest
};
