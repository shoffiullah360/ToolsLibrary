import fs from 'fs';
import path from 'path';

const preset13Article = {
  heading: "The Cloud Workspace Guide: Removing Line Breaks and Fixing Layouts in Google Docs",
  sections: [
    {
      title: "The Realities of Cloud Collaboration: How Multi-User Workflows Introduce Ragged Text",
      paragraphs: [
        "In modern cloud workplaces, marketing agencies, software startups, and enterprise operations teams rely on Google Docs as their primary canvas for real-time collaborative writing. Whether assembling product requirement documents (PRDs), customer case studies, executive pitches, or internal wikis, Google Docs makes co-authoring frictionless. However, this fluid collaborative dynamic introduces a chronic formatting dilemma: the persistent emergence of ragged, fragmented line breaks across shared drafts.",
        "When distributed team members collaborate, text is constantly copied and pasted from a dizzying variety of external communication tools. Excerpts pulled from Slack chat channels, Notion task boards, Discord discussions, customer email threads, terminal logs, and raw web pages bring with them invisible, hardcoded line breaks. Because chat platforms and code windows format text for narrow viewing widths, pasting these passages into Google Docs fractures sentences into awkward vertical strips with jagged right margins.",
        "Mastering how to remove line breaks in google docs workflows is critical for preserving executive document presentation. When corporate teams need to execute a google docs remove line breaks operation across an extensive collaborative project, manual backspacing is not only tedious but error-prone. Knowing how to efficiently remove line breaks google docs documents accumulate and how to remove line breaks from text before dropping excerpts into collaborative drafts ensures flawless cloud typography."
      ],
      bullets: [
        "Copying text from chat apps like Slack or Discord injects narrow column breaks into Google Docs.",
        "Unsanitized line breaks break Google Docs' responsive wrapping across mobile and tablet viewers.",
        "Manual backspacing across shared drafts creates inconsistent word spacing and clutters document history.",
        "Mastering regular expressions in Google Docs allows authors to clean hundreds of pages with a single click."
      ],
      callout: {
        type: "info",
        label: "Cloud Collaboration Nuance",
        text: "In Google Docs, pasted hard returns create independent paragraph elements, which apply paragraph-level padding, indentation, and list spacing to every single fractured line."
      }
    },
    {
      title: "The Interactive Find and Replace in Google Docs: Activating Regular Expressions",
      paragraphs: [
        "Many Google Docs users assume that stripping line breaks requires installing third-party software or writing complex scripts. In reality, Google Docs includes a sophisticated, native regex search engine built directly into its standard interface. However, because this feature is hidden behind an optional checkbox, millions of users overlook it.",
        "To access the search panel, open your document and press the universal keyboard shortcut: **Ctrl + H** on Windows and Chromebooks, or **Command + Shift + H** on macOS. (Alternatively, select **Edit > Find and replace** from the top menu). While the basic search bar appears familiar, attempting to find a line break by typing `\\n` or pressing Enter will fail completely by default—Google Docs will merely search for the literal letters '\\' and 'n'.",
        "The powerhouse step is checking the box labeled **'Match using regular expressions'**. When regex matching is activated, Google Docs switches from literal character matching to pattern recognition mode. Now, typing `\\n` into the **Find** field instructs Docs to locate every newline and paragraph break throughout your document. In the **Replace with** field, tap the spacebar once (Input: ` `). Entering a space is essential; leaving this field blank causes adjacent words to fuse together into unreadable compound words (e.g., 'teamalignment' instead of 'team alignment').",
        "Click **Replace all**. In an instant, Google Docs sweeps across your text, merges the fractured lines into continuous, fluid paragraphs, and recalculates page layout boundaries seamlessly."
      ],
      codeBlock: {
        language: "Google Docs Find and Replace Configuration",
        code: "1. Press Ctrl + H (Cmd + Shift + H on Mac) to open Find and replace.\n2. In 'Find', type: \\n\n3. In 'Replace with', tap Spacebar once (Input: \" \").\n4. CHECK THE BOX: 'Match using regular expressions' (MANDATORY).\n5. Click 'Replace all' to merge broken lines into fluid paragraphs."
      },
      callout: {
        type: "warning",
        label: "Regex Checkbox Required",
        text: "You MUST check 'Match using regular expressions'. If unchecked, typing \\n searches for the literal letters '\\' and 'n' rather than actual line breaks."
      }
    },
    {
      title: "Handling Accidental Extra Blank Paragraphs: Regex Syntax for Collapsing Returns",
      paragraphs: [
        "A common secondary formatting defect in shared Google Docs is the accumulation of erratic blank lines between paragraphs. When multiple contributors edit a document over several weeks, some press Enter once, while others press Enter two or three times to generate visual space. If your document styling already includes 'Space after paragraph' padding, these redundant returns create massive white chasms across your layout.",
        "To normalize paragraph spacing across an entire draft, use an advanced regular expression pattern in the Find and Replace dialog. In the **Find** field, enter: `\\n\\n+`. This regex pattern specifically targets instances where two or more consecutive newline characters occur together. In the **Replace with** field, enter: `\\n`. (Or, if you prefer a single visual paragraph break between blocks, enter `\\n`).",
        "Click **Replace all**. Google Docs collapses all double, triple, and quadruple paragraph returns down to a uniform, standardized single return. This systematic normalization ensures that all vertical spacing is governed strictly by your document's paragraph style settings rather than erratic keyboard habits."
      ],
      codeBlock: {
        language: "Google Docs Blank Line Normalizer",
        code: "// Collapse 2 or more consecutive blank lines into 1 clean paragraph break:\nFind:         \\n\\n+\nReplace with: \\n\nOptions:      Check 'Match using regular expressions'\nAction:       Click 'Replace all'"
      },
      bullets: [
        "Use \\n\\n+ to target multiple contiguous paragraph returns in a single operation.",
        "Collapsing redundant newlines eliminates random white gaps between executive sections.",
        "Allows paragraph spacing to be controlled uniformly via Format > Line & paragraph spacing.",
        "Prevents team members from manually counting blank lines across long shared documents."
      ]
    },
    {
      title: "The Power of Google Docs Add-ons and Cloud Extensions",
      paragraphs: [
        "While native regex search handles most scenarios, enterprise teams managing high-volume document pipelines often prefer automated, one-click solutions. The Google Workspace Marketplace offers several lightweight add-ons designed specifically for data and text hygiene.",
        "Popular extensions such as 'Text Cleaner', 'Clean Up Text', and 'Doc Tools' integrate directly into Google Docs' **Extensions** menu. These tools allow editors to highlight a block of messy text and execute preset actions—such as 'Remove line breaks', 'Remove trailing spaces', or 'Convert multiline to list'—with a single mouse click. For writers who frequently prepare external text before formatting shared drafts, using an external browser-based utility to remove line breaks online provides an instant, zero-install alternative that leaves zero footprint on company Google accounts."
      ],
      callout: {
        type: "tip",
        label: "Marketplace Extensions",
        text: "Explore Google Workspace Marketplace add-ons like 'Text Cleaner' under Extensions > Add-ons for one-click formatting routines that your entire team can adopt."
      }
    },
    {
      title: "Managing Suggestion Mode & Revision History During Document Cleanup",
      paragraphs: [
        "A critical pitfall when performing bulk line break cleanups in collaborative Google Docs is document editing mode. Google Docs provides three distinct collaboration modes in the top right corner: **Editing**, **Suggesting**, and **Viewing**.",
        "If an editor opens Find and Replace while in **Suggesting** mode and clicks 'Replace all', disaster strikes: Google Docs treats every single deleted newline and inserted space as an independent tracked suggestion! Within seconds, the document margin is inundated with hundreds—or even thousands—of green suggestion bubbles. This crashes browser tabs, overwhelms collaborators with email notifications, and requires hours of clicking 'Accept all suggestions'.",
        "To execute safe document sanitization, verify that your document mode is set to **Editing** before executing Find and Replace. If you are working on a high-stakes draft with senior stakeholders, name your current version first in **File > Version history > Name current version**. This creates an immediate snapshot, allowing you to restore the previous state instantly if an aggressive regex replacement merges unintended sections."
      ],
      bullets: [
        "Never execute bulk regex replacements while in 'Suggesting' mode to avoid generating thousands of comment bubbles.",
        "Ensure the top-right dropdown displays 'Editing' mode before clicking 'Replace all'.",
        "Name your document version (File > Version history) prior to mass search-and-replace operations.",
        "Allows teams to audit data hygiene operations with complete version control confidence."
      ]
    }
  ]
};

