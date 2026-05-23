import * as THREE from 'three';

const W = 1024;
const H = 640;

const PALETTE = {
  cream: '#FFF6E6',
  cream2: '#FFEFD1',
  paper: '#FFFAF0',
  peach: '#FFB68A',
  peachDeep: '#FF8E5C',
  butter: '#FFD86B',
  butterDeep: '#F5B73D',
  mint: '#A8E5C8',
  mintDeep: '#5FCFA0',
  sky: '#A6D8FF',
  skyDeep: '#5AB7F2',
  rose: '#FFB3C0',
  roseDeep: '#F47A92',
  ink: '#3B2A1F',
  ink2: '#6B4F3F',
  inkSoft: '#8E7261',
  line: '#2B1E16',
};

const TRANSITION_MS = 360;

export class ScreenRenderer {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = W;
    this.canvas.height = H;
    this.ctx = this.canvas.getContext('2d');
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.texture.anisotropy = 4;
    this.content = { type: 'boot' };
    this.previousContent = null;
    this.transitionStart = 0;
    this.transitionAlpha = 1;
    this.time = 0;
    this.cursor = { x: 540, y: 320, tx: 540, ty: 320 };
    this.flash = 0;
    this.draw();
  }

  setContent(content) {
    const next = content ?? { type: 'idle' };
    const sameType =
      this.content?.type === next.type &&
      JSON.stringify(this.content) === JSON.stringify(next);
    if (sameType) return;
    this.previousContent = this.content;
    this.content = next;
    this.transitionStart = this.time;
    this.transitionAlpha = 0;
    if (typeof next.cursorTarget?.x === 'number') {
      this.cursor.tx = next.cursorTarget.x;
      this.cursor.ty = next.cursorTarget.y;
    }
    if (next.flash) this.flash = 1;
  }

  tick(dt) {
    this.time += dt;
    const elapsed = (this.time - this.transitionStart) * 1000;
    this.transitionAlpha = Math.min(1, elapsed / TRANSITION_MS);
    this.cursor.x += (this.cursor.tx - this.cursor.x) * Math.min(1, dt * 5);
    this.cursor.y += (this.cursor.ty - this.cursor.y) * Math.min(1, dt * 5);
    this.flash = Math.max(0, this.flash - dt * 1.8);
    this.draw();
  }

  draw() {
    const ctx = this.ctx;
    ctx.fillStyle = PALETTE.cream;
    ctx.fillRect(0, 0, W, H);

    drawTaskbar(ctx, this.time);
    drawScene(ctx, this.content, this.time);
    drawScanlines(ctx);
    drawCursor(ctx, this.cursor);
    drawFlash(ctx, this.flash);
    drawTransition(ctx, this.transitionAlpha);

    this.texture.needsUpdate = true;
  }

  dispose() {
    this.texture.dispose();
  }
}

function drawScene(ctx, content, t) {
  switch (content.type) {
    case 'email':
      return drawEmail(ctx, content, t);
    case 'analysis':
      return drawAnalysis(ctx, content, t);
    case 'excel':
      return drawExcel(ctx, content, t);
    case 'pqRunning':
      return drawPowerQuery(ctx, content, t);
    case 'pqPivot':
      return drawPivot(ctx, content, t);
    case 'dashboard':
      return drawDashboard(ctx, content, t);
    case 'call':
    case 'transcript':
      return drawCall(ctx, content, t);
    case 'policy':
      return drawPolicy(ctx, content, t);
    case 'mrz':
      return drawMrzScan(ctx, content, t);
    case 'cctv':
      return drawCctv(ctx, content, t);
    case 'forwarded':
      return drawForwarded(ctx, content, t);
    case 'boot':
      return drawBoot(ctx, t);
    default:
      return drawIdle(ctx, t);
  }
}

