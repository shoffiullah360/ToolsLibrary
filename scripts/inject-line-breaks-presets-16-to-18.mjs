import fs from 'fs';
import path from 'path';

const preset16Article = {
  heading: "Scrivener for Authors: Cleaning Line Breaks and Formatting Manuscript Chapters",
  sections: [
    {
      title: "The Writer's Reality: Why Imported Research Fractures Scrivener Manuscripts",
      paragraphs: [
        "For professional novelists, screenwriters, biographers, and non-fiction authors, Literature & Latte's Scrivener represents the gold standard in long-form writing software. Scrivener's binder architecture, corkboard index cards, and document scrivenings allow writers to assemble 100,000-word book projects with structural mastery. However, during the messy drafted reality of assembling a book, authors constantly import materials from outside environments: historical archival scans, interview audio transcripts, web clippings, research notes, and legacy drafts created in Microsoft Word or plain text editors.",
        "When importing these external text streams into Scrivener's editor, writers frequently encounter a jarring typographical glitch: sentences that fracture across hard, narrow lines at arbitrary intervals. Text copied from digitized historical sources or terminal transcripts carries embedded hard carriage returns and line feeds at the end of every 60 to 70 characters. When pasted into Scrivener's fluid editor, the prose looks like broken verse poetry, disrupting the visual rhythm essential for deep creative flow.",
        "Learning how to remove line breaks in scrivener is essential for any author preparing a commercial manuscript for publication. If these rogue breaks are left inside your scene documents, they corrupt word counts, disfigure dialogue formatting, and cause catastrophic spacing errors when compiling your book into an EPUB, Kindle MOBI, or print-ready PDF. While authors can use a client-side remove line breaks tool to sanitize research quotes before pasting, mastering Scrivener's native tools guarantees clean, professional manuscript chapters across your entire project binder."
      ],
      bullets: [
        "Imported interview transcripts and web clippings introduce unwanted hard breaks into Scrivener scenes.",
        "Hard-wrapped sentences break Scrivener's responsive editor wrapping and distort paragraph aesthetics.",
        "Rogue line breaks survive into compiled eBook and paperback formats, producing jarring layout gaps.",
        "Mastering Scrivener's native text manipulation utilities saves hundreds of hours of manual backspacing."
      ],
      callout: {
        type: "info",
        label: "Manuscript Integrity",
        text: "In Scrivener, each hard return creates an independent text paragraph. If lines within a paragraph are hard-wrapped, Scrivener's compiler will treat every single fragment as an indented paragraph."
      }
    },
    {
      title: "The Native Scrivener 'Unwrap Lines' Function: Instant Paragraph Healing",
      paragraphs: [
        "Many authors spend grueling hours manually clicking the start of every broken line, pressing Backspace, and tapping the Spacebar. Fortunately, Scrivener contains an obscure yet miraculous built-in command engineered specifically for authors dealing with imported plain-text files: **Unwrap Lines**.",
        "To use this feature, highlight the fractured text block within any Scrivener scene document (or press **Ctrl + A** on Windows or **Command + A** on Mac to select the entire scene). Navigate to the top menu bar and select **Edit > Text > Unwrap Lines**.",
        "The algorithmic brilliance of the 'Unwrap Lines' engine lies in its ability to differentiate between hard line wraps within a paragraph and the genuine double returns separating distinct paragraphs. Scrivener examines the selected text block, strips out the artificial line breaks that terminate mid-sentence, and rejoins the words into a smooth, continuous paragraph container—all while keeping your true paragraph divisions and dialogue blocks completely intact. In less than two seconds, a jagged 5,000-word chapter is transformed into pristine, editable prose."
      ],
      codeBlock: {
        language: "Scrivener Unwrap Lines Step-by-Step",
        code: "1. Open your scene document in the Scrivener main editor.\n2. Highlight the fractured paragraphs (or press Cmd + A / Ctrl + A).\n3. From the top menu, choose: Edit > Text > Unwrap Lines.\n4. Output: Broken mid-sentence returns are healed instantly without losing paragraph spacing!"
      },
      callout: {
        type: "tip",
        label: "The Unwrap Shortcut",
        text: "Use Edit > Text > Unwrap Lines on imported text. It reconnects broken lines while preserving empty lines that separate paragraphs."
      }
    },
    {
      title: "Project-Wide Find and Replace in Scrivener: Multi-Document Sanitation",
      paragraphs: [
        "While 'Unwrap Lines' works wonders on an open scene document, extensive book projects often span dozens or hundreds of individual text documents organized across parts, acts, and chapters in the Binder. If an imported draft introduced errant manual breaks across fifty scenes, opening each file individually is painfully inefficient.",
        "For bulk project sanitation, Scrivener offers **Project Replace** (located under **Edit > Find > Project Replace...**). Unlike standard Find and Replace which only operates on the active document, Project Replace operates globally across the entire binder, selected folders, or search collections.",
        "To remove manual line breaks across multiple documents, choose the scope in Project Replace (such as 'Selected documents' or 'Draft / Manuscript'). In the 'Replace' field, enter a single space (` `). To insert a line break into the 'Search For' field in Scrivener on macOS, hold **Option + Return**. On Windows, use the special regex mode by checking 'RegEx' and typing `\\n`. Scrivener will scan every document in your project binder and replace rogue returns, unifying text formatting across your entire manuscript in a single pass."
      ],
      bullets: [
        "Access Project Replace via Edit > Find > Project Replace for global binder-wide modifications.",
        "Target specific folders (e.g., Act I, Act II) to test replacements before applying them project-wide.",
        "Use Option + Return (Mac) or \\n with RegEx checked (Windows) to search for newline characters.",
        "Always create a manual project backup (File > Back Up > Back Up To...) before running Project Replace."
      ],
      callout: {
        type: "warning",
        label: "Project Backup Safety",
        text: "Project Replace cannot be undone with Ctrl + Z or Cmd + Z! Always save a zip backup (File > Back Up > Back Up To) before executing a global search and replace."
      }
    },
    {
      title: "Preserving Scrivener Dialogue and Spacing Rules: Inspector vs Enter Presses",
      paragraphs: [
        "In fiction and screenwriting, dialogue formatting follows strict industry conventions. Every speaker transition requires a new paragraph with an indent, while narrative action paragraphs require consistent leading. Authors frequently introduce formatting bugs by tapping the Enter key twice between dialogue lines to mimic book layouts.",
        "When an author subsequently attempts to remove line breaks from text or executes an unconstrained find-and-replace, dialogue lines risk collapsing into narrative blocks, obliterating speaker changes. Furthermore, special elements like scene break asterisks (`* * *`) or em-dashes (`—`) can get merged with adjacent dialogue.",
        "The professional approach in Scrivener is to let the software handle spacing automatically. Highlight your dialogue blocks, open the **Format Bar** or **Paragraph Settings** panel, and configure **Paragraph Spacing** (setting 'Points After' to 4pt or 6pt). When vertical rhythm is governed by Scrivener's paragraph styling rules, you eliminate the temptation to hit Enter repeatedly, protecting your dialogue from accidental erasure during data cleaning."
      ],
      codeBlock: {
        language: "Scrivener Spacing Best Practices",
        code: "// INCORRECT WORKFLOW (Manual Enter spam):\n\"I told you never to come back,\" Sarah whispered.[Enter]\n[Enter]\nMarcus didn't flinch. \"I don't take orders from you.\"[Enter]\n\n// CORRECT WORKFLOW (Single Enter + Style Padding):\n\"I told you never to come back,\" Sarah whispered.[Enter]\nMarcus didn't flinch. \"I don't take orders from you.\"\n(Configure paragraph spacing via Format > Text > Spacing: 4pt after)."
      }
    },
    {
      title: "Compile Settings Hygiene: Producing Clean EPUB, MOBI, and PDF Proofs",
      paragraphs: [
        "The ultimate test of an author's manuscript formatting comes during the **Compile** phase (**File > Compile...**). Scrivener's compiler is famously powerful: it takes raw binder documents, strips editor-specific formatting, and applies clean, uniform styles suitable for Amazon KDP, Apple Books, IngramSpark, or traditional literary agents.",
        "However, Scrivener's compiler will not automatically heal hard line wraps embedded inside raw paragraphs. If a chapter contains mid-sentence line breaks, Amazon Kindle's reflowable reading engine will treat each broken fragment as an independent line, creating ugly staggered margins on e-readers. Furthermore, if you need to remove line breaks online before staging raw text in Scrivener research folders, pre-cleaning text in a browser guarantees that zero control characters pollute your project database.",
        "Under the Compile settings, review the **Transformations** tab in the compile format designer. Ensure that **'Convert multiple spaces to single spaces'** is enabled and that paragraph indentations are governed by the compile format's CSS rather than raw tab or space keystrokes. By enforcing compile hygiene, your published book arrives in readers' hands with pristine typographical elegance."
      ],
      bullets: [
        "Amazon KDP and Apple Books require continuous reflowable text without rogue carriage returns.",
        "Scrivener compile transformations automatically normalize multiple spaces and strip redundant blank lines.",
        "Pre-cleaning research quotes prevents corrupting Scrivener's internal XML project database.",
        "Guarantees that eBooks look immaculate on smartphones, Kindles, and high-resolution tablets."
      ]
    }
  ]
};

