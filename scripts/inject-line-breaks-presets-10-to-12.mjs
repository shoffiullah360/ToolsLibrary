import fs from 'fs';
import path from 'path';

const preset10Article = {
  heading: "The Illustrated Guide: How to Remove Line Breaks in Microsoft Word Step by Step",
  sections: [
    {
      title: "The Visual Clutter Problem: Why Copied Text Breaks Across Awkward Lines",
      paragraphs: [
        "In modern knowledge work, legal drafting, academic research, and business reporting, Microsoft Word remains the global benchmark for word processing. However, almost every professional who uses Word regularly encounters a frustrating, time-consuming formatting obstacle: copied text that refuses to flow smoothly across the page. Instead of filling the width of the document from margin to margin, paragraphs appear fractured into narrow, jagged vertical strips with abrupt hard breaks at the end of every five to ten words.",
        "This visual clutter typically originates when copying excerpts from external sources. Legal databases (such as Westlaw and LexisNexis), academic research portals (JSTOR, PubMed, and arXiv), scanned historical archives, OCR-processed documents, and email client threads frequently hardcode physical line terminators into plain text buffers. When pasted into Microsoft Word, these carriage returns are preserved verbatim, disrupting Word's natural text wrapping engine. Instead of dynamic paragraphs that automatically resize according to your margins, font sizes, or page orientations, you are left with an unreadable, staggered column of text.",
        "Mastering how to remove line breaks in word transforms hours of tedious, manual backspacing into a seamless, automated cleanup workflow. Rather than positioning your cursor at the start of every single broken line and tapping Backspace or Delete hundreds of times, Microsoft Word provides built-in search codes that purge unwanted breaks in seconds. Furthermore, knowing how to clean and remove line breaks from text before formatting your final draft guarantees professional typographical presentation across every document you publish."
      ],
      bullets: [
        "External text copies from PDFs, emails, and terminal screens insert hard line breaks at arbitrary widths.",
        "Manual backspacing across lengthy legal briefs or academic articles introduces inconsistent word spacing.",
        "Unwanted breaks disable Word's native paragraph reflow, preventing responsive layout adjustments.",
        "Understanding Word's specialized search syntax allows you to sanitize entire manuscripts in under a minute."
      ],
      callout: {
        type: "info",
        label: "Line-Wrap Breakdown",
        text: "When text contains embedded newline codes, Word treats every line as an independent structural block, disabling automatic hyphenation, margin wrapping, and standard paragraph styles."
      }
    },
    {
      title: "The Golden First Step: Activating the Show/Hide (¶) Pilcrow Button",
      paragraphs: [
        "Before executing any search-and-replace operation in Microsoft Word, you must take the single most critical step in document diagnostics: making the invisible formatting marks visible. Editing a complex document with formatting marks hidden is like attempting complex surgery in total darkness. You cannot accurately clean what you cannot see.",
        "To reveal these hidden layout elements, navigate to the **Home** tab on Word's top ribbon and locate the **Paragraph** section. Click the **Show/Hide (¶)** toggle button (represented by the typographic pilcrow icon, which resembles a backward 'P' with two vertical stems). Alternatively, press the universal keyboard shortcut **Ctrl + Shift + 8** on Windows or **Command + 8** on macOS.",
        "Once activated, Word renders every hidden layout control code on your screen. You will immediately notice two distinct types of breaks that behave differently. The first is the **Paragraph Mark (¶)**, created whenever you press the Enter key. A paragraph mark signals the termination of a complete paragraph block, triggering any 'Space After' or 'Space Before' styling defined in your paragraph settings. The second symbol is the **Manual Line Break (↵)**, represented as an arrow curving down and pointing left, created by pressing Shift + Enter. A manual line break pushes text to the next line without ending the current paragraph. Identifying which character is cluttering your text dictates which search code you must use."
      ],
      codeBlock: {
        language: "Word Typographical Symbols Reference",
        code: "¶  = Paragraph Mark (Enter key)\n     - Code in Find & Replace: ^p\n     - Terminates the paragraph and applies paragraph-level spacing.\n\n↵  = Manual / Soft Line Break (Shift + Enter keys)\n     - Code in Find & Replace: ^l (lowercase letter L)\n     - Forces text to a new line within the exact same paragraph container."
      },
      callout: {
        type: "tip",
        label: "Visual Diagnostic",
        text: "Always turn on the Show/Hide (¶) button (Ctrl + Shift + 8) before cleaning text. This reveals whether your document contains paragraph marks (^p) or manual soft returns (^l)."
      }
    },
    {
      title: "Step-by-Step Find and Replace Navigation: Using ^p and ^l Codes",
      paragraphs: [
        "Once you have identified the culprit characters using the pilcrow display, you can use Word's built-in Find and Replace utility to execute an automated cleanup. Open the dialog by pressing **Ctrl + H** on Windows or **Command + H** on Mac (or click **Replace** on the far right of the Home ribbon).",
        "If you only see basic inputs, click the **More >>** button at the bottom left of the dialog. This expands the advanced settings drawer, revealing search options, direction toggles, and the indispensable **Special** dropdown menu at the very bottom. While you can click 'Special' and select 'Paragraph Mark' or 'Manual Line Break' from the menu, professional typists simply type the shortcut escape codes directly into the input fields.",
        "To target standard paragraph breaks, enter `^p` (a caret symbol followed by a lowercase 'p') in the **Find what** field. To target soft manual returns, enter `^l` (a caret followed by a lowercase 'L') instead. The next decision is crucial: what to put in the **Replace with** field. In almost all circumstances, you must enter a **single spacebar space** in the Replace with box! If you leave the Replace with box completely blank, Word will delete the line break and weld adjacent words together into nonsensical compound terms (e.g., 'constitutionalrights' instead of 'constitutional rights'). Entering a single space ensures natural word separation when sentences rejoin.",
        "Click **Find Next** to preview the first match and confirm Word is highlighting the correct boundary. Once verified, click **Replace All**. Word scans the entire document, merges the fractured sentences back into continuous paragraphs, and displays a summary notification confirming the total number of replacements made."
      ],
      codeBlock: {
        language: "Step-by-Step Find and Replace Configuration",
        code: "1. Press Ctrl + H (Command + H on Mac) to open Find and Replace.\n2. In 'Find what', type: ^p (for paragraph marks) OR ^l (for soft returns).\n3. In 'Replace with', tap the SPACEBAR once (Input: \" \").\n4. Ensure 'Use wildcards' is UNCHECKED for standard ^p searches.\n5. Click 'Find Next' to test the first instance, then click 'Replace All'."
      },
      bullets: [
        "Use ^p to search for hard paragraph returns created via the Enter key.",
        "Use ^l (lowercase L) to locate soft manual line breaks inserted via Shift + Enter.",
        "Always insert a single space in 'Replace with' to avoid accidental word fusion.",
        "Verify that 'Match case' and 'Use wildcards' are unchecked during basic caret code replacements."
      ]
    },
    {
      title: "Fixing Accidental Blank Lines Across Long Essays: Eliminating ^p^p Double Returns",
      paragraphs: [
        "A common secondary complication when working with copied manuscripts or drafted essays is the presence of excessive blank lines. When authors or transcription programs press Enter twice between paragraphs, Word generates consecutive paragraph marks (`¶¶`). If your document style already includes built-in paragraph spacing (e.g., 8pt or 12pt space after), these double returns produce massive, gaping white spaces between thoughts.",
        "To clean up double spacing throughout an entire essay without disturbing actual paragraph separations, use a targeted two-pass technique. In the **Find what** box, type `^p^p` (representing two consecutive paragraph marks). In the **Replace with** box, type `^p` (a single paragraph mark). Click **Replace All**.",
        "If the document had triple or quadruple returns, repeat the 'Replace All' command two or three times until Word reports: 'All done. We made 0 replacements.' This systematically collapses all erratic, oversized vertical gaps into clean, standardized single-spaced paragraph boundaries."
      ],
      callout: {
        type: "info",
        label: "Spacing Normalization",
        text: "Replacing ^p^p with ^p eliminates excessive blank lines between paragraphs while preserving the logical separation of your written thoughts."
      }
    },
    {
      title: "When Word Freezes on Massive Drafts: Instant Browser Pre-Processing",
      paragraphs: [
        "While Microsoft Word's Find and Replace engine is robust for typical documents, it struggles significantly with massive files. When attempting to execute thousands of regex replacements across a 200-page doctoral thesis, a multi-volume legal transcript, or an unformatted 500,000-word book manuscript, Word frequently hangs. The application may enter a 'Not Responding' state, spin CPU fans, or crash completely, risking unsaved revisions.",
        "Furthermore, modern cloud workflows often involve Word for the Web (browser version), which lacks the full desktop dialog's advanced `^p` and `^l` caret search capabilities. When you need to word remove line breaks on Chromebooks, mobile devices, or sluggish enterprise workstations, running your text through an external remove line breaks online tool provides an immediate, foolproof remedy. By pasting raw clipboard dumps into a browser utility, you can sanitize formatting in a fraction of a second and paste pristine, fluid paragraphs directly into your Word manuscript."
      ],
      bullets: [
        "Desktop Word can freeze when performing thousands of caret replacements across massive 100+ page files.",
        "Word for the Web does not support the full suite of desktop caret replacement codes.",
        "Client-side text sanitization tools process millions of characters in milliseconds without crashing.",
        "Pre-cleaning text in a browser guarantees flawless paragraph pasting into any word processor."
      ]
    }
  ]
};

