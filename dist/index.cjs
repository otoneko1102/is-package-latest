var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// cjs-source-ns:cjs-entry
var cjs_entry_exports = {};
__export(cjs_entry_exports, {
  isPackageLatest: () => isPackageLatest
});
module.exports = __toCommonJS(cjs_entry_exports);
var import_axios = __toESM(require("axios"));
var semver = __toESM(require("semver"));
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
    const res = await import_axios.default.get(`https://registry.npmjs.org/${packageName}`);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isPackageLatest
});