const preset16Faqs = [
  {
    question: "What does the \"Unwrap Lines\" tool do in Scrivener, and when should I use it?",
    answer: "The 'Unwrap Lines' tool (found under Edit > Text > Unwrap Lines) automatically reconnects sentences that were broken across multiple lines by hard line breaks, while leaving double-spaced paragraph divisions intact. It is specifically designed to clean up text imported from plain-text files, emails, or scanned research documents where sentences were hard-wrapped at fixed column widths."
  },
  {
    question: "How do I remove unwanted line breaks across my entire novel binder at once?",
    answer: "Use Scrivener's Project Replace feature (Edit > Find > Project Replace). Select your 'Draft' or 'Manuscript' folder in the scope. On Mac, press Option + Return in the 'Search For' box to input a newline, and enter a space in 'Replace With'. On Windows, check the 'RegEx' box, enter \\n in 'Search For', enter a space in 'Replace With', and click Replace. Always make a zip backup (File > Back Up > Back Up To) first."
  },
  {
    question: "Will removing line breaks alter my scene character counts or word targets in Scrivener?",
    answer: "Removing line breaks will not decrease your actual word count because words are simply reconnected with spaces rather than deleted. However, your character count will change slightly (replacing a newline character with a single space keeps character totals nearly identical, while removing excessive double blank lines will reduce overall character count)."
  },
  {
    question: "How do I fix line breaks copied into Scrivener research folders from web archives?",
    answer: "When copying quotes from web archives or PDF research papers into Scrivener's Research folder, select the pasted text, navigate to Edit > Text > Unwrap Lines, or paste using Edit > Paste and Match Style (Ctrl + Shift + V on Windows, Cmd + Option + Shift + V on Mac) to strip external HTML line wrap styling."
  },
  {
    question: "Why does my compiled Kindle eBook show strange gaps between sentences?",
    answer: "Strange gaps or staggered line endings in compiled Kindle eBooks occur because hard carriage returns were left inside your scene paragraphs. Kindle's reflowable formatting treats every hard return as an explicit paragraph break. Running Edit > Text > Unwrap Lines on your source chapters before compiling fixes this issue."
  }
];

