import axios from "axios";
import * as semver from "semver";

/**
 * @typedef {object} PkgInfo
 * @property {string} name - The name of the package.
 * @property {string} version - The current version of the package.
 */

/**
 * The result object for the package version check.
 * @typedef {object} CheckResult
 * @property {boolean} success - It is true if the check was successful.
 * @property {string} name - The name of the package.
 * @property {boolean} isLatest - It is true if the current version is the latest.
 * @property {string} currentVersion - The current version of the package (e.g., "x.y.z").
 * @property {string|null} [latestVersion] - The latest version from npm (e.g., "x.y.z").
 * @property {string|null} [error] - An error message if the check failed.
 */

/**
 * Formats the return object.
 * @private
 * @param {boolean} success
 * @param {string} name
 * @param {boolean} isLatest
 * @param {string} currentVersion
 * @param {string|null} [latestVersion=null]
 * @param {string|null} [error=null]
 * @returns {CheckResult} The formatted result object.
 */
function returnFormat(
  success: boolean,
  name: string,
  isLatest: boolean,
  currentVersion: string,
  latestVersion: string | null = null,
  error: string | null = null,
) {
  return {
    success,
    name,
    isLatest,
    currentVersion,
    latestVersion,
    error,
  };
}

/**
 * Checks if a package is the latest version.
 * @param {PkgInfo} pkg - An object with package name and version.
 * @returns {Promise<CheckResult>} A promise that has the result.
 */

interface PkgInfo {
  name: string;
  version: string;
}

async function isPackageLatest(pkg: PkgInfo) {
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
      latestVersion,
    );
  } catch (e) {
    return returnFormat(
      false,
      packageName,
      false,
      currentVersion,
      null,
      // @ts-ignore
      e?.message,
    );
  }
}

export { isPackageLatest };
