
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

export async function downloadElementAsPdf(element: HTMLElement, fileName: string) {
  const [{ toPng }, { jsPDF }] = await Promise.all([import("html-to-image"), import("jspdf")]);


  await document.fonts.ready;

  const dataUrl = await toPng(element, {
    pixelRatio: 2.5, // sharp enough for printing
    backgroundColor: "#ffffff",
    cacheBust: true,
    // Drop on-screen-only styling from the capture.
    style: { boxShadow: "none", margin: "0" },
  });

  const { width, height } = await new Promise<{ width: number; height: number }>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = reject;
    img.src = dataUrl;
  });

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
  const imgHeightMm = (height * A4_WIDTH_MM) / width;

  // Usually one page; if the sheet runs long, continue it on the next page.
  let offset = 0;
  pdf.addImage(dataUrl, "PNG", 0, 0, A4_WIDTH_MM, imgHeightMm);
  while (imgHeightMm - offset > A4_HEIGHT_MM + 1) {
    offset += A4_HEIGHT_MM;
    pdf.addPage();
    pdf.addImage(dataUrl, "PNG", 0, -offset, A4_WIDTH_MM, imgHeightMm);
  }

  pdf.save(fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`);
}
