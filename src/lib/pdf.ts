import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

interface SignatureListParams {
  canton: string;
  commune: string;
  npa: string;
}

export async function generateSignatureList(
  params: SignatureListParams
): Promise<Uint8Array> {
  const { canton, commune, npa } = params;
  const doc = await PDFDocument.create();
  const helvetica = await doc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const timesRoman = await doc.embedFont(StandardFonts.TimesRoman);
  const timesItalic = await doc.embedFont(StandardFonts.TimesRomanItalic);

  const bleu = rgb(0.102, 0.227, 0.361);
  const or = rgb(0.784, 0.663, 0.318);
  const noir = rgb(0, 0, 0);
  const gris = rgb(0.4, 0.4, 0.4);

  const page = doc.addPage([595.28, 841.89]); // A4
  const { width, height } = page.getSize();
  const margin = 50;

  // Header band
  page.drawRectangle({
    x: 0,
    y: height - 80,
    width,
    height: 80,
    color: bleu,
  });

  page.drawText("INITIATIVE POPULAIRE FÉDÉRALE", {
    x: margin,
    y: height - 35,
    size: 14,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  });

  page.drawText("« Un franc par mille »", {
    x: margin,
    y: height - 55,
    size: 12,
    font: timesItalic,
    color: or,
  });

  page.drawText(
    "Initiative citoyenne, humaniste et apolitique — au service de l'humain",
    {
      x: margin,
      y: height - 70,
      size: 8,
      font: timesItalic,
      color: rgb(0.7, 0.7, 0.7),
    }
  );

  let y = height - 110;

  // Official title
  page.drawText("LISTE DE SIGNATURES", {
    x: margin,
    y,
    size: 16,
    font: helveticaBold,
    color: bleu,
  });
  y -= 25;

  page.drawText(
    "Initiative populaire fédérale « Un franc par mille — pour un impôt juste",
    { x: margin, y, size: 9, font: helvetica, color: noir }
  );
  y -= 13;
  page.drawText("sur les transactions électroniques »", {
    x: margin,
    y,
    size: 9,
    font: helvetica,
    color: noir,
  });
  y -= 25;

  // Commune info box
  page.drawRectangle({
    x: margin,
    y: y - 45,
    width: width - 2 * margin,
    height: 45,
    borderColor: bleu,
    borderWidth: 1.5,
    color: rgb(0.97, 0.96, 0.94),
  });

  page.drawText("Canton :", {
    x: margin + 10,
    y: y - 18,
    size: 10,
    font: helveticaBold,
    color: bleu,
  });
  page.drawText(canton, {
    x: margin + 70,
    y: y - 18,
    size: 10,
    font: helvetica,
    color: noir,
  });

  page.drawText("Commune :", {
    x: margin + 200,
    y: y - 18,
    size: 10,
    font: helveticaBold,
    color: bleu,
  });
  page.drawText(commune, {
    x: margin + 270,
    y: y - 18,
    size: 10,
    font: helvetica,
    color: noir,
  });

  page.drawText("NPA :", {
    x: margin + 400,
    y: y - 18,
    size: 10,
    font: helveticaBold,
    color: bleu,
  });
  page.drawText(npa, {
    x: margin + 435,
    y: y - 18,
    size: 10,
    font: helvetica,
    color: noir,
  });

  page.drawText(
    "Tous les signataires de cette feuille doivent être domiciliés dans la commune indiquée ci-dessus.",
    {
      x: margin + 10,
      y: y - 38,
      size: 7.5,
      font: timesItalic,
      color: gris,
    }
  );

  y -= 70;

  // Table header
  const cols = [
    { label: "N°", x: margin, w: 25 },
    { label: "Nom", x: margin + 25, w: 95 },
    { label: "Prénom", x: margin + 120, w: 85 },
    { label: "Date de naissance", x: margin + 205, w: 95 },
    { label: "Adresse", x: margin + 300, w: 110 },
    { label: "Signature", x: margin + 410, w: width - 2 * margin - 410 },
  ];

  const rowHeight = 28;
  const headerHeight = 20;

  page.drawRectangle({
    x: margin,
    y: y - headerHeight,
    width: width - 2 * margin,
    height: headerHeight,
    color: bleu,
  });

  for (const col of cols) {
    page.drawText(col.label, {
      x: col.x + 3,
      y: y - 14,
      size: 7.5,
      font: helveticaBold,
      color: rgb(1, 1, 1),
    });
  }

  y -= headerHeight;

  // Signature rows (20 rows max per official list)
  const numRows = 20;
  for (let i = 0; i < numRows; i++) {
    const rowY = y - (i + 1) * rowHeight;

    if (i % 2 === 0) {
      page.drawRectangle({
        x: margin,
        y: rowY,
        width: width - 2 * margin,
        height: rowHeight,
        color: rgb(0.97, 0.96, 0.94),
      });
    }

    // Row number
    page.drawText(`${i + 1}`, {
      x: margin + 8,
      y: rowY + 10,
      size: 8,
      font: helvetica,
      color: gris,
    });

    // Column separators
    for (const col of cols) {
      page.drawLine({
        start: { x: col.x, y: rowY + rowHeight },
        end: { x: col.x, y: rowY },
        thickness: 0.3,
        color: rgb(0.8, 0.8, 0.8),
      });
    }

    // Bottom line
    page.drawLine({
      start: { x: margin, y: rowY },
      end: { x: width - margin, y: rowY },
      thickness: 0.3,
      color: rgb(0.8, 0.8, 0.8),
    });
  }

  // Bottom border
  const tableBottom = y - numRows * rowHeight;

  // Footer
  const footerY = tableBottom - 20;

  page.drawText("Règles impératives :", {
    x: margin,
    y: footerY,
    size: 8,
    font: helveticaBold,
    color: bleu,
  });

  const rules = [
    "• Tous les signataires doivent être domiciliés dans la même commune.",
    "• Nom, prénom, date de naissance et signature : tout manuscrit, à l'encre.",
    "• Citoyens suisses majeurs (18 ans révolus) inscrits au registre électoral uniquement.",
    "• Une seule signature par personne pour l'ensemble de la récolte.",
  ];

  for (let i = 0; i < rules.length; i++) {
    page.drawText(rules[i], {
      x: margin,
      y: footerY - 14 - i * 11,
      size: 7,
      font: timesRoman,
      color: gris,
    });
  }

  const bottomY = footerY - 14 - rules.length * 11 - 15;
  page.drawText(
    "Renvoyer la liste complétée à : Comité d'initiative « Un franc par mille » — contact@1parmille.ch",
    { x: margin, y: bottomY, size: 7.5, font: helveticaBold, color: bleu }
  );

  // Gold accent line at bottom
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height: 4,
    color: or,
  });

  return doc.save();
}
