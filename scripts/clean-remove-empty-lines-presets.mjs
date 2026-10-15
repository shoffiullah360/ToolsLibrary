import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const filePath = path.resolve('./src/data/removeEmptyLinesPresets.ts');

function cleanTitle(str) {
  if (!str) return '';
  return str
    .replace(/^How to\s+/i, '')
    .replace(/^How do I\s+/i, '')
    .replace(/^Complete Guide:?\s*/i, '')
    .replace(/^The Definitive Guide:?\s*/i, '')
    .replace(/^Definitive Guide:?\s*/i, '')
    .trim();
}

function cleanGeneral(text) {
  if (!text) return '';
  return text
    .replace(/\bWondering how to remove empty lines in\b/gi, 'Remove empty lines in')
    .replace(/\bSearching for how to remove empty lines in\b/gi, 'Remove empty lines in')
    .replace(/\bLooking for how to remove empty lines in\b/gi, 'Remove empty lines in')
    .replace(/\bNeed to know how to remove empty lines in\b/gi, 'Remove empty lines in')
    .replace(/\bLooking for how to remove empty lines from a text file\b/gi, 'Remove empty lines from text files')
    .replace(/\bStep-by-step tutorial on how to remove empty lines and blank rows in\b/gi, 'Instantly remove empty lines and blank rows in')
    .replace(/\bStep-by-step guide on removing empty lines and blank rows in\b/gi, 'Instantly remove empty lines and blank rows in')
    .replace(/\bStep-by-step methods to\b/gi, 'Directly')
    .replace(/\bMaster how to remove empty lines and blank paragraphs in\b/gi, 'Instantly remove empty lines and blank paragraphs in')
    .replace(/\bMaster how to remove empty lines in\b/gi, 'Instantly remove empty lines in')
    .replace(/\bLearn how to remove empty lines in\b/gi, 'Instantly remove empty lines in')
    .replace(/\bLearn how to remove empty lines from\b/gi, 'Instantly remove empty lines from')
    .replace(/\bLearn how to remove empty lines\b/gi, 'Instantly remove empty lines')
    .replace(/\bLearn how to\b/gi, 'Easily')
    .replace(/\bhow to remove empty lines\b/gi, 'remove empty lines')
    .replace(/\bHow to remove empty lines\b/gi, 'Remove empty lines')
    .replace(/\bHow to Remove Empty Lines\b/gi, 'Remove Empty Lines')
    .replace(/\bhow to remove\b/gi, 'remove')
    .replace(/\bHow to Remove\b/gi, 'Remove')
    .replace(/\bHow to Delete\b/gi, 'Delete')
    .replace(/\bHow to Clean\b/gi, 'Clean')
    .replace(/\bHow to Get Rid of\b/gi, 'Eliminate')
    .replace(/\bhow to delete\b/gi, 'delete')
    .replace(/\bhow to clean\b/gi, 'clean')
    .replace(/\bhow to get rid of\b/gi, 'eliminate')
    .replace(/\bUnderstanding how to strip empty structural lines\b/gi, 'Understanding how structural blank line removal works')
    .replace(/\bUnderstanding how structural blank line removal works\b/gi, 'Understanding structural blank line removal')
    .replace(/\bhow to collapse multiple blank lines\b/gi, 'collapsing multiple blank lines')
    .replace(/\bHow to collapse multiple blank lines\b/gi, 'Collapse multiple blank lines')
    .replace(/\bThis complete guide\b/gi, 'This reference')
    .replace(/\bthis complete guide\b/gi, 'this reference')
    .replace(/\bcomplete guide\b/gi, 'reference')
    .replace(/\bHow to\b/g, '')
    .replace(/\bhow to\b/g, '');
}