const preset13Faqs = [
  {
    question: "Why does my Google Doc create dozens of suggestion bubbles when I remove line breaks?",
    answer: "This happens because your document was set to 'Suggesting' mode instead of 'Editing' mode when you performed Find and Replace. In Suggesting mode, Google Docs tracks every single deleted line break and added space as an individual proposed edit, flooding the document margin with comment bubbles. To avoid this, switch the mode dropdown in the top-right corner to 'Editing' before running bulk replacements."
  },
  {
    question: "Does removing line breaks in Google Docs clear bold, italics, or hyperlink formatting?",
    answer: "No. When using Google Docs' native Find and Replace with regular expressions (replacing \\n with a space), the text's character-level formatting—including bold, italics, underline, text color, and hyperlinks—remains fully intact. However, paragraph-level styles (such as Heading 1 or Heading 2) will consolidate if two headings separated by a line break are merged into one line."
  },
  {
    question: "How do I remove line breaks in a view-only Google Doc that I do not have permission to edit?",
    answer: "If you have view-only access, Find and Replace is disabled. To clean the text, select the contents and copy them (Ctrl + C), then paste them into a new private Google Doc where you have edit rights, or paste them into an external client-side remove line breaks tool to sanitize the text instantly before using it in your own files."
  },
  {
    question: "Can I use Google Apps Script to automatically clean up line breaks across multiple Google Docs in Drive?",
    answer: "Yes. In Google Docs, go to Extensions > Apps Script. You can write a lightweight script using DocumentApp.getActiveDocument().getBody().replaceText('\\\\n', ' ') to programmatically sanitize line breaks. For enterprise Google Drive maintenance, Apps Script can iterate through entire Drive folders, opening each doc and cleaning formatting in the background."
  },
  {
    question: "How do I remove line breaks within bulleted and numbered lists without deleting the bullets?",
    answer: "In Google Docs, list bullets are tied to paragraph breaks (\\n). If you globally replace \\n with a space across an entire list, all list items will merge into a single paragraph and the bullet points will vanish. To clean soft line breaks inside a single list item without deleting the item's bullet, select only that specific item's text or use Shift + Enter search targeting."
  }
];

