/**
 * Checks if a package is the latest version.
 * @param {PkgInfo} pkg - An object with package name and version.
 * @returns {Promise<CheckResult>} A promise that has the result.
 */
interface PkgInfo {
    name: string;
    version: string;
}
declare function isPackageLatest(pkg: PkgInfo): Promise<{
    success: boolean;
    name: string;
    isLatest: boolean;
    currentVersion: string;
    latestVersion: string | null;
    error: string | null;
}>;
export { isPackageLatest };