const preset10Faqs = [
  {
    question: "What does the backward \"P\" symbol (¶) mean in Microsoft Word, and how do I turn it off?",
    answer: "The backward 'P' symbol (¶) is called a pilcrow. It represents a non-printing paragraph break inserted whenever you press the Enter key. It does not appear on printed documents or exported PDFs. To turn it off or on, click the Show/Hide (¶) button located in the Paragraph group of the Home tab on the ribbon, or press the keyboard shortcut Ctrl + Shift + 8 (Command + 8 on Mac)."
  },
  {
    question: "What is the difference between pressing Enter and pressing Shift + Enter in Word?",
    answer: "Pressing Enter inserts a Paragraph Mark (^p), which signals the end of a complete paragraph and applies paragraph-level formatting such as first-line indents, paragraph styles, and 'Space After' margins. Pressing Shift + Enter inserts a Manual Line Break (^l), also called a soft break, which drops the cursor to the next line within the same paragraph without triggering paragraph spacing or indent rules."
  },
  {
    question: "Why did all my words get merged together without spaces after using Find and Replace?",
    answer: "This happens when the 'Replace with' field is left completely empty during a line break replacement. Word deletes the line break character without inserting any whitespace, fusing the last word of the preceding line with the first word of the following line (e.g., 'lawyerin' instead of 'lawyer in'). To fix this, always tap the spacebar once in the 'Replace with' box when replacing line breaks."
  },
  {
    question: "How do I remove line breaks in the Microsoft Word Web browser version where Ctrl + H has fewer features?",
    answer: "Microsoft Word for the Web has a simplified Find and Replace panel that does not support desktop caret codes like ^p or ^l. To remove line breaks when using Word online, paste your unformatted text into a client-side remove line breaks tool in another browser tab, strip the unwanted newlines, and paste the cleaned text back into Word for the Web."
  },
  {
    question: "Can I use the Find and Replace shortcut to replace line breaks with bulleted lists?",
    answer: "While you cannot directly insert Word's interactive list formatting through the Find and Replace dialog, you can replace paragraph breaks with a bullet character and tab: enter ^p in 'Find what' and a bullet symbol with a tab (e.g., •^t) in 'Replace with'. After replacing, select the text block and click the native 'Bullets' button on the Home tab to convert them into true interactive bullet points."
  }
];

