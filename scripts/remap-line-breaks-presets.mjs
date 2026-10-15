import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

// Exact 98 keyword mapping definition
const EXACT_98_SPECS = [
  {
    raw: "remove line breaks in word",
    name: "Remove Line Breaks in Word",
    slug: "remove-line-breaks-in-word",
    metaDesc: "Instantly remove line breaks in Word documents online. Clean up soft returns, hard returns, and join paragraphs with client-side privacy."
  },
  {
    raw: "remove line breaks in word mac",
    name: "Remove Line Breaks in Word Mac",
    slug: "remove-line-breaks-in-word-mac",
    metaDesc: "Instantly remove line breaks in Word for Mac. Clean up ^p and ^l formatting marks and join broken lines with complete client-side privacy."
  },
  {
    raw: "remove line breaks in word 2016",
    name: "Remove Line Breaks in Word 2016",
    slug: "remove-line-breaks-in-word-2016",
    metaDesc: "Instantly remove line breaks in Word 2016 documents. Strip manual breaks and paragraph returns with zero latency and 100% client-side privacy."
  },
  {
    raw: "remove all line breaks word 2007",
    name: "Remove All Line Breaks Word 2007",
    slug: "remove-all-line-breaks-word-2007",
    metaDesc: "Instantly remove all line breaks in Word 2007 files online. Eliminate hard returns and format multiline text into clean continuous sentences."
  },
  {
    raw: "remove paragraph breaks in word",
    name: "Remove Paragraph Breaks in Word",
    slug: "remove-paragraph-breaks-in-word",
    metaDesc: "Instantly remove paragraph breaks in Word online. Clean ^p symbols, combine separated blocks, and unwrap fragmented sentences with 100% privacy."
  },
  {
    raw: "remove manual line breaks in word",
    name: "Remove Manual Line Breaks in Word",
    slug: "remove-manual-line-breaks-in-word",
    metaDesc: "Instantly remove manual line breaks in Word (^l). Strip Shift+Enter soft returns and unwrap jagged text into clean single-line paragraphs."
  },
  {
    raw: "remove spaces and line breaks word",
    name: "Remove Spaces and Line Breaks Word",
    slug: "remove-spaces-and-line-breaks-word",
    metaDesc: "Instantly remove spaces and line breaks in Word text online. Eliminate double returns, tabs, and excess whitespace with client-side privacy."
  },
  {
    raw: "remove line breaks in excel",
    name: "Remove Line Breaks in Excel",
    slug: "remove-line-breaks-in-excel",
    metaDesc: "Instantly remove line breaks in Excel cells online. Strip CHAR(10) and Alt+Enter returns, join rows, and clean spreadsheet tables with 100% privacy."
  },
  {
    raw: "remove line breaks in excel cell",
    name: "Remove Line Breaks in Excel Cell",
    slug: "remove-line-breaks-in-excel-cell",
    metaDesc: "Instantly remove line breaks in Excel cells. Clean in-cell Alt+Enter line feeds, merge columns, and prepare CSV data with zero latency."
  },
  {
    raw: "remove line breaks in excel mac",
    name: "Remove Line Breaks in Excel Mac",
    slug: "remove-line-breaks-in-excel-mac",
    metaDesc: "Instantly remove line breaks in Excel for Mac. Strip CHAR(13) carriage returns and CHAR(10) line feeds with 100% private in-browser processing."
  },
  {
    raw: "remove line breaks in excel 2016",
    name: "Remove Line Breaks in Excel 2016",
    slug: "remove-line-breaks-in-excel-2016",
    metaDesc: "Instantly remove line breaks in Excel 2016 spreadsheets. Flatten multiline cell content, unwrap wrapped text, and clean data with zero latency."
  },
  {
    raw: "remove line breaks in excel formula",
    name: "Remove Line Breaks in Excel Formula",
    slug: "remove-line-breaks-in-excel-formula",
    metaDesc: "Instantly remove line breaks in Excel formulas online. Clean SUBSTITUTE and CLEAN formula outputs and unwrap cell data with client-side privacy."
  },
  {
    raw: "excel vba remove line breaks in cell",
    name: "Excel VBA Remove Line Breaks in Cell",
    slug: "excel-vba-remove-line-breaks-in-cell",
    metaDesc: "Instantly clean and remove line breaks in Excel cell data online. Strip Chr(10) and Chr(13) breaks without running macros. 100% client-side privacy."
  },
  {
    raw: "remove line breaks google docs",
    name: "Remove Line Breaks Google Docs",
    slug: "remove-line-breaks-google-docs",
    metaDesc: "Instantly remove line breaks in Google Docs text online. Clean up awkward soft breaks and join paragraphs with zero server latency."
  },
  {
    raw: "remove line breaks google sheets",
    name: "Remove Line Breaks Google Sheets",
    slug: "remove-line-breaks-google-sheets",
    metaDesc: "Instantly remove line breaks in Google Sheets online. Strip in-cell CHAR(10) returns, normalize table columns, and export clean CSVs."
  },
  {
    raw: "remove line breaks google sheets cell",
    name: "Remove Line Breaks Google Sheets Cell",
    slug: "remove-line-breaks-google-sheets-cell",
    metaDesc: "Instantly remove line breaks in Google Sheets cells online. Strip Ctrl+Enter line returns and format spreadsheet cells with client-side privacy."
  },
  {
    raw: "remove line breaks outlook email",
    name: "Remove Line Breaks Outlook Email",
    slug: "remove-line-breaks-outlook-email",
    metaDesc: "Instantly remove line breaks in Outlook emails online. Clean up 76-character auto-wraps, unwrap email drafts, and restore smooth paragraphs."
  },
  {
    raw: "remove line breaks powerpoint",
    name: "Remove Line Breaks PowerPoint",
    slug: "remove-line-breaks-powerpoint",
    metaDesc: "Instantly remove line breaks in PowerPoint presentations online. Clean slide text boxes, fix fragmented bullet points, and format slide text."
  },
  {
    raw: "remove line breaks libreoffice calc",
    name: "Remove Line Breaks LibreOffice Calc",
    slug: "remove-line-breaks-libreoffice-calc",
    metaDesc: "Instantly remove line breaks in LibreOffice Calc cells online. Strip Ctrl+Enter returns and unwrap spreadsheet data with 100% client privacy."
  },
  {
    raw: "remove line breaks apple pages",
    name: "Remove Line Breaks Apple Pages",
    slug: "remove-line-breaks-apple-pages",
    metaDesc: "Instantly remove line breaks in Apple Pages documents online. Strip hidden line wraps and paragraph breaks with 100% private in-browser processing."
  },
  {
    raw: "remove unwanted line breaks when copying from pdf",
    name: "Remove Unwanted Line Breaks When Copying from PDF",
    slug: "remove-unwanted-line-breaks-when-copying-from-pdf",
    metaDesc: "Instantly remove unwanted line breaks when copying from PDF files. Rejoin broken sentences into smooth paragraphs with complete client-side privacy."
  },
  {
    raw: "remove line breaks from copied text",
    name: "Remove Line Breaks from Copied Text",
    slug: "remove-line-breaks-from-copied-text",
    metaDesc: "Instantly remove line breaks from copied text online. Clean clipboard returns, merge jagged lines, and join paragraphs with client-side privacy."
  },
  {
    raw: "remove line breaks from pdf text",
    name: "Remove Line Breaks from PDF Text",
    slug: "remove-line-breaks-from-pdf-text",
    metaDesc: "Instantly remove line breaks from PDF text online. Flatten column breaks, reconstruct smooth paragraphs, and clean text with zero latency."
  },
  {
    raw: "pdf line break character remover",
    name: "PDF Line Break Character Remover",
    slug: "pdf-line-break-character-remover",
    metaDesc: "Instantly remove PDF line break characters online. Strip invisible ASCII carriage returns, line feeds, and form feeds with client-side privacy."
  },
  {
    raw: "auto remove line breaks pasted text",
    name: "Auto Remove Line Breaks Pasted Text",
    slug: "auto-remove-line-breaks-pasted-text",
    metaDesc: "Automatically remove line breaks from pasted text online. Paste text to instantly strip carriage returns and merge lines with zero clicks."
  },
  {
    raw: "remove enter from text",
    name: "Remove Enter from Text",
    slug: "remove-enter-from-text",
    metaDesc: "Instantly remove Enter key breaks from text online. Strip newline characters, join fragmented sentences, and format text with 100% privacy."
  },
  {
    raw: "delete all enters from text",
    name: "Delete All Enters from Text",
    slug: "delete-all-enters-from-text",
    metaDesc: "Instantly delete all Enters from text online. Purge every carriage return and line feed to create clean single-line strings with zero latency."
  },
  {
    raw: "remove returns and spaces",
    name: "Remove Returns and Spaces",
    slug: "remove-returns-and-spaces",
    metaDesc: "Instantly remove returns and spaces from text online. Strip line breaks, tabs, and excess whitespace into compact strings with complete privacy."
  },
  {
    raw: "remove carriage returns from text file",
    name: "Remove Carriage Returns from Text File",
    slug: "remove-carriage-returns-from-text-file",
    metaDesc: "Instantly remove carriage returns from text files online. Strip \\r control characters, normalize line endings, and join lines with 100% privacy."
  },
  {
    raw: "remove end of line breaks",
    name: "Remove End of Line Breaks",
    slug: "remove-end-of-line-breaks",
    metaDesc: "Instantly remove end of line breaks online. Flatten multiline lists, collapse paragraph wraps, and format single-line text with zero latency."
  },
  {
    raw: "replace line breaks with commas",
    name: "Replace Line Breaks with Commas",
    slug: "replace-line-breaks-with-commas",
    metaDesc: "Instantly replace line breaks with commas online. Convert vertical item lists into clean comma-separated lists for SQL, CSV, or spreadsheets."
  },
  {
    raw: "replace line breaks with spaces",
    name: "Replace Line Breaks with Spaces",
    slug: "replace-line-breaks-with-spaces",
    metaDesc: "Instantly replace line breaks with spaces online. Merge fragmented sentences into continuous paragraphs without joined words. 100% client privacy."
  },
  {
    raw: "replace line break with semicolon",
    name: "Replace Line Break with Semicolon",
    slug: "replace-line-break-with-semicolon",
    metaDesc: "Instantly replace line breaks with semicolons online. Format email recipient lists, SQL statements, and configuration values with zero latency."
  },
  {
    raw: "replace line breaks with comma excel",
    name: "Replace Line Breaks with Comma Excel",
    slug: "replace-line-breaks-with-comma-excel",
    metaDesc: "Instantly replace line breaks with commas in Excel online. Convert columns into comma-delimited strings for formulas, queries, and CSVs."
  },
  {
    raw: "replace line breaks with space word",
    name: "Replace Line Breaks with Space Word",
    slug: "replace-line-breaks-with-space-word",
    metaDesc: "Instantly replace line breaks with spaces in Word online. Fix jagged sentence ends, eliminate hard returns, and restore smooth paragraph flow."
  },
  {
    raw: "replace line breaks with comma notepad++",
    name: "Replace Line Breaks with Comma Notepad++",
    slug: "replace-line-breaks-with-comma-notepad-plus-plus",
    metaDesc: "Instantly replace line breaks with commas for Notepad++ online. Convert multiline lists into comma-separated text without complex regex."
  },
  {
    raw: "combine multiple lines into one",
    name: "Combine Multiple Lines into One",
    slug: "combine-multiple-lines-into-one",
    metaDesc: "Instantly combine multiple lines into one online. Merge multiline logs, paragraphs, and lists into a single continuous line with custom separators."
  },
  {
    raw: "combine multiple rows into one cell separated by comma",
    name: "Combine Multiple Rows into One Cell Separated by Comma",
    slug: "combine-multiple-rows-into-one-cell-separated-by-comma",
    metaDesc: "Instantly combine multiple rows into one cell separated by commas online. Transform vertical data into compact comma-delimited values in seconds."
  },
  {
    raw: "combine multiple rows into one excel",
    name: "Combine Multiple Rows into One Excel",
    slug: "combine-multiple-rows-into-one-excel",
    metaDesc: "Instantly combine multiple rows into one in Excel online. Merge spreadsheet rows into single-line strings with your chosen delimiter in seconds."
  },
  {
    raw: "combine multiple rows into one sql",
    name: "Combine Multiple Rows into One SQL",
    slug: "combine-multiple-rows-into-one-sql",
    metaDesc: "Instantly combine multiple rows into one SQL string online. Format query parameters, IN clauses, and delimited data lists with 100% privacy."
  },
  {
    raw: "align text in one line online",
    name: "Align Text in One Line Online",
    slug: "align-text-in-one-line-online",
    metaDesc: "Instantly align text in one line online. Strip unwanted line breaks, normalize spaces, and flatten multiline text with complete client privacy."
  },
  {
    raw: "one line online converter",
    name: "One Line Online Converter",
    slug: "one-line-online-converter",
    metaDesc: "Instantly convert multiline text into one line online. Free single-line flattener for paragraphs, lists, and code with zero server uploads."
  },
  {
    raw: "convert line breaks to n",
    name: "Convert Line Breaks to \\n",
    slug: "convert-line-breaks-to-n",
    metaDesc: "Instantly convert line breaks to \\n escape characters online. Format multiline strings for JSON, Python, JavaScript, and environment variables."
  },
  {
    raw: "remove line breaks and keep paragraphs",
    name: "Remove Line Breaks and Keep Paragraphs",
    slug: "remove-line-breaks-and-keep-paragraphs",
    metaDesc: "Instantly remove line breaks and keep paragraphs online. Unwrap jagged sentences while preserving double-spaced paragraph divisions perfectly."
  },
  {
    raw: "remove spaces and line breaks",
    name: "Remove Spaces and Line Breaks",
    slug: "remove-spaces-and-line-breaks",
    metaDesc: "Instantly remove spaces and line breaks online. Clean extra whitespace, tabs, and carriage returns to produce clean continuous single-line text."
  },
  {
    raw: "remove spaces and new lines",
    name: "Remove Spaces and New Lines",
    slug: "remove-spaces-and-new-lines",
    metaDesc: "Instantly remove spaces and new lines online. Purge whitespace characters, line returns, and indentations with 100% private in-browser processing."
  },
  {
    raw: "remove extra line breaks",
    name: "Remove Extra Line Breaks",
    slug: "remove-extra-line-breaks",
    metaDesc: "Instantly remove extra line breaks online. Eliminate consecutive blank lines, clean messy spacing, and join sentences with client-side privacy."
  },
  {
    raw: "remove trailing line breaks",
    name: "Remove Trailing Line Breaks",
    slug: "remove-trailing-line-breaks",
    metaDesc: "Instantly remove trailing line breaks online. Trim ending carriage returns, whitespace, and empty lines from text files and code blocks."
  },
  {
    raw: "notepad++ remove line breaks",
    name: "Notepad++ Remove Line Breaks",
    slug: "notepad-plus-plus-remove-line-breaks",
    metaDesc: "Instantly remove line breaks like Notepad++ online. Join lines, strip \\r\\n returns, and format single-line text without installing software."
  },
  {
    raw: "remove line breaks notepad++",
    name: "Remove Line Breaks Notepad++",
    slug: "remove-line-breaks-notepad-plus-plus",
    metaDesc: "Instantly remove line breaks with Notepad++ style online. Join lines with custom delimiters and strip carriage returns with client-side privacy."
  },
  {
    raw: "how to remove enter in notepad",
    name: "Remove Enter in Notepad",
    slug: "remove-enter-in-notepad",
    metaDesc: "Instantly remove Enter key line breaks in Notepad text online. Clean Windows Notepad files, join lines, and strip returns with 100% privacy."
  },
  {
    raw: "windows notepad remove line breaks",
    name: "Windows Notepad Remove Line Breaks",
    slug: "windows-notepad-remove-line-breaks",
    metaDesc: "Instantly remove line breaks in Windows Notepad text online. Flatten multiline notes into continuous text with zero latency and 100% client privacy."
  },
  {
    raw: "wordpad remove line breaks",
    name: "WordPad Remove Line Breaks",
    slug: "wordpad-remove-line-breaks",
    metaDesc: "Instantly remove line breaks in WordPad text online. Strip hard returns, unwrap sentences, and join paragraphs with client-side privacy."
  },
  {
    raw: "textedit remove all line breaks mac",
    name: "TextEdit Remove All Line Breaks Mac",
    slug: "textedit-remove-all-line-breaks-mac",
    metaDesc: "Instantly remove all line breaks in Mac TextEdit online. Clean carriage returns and unwrap multiline text with 100% client-side privacy."
  },
  {
    raw: "remove line breaks textwrangler",
    name: "Remove Line Breaks TextWrangler",
    slug: "remove-line-breaks-textwrangler",
    metaDesc: "Instantly remove line breaks like TextWrangler and BBEdit online. Join lines, strip returns, and format code with complete browser privacy."
  },
  {
    raw: "dreamweaver remove line breaks",
    name: "Dreamweaver Remove Line Breaks",
    slug: "dreamweaver-remove-line-breaks",
    metaDesc: "Instantly remove line breaks in Dreamweaver code online. Flatten HTML, CSS, and JS lines with zero latency and client-side privacy."
  },
  {
    raw: "collapse lines in vscode",
    name: "Collapse Lines in VS Code",
    slug: "collapse-lines-in-vscode",
    metaDesc: "Instantly collapse lines in VS Code online. Join multiline code, comments, and strings into single continuous lines with zero latency."
  },
  {
    raw: "collapse all lines in vscode",
    name: "Collapse All Lines in VS Code",
    slug: "collapse-all-lines-in-vscode",
    metaDesc: "Instantly collapse all lines in VS Code online. Join entire files or selections into single-line strings with complete client-side privacy."
  },
  {
    raw: "collapse lines in notepad++",
    name: "Collapse Lines in Notepad++",
    slug: "collapse-lines-in-notepad-plus-plus",
    metaDesc: "Instantly collapse lines in Notepad++ online. Join multiline text blocks into a single line with space or custom delimiters with zero clicks."
  },
  {
    raw: "collapse lines in vim",
    name: "Collapse Lines in Vim",
    slug: "collapse-lines-in-vim",
    metaDesc: "Instantly collapse lines like Vim J and :join commands online. Merge multiline text files into clean single lines with 100% client privacy."
  },
  {
    raw: "remove line breaks sublime text",
    name: "Remove Line Breaks Sublime Text",
    slug: "remove-line-breaks-sublime-text",
    metaDesc: "Instantly remove line breaks like Sublime Text Join Lines online. Merge multiline selections and strip newline characters with zero latency."
  },
  {
    raw: "remove line breaks intellij",
    name: "Remove Line Breaks IntelliJ",
    slug: "remove-line-breaks-intellij",
    metaDesc: "Instantly remove line breaks like IntelliJ IDEA Join Lines online. Flatten code strings, queries, and logs with 100% client-side privacy."
  },
  {
    raw: "remove line breaks visual studio",
    name: "Remove Line Breaks Visual Studio",
    slug: "remove-line-breaks-visual-studio",
    metaDesc: "Instantly remove line breaks like Visual Studio online. Strip \\r\\n carriage returns and join lines into single-line strings with zero latency."
  },
  {
    raw: "remove line breaks in atom editor",
    name: "Remove Line Breaks in Atom Editor",
    slug: "remove-line-breaks-in-atom-editor",
    metaDesc: "Instantly remove line breaks like Atom editor online. Join lines with custom delimiters and strip carriage returns with complete privacy."
  },
  {
    raw: "remove line breaks in eclipse",
    name: "Remove Line Breaks in Eclipse",
    slug: "remove-line-breaks-in-eclipse",
    metaDesc: "Instantly remove line breaks in Eclipse IDE online. Join lines, strip newlines, and clean source code strings with 100% client-side privacy."
  },
  {
    raw: "remove line breaks android studio",
    name: "Remove Line Breaks Android Studio",
    slug: "remove-line-breaks-android-studio",
    metaDesc: "Instantly remove line breaks in Android Studio online. Flatten Kotlin and Java multiline strings, logs, and XML with zero latency."
  },
  {
    raw: "remove line breaks xcode",
    name: "Remove Line Breaks Xcode",
    slug: "remove-line-breaks-xcode",
    metaDesc: "Instantly remove line breaks in Xcode online. Join Swift and Objective-C multiline strings and comments with complete client-side privacy."
  },
  {
    raw: "python remove line breaks from string",
    name: "Python Remove Line Breaks from String",
    slug: "python-remove-line-breaks-from-string",
    metaDesc: "Instantly remove line breaks from Python strings online. Clean \\n and \\r\\n characters without running scripts. 100% client-side privacy."
  },
  {
    raw: "remove new line from string python",
    name: "Remove New Line from String Python",
    slug: "remove-new-line-from-string-python",
    metaDesc: "Instantly remove newlines from Python strings online. Strip \\n characters and join multiline string literals with zero latency."
  },
  {
    raw: "javascript remove line breaks",
    name: "JavaScript Remove Line Breaks",
    slug: "javascript-remove-line-breaks",
    metaDesc: "Instantly remove line breaks in JavaScript strings online. Strip \\r and \\n characters and format clean single-line strings with 100% privacy."
  },
  {
    raw: "remove line breaks php",
    name: "Remove Line Breaks PHP",
    slug: "remove-line-breaks-php",
    metaDesc: "Instantly remove line breaks in PHP strings online. Strip PHP_EOL, \\r, and \\n characters from inputs and templates with zero latency."
  },
  {
    raw: "remove line breaks in c sharp",
    name: "Remove Line Breaks in C#",
    slug: "remove-line-breaks-in-c-sharp",
    metaDesc: "Instantly remove line breaks in C# strings online. Strip Environment.NewLine, \\r\\n, and \\n characters with 100% client-side privacy."
  },
  {
    raw: "remove line breaks java string",
    name: "Remove Line Breaks Java String",
    slug: "remove-line-breaks-java-string",
    metaDesc: "Instantly remove line breaks from Java strings online. Strip \\R, \\r, and \\n returns from text blocks and multiline streams with zero latency."
  },
  {
    raw: "remove line breaks golang string",
    name: "Remove Line Breaks Golang String",
    slug: "remove-line-breaks-golang-string",
    metaDesc: "Instantly remove line breaks from Go strings online. Clean newline characters from raw string literals and CLI outputs with complete privacy."
  },
  {
    raw: "remove line breaks ruby string",
    name: "Remove Line Breaks Ruby String",
    slug: "remove-line-breaks-ruby-string",
    metaDesc: "Instantly remove line breaks from Ruby strings online. Clean \\n and \\r characters without running Ruby scripts. 100% client-side privacy."
  },
  {
    raw: "remove line breaks in bash",
    name: "Remove Line Breaks in Bash",
    slug: "remove-line-breaks-in-bash",
    metaDesc: "Instantly remove line breaks in Bash terminal outputs online. Convert multiline shell outputs into single-line arguments with zero latency."
  },
  {
    raw: "remove line breaks linux sed",
    name: "Remove Line Breaks Linux Sed",
    slug: "remove-line-breaks-linux-sed",
    metaDesc: "Instantly remove line breaks like Linux sed online. Join lines with custom delimiters without writing complex sed scripts. 100% privacy."
  },
  {
    raw: "remove line breaks linux awk",
    name: "Remove Line Breaks Linux Awk",
    slug: "remove-line-breaks-linux-awk",
    metaDesc: "Instantly remove line breaks like Linux awk online. Flatten multiline records and control output record separators with zero latency."
  },
  {
    raw: "remove line breaks powershell",
    name: "Remove Line Breaks PowerShell",
    slug: "remove-line-breaks-powershell",
    metaDesc: "Instantly remove line breaks in PowerShell outputs online. Flatten multiline text files and command outputs with 100% client-side privacy."
  },
  {
    raw: "remove line breaks regex pattern",
    name: "Remove Line Breaks Regex Pattern",
    slug: "remove-line-breaks-regex-pattern",
    metaDesc: "Instantly remove line breaks using regex patterns online. Strip (\\r\\n|\\n|\\r) and join lines with your chosen separator in zero milliseconds."
  },
  {
    raw: "remove line breaks from json string",
    name: "Remove Line Breaks from JSON String",
    slug: "remove-line-breaks-from-json-string",
    metaDesc: "Instantly remove line breaks from JSON strings online. Eliminate invalid control characters and syntax errors with 100% client-side privacy."
  },
  {
    raw: "remove line breaks json payload",
    name: "Remove Line Breaks JSON Payload",
    slug: "remove-line-breaks-json-payload",
    metaDesc: "Instantly remove line breaks from JSON payloads online. Flatten request bodies, eliminate unescaped returns, and format valid JSON."
  },
  {
    raw: "remove line breaks csv file",
    name: "Remove Line Breaks CSV File",
    slug: "remove-line-breaks-csv-file",
    metaDesc: "Instantly remove line breaks in CSV files online. Fix broken rows, clean multiline address columns, and sanitize datasets with zero latency."
  },
  {
    raw: "remove line breaks from html",
    name: "Remove Line Breaks from HTML",
    slug: "remove-line-breaks-from-html",
    metaDesc: "Instantly remove line breaks from HTML markup online. Minify HTML lines, eliminate inline whitespace gaps, and compress page size."
  },
  {
    raw: "remove line breaks xml string",
    name: "Remove Line Breaks XML String",
    slug: "remove-line-breaks-xml-string",
    metaDesc: "Instantly remove line breaks from XML strings online. Flatten XML payloads for SOAP APIs and database storage with 100% client privacy."
  },
  {
    raw: "remove line breaks yaml file",
    name: "Remove Line Breaks YAML File",
    slug: "remove-line-breaks-yaml-file",
    metaDesc: "Instantly remove line breaks in YAML files online. Format multiline strings, folded scalars, and configuration keys with zero latency."
  },
  {
    raw: "remove line breaks sql query",
    name: "Remove Line Breaks SQL Query",
    slug: "remove-line-breaks-sql-query",
    metaDesc: "Instantly remove line breaks from SQL queries online. Flatten multiline SQL statements into single-line queries for logs and script runners."
  },
  {
    raw: "remove line breaks sql server",
    name: "Remove Line Breaks SQL Server",
    slug: "remove-line-breaks-sql-server",
    metaDesc: "Instantly remove line breaks in SQL Server data online. Strip CHAR(13) and CHAR(10) breaks from T-SQL exports with 100% client-side privacy."
  },
  {
    raw: "remove line breaks oracle sql",
    name: "Remove Line Breaks Oracle SQL",
    slug: "remove-line-breaks-oracle-sql",
    metaDesc: "Instantly remove line breaks in Oracle SQL data online. Strip CHR(10) and CHR(13) breaks from VARCHAR2 and CLOB columns with zero latency."
  },
  {
    raw: "remove line breaks dbeaver",
    name: "Remove Line Breaks DBeaver",
    slug: "remove-line-breaks-dbeaver",
    metaDesc: "Instantly remove line breaks in DBeaver online. Clean in-cell grid breaks and flatten multiline database queries with client-side privacy."
  },
  {
    raw: "remove line breaks from base64",
    name: "Remove Line Breaks from Base64",
    slug: "remove-line-breaks-from-base64",
    metaDesc: "Instantly remove line breaks from Base64 strings online. Strip 76-character chunk returns and create continuous Base64 with zero latency."
  },
  {
    raw: "remove line breaks from text file",
    name: "Remove Line Breaks from Text File",
    slug: "remove-line-breaks-from-text-file",
    metaDesc: "Instantly remove line breaks from text files online. Flatten multiline documents, strip carriage returns, and join paragraphs with 100% privacy."
  },
  {
    raw: "convert line endings to unix",
    name: "Convert Line Endings to Unix",
    slug: "convert-line-endings-to-unix",
    metaDesc: "Instantly convert line endings to Unix (LF) online. Strip Windows carriage returns (\\r) and normalize EOL characters with complete privacy."
  },
  {
    raw: "remove crlf carriage returns",
    name: "Remove CRLF Carriage Returns",
    slug: "remove-crlf-carriage-returns",
    metaDesc: "Instantly remove CRLF carriage returns online. Clean Windows \\r\\n characters into clean single-line text or LF line endings with zero latency."
  },
  {
    raw: "remove spaces between lines",
    name: "Remove Spaces Between Lines",
    slug: "remove-spaces-between-lines",
    metaDesc: "Instantly remove spaces between lines online. Eliminate empty blank lines, collapse excessive gaps, and join paragraphs with 100% privacy."
  },
  {
    raw: "clean line breaks instagram",
    name: "Clean Line Breaks Instagram",
    slug: "clean-line-breaks-instagram",
    metaDesc: "Instantly clean line breaks for Instagram captions and bios online. Fix broken spacing and format clean posts with 100% client-side privacy."
  },
  {
    raw: "remove line breaks whatsapp message",
    name: "Remove Line Breaks WhatsApp Message",
    slug: "remove-line-breaks-whatsapp-message",
    metaDesc: "Instantly remove line breaks in WhatsApp messages online. Unwrap fragmented chat lines and format single-line text with zero latency."
  },
  {
    raw: "remove line breaks linkedin post",
    name: "Remove Line Breaks LinkedIn Post",
    slug: "remove-line-breaks-linkedin-post",
    metaDesc: "Instantly remove line breaks for LinkedIn posts online. Clean up accidental returns and unwrap sentences for clean mobile formatting."
  }
];

