export interface Tool {
  id: string;
  title: string;
  category: 'Image Tools' | 'Developer Tools';
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
  id: 'image-tools' | 'developer-tools';
  name: 'Image Tools' | 'Developer Tools';
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
    description: 'Lossless compression, instant canvas transformations, and verified social media dimension presets with 100% client-side privacy.',
    icon: 'image',
    groups: ['Core Editing', 'Calculators & Sizing', 'Optimization & Utilities', 'Social Media Specs & Resizers']
  },
  {
    id: 'developer-tools',
    name: 'Developer Tools',
    eyebrow: 'DEVELOPER PRODUCTIVITY UTILITIES',
    description: 'High-speed JSON formatters, cryptographic encoders, token decoders, and syntax minifiers running with zero server latency.',
    icon: 'code',
    groups: ['JSON Utilities', 'Encoders & Decoders', 'Generators & Time', 'Code & Formatters', 'Color Utilities']
  }
];

export const TOOLS: Tool[] = [
  // ==========================================
  // CATEGORY 1: IMAGE TOOLS (22 tools)
  // ==========================================
  // Group: Core Editing
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
    href: '/tools/image-resizer'
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
    href: '/tools/image-compressor'
  },
  {
    id: 'image-cropper',
    title: 'Image Cropper',
    category: 'Image Tools',
    group: 'Core Editing',
    description: 'Crop images with precision visual handles and standardized aspect ratios (16:9, 4:3, 1:1, or custom).',
    tags: ['Visual Handles', 'Aspect Lock', 'Client-Side'],
    keywords: ['crop image', 'cut photo', 'image cropper', 'trim picture', 'aspect crop'],
    icon: 'crop',
    href: '/tools/image-cropper'
  },
  {
    id: 'image-rotator',
    title: 'Image Rotator',
    category: 'Image Tools',
    group: 'Core Editing',
    description: 'Rotate images 90°, 180°, 270°, or fine-tune angles with instant hardware-accelerated preview.',
    tags: ['Angle Precision', 'Instant Preview', 'Lossless'],
    keywords: ['rotate photo', 'turn image', 'orientation fix', 'rotate 90 degrees'],
    icon: 'rotate-cw',
    href: '/tools/image-rotator'
  },
  {
    id: 'image-flipper',
    title: 'Image Flipper',
    category: 'Image Tools',
    group: 'Core Editing',
    description: 'Mirror photos horizontally or vertically with a single click using in-browser canvas rendering.',
    tags: ['Mirror Effect', 'Horizontal/Vertical', 'Instant'],
    keywords: ['flip image', 'mirror photo', 'invert picture', 'horizontal flip'],
    icon: 'flip-horizontal',
    href: '/tools/image-flipper'
  },

  // Group: Calculators & Sizing
  {
    id: 'aspect-ratio-calculator',
    title: 'Aspect Ratio Calculator',
    category: 'Image Tools',
    group: 'Calculators & Sizing',
    description: 'Calculate proportionate width and height dimensions, aspect ratios, and responsive scale ratios.',
    tags: ['Design Helper', 'Responsive math', 'Precision'],
    keywords: ['aspect ratio calculator', '16:9 calculator', 'proportions', 'screen ratio'],
    icon: 'scale',
    badge: 'Fast',
    href: '/tools/aspect-ratio-calculator'
  },
  {
    id: 'image-dimensions-calculator',
    title: 'Image Dimensions Calculator',
    category: 'Image Tools',
    group: 'Calculators & Sizing',
    description: 'Calculate print physical dimensions in inches or cm based on DPI/PPI and pixel resolution.',
    tags: ['Print Prep', 'DPI/PPI', 'Megapixels'],
    keywords: ['dpi calculator', 'print size', 'image resolution', 'pixel to inch converter'],
    icon: 'ruler',
    href: '/tools/image-dimensions-calculator'
  },
  {
    id: 'add-watermark',
    title: 'Add Watermark',
    category: 'Image Tools',
    group: 'Calculators & Sizing',
    description: 'Apply copyright text or transparent PNG logo watermarks with custom opacity, tile mode, and position.',
    tags: ['Copyright Protection', 'Text & Logo', 'Batch Ready'],
    keywords: ['watermark image', 'add logo to photo', 'copyright stamp', 'watermark maker'],
    icon: 'shield-check',
    badge: 'Popular',
    href: '/tools/add-watermark'
  },
  {
    id: 'passport-size',
    title: 'Passport Size Maker',
    category: 'Image Tools',
    group: 'Calculators & Sizing',
    description: 'Generate standard 2x2 inch and 35x45mm international biometric passport photos ready to print on 4x6 paper.',
    tags: ['Biometric Standards', 'Print Layout', 'Official Spec'],
    keywords: ['passport photo', '2x2 inch photo', 'visa photo maker', 'biometric size'],
    icon: 'user-check',
    badge: 'Essential',
    href: '/tools/passport-size'
  },

  // Group: Optimization & Utilities
  {
    id: 'image-optimizer',
    title: 'Image Optimizer',
    category: 'Image Tools',
    group: 'Optimization & Utilities',
    description: 'Convert legacy image assets to next-gen WebP and AVIF formats for lightning-fast web performance.',
    tags: ['Next-Gen WebP', 'Core Web Vitals', 'High Performance'],
    keywords: ['optimize images', 'webp converter', 'avif generator', 'speed up website images'],
    icon: 'zap',
    badge: 'Fast',
    href: '/tools/image-optimizer'
  },
  {
    id: 'exif-viewer',
    title: 'Exif Viewer & Stripper',
    category: 'Image Tools',
    group: 'Optimization & Utilities',
    description: 'View embedded camera metadata, exposure specs, and GPS coordinates, or strip EXIF data for privacy.',
    tags: ['Privacy Guard', 'GPS Inspector', 'Metadata Remover'],
    keywords: ['exif viewer', 'remove metadata', 'strip geotag', 'camera details inspector'],
    icon: 'info',
    href: '/tools/exif-viewer'
  },
  {
    id: 'color-picker-from-image',
    title: 'Color Picker from Image',
    category: 'Image Tools',
    group: 'Optimization & Utilities',
    description: 'Sample precise pixel colors with magnifying loupe and auto-extract dominant harmonic palettes.',
    tags: ['HEX/RGB/HSL', 'Palette Extraction', 'Eyedropper'],
    keywords: ['color picker', 'extract palette', 'sample color from image', 'hex from photo'],
    icon: 'pipette',
    badge: 'Popular',
    href: '/tools/color-picker-from-image'
  },
  {
    id: 'image-converter',
    title: 'Image Converter',
    category: 'Image Tools',
    group: 'Optimization & Utilities',
    description: 'Batch convert pictures between PNG, JPG, WebP, GIF, SVG, BMP, and ICO with zero quality degradation.',
    tags: ['Multi-Format', 'Lossless Output', 'Zero Upload'],
    keywords: ['image converter', 'png to jpg', 'jpg to webp', 'convert format', 'ico maker'],
    icon: 'repeat',
    href: '/tools/image-converter'
  },

  // Group: Social Media Specs & Resizers
  {
    id: 'youtube-image-resizer',
    title: 'YouTube Specs & Resizer',
    category: 'Image Tools',
    group: 'Social Media Specs & Resizers',
    description: 'Preset resizer for YouTube Banners (2560x1440), Video Thumbnails (1280x720), and Channel Icons (800x800).',
    tags: ['16:9 Thumbnail', 'Banner Safe Zones', '2025 Spec'],
    keywords: ['youtube banner size', 'youtube thumbnail resizer', 'channel art', 'youtube specs'],
    icon: 'video',
    badge: 'Popular',
    href: '/youtube-banner-resizer',
    specs: '2560x1440 Banner · 1280x720 Thumb'
  },
  {
    id: 'instagram-image-resizer',
    title: 'Instagram Specs & Resizer',
    category: 'Image Tools',
    group: 'Social Media Specs & Resizers',
    description: 'Fit photos perfectly to Instagram Square (1080x1080), Portrait (1080x1350), Stories & Reels (1080x1920).',
    tags: ['No Crop Border', 'Story & Reel', '1080x1350'],
    keywords: ['instagram photo resizer', 'square post', 'instagram story size', 'reels cover'],
    icon: 'camera',
    badge: 'Popular',
    href: '/resize-image-for-instagram',
    specs: '1080x1080 Square · 1080x1920 Story'
  },
  {
    id: 'facebook-image-resizer',
    title: 'Facebook Specs & Resizer',
    category: 'Image Tools',
    group: 'Social Media Specs & Resizers',
    description: 'Scale photos for Facebook Cover (820x312), Link Posts (1200x630), and Event Headers (1920x1005).',
    tags: ['Cover Safe Area', 'Feed Post', 'Event Banner'],
    keywords: ['facebook cover size', 'fb banner resizer', 'facebook ad dimensions'],
    icon: 'share-2',
    href: '/facebook-cover-photo-resizer',
    specs: '820x312 Cover · 1200x630 Post'
  },
  {
    id: 'x-twitter-image-resizer',
    title: 'X (Twitter) Specs & Resizer',
    category: 'Image Tools',
    group: 'Social Media Specs & Resizers',
    description: 'Format images for X Header Banner (1500x500), In-Stream Photos (1600x900), and Avatar (400x400).',
    tags: ['3:1 Header', '16:9 Feed', 'No Compression Blurriness'],
    keywords: ['twitter header size', 'x banner resizer', 'twitter post image spec'],
    icon: 'twitter',
    href: '/twitter-header-resizer',
    specs: '1500x500 Header · 1600x900 Feed'
  },
  {
    id: 'linkedin-image-resizer',
    title: 'LinkedIn Specs & Resizer',
    category: 'Image Tools',
    group: 'Social Media Specs & Resizers',
    description: 'Format professional Company Banners (1128x191), Profile Covers (1584x396), and Post Images (1200x627).',
    tags: ['Business Standards', 'Personal Cover', 'Company Page'],
    keywords: ['linkedin banner size', 'linkedin background photo', 'linkedin post dimension'],
    icon: 'briefcase',
    href: '/linkedin-banner-resizer',
    specs: '1584x396 Banner · 1200x627 Post'
  },
  {
    id: 'pinterest-image-resizer',
    title: 'Pinterest Specs & Resizer',
    category: 'Image Tools',
    group: 'Social Media Specs & Resizers',
    description: 'Optimize high-converting Pinterest Standard Pins (1000x1500) with 2:3 ratio and Board Covers (600x600).',
    tags: ['2:3 Ratio', 'Tall Pins', 'High CTR'],
    keywords: ['pinterest pin size', 'pinterest 1000x1500', 'board cover resizer'],
    icon: 'pin',
    href: '/pinterest-pin-resizer',
    specs: '1000x1500 Standard · 2:3 Ratio'
  },
  {
    id: 'tiktok-image-resizer',
    title: 'TikTok Specs & Resizer',
    category: 'Image Tools',
    group: 'Social Media Specs & Resizers',
    description: 'Resize for 9:16 vertical video thumbnails (1080x1920) and high-resolution profile avatars (200x200).',
    tags: ['9:16 Vertical', 'Video Covers', 'Clear Avatar'],
    keywords: ['tiktok thumbnail size', 'tiktok 1080x1920', 'tiktok profile photo'],
    icon: 'play-square',
    href: '/tiktok-story-resizer',
    specs: '1080x1920 Fullscreen · 9:16'
  },
  {
    id: 'tumblr-image-resizer',
    title: 'Tumblr Specs & Resizer',
    category: 'Image Tools',
    group: 'Social Media Specs & Resizers',
    description: 'Produce sharp Tumblr Header Banners (3000x1055) and Dashboard Post visuals (1280x1920).',
    tags: ['High Res Banner', 'Dashboard Feed', 'Clean Preview'],
    keywords: ['tumblr banner size', 'tumblr photo dimensions', 'dashboard post'],
    icon: 'layout',
    href: '/tumblr-banner-resizer',
    specs: '3000x1055 Banner · 1280x1920 Post'
  },
  {
    id: 'whatsapp-image-resizer',
    title: 'WhatsApp Specs & Resizer',
    category: 'Image Tools',
    group: 'Social Media Specs & Resizers',
    description: 'Create crisp WhatsApp DP Profile Pictures (500x500), Status Stories (1080x1920), and Sticker Canvases (512x512).',
    tags: ['Circular DP', 'Status Story', 'Sticker Canvas'],
    keywords: ['whatsapp dp size', 'whatsapp status photo', 'whatsapp sticker 512x512'],
    icon: 'message-circle',
    badge: 'Popular',
    href: '/whatsapp-dp-resizer',
    specs: '500x500 DP · 1080x1920 Status'
  },

  // ==========================================
  // CATEGORY 2: DEVELOPER TOOLS (16 tools)
  // ==========================================
  // Group: JSON Utilities
  {
    id: 'json-formatter',
    title: 'JSON Formatter',
    category: 'Developer Tools',
    group: 'JSON Utilities',
    description: 'Prettify and indent messy JSON strings with customizable 2/4 spaces or tabs, syntax highlighting, and copy.',
    tags: ['Prettifier', '2/4 Tab Indent', 'Error Free'],
    keywords: ['json formatter', 'prettify json', 'beautify json', 'format json string'],
    icon: 'file-text',
    badge: 'Popular',
    href: '/tools/json-formatter'
  },
  {
    id: 'json-validator',
    title: 'JSON Validator',
    category: 'Developer Tools',
    group: 'JSON Utilities',
    description: 'Validate JSON syntax compliance, highlight line-by-line parsing errors, and inspect structural schemas.',
    tags: ['Error Pointer', 'Schema Check', 'RFC 8259'],
    keywords: ['json validator', 'validate json syntax', 'check json errors', 'json linter'],
    icon: 'check-circle-2',
    badge: 'Essential',
    href: '/tools/json-validator'
  },
  {
    id: 'json-minifier',
    title: 'JSON Minifier',
    category: 'Developer Tools',
    group: 'JSON Utilities',
    description: 'Strip unnecessary spaces, newlines, and comments to compress JSON payloads for API payloads and bandwidth savings.',
    tags: ['Payload Shrink', 'Zero Whitespace', 'Instant'],
    keywords: ['json minifier', 'minify json', 'compress json payload', 'strip json spaces'],
    icon: 'minimize',
    href: '/tools/json-minifier'
  },

  // Group: Encoders & Decoders
  {
    id: 'base64-encoder',
    title: 'Base64 Encoder',
    category: 'Developer Tools',
    group: 'Encoders & Decoders',
    description: 'Encode plain text, ASCII strings, or binary image files into standard RFC 4648 Base64 strings.',
    tags: ['RFC 4648', 'Text & Files', 'Data URIs'],
    keywords: ['base64 encoder', 'convert to base64', 'encode string', 'image to base64'],
    icon: 'binary',
    badge: 'Popular',
    href: '/tools/base64-encoder'
  },
  {
    id: 'base64-decoder',
    title: 'Base64 Decoder',
    category: 'Developer Tools',
    group: 'Encoders & Decoders',
    description: 'Decode Base64 payloads back to UTF-8 plaintext or reconstruct and download original binary files.',
    tags: ['UTF-8 Output', 'Binary Recovery', 'Safe Decode'],
    keywords: ['base64 decoder', 'decode base64 string', 'base64 to text', 'base64 to file'],
    icon: 'file-code',
    badge: 'Essential',
    href: '/tools/base64-decoder'
  },
  {
    id: 'url-encoder',
    title: 'URL Encoder',
    category: 'Developer Tools',
    group: 'Encoders & Decoders',
    description: 'Encode strings into RFC 3986 percent-encoded format for safe transmission in query parameters and URIs.',
    tags: ['RFC 3986', 'URI Escape', 'Percent Encoding'],
    keywords: ['url encoder', 'encode uri', 'urlencode', 'percent encode string'],
    icon: 'link',
    href: '/tools/url-encoder'
  },
  {
    id: 'url-decoder',
    title: 'URL Decoder',
    category: 'Developer Tools',
    group: 'Encoders & Decoders',
    description: 'Decode percent-encoded URI strings and complex query parameter payloads back to human-readable text.',
    tags: ['Query Unescape', 'UTF-8 Safe', 'Clean Strings'],
    keywords: ['url decoder', 'decode uri', 'urldecode', 'unquote url'],
    icon: 'link-2',
    href: '/tools/url-decoder'
  },

  // Group: Generators & Time
  {
    id: 'uuid-generator',
    title: 'UUID Generator',
    category: 'Developer Tools',
    group: 'Generators & Time',
    description: 'Generate cryptographic RFC 4122 Version 4 and Version 7 UUIDs individually or in bulk with one-click copy.',
    tags: ['v4 & v7 UUIDs', 'Crypto Random', 'Bulk Batch'],
    keywords: ['uuid generator', 'guid generator', 'random uuid', 'rfc 4122 v4'],
    icon: 'fingerprint',
    badge: 'Popular',
    href: '/tools/uuid-generator'
  },
  {
    id: 'timestamp-converter',
    title: 'Timestamp Converter',
    category: 'Developer Tools',
    group: 'Generators & Time',
    description: 'Convert human-readable calendar dates, ISO-8601 strings, and RFC 2822 timestamps into Unix epoch seconds and ms.',
    tags: ['ISO-8601', 'Timezone Aware', 'UTC & Local'],
    keywords: ['timestamp converter', 'date to timestamp', 'epoch converter', 'iso to unix'],
    icon: 'calendar',
    href: '/tools/timestamp-converter'
  },
  {
    id: 'unix-timestamp-converter',
    title: 'Unix Timestamp Converter',
    category: 'Developer Tools',
    group: 'Generators & Time',
    description: 'Parse raw Unix epoch timestamps (seconds or milliseconds) into local time, UTC, and relative duration strings.',
    tags: ['Seconds & MS', 'Relative Time', 'Epoch Clock'],
    keywords: ['unix timestamp converter', 'epoch to date', 'parse timestamp', 'current unix time'],
    icon: 'clock',
    badge: 'Fast',
    href: '/tools/unix-timestamp-converter'
  },

  // Group: Code & Formatters
  {
    id: 'regex-tester',
    title: 'Regex Tester',
    category: 'Developer Tools',
    group: 'Code & Formatters',
    description: 'Test JavaScript/PCRE regular expressions in real-time with highlighted captures, match indices, and flag toggles.',
    tags: ['Live Matcher', 'Group Captures', 'Flag Controls'],
    keywords: ['regex tester', 'regular expression test', 'regex online', 'regex validator'],
    icon: 'search',
    badge: 'Popular',
    href: '/tools/regex-tester'
  },
  {
    id: 'jwt-decoder',
    title: 'JWT Decoder',
    category: 'Developer Tools',
    group: 'Code & Formatters',
    description: 'Inspect JSON Web Token headers, payloads, and claims without sending private secrets to any remote server.',
    tags: ['100% Client-Side', 'Expiry Inspector', 'JSON Claims'],
    keywords: ['jwt decoder', 'decode jwt token', 'parse json web token', 'jwt debugger'],
    icon: 'key',
    badge: 'Essential',
    href: '/tools/jwt-decoder'
  },
  {
    id: 'html-formatter',
    title: 'HTML Formatter',
    category: 'Developer Tools',
    group: 'Code & Formatters',
    description: 'Format, indent, and organize raw HTML5 code with clean tag nesting, attribute formatting, and tag validation.',
    tags: ['HTML5 Prettier', 'Clean Indent', 'Tag Nesting'],
    keywords: ['html formatter', 'beautify html', 'indent html code', 'html clean up'],
    icon: 'code-2',
    href: '/tools/html-formatter'
  },
  {
    id: 'css-minifier',
    title: 'CSS Minifier',
    category: 'Developer Tools',
    group: 'Code & Formatters',
    description: 'Minify CSS stylesheets by stripping unnecessary comments, whitespace, and consolidating redundant declarations.',
    tags: ['Stylesheet Shrink', 'Faster FCP', 'Clean Output'],
    keywords: ['css minifier', 'minify css', 'compress stylesheet', 'css optimizer'],
    icon: 'file-spreadsheet',
    href: '/tools/css-minifier'
  },
  {
    id: 'js-minifier',
    title: 'JS Minifier',
    category: 'Developer Tools',
    group: 'Code & Formatters',
    description: 'Quickly minify client JavaScript snippets, stripping comments and space tokens for lean production loading.',
    tags: ['Script Compression', 'Production Ready', 'Instant'],
    keywords: ['js minifier', 'javascript minifier', 'compress js', 'clean javascript'],
    icon: 'terminal',
    href: '/tools/js-minifier'
  },

  // Group: Color Utilities
  {
    id: 'color-converter',
    title: 'Color Converter (HEX ⇄ RGB)',
    category: 'Developer Tools',
    group: 'Color Utilities',
    description: 'Two-way color conversion between HEX, RGB, RGBA, HSL, and CMYK with copyable CSS code snippets.',
    tags: ['HEX to RGB', 'RGB to HEX', 'HSL & CSS Codes'],
    keywords: ['color converter', 'hex to rgb', 'rgb to hex', 'hex color converter', 'hsl to rgb'],
    icon: 'palette',
    badge: 'Fast',
    href: '/tools/color-converter'
  }
];

export function getAllTools(): Tool[] {
  return TOOLS;
}

export function getToolsByCategory(category: 'Image Tools' | 'Developer Tools'): Tool[] {
  return TOOLS.filter(t => t.category === category);
}

export function getFeaturedTools(): Tool[] {
  return TOOLS.filter(t => t.badge === 'Popular' || t.badge === 'Essential');
}

export function getToolsByGroup(category: 'Image Tools' | 'Developer Tools', group: string): Tool[] {
  return TOOLS.filter(t => t.category === category && t.group === group);
}

export const QUICK_FILTERS = [
  { id: 'all', label: 'All Tools', count: 38 },
  { id: 'image-tools', label: 'Image Tools', count: 22 },
  { id: 'developer-tools', label: 'Developer Tools', count: 16 }
];