const preset17Article = {
  heading: "The PDF Text Recovery Guide: Eliminating Hard Line Breaks from Copied Documents",
  sections: [
    {
      title: "The Fundamental PDF Dilemma: Why Copied Text Breaks Across Fragments",
      paragraphs: [
        "In the digital universe, few formats are as universally utilized—and universally cursed by researchers, legal professionals, and students—as the Portable Document Format (PDF). Created by Adobe Systems in 1993, the PDF was conceived not as an editable document format, but as a digital sheet of paper. Its architecture relies on Adobe's PostScript visual description language, which maps glyphs, vectors, and font outlines to fixed mathematical coordinates (`x, y`) on a two-dimensional visual plane.",
        "Because a PDF file is fundamentally a print simulation rather than a semantic text stream, it has no native understanding of 'sentences', 'paragraphs', or 'word wrapping'. When an author finishes typing a line in a desktop publishing program and exports to PDF, the rendering engine draws text up to the right margin, halts, and initiates a brand new visual text draw command on the line below. The PDF does not remember that line 1 and line 2 were part of the same sentence.",
        "When you select text with your mouse and hit Copy (**Ctrl + C** / **Cmd + C**), your PDF viewer's clipboard engine is forced to guess how the coordinate data should be rendered as plain text. Inevitably, the PDF viewer inserts a physical carriage return (`\\r`) or line feed (`\\n`) at the end of every visual line wrap. When you paste this excerpt into a word processor or email, you are left with a 200-word paragraph fractured into 25 disjointed one-line fragments. Learning how to remove line breaks pdf exports contain is the fundamental gateway to restoring flowing, readable digital text."
      ],
      bullets: [
        "PDF files store visual coordinates for printers rather than flowing, editable digital text streams.",
        "PDF viewers insert hard carriage returns at every visual column margin upon clipboard copy.",
        "Copying academic papers, legal filings, or technical manuals fractures sentences into narrow strips.",
        "Eliminating these artificial line breaks is essential before analyzing, citing, or publishing research."
      ],
      callout: {
        type: "info",
        label: "PostScript Coordinate Model",
        text: "PDFs map characters to fixed (x, y) coordinates on a visual canvas. They possess no semantic awareness of sentence boundaries or fluid paragraph wrapping."
      }
    },
    {
      title: "The Anatomy of a PDF Copy-Paste Disaster",
      paragraphs: [
        "The consequences of unformatted PDF text extraction extend far beyond mere visual irritation. When a user pastes fragmented PDF lines into modern text editors or collaboration hubs like Notion, Google Docs, or Slack, multiple layout breakdowns occur simultaneously.",
        "First, text editors interpret each hard return as an independent paragraph element. In word processors formatted with paragraph spacing, this causes each ten-word fragment to carry bottom margin padding, bloating a single paragraph across three full pages. Second, spell-checking engines fail because words hyphenated across margins (such as 'in- / vestment') are parsed as two broken terms ('in-' and 'vestment'). Third, screen readers used by visually impaired readers stumble over the erratic line endings, pausing unnaturally mid-sentence.",
        "To illustrate the severity of this breakdown, consider copying a brief passage from an appellate court decision. What began as a cohesive legal argument becomes an unreadable ladder of staggered clauses. Knowing how to systematically remove line breaks from text restores natural prose continuity in seconds."
      ],
      codeBlock: {
        language: "Anatomy of PDF Copy-Paste Corruption",
        code: "// RAW COPIED PDF TEXT (Each line ends with a destructive hard break):\nUnder established constitutional precedent, the standard of review applied\nto administrative rulemaking requires courts to evaluate whether the agency\nacted in an arbitrary and capricious manner without statutory authority.\n\n// RESTORED FLOWING PROSE (Line breaks purged, natural wrapping restored):\nUnder established constitutional precedent, the standard of review applied to administrative rulemaking requires courts to evaluate whether the agency acted in an arbitrary and capricious manner without statutory authority."
      },
      callout: {
        type: "warning",
        label: "Paragraph Padding Explosion",
        text: "Pasting fragmented PDF lines into word processors multiplies paragraph-level margin padding by 20x, turning a brief quotation into an unreadable multi-page mess."
      }
    },
    {
      title: "Step-by-Step Restoration Strategies: Web Tools, Word Processors, and Shells",
      paragraphs: [
        "Depending on your workflow velocity and technical environment, there are three primary strategies to heal broken PDF copies.",
        "Method 1: Instant Browser-Based Sanitization. For everyday researchers, legal assistants, and students who need immediate results without software configuration, using a dedicated remove line breaks online tool is the fastest method. By pasting copied text into an in-browser sandbox, the utility detects trailing carriage returns and converts them into single spaces instantly. Because client-side tools execute within browser memory, confidential legal briefs and medical research excerpts are never uploaded to remote servers.",
        "Method 2: Word Processor Regular Expressions. If you are drafting a comprehensive report in Microsoft Word or LibreOffice, you can use built-in find-and-replace syntax. In Microsoft Word, editors rely on word remove line breaks techniques using caret search: replacing `^p` with a space to reconnect broken sentences. In Google Docs, checking 'Match using regular expressions' and replacing `\\n` with a space accomplishes the exact same result.",
        "Method 3: Multi-Column Extraction Discipline. When copying text from two-column or three-column PDF research papers (such as IEEE, ACM, or Nature journals), standard click-and-drag mouse selections frequently drag horizontally across both columns, interleaving sentences from column A with sentences from column B. In Adobe Acrobat or Preview, hold the **Option** key (Mac) or **Alt** key (Windows) while clicking and dragging to draw a vertical bounding box strictly around the single column you wish to extract before running a line break cleaner."
      ],
      codeBlock: {
        language: "Multi-Platform PDF Extraction Rules",
        code: "1. Multi-Column PDF Copying: Hold Option (Mac) or Alt (Windows) to select a single column vertically.\n2. In Microsoft Word: Press Ctrl + H -> Find: ^p -> Replace with: (spacebar) -> Replace All.\n3. In Google Docs: Press Ctrl + H -> Find: \\n -> Replace with: (spacebar) -> Check 'Match using regular expressions'.\n4. In Browser Tool: Paste raw PDF text -> Instant client-side cleanup -> Copy fluid prose."
      },
      bullets: [
        "Client-side web utilities provide zero-latency, privacy-safe text sanitation for daily research.",
        "Desktop word processors use caret codes (^p) or regex (\\n) to clean text within manuscripts.",
        "Holding Alt / Option enables vertical column selection, preventing sentence interleaving.",
        "Multi-step sanitization routines preserve natural word spacing across large copied passages."
      ]
    },
    {
      title: "Preserving Genuine Paragraph Gaps: The Real Boundary Challenge",
      paragraphs: [
        "The single greatest technical challenge when cleaning copied PDF text is distinguishing between an accidental line wrap (which occurred because the line ran out of room on the printed page) and a legitimate paragraph division (which occurred because an idea concluded).",
        "If an automated tool indiscriminately deletes every single line break across a 10-page document, all chapter paragraphs, dialogue transitions, and section headers fuse into one monolithic block of unreadable text. To prevent this, professional data cleaning utilizes a multi-pass routine: first, identify genuine paragraph endings (which are typically punctuated by a period, question mark, or colon followed by a line break and indentation), lock them behind a temporary placeholder string (like `###PARAGRAPH###`), strip all remaining single line breaks, and finally restore the genuine paragraph gaps."
      ],
      callout: {
        type: "tip",
        label: "Paragraph Boundary Logic",
        text: "True paragraph divisions in PDFs are typically marked by terminal punctuation followed by a double break. Protect these markers before stripping internal line wraps."
      }
    },
    {
      title: "Workflow Best Practices for Students, Academics, and Legal Researchers",
      paragraphs: [
        "Establishing an efficient quote extraction pipeline is a hallmark of high-performing researchers. Rather than interrupting your cognitive momentum to backspace every copied quote manually, streamline your workflow with system-level clipboard hygiene.",
        "Integrate a clipboard manager (such as Maccy or Paste on macOS, or the native Windows Clipboard History via **Win + V**) paired with an instant browser cleaner. When reviewing source PDFs, copy quotes freely throughout your reading session. When you transition to synthesis and drafting, pass your collected excerpts through a batch text cleaner to remove line breaks from all citations simultaneously. Your final thesis, legal memorandum, or investigative report will emerge with flawless typographical polish."
      ],
      bullets: [
        "Batch-clean extracted citations during the drafting phase rather than interrupting reading flow.",
        "Use clipboard managers to collect multiple PDF quotes before running bulk sanitization.",
        "Verify terminal punctuation to ensure citations maintain original quotation boundaries.",
        "Saves hours of formatting maintenance across academic theses and legal briefs."
      ]
    }
  ]
};