const preset14Article = {
  heading: "Masterclass: How to Remove Line Breaks in Google Docs Across Desktop, Mac, and Mobile",
  sections: [
    {
      title: "Practical Walkthrough: Why Manual Backspacing is the Enemy of Productivity",
      paragraphs: [
        "Every professional writer, student, and office administrator has experienced the agony of manual backspacing in Google Docs. You copy a critical legal citation, an academic abstract from a PDF, or a customer review from a CRM tool, and paste it into your Google Doc. Instantly, the text splinters into awkward, two-inch lines that look like broken free-verse poetry. Your immediate instinct might be to place your cursor at the beginning of each broken line, tap Backspace, hit Space, and repeat this cycle fifty times.",
        "Manual backspacing is not only painfully slow—it is prone to human error. When backspacing manually across hundreds of lines, editors inevitably introduce uneven spacing, accidentally delete letters, or leave double spaces between words. For a 2,000-word article, manual editing can consume 20 to 30 minutes of tedious labor.",
        "Mastering how to remove line breaks in google docs with speed and precision is one of the highest-leverage productivity skills in modern office computing. When executing a google docs remove line breaks cleanup across business drafts, you eliminate distracting visual artifacts. Learning how to remove line breaks google docs users face across different platforms allows you to sanitize entire manuscripts in under 10 seconds across desktop computers, MacBooks, and mobile workflows."
      ],
      bullets: [
        "Manual backspacing wastes valuable billable time and introduces irregular spacing errors.",
        "Copied text from academic portals, PDFs, and emails hardcodes physical line breaks into cloud documents.",
        "Google Docs supports standard regular expression tokens to automate repetitive editing chores.",
        "Establishing an efficient 5-step desktop routine guarantees pristine formatting on every draft."
      ],
      callout: {
        type: "info",
        label: "Efficiency Standard",
        text: "Automated regex cleaning completes in under 5 seconds what would take 30 minutes of manual backspacing, while eliminating human spacing inconsistencies."
      }
    },
    {
      title: "The 5-Step Desktop Routine for Instant Line Break Removal",
      paragraphs: [
        "Whether you work on a Windows PC, a Chromebook, or a Mac, Google Docs provides a universal desktop procedure for stripping unwanted breaks. Memorizing this 5-step routine turns formatting headaches into an effortless reflex.",
        "Step 1: Open Document and Select Text. Open your Google Doc. If you only want to sanitize a specific pasted section, highlight that paragraph block with your mouse. If you want to clean the entire manuscript, press **Ctrl + A** (Windows/ChromeOS) or **Command + A** (Mac).",
        "Step 2: Launch Find and Replace. Press **Ctrl + H** on Windows/Chromebook, or press **Command + Shift + H** on Mac. Alternatively, click **Edit** on the top menu bar and select **Find and replace**.",
        "Step 3: Enter the Regex Search Token. In the **Find** input box, type: `\\n`. In computer programming and regular expression standards, `\\n` represents the newline character (line feed).",
        "Step 4: Configure the Replacement Delimiter. In the **Replace with** box, tap the **spacebar once** (Input: ` `). This single space ensures that when the line break is removed, the words on either side remain properly separated.",
        "Step 5: Activate Regex Matching and Execute. Check the box labeled **'Match using regular expressions'**. If you selected a specific block in Step 1, verify that 'Search in selected text' is selected. Finally, click **Replace all**. Google Docs cleanses the highlighted text instantly, producing fluid, publication-ready paragraphs."
      ],
      codeBlock: {
        language: "The 5-Step Desktop Summary",
        code: "Step 1: Highlight target text (or press Ctrl + A for entire file).\nStep 2: Press Ctrl + H (Windows) or Cmd + Shift + H (Mac).\nStep 3: In 'Find', type: \\n\nStep 4: In 'Replace with', tap Spacebar once (Input: \" \").\nStep 5: Check 'Match using regular expressions' -> Click 'Replace all'."
      },
      callout: {
        type: "tip",
        label: "Spacebar Reminder",
        text: "Always put a space in the 'Replace with' box! Leaving it empty will weld adjacent words together (e.g., 'marketingdirector' instead of 'marketing director')."
      }
    },
    {
      title: "The Mobile App Limitation: Overcoming iOS and Android Hurdles",
      paragraphs: [
        "While the desktop version of Google Docs offers world-class regex capabilities, the Google Docs mobile application (on iPhone, iPad, and Android) suffers from a severe functional constraint: **the mobile search interface does not support regular expressions**.",
        "If you open Find and Replace inside the Google Docs mobile app and search for `\\n`, the app will literally search for a backslash followed by the letter 'n'. It will never detect actual line breaks. For professionals working on mobile devices, this limitation poses a significant operational roadblock.",
        "Fortunately, there are two effective mobile workarounds. First, you can open Google Chrome or Safari on your phone, navigate to Google Docs, tap the browser settings menu, and select **'Request Desktop Site'**. This loads the full desktop interface, complete with regex checkboxes. Second, you can copy the broken text, open an external remove line breaks online tool in your mobile browser, sanitize the text with a single tap, and paste the clean prose back into your Google Docs mobile document."
      ],
      bullets: [
        "Google Docs iOS and Android mobile apps lack regular expression support in their native search bars.",
        "Requesting the 'Desktop Site' in mobile Chrome or Safari exposes the missing regex checkboxes.",
        "Using a dedicated browser text tool provides a fast, one-tap mobile cleaning workaround.",
        "Eliminates the need to wait until you return to a desktop workstation to fix mobile formatting."
      ]
    },
    {
      title: "Preserving Double Line Breaks while Deleting Single Breaks: The 3-Step Trick",
      paragraphs: [
        "The most advanced formatting challenge in Google Docs occurs when an imported document contains both legitimate paragraph divisions (double line breaks) and jagged line wraps within those paragraphs (single line breaks). If you blindly replace all `\\n` with spaces, your document's paragraph structure collapses into one continuous, unreadable blob of text.",
        "To delete internal line wraps while keeping true paragraph divisions intact, execute the classic **3-Step Placeholder Trick**:",
        "1. **Protect Real Paragraphs**: Open Find and Replace (**Ctrl + H**). In 'Find', enter `\\n\\n` (representing the double line break between paragraphs). In 'Replace with', enter an uncommon placeholder symbol sequence that never appears in your document, such as `@@PARAGRAPH@@`. Ensure regex is checked and click 'Replace all'. Real paragraph breaks are now safely locked.",
        "2. **Strip Jagged Line Wraps**: In 'Find', enter `\\n` (the single break). In 'Replace with', tap the spacebar once (` `). Click 'Replace all'. All fractured lines within each paragraph merge into smooth sentences without touching your locked placeholders.",
        "3. **Restore Genuine Paragraphs**: In 'Find', enter your placeholder: `@@PARAGRAPH@@`. In 'Replace with', enter `\\n\\n`. Click 'Replace all'. Your document emerges with pristine paragraph structure and perfectly smooth sentences."
      ],
      codeBlock: {
        language: "The 3-Step Placeholder Regex Routine",
        code: "// Step 1: Protect double paragraph returns\nFind:         \\n\\n\nReplace with: @@PARAGRAPH@@\n-> Click 'Replace all'\n\n// Step 2: Strip internal single line wraps\nFind:         \\n\nReplace with:  (single space)\n-> Click 'Replace all'\n\n// Step 3: Restore double paragraph returns\nFind:         @@PARAGRAPH@@\nReplace with: \\n\\n\n-> Click 'Replace all' -> Result: Perfect Paragraph Integrity!"
      },
      callout: {
        type: "info",
        label: "Paragraph Integrity",
        text: "The 3-step placeholder routine protects your document's true paragraph architecture while sweeping away annoying mid-sentence breaks."
      }
    },
    {
      title: "Document Typography Polish: Paragraph Spacing vs Manual Enter Presses",
      paragraphs: [
        "Once your text is clean, complete your document's typographical makeover by establishing proper paragraph spacing rules. Inexperienced writers often tap the Enter key twice between thoughts to create visual breathing room. However, this practice creates empty paragraph elements that cause orphan headings and erratic pagination.",
        "Instead, highlight your entire document (**Ctrl + A**), navigate to **Format > Line & paragraph spacing**, and select **'Add space after paragraph'** (or customize exact points under 'Custom spacing', such as 8pt or 10pt after). When paragraph spacing is handled automatically by Google Docs' typography engine, you never have to worry about managing remove line breaks text formatting glitches on future revisions."
      ],
      bullets: [
        "Configure automated paragraph spacing via Format > Line & paragraph spacing.",
        "Set 8pt to 12pt space after paragraphs to eliminate the need for double Enter presses.",
        "Guarantees consistent vertical rhythm across exported PDFs and printed drafts.",
        "Prevents team members from introducing new formatting anomalies during future edits."
      ]
    }
  ]
};

