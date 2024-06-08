import PDFDocument = require('pdfkit');

export type TInput = {
  billingNo: string;
  billingDate: string;
  customerName: string;
  customerTel: string;
  purchaseDetails: {
    productCode: string;
    productName: string;
    quantity: number;
    pricePerUnit: number;
  }[];
  discount: number;
  totalAmountBeforeDiscount: number;
  totalAmountAfterDiscount: number;
};

export function genBill(ip: TInput) {
  const doc = new PDFDocument({
    size: 'A4',
    margin: 40,
    bufferPages: true,
    font: 'Times-Roman',
  });

  generateHeader(doc, ip);
  generateTable(doc);
  generateDataInTable(doc, ip);
  generatePageNumbers(doc);

  doc.end();
  return doc;
}

function generateHeader(doc: PDFKit.PDFDocument, ip: TInput) {
  doc.fontSize(20).text('Example Bill', 40, 50, { align: 'center' });
  doc
    .fontSize(12)
    .text(`Billing No`, 40, 90)
    .text(`Billing Date`, 40, 110)
    .text(`Customer Name`, 40, 130)
    .text(`Customer Tel`, 40, 150);
  doc
    .text(`: ${ip.billingNo}`, 130, 90)
    .text(`: ${ip.billingDate}`, 130, 110)
    .text(`: ${ip.customerName}`, 130, 130)
    .text(`: ${ip.customerTel}`, 130, 150);
}

function generateTable(doc: PDFKit.PDFDocument) {
  // horizontal lines
  doc.moveTo(50, 200).lineTo(540, 200).stroke();
  doc.moveTo(50, 220).lineTo(540, 220).stroke();
  doc.moveTo(50, 500).lineTo(540, 500).stroke();
  doc.moveTo(50, 200).lineTo(50, 500).stroke();

  // vertical lines
  doc.moveTo(90, 200).lineTo(90, 500).stroke();
  doc.moveTo(160, 200).lineTo(160, 500).stroke();
  doc.moveTo(360, 200).lineTo(360, 500).stroke();
  doc.moveTo(410, 200).lineTo(410, 500).stroke();
  doc.moveTo(470, 200).lineTo(470, 500).stroke();
  doc.moveTo(540, 200).lineTo(540, 500).stroke();

  // table header
  doc
    .fontSize(12)
    .text(`No`, 60, 207)
    .text(`Product Code`, 93, 207)
    .text(`Product Name`, 170, 207)
    .text(`Quantity`, 365, 207)
    .text(`Price/Unit`, 415, 207)
    .text(`Total`, 490, 207);
}

function generateDataInTable(doc: PDFKit.PDFDocument, ip: TInput) {
  doc.fontSize(12).lineGap(0.5);
  const PROD_NAME_WIDTH = 180;
  const purchaseDetails = ip.purchaseDetails;
  const DEFAULT_HEIGHT = doc.heightOfString('A');

  let index = 0;
  let posY = 230;
  purchaseDetails.forEach((pd) => {
    index++;
    const productNameWidth = doc.widthOfString(pd.productName);
    const offset = Math.ceil(productNameWidth / (PROD_NAME_WIDTH - 10));
    let nextY = posY + offset * DEFAULT_HEIGHT;
    if (nextY > 500) {
      doc.addPage();
      generateHeader(doc, ip);
      generateTable(doc);
      posY = 230;
      nextY = posY + offset * 18 - offset * 4;
    }
    doc
      .text(`${index}`, 63, posY)
      .text(`${pd.productCode}`, 93, posY)
      .text(`${pd.productName}`, 170, posY, { width: PROD_NAME_WIDTH + 10 })
      .text(`${pd.quantity}`, 374, posY, { align: 'right', width: 20 })
      .text(`${format2Dec(pd.pricePerUnit)}`, 412, posY, {
        align: 'right',
        width: 50,
      })
      .text(`${format2Dec(pd.quantity * pd.pricePerUnit)}`, 480, posY, {
        align: 'right',
        width: 50,
      });
    posY = nextY;
  });

  // Total Amount
  doc
    .fontSize(16)
    .text('Total Amount Before Discount', 210, 530)
    .text('Discount', 210, 560)
    .text('Total Amount After Discount', 210, 590);
  doc.text(`${format2Dec(ip.totalAmountBeforeDiscount)}`, 430, 530, {
    align: 'right',
    width: 100,
  });
  doc.text(`${format2Dec(ip.discount)}`, 430, 560, {
    align: 'right',
    width: 100,
  });
  doc.text(`${format2Dec(ip.totalAmountAfterDiscount)}`, 430, 590, {
    align: 'right',
    width: 100,
    underline: true,
  });
}

function generatePageNumbers(doc: PDFKit.PDFDocument) {
  let pages = doc.bufferedPageRange();
  for (let i = 0; i < pages.count; i++) {
    doc.switchToPage(i);
    doc.text(`Page: ${i + 1} of ${pages.count}`, 0, 780, { align: 'center' });
  }
}

function format2Dec(n: number) {
  // format number to 2 decimal places
  return n.toLocaleString(undefined, { minimumFractionDigits: 2 });
}