const preset17Faqs = [
  {
    question: "Why does copying text from a PDF insert an Enter key press at the end of every single line?",
    answer: "PDF files store text as visual characters anchored to fixed (x, y) coordinates on a page rather than flowing paragraphs. When text reaches the right margin of a page or column, the PDF rendering engine starts a new coordinate stream. When you copy that text, your PDF reader translates that visual coordinate break into a literal hard carriage return (Enter key press)."
  },
  {
    question: "How can I copy text from a two-column PDF without mixing up sentences across columns?",
    answer: "In desktop PDF viewers like Adobe Acrobat Reader or macOS Preview, hold down the Option key (Mac) or Alt key (Windows) while clicking and dragging your mouse. This activates 'Block Selection' or 'Column Mode', allowing you to draw a vertical rectangle around a single column without accidentally selecting text across the neighboring column."
  },
  {
    question: "Does removing line breaks from PDF copies delete hyphenated words that split across lines?",
    answer: "Standard line break replacement simply replaces newlines with spaces, which turns a split hyphenated word like 'insti-\\ntution' into 'insti- tution'. To cleanly fix hyphenated words, use a regular expression search like '([a-z])-\\n([a-z])' and replace it with '\\1\\2' to heal the word, or use an intelligent text cleaning tool that handles hyphen reconstruction automatically."
  },
  {
    question: "How do I clean line breaks from PDF tables before pasting them into spreadsheets?",
    answer: "Copying tables from PDFs often inserts line breaks inside individual data cells. To clean them, paste the table into a plain text editor or online line break removal tool to strip internal returns, or use Excel's 'From PDF' Power Query connector (Data > Get Data > From File > From PDF), which automatically parses and cleans tabular data cells without manual formatting."
  },
  {
    question: "What is the fastest way to extract and reformat raw text from a 100-page PDF report?",
    answer: "For large documents, avoid manual copying. Instead, export the entire PDF to plain text or Microsoft Word directly from Adobe Acrobat (File > Export To > Microsoft Word). Alternatively, on Linux/macOS, use the command-line utility 'pdftotext -layout input.pdf output.txt', or run the file through a Python script using pdfplumber to strip line breaks programmatically."
  }
];