async function run() {
  const { REMOVE_EMPTY_LINES_PRESETS } = await import(pathToFileURL(filePath).href);
  console.log(`Loaded ${REMOVE_EMPTY_LINES_PRESETS.length} presets from ${filePath}`);

  const cleanedPresets = REMOVE_EMPTY_LINES_PRESETS.map((p, idx) => {
    const rawClean = cleanTitle(p.h1);
    const name = rawClean;
    const h1 = rawClean;
    const metaTitle = `${name} Online – Free Blank Line Remover | FastToolVerse`;

    // Clean primaryQuery
    let primaryQuery = p.primaryQuery.replace(/^how to\s+/i, '').trim();

    // Clean metaDescription
    let metaDescription = p.metaDescription
      .replace(/^Learn how to remove empty lines in\s+/i, 'Instantly remove empty lines in ')
      .replace(/^Learn how to remove empty lines from\s+/i, 'Instantly remove empty lines from ')
      .replace(/^Step-by-step tutorial on how to remove empty lines and blank rows in\s+/i, 'Instantly remove empty lines and blank rows in ')
      .replace(/^Step-by-step guide on removing empty lines and blank rows in\s+/i, 'Instantly remove empty lines and blank rows in ')
      .replace(/^Master how to remove empty lines and blank paragraphs in\s+/i, 'Instantly remove empty lines and blank paragraphs in ')
      .replace(/^Master how to remove empty lines in\s+/i, 'Instantly remove empty lines in ')
      .replace(/\blearn how to remove empty lines\b/gi, 'remove empty lines')
      .replace(/\bhow to remove empty lines\b/gi, 'remove empty lines')
      .replace(/\bhow to\b/gi, '')
      .trim();

    if (metaDescription.length > 155) {
      metaDescription = metaDescription.slice(0, 152).trim() + '...';
    }

    // Clean subtitle
    let subtitle = cleanGeneral(p.subtitle);

    // Clean intentCard
    let intentCard = cleanGeneral(p.intentCard);

    // Clean cluster
    let cluster = p.cluster === 'how-to' ? 'editor-tools' : p.cluster;
    let clusterTitle = p.clusterTitle === 'Direct How-To Question Guides' ? 'Direct Editor Presets' : p.clusterTitle;

    // Clean editorialGuide
    let editorialGuide = {
      heading: cleanTitle(p.editorialGuide.heading).replace(/^Removing Empty Lines in/i, 'Removing Empty Lines in'),
      sections: p.editorialGuide.sections.map((s) => ({
        title: cleanTitle(s.title)
          .replace(/^How to Remove Empty Lines in\s+/i, 'Remove Empty Lines in ')
          .replace(/^How to Remove Empty Rows Between Data in\s+/i, 'Remove Empty Rows in ')
          .replace(/^How to Remove Empty Lines from\s+/i, 'Remove Empty Lines from ')
          .replace(/^How to Delete Blank Lines in\s+/i, 'Delete Blank Lines in ')
          .replace(/^How to Clean Text Blank Lines in\s+/i, 'Clean Text Blank Lines in ')
          .replace(/^How to Get Rid of Extra Lines Between Paragraphs in\s+/i, 'Eliminate Extra Lines in ')
          .replace(/^How to Get Rid of Extra Lines in\s+/i, 'Eliminate Extra Lines in ')
          .replace(/^How to Remove Empty Lines in a Text File\s+/i, 'Remove Empty Lines in Text Files ')
          .replace(/^How to\s+/i, ''),
        paragraphs: s.paragraphs.map((para) => cleanGeneral(para)),
        bullets: s.bullets ? s.bullets.map((b) => cleanGeneral(b)) : undefined,
        callout: s.callout ? {
          type: s.callout.type,
          label: cleanGeneral(s.callout.label),
          text: cleanGeneral(s.callout.text)
        } : undefined
      }))
    };

    // Clean FAQs
    let faqs = p.faqs.map((f) => ({
      question: f.question
        .replace(/^How to delete blank lines in\s+/i, 'Can I delete blank lines in ')
        .replace(/^How to remove blank lines in\s+/i, 'Can I remove blank lines in ')
        .replace(/^How to remove extra lines in\s+/i, 'Can I remove extra lines in ')
        .replace(/^How to get rid of extra lines in\s+/i, 'Can I get rid of extra lines in ')
        .replace(/^How to remove empty lines in\s+/i, 'Can I remove empty lines in ')
        .replace(/^How to collapse multiple blank lines to a single blank line in\s+/i, 'Can I collapse multiple blank lines to a single blank line in ')
        .replace(/^How to\s+/i, 'Can I ')
        .replace(/^How do I\s+/i, 'Can I ')
        .replace(/\bHow do I\b/gi, 'Can I'),
      answer: cleanGeneral(f.answer)
    }));

    return {
      slug: p.slug,
      cluster,
      clusterTitle,
      primaryQuery,
      name,
      h1,
      metaTitle,
      metaDescription,
      subtitle,
      intentCard,
      options: p.options,
      sampleText: p.sampleText,
      editorialGuide,
      faqs
    };
  });

  const tsCode = `// Autogenerated 35 High-Intent Remove Empty Lines Presets
export interface EditorialSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  callout?: {
    type: 'tip' | 'note' | 'warning';
    label: string;
    text: string;
  };
}

export interface RemoveEmptyLinesPreset {
  slug: string;
  cluster: string;
  clusterTitle: string;
  primaryQuery: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  subtitle: string;
  intentCard: string;
  options: {
    whitespaceOnly: boolean;
    collapseBlanks: boolean;
    trimEdges: boolean;
  };
  sampleText: string;
  editorialGuide: {
    heading: string;
    sections: EditorialSection[];
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const REMOVE_EMPTY_LINES_PRESETS: RemoveEmptyLinesPreset[] = ${JSON.stringify(cleanedPresets, null, 2)};

export function getRemoveEmptyLinesPresetBySlug(slug: string): RemoveEmptyLinesPreset | undefined {
  return REMOVE_EMPTY_LINES_PRESETS.find((p) => p.slug === slug);
}
`;

  fs.writeFileSync(filePath, tsCode, 'utf8');
  console.log(`Successfully rewrote ${filePath}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
