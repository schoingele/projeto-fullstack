const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, '..', 'node_modules', 'validator', 'lib', 'isURL.js');

if (!fs.existsSync(target)) {
  console.log('validator isURL file not found, skipping patch');
  process.exit(0);
}

let content = fs.readFileSync(target, 'utf8');
if (content.indexOf("typeof options.require_protocol === 'undefined'") !== -1 || content.indexOf('require_protocol: true') !== -1) {
  console.log('validator isURL already patched (apply-patches)');
  process.exit(0);
}

const needle = "options = (0, _merge.default)(options, default_url_options);";
if (content.indexOf(needle) === -1) {
  console.log('Unexpected isURL.js format; cannot apply patch');
  process.exit(0);
}

const insert = `\n  // Defensive: ensure require_protocol defaults to true to mitigate GHSA-9965-vmph-33xx\n  if (typeof options.require_protocol === 'undefined') {\n    options.require_protocol = true;\n  }\n`;

content = content.replace(needle, needle + insert);

fs.writeFileSync(target, content, 'utf8');
console.log('Applied patch to validator isURL.js');