const preset18Article = {
  heading: "Mastering OCR and PDF Text Extraction: How to Clean Corrupted Excerpts",
  sections: [
    {
      title: "The Scanned Document Headache: Why OCR Software Embeds Hard Line Feeds",
      paragraphs: [
        "In modern legal discovery, archival history, corporate compliance, and medical research, millions of physical pages are digitized every day through Optical Character Recognition (OCR). Software suites such as Adobe Acrobat Pro, ABBYY FineReader, Tesseract OCR, and Google Drive's built-in document converter scan bitmap pixel images of printed pages, identify character glyphs, and superimpose an invisible layer of digital text over the scanned image.",
        "While modern OCR engines achieve remarkable character recognition accuracy exceeding 99%, they suffer from an inherent architectural limitation: they recognize text scan line by scan line. When OCR engines process physical paper, they detect the white space margins at the end of each physical printed row. To mirror the exact visual bounding box of the original paper document, the OCR algorithm inserts a physical newline character (`\\n`) or carriage return (`\\r`) at the end of every single printed line.",
        "When researchers copy text from OCR-generated PDFs, this invisible scaffolding breaks down. Instead of fluid, re-usable text, users receive broken, staggered fragments littered with hyphenation artifacts, orphan page numbers, and fractured sentences. Knowing how to remove line breaks from pdf text is an indispensable technical skill for anyone conducting scholarly research, processing legal discovery files, or digitizing legacy archives."
      ],
      bullets: [
        "OCR engines process text line by line to match the physical bounding boxes of paper pages.",
        "Scanned documents inject hard carriage returns at every printed line edge upon text extraction.",
        "Historical archival scans frequently superimpose header and footer breaks directly into paragraphs.",
        "Automated post-OCR text sanitization restores editable, fluid prose for downstream knowledge management."
      ],
      callout: {
        type: "info",
        label: "OCR Bounding Box Mechanics",
        text: "OCR systems generate digital text to align precisely with visual image pixels. Consequently, every physical paper line break is recorded as a literal hard return in the underlying text stream."
      }
    },
    {
      title: "Cleaning Academic and Legal Transcripts: Repairing Interrupted Prose",
      paragraphs: [
        "In academic monographs and legal deposition transcripts, line breaks are not the only artifacts that disrupt text flow. Scanned pages are frequently punctuated by line numbering (common in court reporter transcripts), running headers, running footers, and footnote superscripts.",
        "When an author copies a paragraph that spans across a page boundary in a scanned PDF, the resulting clipboard snippet is severely corrupted. The sentence is split in half by a line break, followed by a page number (e.g., 'Page 142'), followed by the book title, followed by another line break, before the second half of the sentence resumes. Attempting to cite or analyze such broken excerpts produces immediate editorial errors.",
        "Restoring these transcripts requires targeted remove line breaks text formatting pipelines. By deploying regular expressions or specialized clipboard processing tools, editors strip out orphan digits and running headers, then purge artificial line wraps to reunite divided clauses into cohesive, flowing paragraphs."
      ],
      codeBlock: {
        language: "Scanned Transcript Page Boundary Corruption",
        code: "// CORRUPTED OCR CLIPBOARD EXCERPT (Interrupted across page boundary):\nThe doctrine of promissory estoppel requires proof of a clear and unambiguous\npromise upon which the plaintiff reasonably relied to their legal detriment.\n142 | HARVARD LAW REVIEW [Vol. 98:120\nIn evaluating the reasonableness of such reliance, appellate courts examine\nthe commercial sophistication of the negotiating parties.\n\n// CLEANED SANITIZED OUTPUT:\nThe doctrine of promissory estoppel requires proof of a clear and unambiguous promise upon which the plaintiff reasonably relied to their legal detriment. In evaluating the reasonableness of such reliance, appellate courts examine the commercial sophistication of the negotiating parties."
      },
      callout: {
        type: "warning",
        label: "Page Boundary Interruption",
        text: "Always inspect text copied across scanned PDF page boundaries. OCR software regularly injects page numbers, running headers, and footnote markers directly into the middle of split sentences."
      }
    },
    {
      title: "Intelligent Hyphenation and Word Reassembly: The Double Problem",
      paragraphs: [
        "The most pervasive grammatical artifact in OCR-processed documents is the split hyphenated word. In physical book printing, typesetters justify text columns by inserting hyphens to break words across lines (e.g., 'con- / stitutional' or 'estab- / lished'). When an OCR program reads these lines, it records the hyphen as a literal character followed by an immediate newline.",
        "If you execute a simple search-and-replace that swaps all newlines for spaces, you create a secondary spelling catastrophe: split hyphenated words turn into severed fragments ('con- stitutional' or 'estab- lished'). Conversely, if you blindly delete all hyphens, legitimate compound words (such as 'state-of-the-art' or 'post-operative') are mangled into compound blobs.",
        "To achieve intelligent hyphen reassembly, professional data pipelines apply regex lookarounds: `([a-z])-(\\r?\\n)([a-z])`. By matching a lowercase letter, a hyphen, a newline, and a subsequent lowercase letter, the pattern isolates words split strictly due to line wrapping. Replacing the match with `\\1\\2` (or eliminating the hyphen) heals the broken word into 'constitutional' while preserving genuine compound hyphens throughout your text."
      ],
      codeBlock: {
        language: "Hyphen Reassembly Regular Expression",
        code: "// Pattern to match words split by soft hyphens across line ends:\nFind regex:    ([a-zA-Z])-(\\r?\\n)([a-zA-Z])\nReplace with:  $1$3\n\n// Example Transformation:\n\"multi-\\nfunctional\"  ->  \"multifunctional\"\n\"de-\\nveloper\"       ->  \"developer\"\n\"cost-effective\"     ->  \"cost-effective\" (Untouched compound hyphen!)"
      },
      bullets: [
        "Physical typesetting hyphens become literal digital characters upon OCR scanning.",
        "Naively replacing returns with spaces creates severed words with orphaned hyphens ('trans- action').",
        "Context-aware regex rules distinguish between soft hyphen wraps and true compound adjectives.",
        "Restores correct spelling dictionary compliance for downstream search and text indexing."
      ]
    },
    {
      title: "Building an Automated Workflow for Heavy Readers and Researchers",
      paragraphs: [
        "For knowledge workers who manage thousands of research notes in Personal Knowledge Management (PKM) systems like Obsidian, Notion, Roam Research, or Logseq, manual text editing is an unsustainable friction point. Heavy readers need an automated bridge between PDF reading and note synthesis.",
        "By configuring a system-level clipboard utility paired with a browser-based remove line breaks online sandbox, you can establish an automated reading pipeline. Whenever you copy an excerpt from a scanned PDF or historical document, passing the raw string through an instant client-side cleaner removes trailing returns, rejoins split hyphens, and formats the excerpt into a clean Markdown blockquote ready for your second brain.",
        "Furthermore, modern cloud workflows frequently require converting multi-line PDF lists into single-line bullet points or semicolon-delimited database entries. Utilizing an instant remove line breaks pdf tool eliminates the friction of desktop formatting quirks, giving you pristine digital text at zero latency."
      ],
      callout: {
        type: "tip",
        label: "PKM Note Hygiene",
        text: "Clean your PDF excerpts before dropping them into Obsidian or Notion. This prevents broken Markdown blockquotes and keeps your graph database clean and searchable."
      }
    },
    {
      title: "The Zero-Latency Solution: Client-Side Browser Sandboxing",
      paragraphs: [
        "In corporate, legal, and healthcare research environments, data privacy and software security are paramount. Many enterprise workstations restrict employees from installing unauthorized third-party desktop utilities, and privacy regulations (such as HIPAA, GDPR, and attorney-client privilege) prohibit uploading confidential documents to cloud-based servers.",
        "Client-side browser text sanitization represents the ideal solution. Because modern HTML5 and JavaScript engines execute string transformations directly within your browser's local memory, zero data packets are transmitted across external networks. You can sanitize gigabytes of proprietary OCR discovery text, remove line breaks from text streams, and format legal citations with instant responsiveness and total security compliance."
      ],
      bullets: [
        "Local memory execution complies with HIPAA, GDPR, and strict legal confidentiality standards.",
        "Bypasses IT installation restrictions on locked-down enterprise workstations.",
        "Handles thousands of lines of raw OCR text in milliseconds without browser throttling.",
        "Provides an agile, cross-platform bridge for researchers on Mac, Windows, Linux, and mobile."
      ]
    }
  ]
};

