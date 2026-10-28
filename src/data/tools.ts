export interface Tool {
  id: string;
  title: string;
  category: 'Image Tools' | 'Text Tools';
  group: string;
  description: string;
  tags: string[];
  keywords: string[];
  icon: string;
  badge?: 'Popular' | 'New' | 'Fast' | 'Essential';
  href: string;
  specs?: string;
}

export interface CategoryInfo {
  id: 'image-tools' | 'text-tools';
  name: 'Image Tools' | 'Text Tools';
  eyebrow: string;
  description: string;
  icon: string;
  groups: string[];
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'image-tools',
    name: 'Image Tools',
    eyebrow: 'BROWSER-BASED IMAGE SUITE',
    description: 'Lossless compression, instant canvas resizing, and universal format conversion with 100% client-side privacy.',
    icon: 'image',
    groups: ['Core Editing']
  },
  {
    id: 'text-tools',
    name: 'Text Tools',
    eyebrow: 'TEXT CLEANING & FORMATTING',
    description: 'High-speed text whitespace cleaners, duplicate line removers, blank line strippers, and list sorters.',
    icon: 'type',
    groups: ['Text Utilities']
  }
];

export const TOOLS: Tool[] = [
  // ==========================================
  // CATEGORY 1: IMAGE TOOLS (3 tools)
  // ==========================================
  {
    id: 'image-resizer',
    title: 'Image Resizer',
    category: 'Image Tools',
    group: 'Core Editing',
    description: 'Resize PNG, JPG, and WebP images by exact pixel dimensions or percentage while maintaining aspect ratios.',
    tags: ['Browser-Based', 'Lossless', 'Batch Ready'],
    keywords: ['resize image', 'scale photo', 'change dimensions', 'image resizer', 'pixel scaling'],
    icon: 'maximize-2',
    badge: 'Popular',
    href: '/image-resizer/'
  },
  {
    id: 'image-compressor',
    title: 'Image Compressor',
    category: 'Image Tools',
    group: 'Core Editing',
    description: 'Reduce file size of JPEG, PNG, and WebP images up to 85% without noticeable loss in visual clarity.',
    tags: ['Lossless/Lossy', 'Zero Upload', 'Fast'],
    keywords: ['compress image', 'shrink photo', 'reduce image size', 'optimize jpg', 'png compressor'],
    icon: 'minimize-2',
    badge: 'Essential',
    href: '/image-compressor/'
  },
  {
    id: 'image-converter',
    title: 'Image Converter',
    category: 'Image Tools',
    group: 'Core Editing',
    description: 'Convert JPG, PNG, WebP, AVIF, SVG, BMP, GIF, ICO, and TIFF in seconds with 100% client-side privacy.',
    tags: ['Universal Formats', 'Batch ZIP', 'PDF Export'],
    keywords: ['image converter', 'convert png to jpg', 'convert jpg to webp', 'image to pdf', 'convertio alternative', 'avif converter'],
    icon: 'repeat',
    badge: 'Popular',
    href: '/image-converter/'
  },

  // ==========================================
  // CATEGORY 2: TEXT TOOLS (5 tools)
  // ==========================================
  {
    id: 'remove-extra-spaces',
    title: 'Remove Extra Spaces',
    category: 'Text Tools',
    group: 'Text Utilities',
    description: 'Clean multiple spaces, leading and trailing whitespace, tabs, and unneeded blank spaces instantly.',
    tags: ['Client-Side', 'Fast Regex', 'Zero Upload'],
    keywords: ['remove extra spaces', 'clean whitespace', 'trim spaces', 'remove multiple spaces'],
    icon: 'space',
    badge: 'Essential',
    href: '/remove-extra-spaces/'
  },
  {
    id: 'remove-duplicate-lines',
    title: 'Remove Duplicate Lines',
    category: 'Text Tools',
    group: 'Text Utilities',
    description: 'Deduplicate text lines while preserving your original line order with instant Set-based hashing.',
    tags: ['Deduplication', 'List Cleaner', 'Zero Upload'],
    keywords: ['remove duplicate lines', 'deduplicate list', 'unique lines', 'remove duplicates online'],
    icon: 'list-filter',
    badge: 'Popular',
    href: '/remove-duplicate-lines/'
  },
  {
    id: 'remove-empty-lines',
    title: 'Remove Empty Lines',
    category: 'Text Tools',
    group: 'Text Utilities',
    description: 'Strip out blank lines and lines containing only space characters with zero server uploads.',
    tags: ['Strip Blanks', 'Fast', 'Zero Upload'],
    keywords: ['remove empty lines', 'delete blank lines', 'strip empty rows', 'remove blank lines online'],
    icon: 'list-x',
    badge: 'Popular',
    href: '/remove-empty-lines/'
  },
  {
    id: 'remove-line-breaks',
    title: 'Remove Line Breaks',
    category: 'Text Tools',
    group: 'Text Utilities',
    description: 'Merge lines into paragraphs or join lines with custom delimiters like commas, spaces, or semicolons.',
    tags: ['Paragraph Merge', 'Delimiter Join', 'Zero Upload'],
    keywords: ['remove line breaks', 'join lines', 'merge lines into one', 'remove enter online'],
    icon: 'wrap-text',
    badge: 'Essential',
    href: '/remove-line-breaks/'
  },
  {
    id: 'sort-text-lines',
    title: 'Sort Text Lines',
    category: 'Text Tools',
    group: 'Text Utilities',
    description: 'Sort lines alphabetically (A-Z or Z-A), numerically, by length, or randomly shuffle lists.',
    tags: ['A-Z Sorting', 'Numeric Sort', 'Zero Upload'],
    keywords: ['sort text lines', 'alphabetize list', 'sort lines online', 'order lines'],
    icon: 'arrow-up-down',
    badge: 'Fast',
    href: '/sort-text-lines/'
  }
];