const preset14Faqs = [
  {
    question: "Can I remove line breaks in the Google Docs app on an iPhone or Android phone?",
    answer: "The native Google Docs mobile app for iOS and Android does not support regular expressions in its search bar, making it impossible to search for '\\n' directly. To remove line breaks on mobile, open your mobile browser (Safari or Chrome), request the desktop version of Google Docs, or copy the text into an external browser-based remove line breaks online tool before pasting it back into Docs."
  },
  {
    question: "Why does typing \"\\n\" in the Find box highlight the literal letters \"\\\" and \"n\" instead of line breaks?",
    answer: "This happens because the 'Match using regular expressions' checkbox is turned off. By default, Google Docs treats search terms as literal characters. To tell Google Docs that '\\n' represents a newline control code rather than literal letters, press Ctrl + H (Cmd + Shift + H on Mac) and explicitly check the box for 'Match using regular expressions'."
  },
  {
    question: "How do I remove line breaks inside Google Docs tables without merging the table cells?",
    answer: "Select only the text inside the specific table cells you wish to clean (do not select the entire table structure). Open Find and Replace (Ctrl + H), enter \\n in Find, enter a space in Replace with, check 'Match using regular expressions', and check 'Search in selected text'. This sanitizes text inside the cells while leaving table rows and column borders intact."
  },
  {
    question: "What is the difference between a soft line break (Shift + Enter) and a hard line break in Google Docs?",
    answer: "A hard line break (Enter) creates a new paragraph, applying paragraph margins, indents, and bullet points. A soft line break (Shift + Enter), also known as a manual line break, drops the cursor to the next line within the exact same paragraph without triggering paragraph spacing. In Google Docs regular expressions, \\n matches both types of breaks."
  },
  {
    question: "How can I undo a Find and Replace action if I accidentally removed all paragraph breaks in my document?",
    answer: "If you accidentally collapsed your document into a single unreadable block, immediately press Ctrl + Z (Command + Z on Mac) to undo the Find and Replace action. If Ctrl + Z fails, go to File > Version history > See version history, locate the automatic snapshot taken before your replacement, and click 'Restore this version'."
  }
];