const preset18Faqs = [
  {
    question: "How do I reconnect hyphenated words that were split across two lines in a PDF?",
    answer: "To heal hyphenated words split across lines, use regular expression pattern matching: search for '([a-zA-Z])-(\\r?\\n)([a-zA-Z])' and replace it with '$1$3'. This detects letters followed by a hyphen and a line break, and joins them back into a single continuous word (e.g., 'trans-\\naction' becomes 'transaction') while leaving true compound words like 'cost-effective' intact."
  },
  {
    question: "Why does OCR text from older scanned books contain random empty line returns?",
    answer: "Older scanned books often have physical paper aging artifacts, uneven print baselines, ink bleed-through, or foxing. OCR algorithms sometimes mistake these vertical paper irregularities, footnotes, or wide paragraph leading for structural paragraph breaks, inserting empty line feeds into the digitized text stream."
  },
  {
    question: "How can I paste PDF text into an email draft without triggering strange horizontal scrollbars?",
    answer: "Email clients (such as Outlook, Gmail, and Apple Mail) wrap text based on CSS block elements. Pasting raw PDF text containing hard line breaks forces the email client to render rigid line lengths, often triggering awkward horizontal scrollbars or premature wrapping. Passing your text through a client-side remove line breaks tool before pasting ensures natural fluid email wrapping."
  },
  {
    question: "Can I remove line breaks from PDF text on an iPad or mobile phone?",
    answer: "Yes. When reading PDFs in iPadOS or Android reader apps, select and copy the text, switch to your mobile web browser, paste the text into an online line break removal tool, tap 'Remove Line Breaks', and copy the healed prose back into your mobile notes app (such as Apple Notes or Google Keep)."
  },
  {
    question: "What settings in Adobe Acrobat help minimize hard line returns during text export?",
    answer: "In Adobe Acrobat Pro, when exporting a PDF to Microsoft Word or plain text (File > Export To > Microsoft Word), click the gear settings icon next to the format selection. Under 'Layout Settings', choose 'Retain Flowing Text' rather than 'Retain Page Layout'. This instructs Acrobat's OCR engine to actively reconstruct flowing paragraphs rather than placing hard breaks at every visual line margin."
  }
];