const preset11Article = {
  heading: "Clean Document Publishing: Eliminating Line Breaks and Formatting Glitches in Word",
  sections: [
    {
      title: "Editorial Quality and Document Aesthetics: How Line Breaks Wreck Word Layouts",
      paragraphs: [
        "In the sphere of professional document publishing, corporate reporting, and manuscript typography, visual polish is directly correlated with perceived credibility. When an executive summary, legal brief, or commercial proposal is delivered with inconsistent line wrapping, ragged margins, and awkward whitespace gaps, readers immediately perceive the work as amateurish. Beneath the surface, the primary culprit behind these visual defects is almost always the presence of rogue line breaks.",
        "Unwanted line breaks wreak particular havoc on justified text alignment. When a paragraph formatted with 'Justify' alignment encounters a manual line break (`Shift + Enter`), Word attempts to stretch the few words preceding the break across the full horizontal width of the page. This produces an unsightly typographical flaw known as 'rivers of white' or 'stretched word spacing', where individual words are separated by massive horizontal voids. Furthermore, hard breaks split sentences prematurely, separating introductory clauses from main verbs and creating orphan lines that ruin the rhythm of your prose.",
        "Learning how to remove line breaks in word documents with surgical precision is fundamental to professional document production. Rather than performing blunt, wholesale replacements that collapse your entire manuscript into a single monolithic block of text, skilled editors deploy advanced multi-pass replacement workflows. By mastering remove line breaks text formatting techniques, you preserve genuine paragraph boundaries while eliminating jagged line artifacts."
      ],
      bullets: [
        "Unintended soft returns create extreme whitespace stretching in fully justified document layouts.",
        "Hard line breaks isolate headings and subheadings, creating orphan and widow lines across page breaks.",
        "Pasted text fragments disrupt Word's typography engine, preventing smooth hyphenation and line balancing.",
        "Professional publishing workflows require multi-pass sanitization to distinguish line wraps from paragraph boundaries."
      ],
      callout: {
        type: "info",
        label: "Typography Standard",
        text: "Justified text formatting requires fluid paragraphs. A single stray manual line break forces Word to stretch remaining words across the entire column width, destroying typographic rhythm."
      }
    },
    {
      title: "The Scanned PDF Extraction Pitfall: The Paragraph Boundary Dilemma",
      paragraphs: [
        "The most pervasive source of broken line formatting in modern office environments is copying text from PDF documents. Whether reviewing digitized legal transcripts, academic monographs, government white papers, or scanned book chapters, PDF text extraction represents a persistent technical dilemma.",
        "The Portable Document Format (PDF) was architected in the 1990s as a digital printing specification, not an editable text stream. PDFs do not understand the semantic concept of a 'paragraph'. Instead, PDF files store words as exact coordinate pairs on a two-dimensional grid (`x, y`). When a line of text reaches the physical right margin of a PDF column, the PDF compiler inserts a physical newline character before placing the next word on the line below. When you copy that text into Word, the clipboard engine translates every single visual line wrap into a hard paragraph break (`^p`).",
        "This creates the classic editor's dilemma: if you replace all `^p` marks with spaces, your genuine paragraph divisions—the blank lines separating independent conceptual arguments—disappear entirely, collapsing your essay into one massive, unreadable wall of text. Conversely, if you leave the breaks alone, every sentence remains fragmented into jagged micro-lines. Resolving this challenge requires a systematic, multi-step substitution strategy."
      ],
      codeBlock: {
        language: "The PDF Extraction Dilemma Illustrated",
        code: "// RAW EXTRACTED PDF TEXT (Contains hard breaks on every line AND double breaks between paragraphs):\nIn modern commercial jurisprudence, the concept of fiduciary duty^p\nextends far beyond executive boardrooms and encompasses all corporate^p\nofficers entrusted with delegated managerial authority.^p\n^p\nThis fundamental principle was reaffirmed during the appellate proceedings^p\nof the landmark Morrison litigation, establishing strict liability standards.^p"
      },
      callout: {
        type: "warning",
        label: "The PDF Dilemma",
        text: "Blindly replacing all ^p paragraph marks with spaces will destroy your document's actual paragraphs! Always use the 3-Step Paragraph Preservation Technique detailed below."
      }
    },
    {
      title: "The 3-Step Paragraph Preservation Technique",
      paragraphs: [
        "To eliminate jagged internal line breaks from copied PDF text while preserving your genuine paragraph boundaries, professional typesetters employ the brilliant 3-Step Paragraph Preservation Technique. This method utilizes an uncommon temporary placeholder string to protect true paragraph divisions before sanitizing internal line wraps. Alternatively, when working on mobile devices or Chromebooks without desktop Word, using an automated utility to remove line breaks online provides a fast, zero-configuration solution before pasting clean prose into your document.",
        "Step 1: Protect Genuine Paragraph Breaks. Open Find and Replace (**Ctrl + H**). In the **Find what** box, type `^p^p` (the double paragraph mark that separates distinct paragraphs in copied text). In the **Replace with** box, type an unusual placeholder string that never appears in natural prose, such as `###PARAGRAPH###` or `@@@`. Click **Replace All**. Your legitimate paragraph divisions are now safely locked behind an immutable text marker.",
        "Step 2: Clean the Jagged Line Breaks. Now that real paragraph divisions are protected, target the unwanted line breaks within each paragraph. In the **Find what** box, type `^p` (a single paragraph mark). In the **Replace with** box, tap the **spacebar once** (Input: ` `). Click **Replace All**. Word merges all fractured lines back into smooth, fluid sentences without touching your locked markers.",
        "Step 3: Restore Genuine Paragraph Divisions. Finally, restore your genuine paragraphs. In the **Find what** box, type your placeholder marker: `###PARAGRAPH###`. In the **Replace with** box, type `^p^p` (or `^p` if your Word Normal style already includes paragraph spacing). Click **Replace All**. In three swift steps, your copied manuscript is transformed into an immaculate, publication-grade document with perfect paragraph integrity."
      ],
      codeBlock: {
        language: "The 3-Step Preservation Workflow",
        code: "// Step 1: Protect real paragraph divisions\nFind what:    ^p^p\nReplace with: ###PARAGRAPH###\n-> Click 'Replace All'\n\n// Step 2: Strip internal line breaks and reconnect sentences\nFind what:    ^p\nReplace with:  (single spacebar press)\n-> Click 'Replace All'\n\n// Step 3: Restore original paragraph breaks\nFind what:    ###PARAGRAPH###\nReplace with: ^p (or ^p^p)\n-> Click 'Replace All' -> Result: Flawless Manuscript Formatting!"
      },
      bullets: [
        "Step 1 converts genuine double returns (^p^p) into an uncommon placeholder string.",
        "Step 2 swaps all remaining individual line returns (^p) for single spaces, rejoining sentences.",
        "Step 3 converts the placeholder string back into clean paragraph marks (^p).",
        "This multi-pass technique guarantees 100% paragraph preservation without manual line-by-line editing."
      ]
    },
    {
      title: "Handling Soft Returns (^l) and Normal Style Properties",
      paragraphs: [
        "Beyond paragraph marks, documents frequently contain soft returns, also known as Manual Line Breaks (`^l`). Soft returns are commonly inserted when novice editors want to move text to the next line without triggering the large bottom margin defined in their Word style template. However, soft returns break Word's paragraph flow, disable drop caps, and cause header numbering schemes to skip lines.",
        "To purge all soft returns from your document, run a Find and Replace with `^l` in the **Find what** box and a single space (or `^p` if you wish to promote the line to a true paragraph) in the **Replace with** box. Once purged, configure your document's paragraph spacing correctly through Word's **Styles** pane rather than relying on manual keyboard returns.",
        "Right-click the **Normal** style in the Home tab ribbon, select **Modify**, and click **Format > Paragraph**. Set 'Spacing Before' to `0 pt` and 'Spacing After' to `6 pt` or `8 pt`, with 'Line Spacing' set to `1.15` or `1.2`. By allowing Word's automated style engine to govern vertical spacing, you eliminate the temptation for authors to insert rogue manual returns, ensuring permanent layout stability across all future revisions."
      ],
      callout: {
        type: "tip",
        label: "Style Governance",
        text: "Never use manual Enter or Shift+Enter presses to create spacing between paragraphs. Configure 'Space After' in your Normal style to maintain consistent, automated document margins."
      }
    }
  ]
};