// Clean conversational phrases from intentDescription
function sanitizeIntentDescription(desc, name) {
  if (!desc) return '';
  let cleaned = desc
    .replace(/This guide explains how to use\s+/gi, 'Use ')
    .replace(/This guide walks through\s+/gi, 'Access ')
    .replace(/This tutorial shows how to\s+/gi, 'Easily ')
    .replace(/This guide demonstrates how to\s+/gi, 'Quickly ')
    .replace(/This guide covers the best\s+/gi, 'Utilize the best ')
    .replace(/This guide covers the proven\s+/gi, 'Utilize the proven ')
    .replace(/This guide explains how\s+/gi, 'Understand how ')
    .replace(/This tool explains how\s+/gi, 'Discover how ')
    .replace(/Learn how to\s+/gi, 'Easily ')
    .replace(/Discover how to\s+/gi, 'Directly ')
    .replace(/Master how to\s+/gi, 'Directly ')
    .replace(/explore ready-to-use\s+/gi, 'use ready-to-use ')
    .replace(/Explore ready-to-use\s+/gi, 'Use ready-to-use ')
    .replace(/Complete Guide:?\s*/gi, '')
    .replace(/How to Remove\s+/gi, 'Remove ')
    .replace(/How to\s+/gi, '');

  return cleaned;
}