function countWords(article) {
  let count = 0;
  for (const sec of article.sections) {
    count += sec.title.split(/\s+/).filter(Boolean).length;
    for (const p of sec.paragraphs) {
      count += p.split(/\s+/).filter(Boolean).length;
    }
    if (sec.bullets) {
      for (const b of sec.bullets) {
        count += b.split(/\s+/).filter(Boolean).length;
      }
    }
    if (sec.callout) {
      count += sec.callout.label.split(/\s+/).filter(Boolean).length;
      count += sec.callout.text.split(/\s+/).filter(Boolean).length;
    }
    if (sec.codeBlock) {
      count += sec.codeBlock.code.split(/\s+/).filter(Boolean).length;
    }
  }
  return count;
}

console.log('Preset 16 Word Count:', countWords(preset16Article));
console.log('Preset 17 Word Count:', countWords(preset17Article));
console.log('Preset 18 Word Count:', countWords(preset18Article));

// Read the data file
const filePath = path.resolve('src/data/removeLineBreaksPresets.ts');
let fileContent = fs.readFileSync(filePath, 'utf8');

// Function to replace preset editorialGuide and faqs by slug safely using replacer callback
function replacePresetContent(slug, newArticle, newFaqs) {
  const slugRegex = new RegExp(`(\\{\\s*"slug":\\s*"${slug}",[\\s\\S]*?"editorialGuide":\\s*\\{)[\\s\\S]*?(\\n\\s*\\},\\s*"faqs":\\s*\\[)[\\s\\S]*?(\\n\\s*\\])`, 'm');
  const match = fileContent.match(slugRegex);
  if (!match) {
    console.error(`Could not find preset matching slug: ${slug}`);
    process.exit(1);
  }

  fileContent = fileContent.replace(slugRegex, (m, p1) => {
    return `${p1}\n      "heading": ${JSON.stringify(newArticle.heading)},\n      "sections": ${JSON.stringify(newArticle.sections, null, 8).replace(/^/gm, '      ').trim()}\n    },\n    "faqs": ${JSON.stringify(newFaqs, null, 6).replace(/^/gm, '    ').trim()}`;
  });
  console.log(`Successfully injected rich editorial guide & 5 FAQs into preset: ${slug}`);
}

replacePresetContent('remove-line-breaks-scrivener', preset16Article, preset16Faqs);
replacePresetContent('remove-line-breaks-pdf', preset17Article, preset17Faqs);
replacePresetContent('remove-line-breaks-from-pdf-text', preset18Article, preset18Faqs);

fs.writeFileSync(filePath, fileContent, 'utf8');
console.log('File successfully updated: src/data/removeLineBreaksPresets.ts');
