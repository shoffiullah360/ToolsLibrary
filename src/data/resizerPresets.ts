// src/data/resizerPresets.ts
import rawPagesData from './resizer-pages.json';

export interface ResizerPresetPage {
  slug: string;
  keyword: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  badge?: string;
  targetTag?: string;
  category: "filesize" | "dimension" | "social" | "preset";
  introCopy?: string;
  introParagraph?: string;
  toolDescription?: string;
  preset: {
    unit?: "PX" | "CM" | "MM" | "INCH" | "%";
    width?: number;
    height?: number;
    dpi?: number;
    targetMinSize?: number;
    targetSize?: number;
    targetUnit?: "KB" | "MB";
    maxFileSize?: number;
    maxFileUnit?: "KB" | "MB";
    lockRatio?: boolean;
  };
  faqs: Array<{ q: string; a: string }>;
}

export const RESIZER_PRESETS = rawPagesData as unknown as ResizerPresetPage[];