// Clean conversational phrases from heroSubtitle
function sanitizeHeroSubtitle(sub) {
  if (!sub) return '';
  return sub
    .replace(/Complete Guide:?\s*/gi, '')
    .replace(/How to Remove\s+/gi, 'Remove ')
    .replace(/How to\s+/gi, '');
}

async function run() {
  const filePath = path.resolve('./src/data/removeLineBreaksPresets.ts');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // Load existing presets module
  const { removeLineBreaksPresets } = await import(pathToFileURL(filePath).href);

  console.log(`Original presets count: ${removeLineBreaksPresets.length}`);
  console.log(`Target mapping count: ${EXACT_98_SPECS.length}`);

  if (EXACT_98_SPECS.length !== 98) {
    throw new Error(`Expected exactly 98 target specs, got ${EXACT_98_SPECS.length}`);
  }

  const updatedPresets = [];

  for (let i = 0; i < 98; i++) {
    const spec = EXACT_98_SPECS[i];
    const original = removeLineBreaksPresets[i] || {};

    const name = spec.name;
    const h1 = spec.name; // STRICT RULE: H1 strictly reflects exact transactional keyword target in Title Case
    const slug = spec.slug;
    const metaTitle = `${name} Online – Free Line Joiner | FastToolVerse`;
    const metaDescription = spec.metaDesc;

    if (metaDescription.length > 155) {
      console.warn(`Warning: preset ${i + 1} (${slug}) metaDescription length ${metaDescription.length} > 155`);
    }

    const heroSubtitle = sanitizeHeroSubtitle(original.heroSubtitle || '');
    const intentDescription = sanitizeIntentDescription(original.intentDescription || '', name);

    const presetObj = {
      slug,
      name,
      h1,
      metaTitle,
      metaDescription,
      heroSubtitle,
      intentDescription,
      config: original.config || { replaceWith: 'space', preserveParagraphs: false },
      category: original.category || 'General Text Formatting',
      sampleInput: original.sampleInput || 'Sample text line 1\nSample text line 2',
      editorialGuide: original.editorialGuide || {
        card1Title: 'Direct Text Formatting',
        card1Content: 'Clean up line endings and joins quickly.',
        card2Title: 'Paragraph Preservation',
        card2Content: 'Retain intended paragraph breaks while removing unwanted returns.',
        card3Title: 'Universal Compatibility',
        card3Content: 'Paste from spreadsheets, word processors, or code editors.',
        card4Title: 'Zero-Latency Processing',
        card4Content: 'Client-side processing executes in local browser RAM.'
      },
      faqs: original.faqs || [
        {
          question: `Can I ${name.toLowerCase()} safely?`,
          answer: 'Yes, all processing is performed 100% client-side in your browser with zero data sent to external servers.'
        }
      ]
    };

    updatedPresets.push(presetObj);
  }

  // Generate TypeScript code
  const tsCode = `// Strongly typed 98 High-Intent Remove Line Breaks Presets
export interface RemoveLineBreaksConfig {
  replaceWith: 'space' | 'comma' | 'semicolon' | 'none' | 'custom';
  customDelimiter?: string;
  preserveParagraphs: boolean;
  trimLines?: boolean;
  fixHyphens?: boolean;
  wrapQuotes?: 'none' | 'single' | 'double';
}

export interface RemoveLineBreaksEditorialGuide {
  card1Title: string;
  card1Content: string;
  card2Title: string;
  card2Content: string;
  card3Title: string;
  card3Content: string;
  card4Title: string;
  card4Content: string;
}

export interface RemoveLineBreaksFaq {
  question: string;
  answer: string;
}

export interface RemoveLineBreaksPreset {
  slug: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  intentDescription: string;
  config: RemoveLineBreaksConfig;
  sampleInput: string;
  editorialGuide: RemoveLineBreaksEditorialGuide;
  faqs: RemoveLineBreaksFaq[];
  category?: string;
}

export const removeLineBreaksPresets: RemoveLineBreaksPreset[] = ${JSON.stringify(updatedPresets, null, 2)};
`;

  fs.writeFileSync(filePath, tsCode, 'utf8');
  console.log('Successfully wrote 98 presets to ' + filePath);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