const preset15Article = {
  heading: "Apple Pages Typography: Removing Unwanted Line Breaks on macOS and iPadOS",
  sections: [
    {
      title: "The Mac Design Aesthetic: Typography and Layout Integrity in Apple Pages",
      paragraphs: [
        "In creative agencies, design studios, and among macOS professionals, Apple Pages is revered for its sophisticated typography engine, fluid layout templates, and seamless integration across the Apple ecosystem. Unlike utilitarian word processors, Pages treats typography as an art form: tracking, kerning, baseline shifts, and paragraph spacing are tuned for publication-grade beauty. However, even the most impeccably designed Apple Pages template can be derailed by copied text containing rogue, unformatted line breaks.",
        "When drafting reports, books, or marketing collateral in Pages, writers regularly import text from external web pages, legal PDFs, emails, or terminal monitors. These external sources frequently embed physical carriage returns and line feeds at arbitrary column widths. When dropped into a multi-column newsletter, an elegant newsletter spread, or a book chapter in Pages, the imported text splinters into jagged, uneven fragments, breaking template flow and causing awkward paragraph overflows.",
        "Mastering how to remove line breaks in apple pages restores typographical perfection across your Mac and iPad workspaces. Rather than manually clicking through broken lines, Apple Pages provides native search shortcuts to locate and remove line breaks from text in bulk. Pairing native Mac capabilities with a client-side remove line breaks tool ensures that your manuscripts remain pristine across every screen."
      ],
      bullets: [
        "Apple Pages offers sophisticated typographical controls that require fluid, continuous text blocks.",
        "Copied text from web browsers, scanned PDFs, and emails inserts hard returns that distort templates.",
        "Unwanted line breaks ruin multi-column newspaper layouts and cause text box overflows in Pages.",
        "Native macOS keyboard shortcuts allow users to locate invisible line breaks without external plugins."
      ],
      callout: {
        type: "info",
        label: "Apple Typography",
        text: "In Apple Pages, line breaks within styled templates disrupt automatic text flowing across linked text boxes, headers, and responsive column layouts."
      }
    },
    {
      title: "Turning on 'Show Invisibles' in Pages: Diagnosing Paragraph Marks vs Soft Returns",
      paragraphs: [
        "Before executing any text cleanup in Apple Pages, the indispensable first step is making hidden layout formatting marks visible. Attempting to sanitize formatting blind makes it impossible to know whether you are dealing with standard paragraph breaks or soft line breaks.",
        "To reveal hidden characters in Apple Pages on Mac, click **View** on the top macOS menu bar and select **Show Invisibles** (or press the universal keyboard shortcut **Shift + Command + I**).",
        "Once activated, Pages displays light blue symbols representing every non-printing layout element. You will quickly differentiate between two critical characters: the **Paragraph Break (¶)**, displayed as a blue pilcrow symbol inserted via the Return key; and the **Line Break (↵)**, displayed as a downward-curving blue return arrow inserted via **Shift + Return**. Recognizing which symbol is fracturing your text determines exactly which shortcut you need to enter into the Find & Replace search field."
      ],
      codeBlock: {
        language: "Apple Pages Invisibles Reference",
        code: "¶  = Paragraph Break (Return key)\n     - Shortcut: View > Show Invisibles (Shift + Command + I)\n     - Breaks paragraph flow and applies paragraph style margins.\n\n↵  = Line Break (Shift + Return keys)\n     - Pushes text to a new line within the same styled text container."
      },
      callout: {
        type: "tip",
        label: "Visual Diagnosis",
        text: "Press Shift + Command + I in Pages to display invisibles. This instantly reveals whether your text is cluttered with paragraph breaks (¶) or soft returns (↵)."
      }
    },
    {
      title: "The Native Pages Find and Replace Workflow: The Control + Option + Return Shortcut",
      paragraphs: [
        "While Microsoft Word uses caret codes (`^p`) and Google Docs uses regex (`\\n`), Apple Pages features a unique native mechanism for searching for line breaks in its Find and Replace interface.",
        "To launch Find and Replace in Apple Pages on Mac, press **Command + F** (or choose **Edit > Find > Find...** from the menu bar). A compact search bar will appear across the top or bottom of your document window. Click the **gear icon** on the left of the search bar and select **Find & Replace** to expose the 'Replace' input field.",
        "Now comes the secret macOS keyboard shortcut: you cannot simply press Return inside the 'Find' box, as that will merely execute the search. To insert a literal line break into the Find field, press **Control + Option + Return**! In Apple Pages, pressing `Control + Option + Return` inserts a hidden newline character into the search box. Next, in the **Replace** field, tap the spacebar once (` `). Finally, click **Replace All**. Pages sweeps across your document, replaces every line break with a single space, and restores fluid paragraph wrapping immediately."
      ],
      codeBlock: {
        language: "Apple Pages Search Shortcut Workflow",
        code: "1. Press Command + F to open the Find bar.\n2. Click the Gear icon on the left -> Select 'Find & Replace'.\n3. Click inside the 'Find' text box.\n4. PRESS TOGETHER: Control + Option + Return (Inserts a line break).\n5. In 'Replace', tap the Spacebar once (Input: \" \").\n6. Click 'Replace All'. Output: All rogue line breaks are instantly eliminated!"
      },
      bullets: [
        "Press Command + F and select the Gear icon to enable 'Find & Replace' mode.",
        "Use the secret Mac shortcut: Control + Option + Return to enter a line break into the search box.",
        "Always insert a space in the Replace field to prevent words from welding together.",
        "Click 'Replace All' to sanitize the entire document or select a specific text block first."
      ]
    },
    {
      title: "The Scanned Text and PDF Extraction Challenge on macOS",
      paragraphs: [
        "Mac users frequently take advantage of Apple's innovative **Live Text** feature in macOS Ventura, Sonoma, and Sequoia, copying text directly from images, scanned photos, and PDF files viewed in the Preview application. While Live Text is extraordinarily accurate at optical character recognition, it reads text line by line according to physical bounding boxes.",
        "When copying multi-paragraph excerpts from Preview or Live Text into Apple Pages, every visual line ending arrives accompanied by a hard return. If you have large volumes of research text to clean before drafting your Pages project, using a browser-based utility to remove line breaks online provides a rapid staging environment. By sanitizing text in your browser first, you avoid corrupting your Pages document styles with mismatched web fonts and erratic line heights."
      ],
      callout: {
        type: "warning",
        label: "Live Text OCR Artifacts",
        text: "Apple Live Text and Preview PDF copies insert hard line breaks at every visual margin. Clean your copied text before pasting into complex Pages layout templates."
      }
    },
    {
      title: "Managing Layout Across iPadOS and iCloud Sync Workflows",
      paragraphs: [
        "In modern Apple workflows, documents rarely stay on a single device. Pages documents sync automatically via iCloud across MacBooks, iPad Pro tablets, and iPhones. When editing in Apple Pages for iPadOS, formatting line breaks requires specific tactile gestures.",
        "On an iPad with a Magic Keyboard attached, the macOS shortcuts—such as **Command + F** and **Shift + Command + I**—operate identically. However, when working strictly with touch controls, tap the **More (...)** menu in the top toolbar, toggle on **'Show Invisibles'**, tap **Find**, and select **Find & Replace**. To paste a line break on touch-only iPads, copy a single newline from your text and paste it directly into the Find field.",
        "By enforcing consistent data hygiene and sanitizing rogue line breaks before sharing your Pages documents via iCloud Collaboration or exporting to ePub and PDF formats, you ensure that your typography remains flawless across every Apple display."
      ],
      bullets: [
        "iCloud Drive synchronizes Pages formatting instantly across Mac, iPad, and iPhone devices.",
        "iPadOS supports full Command + F and Invisibles toggles when paired with a Magic Keyboard.",
        "Touch-only iPad editing allows users to copy and paste newline characters into Find & Replace.",
        "Clean typography ensures optimal readability when exporting Pages manuscripts to ePub or PDF."
      ]
    }
  ]
};

