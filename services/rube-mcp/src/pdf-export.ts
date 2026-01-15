import PDFDocument from "pdfkit";

export interface PdfExportPayload {
  title?: string;
  author?: string;
  subject?: string;
  filename?: string;
}

export async function generateNotebookPdf(
  content: string,
  options: PdfExportPayload
): Promise<Buffer> {
  const doc = new PDFDocument({
    size: "LETTER",
    margin: 48,
    info: {
      Title: options.title,
      Author: options.author,
      Subject: options.subject,
    },
  });

  const chunks: Buffer[] = [];

  doc.on("data", (chunk) => {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  });

  const done = new Promise<Buffer>((resolve, reject) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
  });

  renderMarkdown(doc, content);
  doc.end();

  return done;
}

function renderMarkdown(doc: PDFDocument, content: string): void {
  doc.font("Helvetica");
  content.split("\n").forEach((line) => {
    const trimmed = line.trimEnd();
    if (!trimmed) {
      doc.moveDown(0.5);
      return;
    }

    if (trimmed.startsWith("# ")) {
      doc.fontSize(20).text(trimmed.slice(2), { paragraphGap: 6 });
      doc.moveDown(0.2);
      return;
    }

    if (trimmed.startsWith("## ")) {
      doc.fontSize(16).text(trimmed.slice(3), { paragraphGap: 4 });
      doc.moveDown(0.1);
      return;
    }

    if (trimmed.startsWith("### ")) {
      doc.fontSize(13).text(trimmed.slice(4), { paragraphGap: 3 });
      return;
    }

    if (trimmed.startsWith("- ")) {
      doc.fontSize(11).text(`• ${trimmed.slice(2)}`, {
        indent: 12,
        paragraphGap: 2,
      });
      return;
    }

    doc.fontSize(11).text(trimmed, { paragraphGap: 2 });
  });
}
