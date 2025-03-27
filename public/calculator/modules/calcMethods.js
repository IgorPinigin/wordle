export function isFloat(num) {
  return Number.isFinite(num) && !Number.isInteger(num);
}

export function findDivergence(base, comparison) {
  const baseChars = [...base];
  const compChars = [...comparison];
  
  const diffIndex = compChars.findIndex((char, i) => 
    i >= base.length || char !== baseChars[i]
  );
  
  return diffIndex === -1 ? "" : comparison.slice(diffIndex);
}