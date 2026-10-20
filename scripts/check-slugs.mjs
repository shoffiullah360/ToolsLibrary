import fs from 'fs';
const content = fs.readFileSync('src/data/removeLineBreaksPresets.ts', 'utf8');
const regex = /"slug":\s*"([^"]+)"/g;
let match;
let index = 0;
while ((match = regex.exec(content)) !== null) {
  index++;
  if (index >= 33 && index <= 40) {
    console.log(index, match[1]);
  }
}
