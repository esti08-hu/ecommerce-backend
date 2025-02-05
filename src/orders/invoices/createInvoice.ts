const fs = require('fs');
const PDFDocument = require('pdfkit');

export function createInvoice(invoice, path) {
  const doc = new PDFDocument({ margin: 50 });

  generateHeader(doc, invoice);
  generateFooter(doc, invoice);

  doc.pipe(fs.createWriteStream(path));
  doc.end();
}

module.exports = {
  createInvoice,
};

function generateHeader(doc, invoice) {
  doc
    // .image('logo.jpg', 50, 45, { width: 50 })
    .fillColor('#444444')
    .fontSize(20)
    .text(invoice.companyName, 110, 57)
    .fontSize(10)
    .text(invoice.companyAddress?.street, 200, 65, { align: 'right' })
    .text(
      invoice.companyAddress?.city +
        ', ' +
        invoice.companyAddress?.state +
        ', ' +
        invoice.companyAddress?.zip,
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
