import fs from 'node:fs';
import path from 'node:path';

// Helper to count words
function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

console.log('Starting Remove Empty Lines pSEO dataset generator...');
