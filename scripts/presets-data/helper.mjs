export function countWords(text) {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function countEditorialWords(editorial) {
  let count = countWords(editorial.heading);
  for (const section of editorial.sections) {
    count += countWords(section.title);
    for (const p of section.paragraphs) {
      count += countWords(p);
    }
    if (section.bullets) {
      for (const b of section.bullets) {
        count += countWords(b);
      }
    }
    if (section.callout) {
      count += countWords(section.callout.label);
      count += countWords(section.callout.text);
    }
  }
  return count;
}
