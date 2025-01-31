import fs from 'fs';
import PDFDocument from 'pdfkit';

export function createInvoice(invoice, path) {
  let doc = new PDFDocument({ margin: 50 });

  generateHeader(doc, invoice); // Invoke `generateHeader` function.
  generateFooter(doc, invoice); // Invoke `generateFooter` function.

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

module.exports = {
  createInvoice,
};

function generateHeader(doc, invoice) {
  doc
    .image('logo.png', 50, 45, { width: 50 })
    .fillColor('#444444')
    .fontSize(20)
    .text(invoice.companyName, 110, 57)
    .fontSize(10)
    .text(invoice.companyAddress.street, 200, 65, { align: 'right' })
    .text(
      invoice.companyAddress.city +
        ', ' +
        invoice.companyAddress.state +
        ', ' +
        invoice.companyAddress.zip,
      200,
      80,
      { align: 'right' },
    )
    .moveDown();
}

function generateFooter(doc, invoice) {
  doc
    .fontSize(10)
    .text(invoice.footerText, 50, 780, { align: 'center', width: 500 });
}
