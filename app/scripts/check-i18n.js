#!/usr/bin/env node
/**
 * Fails if en.json and es.json do not have exactly the same keys, if any value
 * is empty, or if the {{placeholders}} of a key differ between languages.
 */
const fs = require('fs');
const path = require('path');

const LANGS = ['en', 'es'];

function flatten(obj, prefix = '') {
  const out = {};
  for (const [key, value] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object') {
      Object.assign(out, flatten(value, full));
    } else {
      out[full] = value;
    }
  }
  return out;
}

const placeholders = text =>
  [...String(text).matchAll(/{{\s*([\w.]+)\s*}}/g)].map(m => m[1]).sort();

/**
 * @param {Record<string, object>} raw nested catalogs keyed by language
 * @returns {{problems: string[], keyCount: number}}
 */
function findProblems(raw) {
  const catalogs = {};
  for (const lang of LANGS) {
    catalogs[lang] = flatten(raw[lang] || {});
  }
  const problems = [];
  const all = new Set(LANGS.flatMap(l => Object.keys(catalogs[l])));

  for (const key of [...all].sort()) {
    for (const lang of LANGS) {
      const value = catalogs[lang][key];
      if (value === undefined) {
        problems.push(`[${lang}] missing key: ${key}`);
      } else if (typeof value !== 'string' || value.trim() === '') {
        problems.push(`[${lang}] empty or non-string value: ${key}`);
      }
    }
    const [a, b] = LANGS.map(l => placeholders(catalogs[l][key] ?? ''));
    if (a.join() !== b.join()) {
      problems.push(`placeholder mismatch in ${key}: en={${a}} es={${b}}`);
    }
  }
  return {problems, keyCount: all.size};
}

function main() {
  const dir = path.resolve(__dirname, '../src/i18n');
  const raw = {};
  for (const lang of LANGS) {
    raw[lang] = JSON.parse(
      fs.readFileSync(path.join(dir, `${lang}.json`), 'utf8'),
    );
  }
  const {problems, keyCount} = findProblems(raw);
  if (problems.length > 0) {
    console.error(`i18n check failed (${problems.length}):`);
    problems.forEach(p => console.error(`  - ${p}`));
    process.exit(1);
  }
  console.log(`i18n check passed: ${keyCount} keys in ${LANGS.join(' + ')}.`);
}

if (require.main === module) {
  main();
}

module.exports = {findProblems};