const preset11Faqs = [
  {
    question: "How do I remove line breaks from copied PDF text in Word without losing my actual paragraphs?",
    answer: "Use the 3-step placeholder technique: First, press Ctrl + H and replace double paragraph breaks (^p^p) with a unique marker like '###PARAGRAPH###'. Second, replace all remaining single paragraph breaks (^p) with a single space to rejoin broken sentences. Third, replace '###PARAGRAPH###' back into ^p (or ^p^p). This repairs jagged lines while completely preserving your genuine paragraph boundaries."
  },
  {
    question: "Why does justified text look stretched out with huge gaps across words after a line break?",
    answer: "This happens when text is terminated with a Manual Line Break (Shift + Enter / ^l) instead of a true Paragraph Mark (Enter / ^p). Under 'Justify' alignment, Word forces all words on a line to fill the entire horizontal space between margins. Because a soft return does not terminate the paragraph, Word stretches the preceding words across the margin. Replacing ^l with a space or true paragraph break (^p) resolves the distortion."
  },
  {
    question: "How do I remove soft line breaks (^l) without affecting regular paragraph breaks (^p)?",
    answer: "Press Ctrl + H to open Find and Replace. In the 'Find what' field, type ^l (caret followed by lowercase L). In the 'Replace with' field, enter a single space (or leave it blank if no space is needed). Click 'Replace All'. Word will sweep away all soft manual line breaks while leaving all standard paragraph breaks (^p) completely untouched."
  },
  {
    question: "Can I set Word to automatically clean up line breaks whenever I paste external text?",
    answer: "While Word does not natively strip internal line breaks during paste, you can set Word's default paste behavior to clean formatting: Go to File > Options > Advanced. Under 'Cut, copy, and paste', change 'Pasting from other programs' to 'Keep Text Only'. Alternatively, paste copied text using Ctrl + Shift + V (or Right-click > Keep Text Only) to strip rich HTML wraps."
  },
  {
    question: "Does removing line breaks alter footnotes, endnotes, or comments inside a Word file?",
    answer: "When you execute a standard Find and Replace (Ctrl + H), Word applies replacements to the main document body by default. If your cursor is positioned inside a footnote, header, or table, Word will search that container first and prompt: 'Do you want to search the remainder of the document?'. Footnote and endnote reference numbers remain fully intact, but any line breaks within footnote text will be sanitized if the search scope covers the entire file."
  }
];