function drawTaskbar(ctx, t) {
  ctx.fillStyle = PALETTE.ink;
  ctx.fillRect(0, 0, W, 42);
  ctx.fillStyle = PALETTE.peachDeep;
  ctx.fillRect(0, 0, 6, 42);

  ctx.fillStyle = PALETTE.butter;
  roundRect(ctx, 16, 8, 26, 26, 8);
  ctx.fill();
  ctx.strokeStyle = PALETTE.line;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.font = '700 16px Nunito, system-ui, sans-serif';
  ctx.fillStyle = PALETTE.cream;
  ctx.fillText('AI MENTOR · Bank ish stansiyasi', 56, 27);

  const breath = 0.5 + Math.sin(t * 2.4) * 0.5;
  ctx.fillStyle = `rgba(95, 207, 160, ${0.4 + breath * 0.5})`;
  ctx.beginPath();
  ctx.arc(W - 130, 21, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = PALETTE.cream2;
  ctx.font = '600 12px Nunito, system-ui, sans-serif';
  ctx.fillText('VPN · Toshkent-1', W - 120, 26);

  ctx.fillStyle = PALETTE.cream2;
  ctx.font = '700 13px Nunito, system-ui, sans-serif';
  const hh = String(9 + (Math.floor(t / 60) % 4)).padStart(2, '0');
  const mm = String(Math.floor(t) % 60).padStart(2, '0');
  ctx.fillText(`${hh}:${mm}`, W - 64, 27);
}

function drawBoot(ctx, t) {
  ctx.fillStyle = PALETTE.cream;
  ctx.fillRect(0, 42, W, H - 42);
  const phase = Math.floor(t * 2) % 4;
  ctx.fillStyle = PALETTE.ink2;
  ctx.font = '700 18px Nunito, system-ui, sans-serif';
  ctx.fillText(`Tizim ishga tushmoqda${'.'.repeat(phase)}`, 32, 100);

  ctx.strokeStyle = PALETTE.line;
  ctx.lineWidth = 3;
  ctx.fillStyle = PALETTE.butter;
  roundRect(ctx, 32, 120, 380, 16, 8);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = PALETTE.peachDeep;
  roundRect(ctx, 36, 124, 60 + ((t * 80) % 312), 8, 4);
  ctx.fill();

  ctx.fillStyle = PALETTE.ink;
  ctx.font = '600 13px Nunito, system-ui, sans-serif';
  const steps = ['VPN: bog`landi', 'ABS: ulanmoqda', 'CRM: sync', 'AI Mentor: tayyor'];
  steps.forEach((s, i) => {
    const done = (t * 0.8) > i;
    ctx.fillStyle = done ? PALETTE.mintDeep : PALETTE.inkSoft;
    ctx.fillText((done ? '✓ ' : '… ') + s, 32, 180 + i * 28);
  });
}

function drawIdle(ctx, t) {
  ctx.fillStyle = PALETTE.cream;
  ctx.fillRect(0, 42, W, H - 42);

  ctx.save();
  ctx.translate(W * 0.5, H * 0.5);
  for (let i = 0; i < 5; i++) {
    const r = 60 + i * 26 + Math.sin(t * 1.2 + i) * 4;
    ctx.strokeStyle = `rgba(255, 142, 92, ${0.5 - i * 0.08})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.fillStyle = PALETTE.peach;
  ctx.beginPath();
  ctx.arc(0, 0, 50 + Math.sin(t * 1.4) * 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = PALETTE.line;
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = PALETTE.ink;
  ctx.font = '900 36px Nunito, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('AI Mentor', 0, 8);
  ctx.font = '700 16px Nunito, system-ui, sans-serif';
  ctx.fillStyle = PALETTE.ink2;
  ctx.fillText('Mashgʻulot rejimini boshlash uchun stsenariy tanlang', 0, 100);
  ctx.textAlign = 'left';
  ctx.restore();
}

function drawEmail(ctx, c, t) {
  ctx.fillStyle = PALETTE.paper;
  ctx.fillRect(0, 42, W, H - 42);

  ctx.fillStyle = PALETTE.cream2;
  ctx.fillRect(0, 42, 220, H - 42);
  ctx.strokeStyle = PALETTE.line;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(220, 42);
  ctx.lineTo(220, H);
  ctx.stroke();

  drawChip(ctx, 16, 60, 188, 38, PALETTE.peach, 'Inbox (1)');
  const folders = ['Sent', 'Drafts', 'Spam', 'Trash'];
  ctx.fillStyle = PALETTE.ink2;
  ctx.font = '700 14px Nunito, system-ui, sans-serif';
  folders.forEach((f, i) => ctx.fillText(f, 28, 132 + i * 30));

  ctx.fillStyle = PALETTE.ink;
  ctx.font = '900 22px Nunito, system-ui, sans-serif';
  ctx.fillText(c.subject ?? 'No subject', 248, 92);

  ctx.font = '700 13px Nunito, system-ui, sans-serif';
  ctx.fillStyle = PALETTE.ink2;
  ctx.fillText(`From: ${c.from ?? 'unknown@example.com'}`, 248, 120);
  ctx.fillText('To: you@bank.uz', 248, 140);

  const showWarning = c.warn !== false;
  if (showWarning) {
    const blink = Math.floor(t * 2) % 2 === 0;
    ctx.fillStyle = blink ? PALETTE.rose : PALETTE.cream2;
    roundRect(ctx, 248, 158, W - 268, 42, 10);
    ctx.fill();
    ctx.strokeStyle = PALETTE.line;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = PALETTE.ink;
    ctx.font = '800 14px Nunito, system-ui, sans-serif';
    ctx.fillText(
      'OGOHLANTIRISH: tashqi domendan kelgan xat. Havolaga bosmang.',
      260,
      183,
    );
  }

  ctx.fillStyle = PALETTE.ink;
  ctx.font = '500 15px Nunito, system-ui, sans-serif';
  wrapText(ctx, c.body ?? '', 248, 230, W - 268, 24);

  if (c.flags?.includes('link')) {
    drawRedFlag(
      ctx,
      248,
      H - 130,
      W - 268,
      28,
      'http://bank-secure-uz.help/verify',
      PALETTE.roseDeep,
      t,
    );
  } else {
    ctx.fillStyle = PALETTE.roseDeep;
    ctx.font = '800 13px Nunito, system-ui, sans-serif';
    ctx.fillText('http://bank-secure-uz.help/verify', 248, H - 120);
    ctx.strokeStyle = PALETTE.roseDeep;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(248, H - 116);
    ctx.lineTo(528, H - 116);
    ctx.stroke();
  }

  if (c.flags?.includes('domain')) {
    drawHighlightBox(ctx, 282, 110, 270, 18, t);
  }
  if (c.flags?.includes('urgency')) {
    drawHighlightBox(ctx, 248, 78, 460, 22, t);
  }
}

function drawRedFlag(ctx, x, y, w, h, label, color, t) {
  const pulse = 0.5 + Math.sin(t * 5) * 0.5;
  ctx.fillStyle = `rgba(244, 122, 146, ${0.25 + pulse * 0.35})`;
  roundRect(ctx, x - 6, y - 4, Math.min(w, 320), h + 10, 8);
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.setLineDash([6, 4]);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = color;
  ctx.font = '800 13px Nunito, system-ui, sans-serif';
  ctx.fillText(label, x, y + 14);
}

function drawHighlightBox(ctx, x, y, w, h, t) {
  const pulse = 0.5 + Math.sin(t * 5) * 0.5;
  ctx.save();
  ctx.strokeStyle = PALETTE.roseDeep;
  ctx.lineWidth = 2.5 + pulse;
  ctx.setLineDash([5, 4]);
  ctx.strokeRect(x, y, w, h);
  ctx.setLineDash([]);
  ctx.fillStyle = `rgba(244, 122, 146, ${0.16 + pulse * 0.18})`;
  ctx.fillRect(x, y, w, h);
  ctx.restore();
}

function drawAnalysis(ctx, c, t) {
  ctx.fillStyle = PALETTE.cream;
  ctx.fillRect(0, 42, W, H - 42);

  drawChip(ctx, 32, 64, 240, 40, PALETTE.mint, c.chip ?? 'AML ANALYSIS');

  ctx.fillStyle = PALETTE.ink;
  ctx.font = '900 24px Nunito, system-ui, sans-serif';
  ctx.fillText(c.title ?? '', 32, 138);

  const items = c.items ?? [];
  // Monotonic reveal: items pop in over the first ~3s and stay visible.
  // The previous code modulated with `%` which oscillated 0→N→0→N
  // forever — the user saw items "appearing multiple times". Bug fixed.
  const elapsed = Math.max(0, t - (c.revealStart ?? 0));
  ctx.font = '600 16px Nunito, system-ui, sans-serif';
  items.forEach((item, i) => {
    const popIn = c.allVisible ? 1 : Math.min(1, Math.max(0, elapsed * 1.4 - i * 0.45));
    if (popIn <= 0) return;
    const y = 180 + i * 64;
    ctx.save();
    ctx.globalAlpha = popIn;
    ctx.translate(0, (1 - popIn) * -10);
    ctx.fillStyle = PALETTE.mint;
    roundRect(ctx, 32, y - 28, W - 64, 50, 14);
    ctx.fill();
    ctx.strokeStyle = PALETTE.line;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = PALETTE.mintDeep;
    ctx.beginPath();
    ctx.arc(60, y, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = PALETTE.cream;
    ctx.font = '900 14px Nunito, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(String(i + 1), 60, y + 5);
    ctx.textAlign = 'left';

    ctx.fillStyle = PALETTE.ink;
    ctx.font = '600 15px Nunito, system-ui, sans-serif';
    ctx.fillText(item, 84, y + 5);
    ctx.restore();
  });
}

function drawExcel(ctx, c, t) {
  ctx.fillStyle = PALETTE.paper;
  ctx.fillRect(0, 42, W, H - 42);

  ctx.fillStyle = PALETTE.mintDeep;
  ctx.fillRect(0, 42, W, 44);
  ctx.fillStyle = PALETTE.ink;
  ctx.font = '800 14px Nunito, system-ui, sans-serif';
  ctx.fillText('Excel · Kunlik_hisobot.xlsx', 18, 70);

  const cols = ['A', 'B', 'C', 'D', 'E', 'F'];
  const headers = ['Sana', 'Bo`lim', 'Operatsiya', 'Soni', 'Status', 'Izoh'];
  const baseRows = c.rows ?? [
    ['2026-05-18', 'Toshkent-1', 'Hisob ochish', '12', 'OK', '—'],
    ['2026-05-18', 'Toshkent-2', 'Ma`lumotnoma', '34', 'OK', 'Tezkor'],
    ['2026-05-19', 'Samarqand', 'Karta yangilash', '21', 'OK', '—'],
    ['2026-05-19', 'Buxoro', 'Hisob ochish', '7', 'OK', '—'],
    ['2026-05-20', 'Toshkent-1', 'Ma`lumotnoma', '41', 'OK', 'Yig`ma'],
    ['2026-05-20', 'Andijon', 'KYC tekshiruv', '18', 'OK', 'AML'],
  ];

  const tableX = 40;
  const tableY = 110;
  const cellW = (W - 80) / cols.length;

  ctx.strokeStyle = PALETTE.line;
  ctx.lineWidth = 2.5;
  ctx.fillStyle = PALETTE.cream2;
  roundRect(ctx, tableX, tableY, W - 80, 32, 6);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = PALETTE.ink2;
  ctx.font = '700 13px Nunito, system-ui, sans-serif';
  cols.forEach((col, i) => ctx.fillText(col, tableX + i * cellW + 12, tableY + 22));

  ctx.fillStyle = PALETTE.butter;
  roundRect(ctx, tableX, tableY + 32, W - 80, 36, 0);
  ctx.fill();
  ctx.strokeRect(tableX, tableY + 32, W - 80, 36);
  ctx.fillStyle = PALETTE.ink;
  ctx.font = '800 13px Nunito, system-ui, sans-serif';
  headers.forEach((h, i) => ctx.fillText(h, tableX + i * cellW + 12, tableY + 56));

  ctx.font = '500 13px Nunito, system-ui, sans-serif';
  const flicker = Math.floor(t * 2) % baseRows.length;
  baseRows.forEach((row, r) => {
    const y = tableY + 68 + r * 34;
    const isLive = c.live && r === flicker;
    ctx.fillStyle = isLive
      ? PALETTE.mint
      : r % 2 === 0
      ? PALETTE.paper
      : PALETTE.cream;
    ctx.fillRect(tableX, y, W - 80, 34);
    ctx.strokeStyle = PALETTE.line;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(tableX, y, W - 80, 34);
    ctx.fillStyle = PALETTE.ink;
    row.forEach((cell, ci) => ctx.fillText(cell, tableX + ci * cellW + 12, y + 22));
  });

  drawPlushButton(ctx, 40, H - 70, 240, 44, PALETTE.peach, 'Power Query · Refresh');
  drawPlushButton(ctx, 300, H - 70, 200, 44, PALETTE.butter, 'AI tushuntirish');
}

function drawPowerQuery(ctx, c, t) {
  ctx.fillStyle = PALETTE.paper;
  ctx.fillRect(0, 42, W, H - 42);

  ctx.fillStyle = PALETTE.mintDeep;
  ctx.fillRect(0, 42, W, 44);
  ctx.fillStyle = PALETTE.ink;
  ctx.font = '800 14px Nunito, system-ui, sans-serif';
  ctx.fillText('Power Query Editor · 6 ta CSV birlashtirilmoqda', 18, 70);

  const steps = c.steps ?? [
    'Promote Headers',
    'Remove Empty rows',
    'Remove Duplicates',
    'Change Type → Date',
    'Replace Errors',
  ];
  const stepTime = 0.9;
  const totalDone = c.complete ? steps.length : Math.min(steps.length, Math.floor(t / stepTime));

  ctx.fillStyle = PALETTE.cream2;
  roundRect(ctx, 32, 110, 360, 460, 18);
  ctx.fill();
  ctx.strokeStyle = PALETTE.line;
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = PALETTE.ink;
  ctx.font = '800 15px Nunito, system-ui, sans-serif';
  ctx.fillText('Applied Steps', 52, 142);

  steps.forEach((step, i) => {
    const y = 178 + i * 56;
    const done = i < totalDone;
    const inProgress = i === totalDone && !c.complete;
    ctx.fillStyle = done ? PALETTE.mint : inProgress ? PALETTE.butter : PALETTE.paper;
    roundRect(ctx, 52, y - 22, 320, 44, 12);
    ctx.fill();
    ctx.strokeStyle = PALETTE.line;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.fillStyle = PALETTE.ink;
    ctx.font = '700 13px Nunito, system-ui, sans-serif';
    ctx.fillText(`${i + 1}. ${step}`, 72, y + 5);

    if (done) {
      ctx.fillStyle = PALETTE.mintDeep;
      ctx.beginPath();
      ctx.arc(348, y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = PALETTE.line;
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.fillStyle = PALETTE.cream;
      ctx.font = '900 12px Nunito, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('✓', 348, y + 4);
      ctx.textAlign = 'left';
    } else if (inProgress) {
      const pulse = 0.5 + Math.sin(t * 8) * 0.5;
      ctx.fillStyle = `rgba(245, 183, 61, ${0.5 + pulse * 0.4})`;
      ctx.beginPath();
      ctx.arc(348, y, 8 + pulse * 3, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  ctx.fillStyle = PALETTE.cream;
  roundRect(ctx, 410, 110, W - 442, 460, 18);
  ctx.fill();
  ctx.strokeStyle = PALETTE.line;
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = PALETTE.ink;
  ctx.font = '800 15px Nunito, system-ui, sans-serif';
  ctx.fillText('Preview', 430, 142);

  const previewRows = [
    ['Sana', 'Bo`lim', 'Soni', 'Status'],
    ['2026-05-20', 'Toshkent-1', '41', 'OK'],
    ['2026-05-20', 'Toshkent-2', '38', 'OK'],
    ['2026-05-20', 'Samarqand', '24', 'OK'],
    ['2026-05-20', 'Buxoro', '12', 'OK'],
    ['2026-05-20', 'Andijon', '18', 'OK'],
    ['2026-05-20', 'Farg`ona', '29', 'OK'],
  ];
  const colW = (W - 484) / previewRows[0].length;
  previewRows.forEach((row, r) => {
    const y = 168 + r * 36;
    ctx.fillStyle = r === 0 ? PALETTE.butter : r % 2 ? PALETTE.paper : PALETTE.cream2;
    ctx.fillRect(430, y, W - 484, 32);
    ctx.strokeStyle = PALETTE.line;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(430, y, W - 484, 32);
    ctx.fillStyle = PALETTE.ink;
    ctx.font = r === 0 ? '800 12px Nunito' : '500 12px Nunito';
    row.forEach((cell, ci) => ctx.fillText(cell, 442 + ci * colW, y + 21));
  });

  const progress = c.complete ? 1 : Math.min(1, t / (stepTime * steps.length));
  ctx.fillStyle = PALETTE.cream2;
  roundRect(ctx, 32, H - 64, W - 64, 16, 8);
  ctx.fill();
  ctx.strokeStyle = PALETTE.line;
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.fillStyle = PALETTE.mintDeep;
  roundRect(ctx, 36, H - 60, Math.max(8, (W - 72) * progress), 8, 4);
  ctx.fill();
}

function drawPivot(ctx, c, t) {
  ctx.fillStyle = PALETTE.paper;
  ctx.fillRect(0, 42, W, H - 42);

  ctx.fillStyle = PALETTE.skyDeep;
  ctx.fillRect(0, 42, W, 44);
  ctx.fillStyle = PALETTE.ink;
  ctx.font = '800 14px Nunito, system-ui, sans-serif';
  ctx.fillText('PivotTable · Yig`ma hisobot · 6 filial', 18, 70);

  const branches = ['Toshkent-1', 'Toshkent-2', 'Samarqand', 'Buxoro', 'Andijon', 'Farg`ona'];
  const tableX = 32;
  const tableY = 110;
  const colW = (W - 100) / 8;

  ctx.fillStyle = PALETTE.butter;
  roundRect(ctx, tableX, tableY, W - 64, 32, 6);
  ctx.fill();
  ctx.strokeStyle = PALETTE.line;
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.fillStyle = PALETTE.ink;
  ctx.font = '800 13px Nunito, system-ui, sans-serif';
  const header = ['Bo`lim', '18', '19', '20', '21', '22', '23', 'Jami'];
  header.forEach((h, i) => ctx.fillText(h, tableX + 12 + i * colW, tableY + 22));

  branches.forEach((b, r) => {
    const y = tableY + 32 + r * 34;
    ctx.fillStyle = r % 2 ? PALETTE.paper : PALETTE.cream2;
    ctx.fillRect(tableX, y, W - 64, 34);
    ctx.strokeStyle = PALETTE.line;
    ctx.lineWidth = 1;
    ctx.strokeRect(tableX, y, W - 64, 34);
    ctx.fillStyle = PALETTE.ink;
    ctx.font = '700 13px Nunito, system-ui, sans-serif';
    ctx.fillText(b, tableX + 12, y + 22);
    let total = 0;
    for (let i = 1; i < 8; i++) {
      const val = Math.floor(10 + Math.abs(Math.sin(t * 0.4 + r + i)) * 40);
      total += val;
      ctx.fillStyle = i === 7 ? PALETTE.peachDeep : PALETTE.ink2;
      ctx.font = i === 7 ? '900 14px Nunito' : '500 13px Nunito';
      ctx.fillText(i === 7 ? String(total) : String(val), tableX + 12 + i * colW, y + 22);
    }
  });

  ctx.fillStyle = PALETTE.cream2;
  roundRect(ctx, tableX, H - 130, W - 64, 56, 14);
  ctx.fill();
  ctx.strokeStyle = PALETTE.line;
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.fillStyle = PALETTE.ink;
  ctx.font = '800 13px Nunito, system-ui, sans-serif';
  ctx.fillText('AI tahlili:', tableX + 16, H - 108);
  ctx.font = '500 12px Nunito';
  ctx.fillText(
    'Toshkent-1 — 22% o`sish; Andijonda KYC tekshiruvlar 2x; Farg`ona statusi OK barqaror.',
    tableX + 16,
    H - 88,
  );
}

function drawDashboard(ctx, c, t) {
  ctx.fillStyle = PALETTE.cream;
  ctx.fillRect(0, 42, W, H - 42);

  ctx.fillStyle = PALETTE.ink;
  ctx.font = '900 24px Nunito, system-ui, sans-serif';
  ctx.fillText(c.title ?? '', 32, 84);
  ctx.font = '600 14px Nunito, system-ui, sans-serif';
  ctx.fillStyle = PALETTE.ink2;
  ctx.fillText(c.client ?? '', 32, 108);

  const cards = c.cards ?? [];
  const cardW = (W - 96) / cards.length;
  cards.forEach((card, i) => {
    const x = 32 + i * (cardW + 16);
    const breathe = 1 + Math.sin(t * 1.6 + i) * 0.01;
    ctx.save();
    ctx.translate(x + cardW / 2, 130 + 55);
    ctx.scale(breathe, breathe);
    ctx.translate(-(x + cardW / 2), -(130 + 55));
    ctx.fillStyle = card.tint ?? PALETTE.cream2;
    roundRect(ctx, x, 130, cardW, 110, 18);
    ctx.fill();
    ctx.strokeStyle = PALETTE.line;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = PALETTE.ink;
    ctx.font = '700 13px Nunito, system-ui, sans-serif';
    ctx.fillText(card.label, x + 18, 158);
    ctx.font = '900 32px Nunito, system-ui, sans-serif';
    ctx.fillText(card.value, x + 18, 210);
    ctx.restore();
  });

  ctx.fillStyle = PALETTE.paper;
  roundRect(ctx, 32, 264, W - 64, 268, 18);
  ctx.fill();
  ctx.strokeStyle = PALETTE.line;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = PALETTE.ink2;
  ctx.font = '800 13px Nunito, system-ui, sans-serif';
  ctx.fillText('Suhbat oqimi · so`nggi 12 ta tashrif', 50, 292);

  const bars = 12;
  const baseY = 510;
  for (let i = 0; i < bars; i++) {
    const h = 30 + Math.abs(Math.sin(t * 0.6 + i * 0.4)) * 140;
    const x = 60 + i * ((W - 140) / bars);
    ctx.fillStyle = i === bars - 1 ? PALETTE.peachDeep : PALETTE.butter;
    roundRect(ctx, x, baseY - h, (W - 180) / bars, h, 6);
    ctx.fill();
    ctx.strokeStyle = PALETTE.line;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function drawCall(ctx, c, t) {
  ctx.fillStyle = PALETTE.cream;
  ctx.fillRect(0, 42, W, H - 42);

  drawChip(ctx, 32, 64, 240, 40, PALETTE.rose, 'KIRUVCHI QO`NG`IROQ · LIVE');

  ctx.fillStyle = PALETTE.ink;
  ctx.font = '900 28px Nunito, system-ui, sans-serif';
  ctx.fillText(c.from ?? 'Notanish raqam', 32, 152);
  ctx.font = '600 14px Nunito, system-ui, sans-serif';
  ctx.fillStyle = PALETTE.ink2;
  ctx.fillText(c.caller ?? 'Identifikator yo`q', 32, 178);

  const ring = 12 + Math.sin(t * 4) * 4;
  ctx.fillStyle = PALETTE.peach;
  ctx.beginPath();
  ctx.arc(W - 130, 130, 50 + ring, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = PALETTE.line;
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.fillStyle = PALETTE.ink;
  ctx.font = '900 18px Nunito, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('LIVE', W - 130, 138);
  ctx.textAlign = 'left';

  ctx.fillStyle = PALETTE.paper;
  roundRect(ctx, 32, 200, W - 64, 64, 14);
  ctx.fill();
  ctx.strokeStyle = PALETTE.line;
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(48, 232);
  for (let i = 0; i < 80; i++) {
    const x = 48 + i * 12;
    const y = 232 + Math.sin(t * 6 + i * 0.6) * (8 + Math.sin(t * 0.7 + i) * 12);
    ctx.lineTo(x, y);
  }
  ctx.strokeStyle = PALETTE.peachDeep;
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.restore();

  const lines = c.lines ?? [];
  lines.forEach((line, i) => {
    const y = 296 + i * 64;
    if (y > H - 30) return;
    ctx.fillStyle = i % 2 === 0 ? PALETTE.sky : PALETTE.paper;
    roundRect(ctx, 32, y - 24, W - 64, 50, 14);
    ctx.fill();
    ctx.strokeStyle = PALETTE.line;
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.fillStyle = PALETTE.ink;
    ctx.font = '800 13px Nunito, system-ui, sans-serif';
    ctx.fillText((line.speaker ?? '').toUpperCase(), 50, y - 4);
    ctx.font = '500 14px Nunito, system-ui, sans-serif';
    ctx.fillText(line.text, 50, y + 16);
  });

  if (c.deepfakeAlert) {
    const pulse = 0.5 + Math.sin(t * 6) * 0.5;
    ctx.fillStyle = `rgba(244, 122, 146, ${0.18 + pulse * 0.18})`;
    ctx.fillRect(0, 42, W, H - 42);
    drawChip(ctx, W - 320, 70, 280, 38, PALETTE.rose, '⚠ DEEPFAKE ehtimoli yuqori');
  }
}

function drawPolicy(ctx, c, t) {
  ctx.fillStyle = PALETTE.paper;
  ctx.fillRect(0, 42, W, H - 42);

  drawChip(ctx, 32, 64, 280, 40, PALETTE.butter, `QOIDA · ${c.code ?? 'POLICY'}`);

  ctx.fillStyle = PALETTE.ink;
  ctx.font = '900 24px Nunito, system-ui, sans-serif';
  ctx.fillText(c.title ?? 'Ichki qoida', 32, 160);

  ctx.font = '500 16px Nunito, system-ui, sans-serif';
  wrapText(ctx, c.body ?? '', 32, 200, W - 64, 26);

  ctx.fillStyle = PALETTE.mintDeep;
  ctx.beginPath();
  ctx.arc(W - 60, 80, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = PALETTE.ink2;
  ctx.font = '700 12px Nunito';
  ctx.fillText('Sinxronlandi', W - 168, 84);
}

function drawMrzScan(ctx, c, t) {
  ctx.fillStyle = PALETTE.cream;
  ctx.fillRect(0, 42, W, H - 42);

  drawChip(ctx, 32, 64, 280, 40, PALETTE.sky, 'PASPORT TAHLILI · KYC §3.4');

  const docX = 56;
  const docY = 130;
  const docW = 420;
  const docH = 280;
  ctx.fillStyle = PALETTE.paper;
  roundRect(ctx, docX, docY, docW, docH, 18);
  ctx.fill();
  ctx.strokeStyle = PALETTE.line;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = PALETTE.cream2;
  ctx.fillRect(docX + 16, docY + 16, 120, 160);
  ctx.strokeStyle = PALETTE.line;
  ctx.lineWidth = 2;
  ctx.strokeRect(docX + 16, docY + 16, 120, 160);

  ctx.fillStyle = PALETTE.ink2;
  ctx.font = '600 12px Nunito';
  ['Familiya: KARIMOV', 'Ism: BOBUR', 'Tug`ilgan: 1988-04-12', 'ID: AA1234567', 'Berilgan: 2021-09-03'].forEach(
    (line, i) => ctx.fillText(line, docX + 152, docY + 36 + i * 22),
  );

  ctx.fillStyle = PALETTE.ink;
  ctx.font = '800 12px monospace';
  const mrz1 = 'P<UZBKARIMOV<<BOBUR<<<<<<<<<<<<<<<<<<<<<<<<<<';
  const mrz2 = 'AA1234567<UZB8804124M2904063<<<<<<<<<<<<<<04';
  ctx.fillText(mrz1, docX + 16, docY + docH - 36);
  ctx.fillText(mrz2, docX + 16, docY + docH - 18);

  const scanY = docY + ((t * 80) % docH);
  ctx.fillStyle = `rgba(95, 207, 160, ${0.35 + Math.sin(t * 6) * 0.2})`;
  ctx.fillRect(docX, scanY, docW, 4);

  const checks = c.checks ?? [
    'MRZ kod va ID raqami mos',
    'ABS bazada konflikt yo`q',
    'Fotosurat sifati: yuqori',
    'Suv belgisi mavjud',
  ];
  const result = c.result ?? 'pending';
  const checkX = 520;
  const checkY = 130;
  ctx.fillStyle = PALETTE.cream2;
  roundRect(ctx, checkX, checkY, W - checkX - 32, 280, 18);
  ctx.fill();
  ctx.strokeStyle = PALETTE.line;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = PALETTE.ink;
  ctx.font = '800 14px Nunito';
  ctx.fillText('Tekshiruv natijasi', checkX + 16, checkY + 28);
  checks.forEach((label, i) => {
    const cy = checkY + 60 + i * 38;
    const done = (t * 0.9) > i;
    ctx.fillStyle = done ? PALETTE.mintDeep : PALETTE.inkSoft;
    ctx.beginPath();
    ctx.arc(checkX + 28, cy, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = PALETTE.line;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = PALETTE.cream;
    ctx.font = '900 10px Nunito';
    ctx.textAlign = 'center';
    ctx.fillText(done ? '✓' : '…', checkX + 28, cy + 3);
    ctx.textAlign = 'left';
    ctx.fillStyle = PALETTE.ink;
    ctx.font = '600 13px Nunito';
    ctx.fillText(label, checkX + 48, cy + 4);
  });

  if (result === 'suspicious') {
    const pulse = 0.5 + Math.sin(t * 4) * 0.5;
    ctx.fillStyle = `rgba(244, 122, 146, ${0.5 + pulse * 0.4})`;
    roundRect(ctx, 32, H - 92, W - 64, 56, 14);
    ctx.fill();
    ctx.strokeStyle = PALETTE.roseDeep;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = PALETTE.ink;
    ctx.font = '900 16px Nunito';
    ctx.fillText('SHUBHALI HUJJAT — KYC §3.4 protokol qadami #3', 50, H - 56);
  } else if (result === 'verified') {
    ctx.fillStyle = PALETTE.mint;
    roundRect(ctx, 32, H - 92, W - 64, 56, 14);
    ctx.fill();
    ctx.strokeStyle = PALETTE.line;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = PALETTE.ink;
    ctx.font = '900 16px Nunito';
    ctx.fillText('TASDIQLANDI — barcha tekshiruvlar muvaffaqiyatli', 50, H - 56);
  }
}

function drawCctv(ctx, c, t) {
  ctx.fillStyle = '#0a0e14';
  ctx.fillRect(0, 42, W, H - 42);

  for (let y = 50; y < H; y += 4) {
    ctx.fillStyle = `rgba(255, 255, 255, ${0.02 + Math.random() * 0.02})`;
    ctx.fillRect(0, y, W, 1);
  }

  ctx.fillStyle = 'rgba(255, 142, 92, 0.85)';
  ctx.font = '800 13px monospace';
  ctx.fillText('● REC', 24, 70);
  ctx.fillStyle = '#e6f0ff';
  ctx.fillText('CAM-04 · LOBBY · 14:08:22', 80, 70);

  ctx.fillStyle = '#1a2030';
  ctx.fillRect(120, 110, W - 240, H - 180);
  ctx.strokeStyle = '#5fcfa0';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(120, 110, W - 240, H - 180);

  ctx.fillStyle = '#2a3548';
  for (let i = 0; i < 10; i++) {
    const px = 140 + (i * 70 + ((t * 60) % 70));
    ctx.fillRect(px % (W - 280) + 120, H - 130, 4, 50);
  }

  const px = ((t * 60) % (W - 280));
  ctx.fillStyle = '#ffb68a';
  ctx.beginPath();
  ctx.arc(120 + px + 80, H - 110, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#5ab7f2';
  roundRect(ctx, 120 + px + 60, H - 142, 40, 50, 6);
  ctx.fill();

  const target = c.target ?? 'Tashrifchi';
  ctx.fillStyle = 'rgba(244, 122, 146, 0.9)';
  ctx.font = '800 12px monospace';
  ctx.fillText(`> ID: ${target}`, 24, H - 56);
  ctx.fillText(`> VMT: tekshiruv kerak`, 24, H - 34);
}

function drawForwarded(ctx, c, t) {
  ctx.fillStyle = PALETTE.cream;
  ctx.fillRect(0, 42, W, H - 42);

  const pulse = 0.5 + Math.sin(t * 3) * 0.5;
  ctx.fillStyle = `rgba(95, 207, 160, ${0.2 + pulse * 0.15})`;
  ctx.beginPath();
  ctx.arc(W * 0.5, H * 0.45, 160 + pulse * 12, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = PALETTE.mintDeep;
  ctx.beginPath();
  ctx.arc(W * 0.5, H * 0.45, 70, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = PALETTE.line;
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.fillStyle = PALETTE.paper;
  ctx.font = '900 60px Nunito';
  ctx.textAlign = 'center';
  ctx.fillText('✓', W * 0.5, H * 0.45 + 24);
  ctx.fillStyle = PALETTE.ink;
  ctx.font = '900 22px Nunito';
  ctx.fillText(c.title ?? 'Sec Ops ga forward qilindi', W * 0.5, H * 0.45 + 130);
  ctx.font = '600 14px Nunito';
  ctx.fillStyle = PALETTE.ink2;
  ctx.fillText(
    c.subtitle ?? 'IDS qoidasi 30 daqiqada yangilanadi — 2400 xodim himoyalanadi.',
    W * 0.5,
    H * 0.45 + 158,
  );
  ctx.textAlign = 'left';
}

function drawScanlines(ctx) {
  ctx.fillStyle = 'rgba(255,255,255,0.02)';
  for (let y = 42; y < H; y += 4) ctx.fillRect(0, y, W, 1);
  ctx.fillStyle = 'rgba(43,30,22,0.04)';
  for (let y = 42; y < H; y += 4) ctx.fillRect(0, y + 2, W, 1);
}

function drawCursor(ctx, cursor) {
  ctx.save();
  ctx.translate(cursor.x, cursor.y);
  ctx.fillStyle = PALETTE.line;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 18);
  ctx.lineTo(5, 14);
  ctx.lineTo(9, 22);
  ctx.lineTo(12, 21);
  ctx.lineTo(8, 13);
  ctx.lineTo(14, 13);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = PALETTE.cream;
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.restore();
}

function drawFlash(ctx, flash) {
  if (flash <= 0) return;
  ctx.fillStyle = `rgba(255, 248, 224, ${flash * 0.4})`;
  ctx.fillRect(0, 42, W, H - 42);
}

function drawTransition(ctx, alpha) {
  if (alpha >= 1) return;
  const eased = 1 - alpha;
  ctx.fillStyle = `rgba(43, 30, 22, ${eased * 0.18})`;
  ctx.fillRect(0, 42, W, H - 42);
}

function drawChip(ctx, x, y, w, h, fill, label) {
  ctx.fillStyle = fill;
  roundRect(ctx, x, y, w, h, h / 2);
  ctx.fill();
  ctx.strokeStyle = PALETTE.line;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = PALETTE.ink;
  ctx.font = '800 13px Nunito, system-ui, sans-serif';
  ctx.fillText(label, x + 16, y + h / 2 + 5);
}

function drawPlushButton(ctx, x, y, w, h, fill, label) {
  ctx.fillStyle = PALETTE.line;
  roundRect(ctx, x, y + 4, w, h, h / 2);
  ctx.fill();
  ctx.fillStyle = fill;
  roundRect(ctx, x, y, w, h, h / 2);
  ctx.fill();
  ctx.strokeStyle = PALETTE.line;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = PALETTE.ink;
  ctx.font = '800 14px Nunito, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(label, x + w / 2, y + h / 2 + 5);
  ctx.textAlign = 'left';
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = (text || '').split(/\s+/);
  let line = '';
  let yy = y;
  for (const word of words) {
    const test = line ? line + ' ' + word : word;
    if (ctx.measureText(test).width > maxWidth) {
      ctx.fillText(line, x, yy);
      line = word;
      yy += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, yy);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
