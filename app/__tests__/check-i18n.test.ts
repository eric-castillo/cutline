const {findProblems} = require('../scripts/check-i18n');

const base = {
  en: {a: {b: 'Hello {{name}}'}, c: 'Bye'},
  es: {a: {b: 'Hola {{name}}'}, c: 'Adiós'},
};

describe('i18n key parity check', () => {
  it('passes when both languages match', () => {
    expect(findProblems(base)).toEqual({problems: [], keyCount: 2});
  });

  it('reports a key missing in Spanish', () => {
    const {problems} = findProblems({...base, es: {a: {b: 'Hola {{name}}'}}});
    expect(problems).toEqual(['[es] missing key: c']);
  });

  it('reports a key missing in English', () => {
    const {problems} = findProblems({...base, en: {c: 'Bye'}});
    expect(problems).toContain('[en] missing key: a.b');
  });

  it('reports empty values', () => {
    const {problems} = findProblems({...base, es: {...base.es, c: '  '}});
    expect(problems).toContain('[es] empty or non-string value: c');
  });

  it('reports mismatched placeholders', () => {
    const {problems} = findProblems({
      ...base,
      es: {a: {b: 'Hola {{nombre}}'}, c: 'Adiós'},
    });
    expect(problems[0]).toMatch(/placeholder mismatch in a\.b/);
  });
});