const preset12Article = {
  heading: "Advanced Word Techniques: Automated Scripting, Wildcards, and Batch Line Break Removal",
  sections: [
    {
      title: "High-Volume Publishing Workflows: Managing Enterprise Manuscripts and Transcripts",
      paragraphs: [
        "In enterprise legal publishing, government archival digitization, and book production, editing workflows operate at extreme scale. Editorial teams frequently receive scanned court depositions, legislative transcripts, and converted OCR manuscripts that span hundreds or thousands of pages. In these massive text repositories, irregular line breaks do not occur by the dozens—they occur by the tens of thousands.",
        "Attempting manual line-by-line cleanups or executing basic, unconstrained Find-and-Replace operations across a 500-page manuscript is dangerous. A global search that strips all paragraph breaks indiscriminately destroys section titles, chapter headings, itemized bullet lists, and dialogue exchanges, requiring hours of painful manual reconstruction. Professional document engineers require sophisticated, surgical automation techniques that isolate rogue breaks without disturbing document structure.",
        "Understanding how to remove line breaks in word at an enterprise scale requires moving far beyond basic keyboard shortcuts. When publishing teams need to remove line breaks in word manuscripts spanning thousands of pages, unconstrained replacements can destroy formatting. While an external remove line breaks tool is ideal for quickly sanitizing isolated text snippets in a web browser, mastering Word's native wildcard regex engine and automated VBA macros empowers editors to word remove line breaks from text directly inside production documents with surgical accuracy."
      ],
      bullets: [
        "Enterprise document workflows demand high-precision automation to handle thousands of pages without layout corruption.",
        "Unconstrained Find-and-Replace risks destroying chapter headers, speaker names in depositions, and numerical tables.",
        "Word's native wildcard engine allows contextual pattern matching based on surrounding character cases.",
        "VBA scripting enables automated, one-click sanitation across multi-section documents, headers, and text boxes."
      ],
      callout: {
        type: "info",
        label: "Enterprise Scale",
        text: "When managing multi-thousand-page manuscripts, manual cleaning is impossible. Context-aware regular expressions and VBA macros provide safe, high-speed automated sanitation."
      }
    },
    {
      title: "Unleashing Word's Wildcard Engine: Context-Aware Pattern Matching",
      paragraphs: [
        "Microsoft Word features a powerful, built-in pattern-matching engine accessible by checking the **'Use wildcards'** box in the Find and Replace dialog (**Ctrl + H > More >>**). Word wildcards function similarly to standard regular expressions, allowing you to search for patterns based on character classes, casing, and position.",
        "The primary challenge in cleaning broken sentences is identifying line breaks that occur strictly in the middle of a sentence, rather than at the end of a thought. Sentences split mid-stream typically have a lowercase letter immediately before the break and another lowercase letter immediately after the break (e.g., 'juris-\\nprudence' or 'the\\ncompany'). Conversely, paragraph endings conclude with punctuation followed by an uppercase letter or number.",
        "To match mid-sentence breaks with 100% surgical accuracy, enter the following pattern in the **Find what** field: `([a-z])^13([a-z])`. (Note: In Word wildcard mode, you must use `^13` to represent a paragraph break rather than `^p`). This pattern defines two capture groups: group 1 matches any lowercase letter before the return, and group 2 matches any lowercase letter following it. In the **Replace with** field, enter: `\\1 \\2`. This tells Word to keep both letters intact while replacing the line break between them with a clean space. Running this replacement rejoins split sentences instantly while leaving all headings, numbered sections, and capitalized paragraph openings completely untouched!"
      ],
      codeBlock: {
        language: "Word Wildcard Regex Patterns",
        code: "// 1. Reconnect Mid-Sentence Breaks (Matches lowercase letter + return + lowercase letter):\nFind what:    ([a-z])^13([a-z])\nReplace with: \\1 \\2\n\n// 2. Reconnect Hyphenated Words Split Across Lines:\nFind what:    ([a-z])-^13([a-z])\nReplace with: \\1\\2\n\n// 3. Rejoin Sentences Ending Without Punctuation Followed by Words:\nFind what:    ([a-z,])^13([A-Z])\nReplace with: \\1 \\2"
      },
      callout: {
        type: "warning",
        label: "Wildcard Mode Syntax Trap",
        text: "When 'Use wildcards' is enabled, ^p will cause a syntax error! You MUST use ^13 in the 'Find what' field to represent a paragraph break during wildcard searches."
      }
    },
    {
      title: "The Complete VBA Automation Macro: One-Click Document Sanitization",
      paragraphs: [
        "For law firms, publishing houses, and medical records departments that regularly process unformatted text dumps, manually configuring Find and Replace dialogs multiple times a day is inefficient. By embedding a custom Visual Basic for Applications (VBA) macro into Word's `Normal.dotm` global template, staff can sanitize entire documents with a single keyboard shortcut.",
        "To install the macro, press **Alt + F11** in Word to open the Visual Basic Editor. In the Project pane, click **Insert > Module**, and paste the robust cleanup script provided below. This automated macro iterates through the entire active document, eliminates manual soft returns (`^l`), collapses multiple blank paragraph marks, cleans up excessive spacing, and re-enables smooth text flow.",
        "Once pasted, close the VBA editor. You can assign this macro to a custom button on Word's Quick Access Toolbar or bind it to a keystroke like **Ctrl + Shift + C**. With one tap, an entire 100-page transcript is scrubbed of all formatting anomalies in less than one second."
      ],
      codeBlock: {
        language: "VBA Document Cleanup Macro",
        code: "Sub CleanAllLineBreaks()\n    Dim rng As Range\n    Set rng = ActiveDocument.Content\n    \n    Application.ScreenUpdating = False\n    \n    ' 1. Replace soft line breaks (^l) with spaces\n    With rng.Find\n        .ClearFormatting\n        .Replacement.ClearFormatting\n        .Text = \"^l\"\n        .Replacement.Text = \" \"\n        .Execute Replace:=wdReplaceAll\n    End With\n    \n    ' 2. Collapse 3+ consecutive paragraph breaks into 2\n    With rng.Find\n        .Text = \"^p^p^p\"\n        .Replacement.Text = \"^p^p\"\n        .Execute Replace:=wdReplaceAll\n    End With\n    \n    ' 3. Collapse multiple spaces into a single space\n    With rng.Find\n        .Text = \"  \"\n        .Replacement.Text = \" \"\n        .Execute Replace:=wdReplaceAll\n    End With\n    \n    Application.ScreenUpdating = True\n    MsgBox \"Document line breaks cleaned successfully!\", vbInformation, \"Data Hygiene\"\nEnd Sub"
      },
      bullets: [
        "VBA macros run in milliseconds and execute consistent multi-pass cleaning routines automatically.",
        "ScreenUpdating = False prevents screen flickering and accelerates execution speed by 10x.",
        "Easily assignable to custom ribbon buttons or keyboard shortcuts for rapid firm-wide deployment.",
        "Guarantees uniform formatting standards across legal, medical, and publishing teams."
      ]
    },
    {
      title: "Cleaning Text Boxes, Footnotes, and Tables with Document-Wide Scope",
      paragraphs: [
        "A critical limitation of Word's basic Find and Replace interface is its inability to automatically search beyond the main document body story. If your manuscript contains callout boxes, sidebars, floating text frames, footnotes, endnotes, or multi-row tables, a standard **Ctrl + H** replacement will completely bypass text stored within those elements!",
        "In Microsoft Word's internal object model, documents are divided into multiple distinct 'Story Ranges' (`wdMainTextStory`, `wdFootnotesStory`, `wdCommentsStory`, and `wdTextFrameStory`). When an author clicks 'Replace All', Word typically operates only on the active story range. If you need to clean text embedded inside complex multi-column tables or floating shapes, you must either click inside the shape before opening Find and Replace or employ a VBA macro that explicitly iterates through all `StoryRanges` across the file.",
        "Before performing any automated, document-wide regex or macro replacement on production manuscripts, always adhere to safe editing safeguards: turn on **Track Changes** (**Ctrl + Shift + E**) or save an explicit version backup. This ensures that every automated replacement is fully auditable, allowing you to review modifications before publishing."
      ],
      callout: {
        type: "tip",
        label: "Story Range Scope",
        text: "Standard Find and Replace only searches the active story container. To clean text inside tables, footnotes, or text boxes, place your cursor inside that specific element first."
      }
    }
  ]
};