const preset15Faqs = [
  {
    question: "How do I make hidden line break characters visible in Apple Pages?",
    answer: "On Mac, click 'View' in the top menu bar and select 'Show Invisibles', or press the keyboard shortcut Shift + Command + I. On iPad, tap the '...' (More) button in the top toolbar, tap 'Document Options', and toggle on 'Show Invisibles'. This renders paragraph breaks as blue pilcrows (¶) and soft line breaks as curved blue arrows (↵)."
  },
  {
    question: "What keyboard shortcut enters a line break into the Apple Pages Find & Replace search bar?",
    answer: "In Apple Pages on macOS, press Command + F, click the gear icon, and select 'Find & Replace'. Inside the 'Find' field, press Control + Option + Return. This enters a literal newline character into the search box. Enter a single space in the 'Replace' box and click 'Replace All'."
  },
  {
    question: "How do I remove soft line breaks (Shift + Return) in Pages without deleting my main paragraph divisions?",
    answer: "Turn on 'Show Invisibles' (Shift + Cmd + I) to confirm where soft breaks (↵) occur. Select a soft break symbol in your text, copy it (Cmd + C), open Find & Replace (Cmd + F > Gear icon > Find & Replace), paste the copied break into 'Find' (Cmd + V), type a space in 'Replace', and click 'Replace All'. Standard paragraph breaks (¶) will remain completely untouched."
  },
  {
    question: "Does removing line breaks in Pages disrupt floating text boxes, shapes, or image wraps?",
    answer: "If you highlight a specific text box before opening Find & Replace, Pages will restrict replacements to that selected text container, preventing changes to the main body. However, if no text is selected and you click 'Replace All', Pages will search all body text and unlocked text frames throughout the document."
  },
  {
    question: "Can I use Apple Shortcuts or Automator to clean line breaks across multiple Pages documents automatically?",
    answer: "Yes. On macOS, you can build an Apple Shortcut or AppleScript routine that uses the 'Replace Text' action with regular expressions to strip newline characters (\\n) from clipboard text or batch-process exported Pages plain-text files before re-importing them into standardized templates."
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

console.log('Preset 13 Word Count:', countWords(preset13Article));
console.log('Preset 14 Word Count:', countWords(preset14Article));
console.log('Preset 15 Word Count:', countWords(preset15Article));

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

replacePresetContent('remove-line-breaks-google-docs', preset13Article, preset13Faqs);
replacePresetContent('how-to-remove-line-breaks-in-google-docs', preset14Article, preset14Faqs);
replacePresetContent('remove-line-breaks-apple-pages', preset15Article, preset15Faqs);

fs.writeFileSync(filePath, fileContent, 'utf8');
console.log('File successfully updated: src/data/removeLineBreaksPresets.ts');
