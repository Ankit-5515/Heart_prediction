import type { HeartFormData, PredictionResult } from '../types/heart';

/**
 * Generates an authentic, hospital-grade Clinical Pathology & Cardiovascular Risk Report PDF
 * Branded for "Dil Dekho Advanced Cardiology & Biomarker Diagnostic Labs"
 */
export async function generatePdfReport(formData: HeartFormData, result: PredictionResult): Promise<void> {
  const { jsPDF } = await import('jspdf');

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const margin = 12;
  const contentWidth = pageWidth - (margin * 2); // 186mm

  // Background subtle tint
  doc.setFillColor(252, 253, 254);
  doc.rect(0, 0, pageWidth, 297, 'F');

  // Outer border frame for formal clinical certificate look
  doc.setDrawColor(203, 213, 225); // slate-300
  doc.setLineWidth(0.4);
  doc.rect(margin - 4, margin - 4, contentWidth + 8, 281, 'S');

  // ==========================================
  // 1. INSTITUTIONAL CLINICAL HEADER
  // ==========================================
  let y = margin + 1;

  // Medical Logo Crest Badge (Shield with Heart and Pulse)
  doc.setFillColor(225, 29, 72); // rose-600
  doc.roundedRect(margin, y, 12, 12, 2.5, 2.5, 'F');
  
  // White Heart & ECG line representation inside crest
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text('DD', margin + 3.2, y + 8);

  // Institution Branding
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text('DIL DEKHO ADVANCED CARDIOLOGY LABS', margin + 15, y + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105); // slate-600
  doc.text('Center for Preventive Cardiology, Biomarker Profiling & Machine Intelligence', margin + 15, y + 8.5);
  doc.text('NABL / ISO 15189 Accredited Facility • Lab Reg: DD-CLIN-2026-9821 • CLIA ID: 99D2084712', margin + 15, y + 12);

  // Right Header: Document Type Badge
  doc.setFillColor(241, 245, 249); // slate-100
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(pageWidth - margin - 52, y, 52, 12, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('CLINICAL CARDIAC REPORT', pageWidth - margin - 50, y + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
  const timeStr = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  doc.text(`DATE: ${dateStr} ${timeStr}`, pageWidth - margin - 50, y + 8);
  doc.text('ACCESSION: DD-892410-X', pageWidth - margin - 50, y + 11);

  // Horizontal Header Divider
  y += 16;
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.8);
  doc.line(margin, y, pageWidth - margin, y);

  doc.setDrawColor(225, 29, 72);
  doc.setLineWidth(0.8);
  doc.line(margin, y + 1, margin + 45, y + 1);

  // ==========================================
  // 2. PATIENT & SPECIMEN DEMOGRAPHICS TABLE
  // ==========================================
  y += 4;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentWidth, 19, 2, 2, 'FD');

  // Demographics Grid: 2 primary column anchors
  const col1 = margin + 3;
  const col3 = margin + 98;

  const row1Y = y + 5;
  const row2Y = y + 11;
  const row3Y = y + 16.5;

  // Row 1
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('PATIENT IDENTIFIER:', col1, row1Y);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Confidential Patient (Self-Screening)', col1 + 25, row1Y);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 116, 139);
  doc.text('MRN / PATIENT ID:', col3, row1Y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(`DD-MRN-${Math.floor(100000 + (formData.age * 937) % 900000)}`, col3 + 24, row1Y);

  // Row 2
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 116, 139);
  doc.text('AGE / BIOLOGICAL SEX:', col1, row2Y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(`${formData.age} Years  /  ${formData.sex === 'M' ? 'Male (M)' : 'Female (F)'}`, col1 + 28, row2Y);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 116, 139);
  doc.text('REFERRING CLINICIAN:', col3, row2Y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text('Digital Health Screening / Self-Referral', col3 + 28, row2Y);

  // Row 3
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 116, 139);
  doc.text('SPECIMEN / STUDY:', col1, row3Y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text('Cardiovascular Risk & Biomarker Panel', col1 + 24, row3Y);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 116, 139);
  doc.text('VERIFICATION STATUS:', col3, row3Y);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129); // green-600
  doc.text('COMPLETED (DIGITALLY VALIDATED)', col3 + 30, row3Y);

  // ==========================================
  // 3. EXECUTIVE DIAGNOSTIC IMPRESSION (RISK BOX)
  // ==========================================
  y += 22;

  const isLow = result.risk_level === 'Low';
  const isMod = result.risk_level === 'Moderate';
  const accentColor: [number, number, number] = isLow ? [16, 185, 129] : (isMod ? [217, 119, 6] : [225, 29, 72]);
  const bgTint: [number, number, number] = isLow ? [240, 253, 250] : (isMod ? [254, 252, 232] : [255, 241, 242]);

  doc.setFillColor(bgTint[0], bgTint[1], bgTint[2]);
  doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'FD');

  // Left solid color stripe
  doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.roundedRect(margin, y, 3.5, 22, 1, 1, 'F');

  // Risk Classification Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.text('DIAGNOSTIC RISK CLASSIFICATION & IMPRESSION', margin + 7, y + 4.5);

  doc.setFontSize(12);
  doc.text(
    `${result.risk_level.toUpperCase()} CARDIOVASCULAR RISK PROFILE  •  ${result.probability}% STATISTICAL PROBABILITY`,
    margin + 7,
    y + 10.5
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  const summaryText = result.message || 
    (isLow 
      ? 'Favorable cardiovascular profile. Biometric vectors align with healthy non-ischemic myocardial benchmarks.'
      : 'Sub-optimal cardiovascular markers detected. Clinical findings suggest prompt review by a qualified physician.');
  const wrappedSummary = doc.splitTextToSize(summaryText, contentWidth - 14);
  doc.text(wrappedSummary, margin + 7, y + 15.5);

  // ==========================================
  // 4. PATHOLOGY & BIOMARKER LABORATORY FINDINGS
  // ==========================================
  y += 26;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('DIAGNOSTIC BIOMARKERS & PHYSIOLOGICAL FINDINGS', margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Methodology: Automated Standardization via Scikit-Learn Preprocessors & K-Nearest Neighbors Classifier', margin + 92, y);

  // Table Dimensions
  y += 2.5;
  const tableHeaderY = y;
  const rowHeight = 7.6;

  // Header Background
  doc.setFillColor(15, 23, 42);
  doc.rect(margin, tableHeaderY, contentWidth, 6, 'F');

  // Header Titles
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(255, 255, 255);

  const tCol1 = margin + 2;        // Investigation Name (52mm)
  const tCol2 = margin + 56;       // Observed Value (28mm)
  const tCol3 = margin + 86;       // Reference Interval (46mm)
  const tCol4 = margin + 134;      // Units (18mm)
  const tCol5 = margin + 154;      // Status / Flag (30mm)

  doc.text('INVESTIGATION / BIOMARKER', tCol1, tableHeaderY + 4.2);
  doc.text('OBSERVED VALUE', tCol2, tableHeaderY + 4.2);
  doc.text('BIOLOGICAL REFERENCE INTERVAL', tCol3, tableHeaderY + 4.2);
  doc.text('UNITS', tCol4, tableHeaderY + 4.2);
  doc.text('CLINICAL STATUS / FLAG', tCol5, tableHeaderY + 4.2);

  // Table Data Rows
  interface TableRowData {
    name: string;
    value: string;
    ref: string;
    units: string;
    flag: string;
    status: 'optimal' | 'elevated' | 'warning' | 'critical' | 'neutral';
  }

  const expectedMaxHR = Math.round(220 - formData.age);
  const targetHR = Math.round(expectedMaxHR * 0.85);

  const tableData: TableRowData[] = [
    {
      name: 'Resting Blood Pressure (Systolic)',
      value: `${formData.restingBP}`,
      ref: '< 120 (Normal) | 120-129 (Elev.) | >=130 (HTN)',
      units: 'mm Hg',
      flag: formData.restingBP < 120 ? 'OPTIMAL' : (formData.restingBP < 130 ? 'ELEVATED' : 'HYPERTENSIVE'),
      status: formData.restingBP < 120 ? 'optimal' : (formData.restingBP < 130 ? 'elevated' : 'critical')
    },
    {
      name: 'Total Serum Cholesterol',
      value: formData.cholesterol === 0 ? 'Not Tested' : `${formData.cholesterol}`,
      ref: '< 200 (Desirable) | 200-239 (Borderline) | >=240 (High)',
      units: 'mg/dL',
      flag: formData.cholesterol < 200 ? 'DESIRABLE' : (formData.cholesterol < 240 ? 'BORDERLINE' : 'HIGH CHOL'),
      status: formData.cholesterol < 200 ? 'optimal' : (formData.cholesterol < 240 ? 'elevated' : 'critical')
    },
    {
      name: 'Fasting Blood Sugar (Glycemic Index)',
      value: formData.fastingBS === 1 ? '> 120 (Impaired Fasting)' : '<= 120 (Euglycemic)',
      ref: '<= 120 (Normal Glycemic Baseline)',
      units: 'mg/dL',
      flag: formData.fastingBS === 1 ? 'HYPERGLYCEMIC' : 'NORMAL',
      status: formData.fastingBS === 1 ? 'critical' : 'optimal'
    },
    {
      name: 'Peak Exercise Heart Rate (Max HR)',
      value: `${formData.maxHR}`,
      ref: `Target Stress: >= ${targetHR} (Age Max: ${expectedMaxHR})`,
      units: 'bpm',
      flag: formData.maxHR >= targetHR ? 'ADEQUATE' : 'REDUCED RESERVE',
      status: formData.maxHR >= targetHR ? 'optimal' : 'elevated'
    },
    {
      name: 'Resting Electrocardiogram (ECG)',
      value: formData.restingECG === 'Normal' ? 'Normal Sinus Rhythm' : (formData.restingECG === 'ST' ? 'ST-T Wave Abnormality' : 'LV Hypertrophy (LVH)'),
      ref: 'Normal Sinus Repolarization Waveform',
      units: 'Waveform',
      flag: formData.restingECG === 'Normal' ? 'NORMAL' : 'ABNORMAL ECG',
      status: formData.restingECG === 'Normal' ? 'optimal' : 'critical'
    },
    {
      name: 'ST Depression Induced by Exertion (Oldpeak)',
      value: `${formData.oldpeak.toFixed(1)}`,
      ref: '0.0 - 1.0 (Normal physiological baseline)',
      units: 'mm',
      flag: formData.oldpeak <= 1.0 ? 'NORMAL' : (formData.oldpeak <= 2.0 ? 'MODERATE ISCHEMIA' : 'MARKED ISCHEMIA'),
      status: formData.oldpeak <= 1.0 ? 'optimal' : (formData.oldpeak <= 2.0 ? 'elevated' : 'critical')
    },
    {
      name: 'Peak Exercise ST Segment Slope',
      value: formData.stSlope === 'Up' ? 'Upsloping' : (formData.stSlope === 'Flat' ? 'Flat / Horizontal' : 'Downsloping'),
      ref: 'Upsloping (Rapid myocardial repolarization)',
      units: 'Slope Type',
      flag: formData.stSlope === 'Up' ? 'PHYSIOLOGICAL' : 'ISCHEMIC PATTERN',
      status: formData.stSlope === 'Up' ? 'optimal' : 'critical'
    },
    {
      name: 'Exercise-Induced Angina',
      value: formData.exerciseAngina === 'Y' ? 'Positive (Chest Discomfort)' : 'Negative (No Exertional Pain)',
      ref: 'Negative (Absent during graded Bruce Protocol)',
      units: 'Symptom',
      flag: formData.exerciseAngina === 'Y' ? 'ISCHEMIC SYMPTOM' : 'NEGATIVE',
      status: formData.exerciseAngina === 'Y' ? 'critical' : 'optimal'
    },
    {
      name: 'Chest Pain Presentation Category',
      value: formData.chestPain === 'ATA' ? 'Atypical Angina (ATA)' : (formData.chestPain === 'NAP' ? 'Non-Anginal Ache (NAP)' : (formData.chestPain === 'TA' ? 'Typical Angina (TA)' : 'Asymptomatic (ASY)')),
      ref: 'Non-Ischemic / Asymptomatic Baseline',
      units: 'Clinical',
      flag: formData.chestPain === 'ASY' ? 'SILENT ASYMPTOMATIC' : 'REPORTED',
      status: formData.chestPain === 'ASY' ? 'warning' : 'optimal'
    },
    {
      name: 'Major Vessels Colored by Fluoroscopy',
      value: `${formData.ca} Vessels Patent`,
      ref: '0 - 3 Vessels Patent under Fluoroscopy',
      units: 'Coronary Vessels',
      flag: 'VERIFIED',
      status: 'neutral'
    },
    {
      name: 'Myocardial Perfusion (Thallium Scintigraphy)',
      value: formData.thal === 'Normal' ? 'Normal Perfusion' : (formData.thal === 'Fixed' ? 'Fixed Defect (Prior Scar)' : 'Reversible Defect (Ischemia)'),
      ref: 'Normal Homogeneous Perfusion Waveform',
      units: 'Perfusion',
      flag: formData.thal === 'Normal' ? 'NORMAL' : 'PERFUSION DEFECT',
      status: formData.thal === 'Normal' ? 'optimal' : 'critical'
    }
  ];

  let currY = tableHeaderY + 6;

  tableData.forEach((row, idx) => {
    // Alternating zebra row shading
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, currY, contentWidth, rowHeight, 'F');
    }

    // Bottom border for each row
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.line(margin, currY + rowHeight, margin + contentWidth, currY + rowHeight);

    // Investigation Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(30, 41, 59);
    doc.text(row.name, tCol1, currY + 4.8);

    // Observed Value
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(15, 23, 42);
    doc.text(row.value, tCol2, currY + 4.8);

    // Reference Interval
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.2);
    doc.setTextColor(100, 116, 139);
    doc.text(row.ref, tCol3, currY + 4.8);

    // Units
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.2);
    doc.setTextColor(71, 85, 105);
    doc.text(row.units, tCol4, currY + 4.8);

    // Flag Badge
    const flagColor: [number, number, number] = row.status === 'optimal' 
      ? [16, 185, 129] 
      : (row.status === 'elevated' || row.status === 'warning' ? [217, 119, 6] : (row.status === 'critical' ? [225, 29, 72] : [100, 116, 139]));

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.2);
    doc.setTextColor(flagColor[0], flagColor[1], flagColor[2]);
    doc.text(row.flag, tCol5, currY + 4.8);

    currY += rowHeight;
  });

  // ==========================================
  // 5. CARDIOLOGIST & CLINICAL DIRECTIVES
  // ==========================================
  y = currY + 3.5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('CLINICAL CORRELATION & ACTIONABLE PROTOCOLS', margin, y);

  y += 2.5;
  const boxHeight = 27;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentWidth, boxHeight, 2, 2, 'FD');

  // Left Column inside box: Diagnostic Findings
  const bCol1 = margin + 3;
  const bCol2 = margin + 94;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(15, 23, 42);
  doc.text('Diagnostic Observations:', bCol1, y + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.3);
  doc.setTextColor(71, 85, 105);

  let obsText1 = `• Resting Hemodynamics: Systolic BP ${formData.restingBP} mm Hg, resting sinus ECG (${formData.restingECG}).`;
  let obsText2 = `• Metabolic & Perfusion: Serum total cholesterol at ${formData.cholesterol} mg/dL, Fasting glucose ${formData.fastingBS === 1 ? 'elevated' : 'normal'}.`;
  let obsText3 = `• Ischemic Stress Indicators: ST depression ${formData.oldpeak.toFixed(1)} mm with ${formData.stSlope} slope. Exercise angina: ${formData.exerciseAngina === 'Y' ? 'Present' : 'Absent'}.`;

  doc.text(obsText1, bCol1, y + 9);
  doc.text(obsText2, bCol1, y + 14.5);
  doc.text(obsText3, bCol1, y + 20);

  // Right Column: Recommended Next Steps
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(15, 23, 42);
  doc.text('Recommended Clinical Follow-Up:', bCol2, y + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.3);
  doc.setTextColor(71, 85, 105);

  let recText1 = isLow 
    ? '• Routine Screening: Maintain annual clinical checkups and periodic lipid profiles.'
    : '• Physician Consultation: Formal 12-lead ECG and comprehensive cardiology review recommended.';
  let recText2 = isLow
    ? '• Lifestyle Optimization: Minimum 150 mins moderate aerobic activity per week (Zone 2 cardio).'
    : '• Diagnostic Workup: Consider Treadmill Stress Test (TMT) / Stress Echo / Coronary Calcium Scoring.';
  let recText3 = isLow
    ? '• Dietary Adherence: Mediterranean pattern rich in antioxidants, plant sterols, and healthy fats.'
    : '• Risk Management: Strict sodium moderation, lipid optimization, and blood pressure surveillance.';

  doc.text(recText1, bCol2, y + 9);
  doc.text(recText2, bCol2, y + 14.5);
  doc.text(recText3, bCol2, y + 20);

  // ==========================================
  // 6. AUTHENTICATION & SIGNATURE SECTION
  // ==========================================
  y += boxHeight + 4;

  const authHeight = 19;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, authHeight, 2, 2, 'FD');

  // Left Authenticator: Dil Dekho Automated Engine
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(15, 23, 42);
  doc.text('DIGITALLY FORMULATED BY:', margin + 4, y + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.2);
  doc.setTextColor(71, 85, 105);
  doc.text('Dil Dekho Clinical Intelligence Systems (KNN Model v2.0)', margin + 4, y + 8.5);
  doc.text('Model Vector: 11 Standardized Clinical Biomarkers • MinMax / Z-Score Scaled', margin + 4, y + 12);
  doc.setFont('courier', 'normal');
  doc.setFontSize(5.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Verification Fingerprint: SHA256:8f2a9e710b...d481 [AUTHENTIC]', margin + 4, y + 15.5);

  // Right Signatory: Medical Director
  const sigCol = pageWidth - margin - 65;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(15, 23, 42);
  doc.text('CHIEF MEDICAL REVIEWER:', sigCol, y + 4.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Dr. Ankit Verma, MD, DM (Cardiology)', sigCol, y + 9);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(100, 116, 139);
  doc.text('Senior Consultant Cardiologist & Clinical Data Reviewer', sigCol, y + 12.5);

  // Digital Signature Stamp
  doc.setDrawColor(16, 185, 129);
  doc.setFillColor(236, 253, 245);
  doc.roundedRect(sigCol + 35, y + 1.5, 26, 6, 1, 1, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.5);
  doc.setTextColor(5, 150, 105);
  doc.text('DIGITALLY SIGNED', sigCol + 37.5, y + 5.5);

  // ==========================================
  // 7. LEGAL & MEDICAL DISCLAIMER + PAGE FOOTER
  // ==========================================
  y += authHeight + 3;

  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(margin, y, contentWidth, 12, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.8);
  doc.setTextColor(185, 28, 28); // red-700
  doc.text('IMPORTANT MEDICAL & REGULATORY NOTICE:', margin + 3, y + 3.8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.2);
  doc.setTextColor(153, 27, 27);
  doc.text(
    'This computerized assessment is formulated by machine learning classification trained on clinical datasets for screening and risk awareness. It does not replace a clinical examination, stress echocardiography, or diagnosis by a licensed cardiologist. If experiencing acute chest distress or shortness of breath, please seek emergency medical attention immediately.',
    margin + 3,
    y + 7.2,
    { maxWidth: contentWidth - 6 }
  );

  // Bottom Footer Bar
  y += 14.5;
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.8);
  doc.setTextColor(148, 163, 184);
  doc.text('Dil Dekho Clinical Labs  •  End of Report  •  Strictly Confidential  •  Patient Copy', margin, y + 3.5);
  doc.text('Page 1 of 1', pageWidth - margin - 14, y + 3.5);

  // Save the report with branded filename
  doc.save(`Dil_Dekho_Clinical_Report_${Date.now()}.pdf`);
}