const preset12Faqs = [
  {
    question: "How do I use Word Wildcards to remove line breaks that occur only in the middle of sentences?",
    answer: "Open Find and Replace (Ctrl + H), click 'More >>', and check 'Use wildcards'. In 'Find what', enter ([a-z])^13([a-z]). In 'Replace with', enter \\1 \\2. This pattern searches for a lowercase letter followed by a paragraph return and another lowercase letter, replacing the break with a single space while leaving capitalized headings and paragraph openings completely intact."
  },
  {
    question: "Why does Word say \"Special search characters are not supported in wildcard searches\" when I use ^p?",
    answer: "In Microsoft Word, ^p is a high-level paragraph code designed exclusively for standard searches. When 'Use wildcards' is checked, Word switches to its regex parsing engine, which does not recognize ^p in the 'Find what' box. To search for a paragraph break in wildcard mode, you must use ^13 (the ASCII character code for a carriage return). However, you can still use ^p in the 'Replace with' box."
  },
  {
    question: "How can I create a keyboard macro in Word to clean line breaks with a single keystroke?",
    answer: "Press Alt + F11 to open the VBA Editor, click Insert > Module, and paste a cleanup macro (such as our CleanAllLineBreaks subroutine). Close the editor. Next, go to File > Options > Customize Ribbon > Keyboard shortcuts: Customize. Select 'Macros' in the Categories list, choose your macro name, press your desired shortcut key combination (e.g., Ctrl + Shift + K), and click 'Assign'."
  },
  {
    question: "Will running a document-wide line break replacement affect tables and cell structures in Word?",
    answer: "In Microsoft Word tables, the end-of-cell marker and end-of-row marker are encoded as special control characters that resemble paragraph marks. If you run a standard replace of ^p with a space, Word will safely replace paragraph breaks inside cells without destroying table grid boundaries. However, running an aggressive wildcard search across tables should be tested first on a duplicate copy to avoid unexpected text reflow."
  },
  {
    question: "How can I remove line breaks from locked or restricted-editing Word forms?",
    answer: "If a document has editing restrictions enabled (under the Review tab > Restrict Editing), Find and Replace is disabled. You must click 'Stop Protection' (entering the password if one was set) before cleaning. If the password is unknown, copy the text into an external client-side remove line breaks tool, sanitize the line breaks, and paste it into a new unlocked Word document."
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

console.log('Preset 10 Word Count:', countWords(preset10Article));
console.log('Preset 11 Word Count:', countWords(preset11Article));
console.log('Preset 12 Word Count:', countWords(preset12Article));

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

replacePresetContent('how-to-remove-line-breaks-in-word', preset10Article, preset10Faqs);
replacePresetContent('remove-line-breaks-in-word', preset11Article, preset11Faqs);
replacePresetContent('word-remove-line-breaks', preset12Article, preset12Faqs);

fs.writeFileSync(filePath, fileContent, 'utf8');
console.log('File successfully updated: src/data/removeLineBreaksPresets.ts');