export function getAllTools(): Tool[] {
  return TOOLS;
}

export function getToolsByCategory(category: 'Image Tools' | 'Text Tools'): Tool[] {
  return TOOLS.filter(t => t.category === category);
}

export function getFeaturedTools(): Tool[] {
  return TOOLS.filter(t => t.badge === 'Popular' || t.badge === 'Essential');
}

export function getToolsByGroup(category: 'Image Tools' | 'Text Tools', group: string): Tool[] {
  return TOOLS.filter(t => t.category === category && t.group === group);
}

export const QUICK_FILTERS = [
  { id: 'all', label: 'All Tools', count: 8 },
  { id: 'image-tools', label: 'Image Tools', count: 3 },
  { id: 'text-tools', label: 'Text Tools', count: 5 }
];

export interface TextTool {
  id: string;
  title: string;
  href: string;
  icon: string;
  description: string;
}

export const TEXT_TOOLS: TextTool[] = [
  {
    id: 'remove-extra-spaces',
    title: 'Remove Extra Spaces',
    href: '/remove-extra-spaces/',
    icon: 'space',
    description: 'Clean multiple spaces, leading and trailing whitespace, and tabs.'
  },
  {
    id: 'remove-duplicate-lines',
    title: 'Remove Duplicate Lines',
    href: '/remove-duplicate-lines/',
    icon: 'list-filter',
    description: 'Deduplicate text lines while preserving your original line order.'
  },
  {
    id: 'remove-empty-lines',
    title: 'Remove Empty Lines',
    href: '/remove-empty-lines/',
    icon: 'list-x',
    description: 'Strip out blank lines and lines containing only space characters.'
  },
  {
    id: 'remove-line-breaks',
    title: 'Remove Line Breaks',
    href: '/remove-line-breaks/',
    icon: 'wrap-text',
    description: 'Merge lines into paragraphs or join lines with custom delimiters.'
  },
  {
    id: 'sort-text-lines',
    title: 'Sort Text Lines',
    href: '/sort-text-lines/',
    icon: 'arrow-up-down',
    description: 'Sort lines alphabetically (A-Z or Z-A), numerically, or by string length.'
  }
];
