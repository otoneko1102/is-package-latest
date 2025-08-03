# is-package-latest
Check if a package is the latest version.

## Install
```bash
npm install is-package-latest@latest
```

## Usage
```js
// CJS (require)
const { isPackageLatest } = require('is-package-latest');
const pkg = require("./package.json");
// ESM (import)
import { isPackageLatest } from 'is-package-latest';
import pkg from "./package.json" with { type: "json" };

(async () => {
  console.log(await isPackageLatest(pkg));
})();
```

## API
### Param
#### isPackageLatest(pkg)
- `pkg` `<Object>` An object that has package information.
  - `name` `<string>` Required. The name of the package.
  - `version` `<string>` Required. The current version of the package.

### Returns
The function returns a `Promise`.

| Name | Type | Description |
| :-- | --- | :-- |
| success | boolean | `true` if the check was successful. |
| name | string | The name of the package. |
| isLatest | boolean | `true` if the current version is the latest. |
| currentVersion | string | The current version from the `pkg`. |
| latestVersion | string | The latest version from the npm registry. Always `null` on failure. |
| error | string | Always `null` on success. |
