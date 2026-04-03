import fs from 'fs';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.join(__dirname, '..');
const externalDepsRoot = '/home/giorgio/Scrivania/cali-b2b-landing/node_modules';

async function loadModule(localSpecifier, externalRelativePath) {
  try {
    return await import(localSpecifier);
  } catch (localError) {
    const fallbackUrl = pathToFileURL(path.join(externalDepsRoot, externalRelativePath)).href;
    try {
      return await import(fallbackUrl);
    } catch (fallbackError) {
      throw new Error(
        `Impossibile caricare ${localSpecifier}. Prova a installare la dipendenza nel repo corrente oppure verifica ${fallbackUrl}.\n` +
        `Errore locale: ${localError.message}\nErrore fallback: ${fallbackError.message}`
      );
    }
  }
}

const { createCanvas, loadImage } = await loadModule('canvas', 'canvas/index.js');

let GoogleGenAI = null;
try {
  ({ GoogleGenAI } = await loadModule('@google/genai', '@google/genai/dist/node/index.mjs'));
} catch (error) {
  console.warn('Modulo @google/genai non disponibile. Uso solo fallback locali.');
}

const geminiApiKey = process.env.GEMINI_API_KEY;
const ai = geminiApiKey && GoogleGenAI ? new GoogleGenAI({ apiKey: geminiApiKey }) : null;
const promptVersion = 'bros-v4';

const brand = {
  name: 'BROS.',
  footer: 'BROS. | bros.skin',
  accent: '#00e396',
  dark: '#020617',
  darkSoft: '#0b1120',
  light: '#f8fafc',
  muted: '#cbd5e1',
};

const brosVisualDirection = [
  'BROS skincare brand campaign for young men in Italy.',
  'Visual identity must match the site: dark navy, off-white, electric mint green accents, clean clinical atmosphere, modern European bathroom or lab, matte textures.',
  'Masculine, direct, minimal, premium but not luxury perfume, gen-z friendly, dermatology-backed, no purple cyberpunk, no pink, no female beauty aesthetic, no warm orange gym aesthetic.',
  'No text, no captions, no typography, no logos inside the generated image.',
  'Leave clear negative space in the upper-left and center-left area for headline overlay.',
  'Vertical 4:5 composition for Instagram carousel, high contrast, photorealistic editorial ad.',
].join(' ');

const carouselContent = [
  {
    text: 'Bro, se ti lavi la faccia col bagnoschiuma, stai sabotando la pelle.',
    useLocalImage: true,
    imagePrompt:
      `${brosVisualDirection} Teenage Italian boy, around 16 to 18 years old, in a modern bathroom, staring at his reflection with a skeptical frustrated expression, holding a generic body wash near his face, skin slightly stressed, cinematic skincare campaign, clean blue daylight, realistic.`,
    fallbackImage: 'public/ragazzo_bagno_giovane.png',
    badge: 'IL PROBLEMA',
  },
  {
    text: 'Acqua da sola non basta. La crema rubata in bagno nemmeno.',
    imagePrompt:
      `${brosVisualDirection} Split-scene concept with a teenage boy, around 16 to 18 years old: on one side splashing only water on his face, on the other side using a glossy unsuitable cream, skin looking shiny and irritated, premium skincare campaign, realistic detail, neutral bathroom setting.`,
    fallbackImage: 'public/ragazzo_crema.png',
    badge: 'ZERO SBATTI, ZERO FUFFA',
  },
  {
    text: 'BROS ti mette in ordine la faccia in 2 minuti. Fine.',
    imagePrompt:
      `${brosVisualDirection} Teenage boy, around 16 to 18 years old, in a clean modern bathroom with visibly fresher skin and a more confident expression, subtle BROS brand campaign feeling, mint green and dark navy palette, realistic lifestyle skincare ad, strong negative space on left.`,
    fallbackImage: 'public/hero_light.png',
    badge: 'LA SOLUZIONE',
  },
  {
    text: 'BROS pulisce grasso, sporco e smog senza seccarti la faccia.',
    imagePrompt:
      `${brosVisualDirection} Teenage boy, around 16 to 18 years old, after washing his face in a modern bathroom, skin looking clean and fresh but natural, subtle cues of oil and city grime removed, no product visible, premium skincare campaign, realistic.`,
    fallbackImage: 'public/reset.jpeg',
    badge: 'COSA FA BROS',
  },
  {
    text: 'BROS idrata, calma i rossori e non ti lascia lucido.',
    imagePrompt:
      `${brosVisualDirection} Teenage boy, around 16 to 18 years old, close-up portrait with calm hydrated skin, reduced redness, matte natural finish, no product visible, premium dermatology-backed skincare campaign, soft mint rim light, realistic.`,
    fallbackImage: 'public/scudo.jpeg',
    badge: 'PERCHE FUNZIONA',
  },
  {
    text: 'Formulato con dermatologi. Clean. Pensato per pelli giovani e sensibili.',
    imagePrompt:
      `${brosVisualDirection} European skincare lab scene with dermatology team and teenage male skincare research context, clean glass, stainless steel, scientific credibility, subtle human warmth, modern brand campaign, realistic.`,
    fallbackImage: 'public/chimici_europei.png',
    badge: 'SCIENZA VERA',
  },
  {
    text: "Il drop e vicino. Entra nella lista d'attesa e ottieni il prezzo di lancio.",
    imagePrompt:
      `${brosVisualDirection} Close-up smartphone on a bathroom sink with a subtle list-signup style launch notification glow, teenage male skincare launch feeling, dark navy and mint palette, sharp campaign composition, realistic.`,
    fallbackImage: 'public/guy.png',
    badge: 'CTA',
  },
];

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function resolveRepoPath(relativePath) {
  return path.join(repoRoot, relativePath);
}

async function getBackgroundFromGemini(slide, index, bgDir) {
  if (slide.useLocalImage) {
    console.log(`[Slide ${index + 1}] Uso immagine locale del sito.`);
    return resolveRepoPath(slide.fallbackImage);
  }

  const cachePrefix = `${promptVersion}-bg-${index}`;
  const cachedPath = findCachedImage(bgDir, cachePrefix);

  if (cachedPath) {
    console.log(`[Slide ${index + 1}] Sfondo in cache trovato.`);
    return cachedPath;
  }

  if (!ai) {
    console.log(`[Slide ${index + 1}] Nessuna GEMINI_API_KEY o SDK non disponibile. Uso fallback locale.`);
    return resolveRepoPath(slide.fallbackImage);
  }

  console.log(`[Slide ${index + 1}] Generazione sfondo Gemini: "${slide.imagePrompt}"`);

  try {
    const response = await ai.models.generateContentStream({
      model: 'gemini-3-pro-image-preview',
      contents: [
        {
          role: 'user',
          parts: [{ text: slide.imagePrompt }],
        },
      ],
      config: {
        imageConfig: {
          aspectRatio: '4:5',
          imageSize: '1K',
        },
        responseModalities: ['IMAGE', 'TEXT'],
      },
    });

    for await (const chunk of response) {
      const parts = chunk.candidates?.[0]?.content?.parts ?? [];
      const imagePart = parts.find((part) => part.inlineData?.data);

      if (!imagePart?.inlineData?.data) {
        if (chunk.text) {
          console.log(`[Slide ${index + 1}] Gemini: ${chunk.text}`);
        }
        continue;
      }

      const extension = getExtensionFromMimeType(imagePart.inlineData.mimeType);
      const bgPath = path.join(bgDir, `${cachePrefix}.${extension}`);
      fs.writeFileSync(bgPath, Buffer.from(imagePart.inlineData.data, 'base64'));
      console.log(`[Slide ${index + 1}] Sfondo salvato in ${bgPath}`);
      return bgPath;
    }

    throw new Error('Risposta immagine vuota.');
  } catch (error) {
    console.warn(`[Slide ${index + 1}] Gemini non ha generato lo sfondo: ${error.message}`);
    return resolveRepoPath(slide.fallbackImage);
  }
}

async function drawCoverImage(ctx, imagePath, width, height) {
  const image = await loadImage(imagePath);
  const scale = Math.max(width / image.width, height / image.height);
  const scaledWidth = image.width * scale;
  const scaledHeight = image.height * scale;
  const x = (width - scaledWidth) / 2;
  const y = (height - scaledHeight) / 2;
  ctx.drawImage(image, x, y, scaledWidth, scaledHeight);
}

function applyOverlay(ctx, width, height) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.64)';
  ctx.fillRect(0, 0, width, height);
}

function drawFooter(ctx, slideNumber, totalSlides, width, height) {
  ctx.font = '30px sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.82)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${brand.name}  •  ${slideNumber}/${totalSlides}`, width / 2, height - 120);

  ctx.textAlign = 'right';
  ctx.fillText('Scorri  ->', width - 90, height - 120);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const lines = getWrappedLines(ctx, text, maxWidth);
  const blockHeight = (lines.length - 1) * lineHeight;
  const startY = y - blockHeight / 2;

  lines.forEach((currentLine, index) => {
    ctx.fillText(currentLine, x, startY + index * lineHeight);
  });

  return lines;
}

function getWrappedLines(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let line = '';

  for (const word of words) {
    const candidate = `${line}${word} `;
    if (ctx.measureText(candidate).width > maxWidth && line) {
      lines.push(line.trim());
      line = `${word} `;
    } else {
      line = candidate;
    }
  }

  if (line) {
    lines.push(line.trim());
  }

  return lines;
}

function findCachedImage(bgDir, cachePrefix) {
  const extensions = ['png', 'jpg', 'jpeg', 'webp'];
  for (const extension of extensions) {
    const candidate = path.join(bgDir, `${cachePrefix}.${extension}`);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

function getExtensionFromMimeType(mimeType) {
  const mapping = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/webp': 'webp',
  };
  return mapping[mimeType] ?? 'png';
}

async function generateSlides() {
  const width = 1080;
  const height = 1350;
  const outputDir = resolveRepoPath('output/carousel');
  const bgDir = path.join(outputDir, 'bgs');

  ensureDir(outputDir);
  ensureDir(bgDir);

  console.log('Generazione carosello BROS in corso...');

  const totalSlides = carouselContent.length + 1;

  for (let index = 0; index < carouselContent.length; index += 1) {
    const slide = carouselContent[index];
    const backgroundPath = await getBackgroundFromGemini(slide, index, bgDir);
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    try {
      await drawCoverImage(ctx, backgroundPath, width, height);
    } catch (error) {
      console.warn(`[Slide ${index + 1}] Impossibile caricare lo sfondo ${backgroundPath}: ${error.message}`);
      ctx.fillStyle = brand.dark;
      ctx.fillRect(0, 0, width, height);
    }

    applyOverlay(ctx, width, height);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 80px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    wrapText(ctx, slide.text, width / 2, height / 2 - 50, width - 160, 100);

    drawFooter(ctx, index + 1, totalSlides, width, height);

    const outPath = path.join(outputDir, `slide-${index + 1}.png`);
    fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
    console.log(`[Slide ${index + 1}] Salvata in ${outPath}`);
  }

  await generateFinalSlide(width, height, totalSlides, outputDir);
  console.log('Carosello completato.');
}

async function generateFinalSlide(width, height, totalSlides, outputDir) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#0b1120');
  gradient.addColorStop(1, '#00e396');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = 'bold 120px sans-serif';
  ctx.fillText('BROS.', width / 2, height / 2 - 40);

  ctx.font = 'bold 40px sans-serif';
  ctx.fillStyle = '#d1fae5';
  ctx.fillText('Il kit viso essenziale per ragazzi', width / 2, height / 2 + 60);

  ctx.font = 'bold 60px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText("ENTRA ORA IN LISTA D'ATTESA", width / 2, height / 2 + 260);

  ctx.font = '35px sans-serif';
  ctx.fillStyle = '#ecfeff';
  ctx.fillText('Prezzo di lancio riservato ai primi iscritti.', width / 2, height / 2 + 330);

  ctx.font = '30px sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.82)';
  ctx.fillText(`${brand.name}  •  ${totalSlides}/${totalSlides}`, width / 2, height - 120);

  const outPath = path.join(outputDir, `slide-${totalSlides}.png`);
  fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
  console.log(`[Slide ${totalSlides}] Salvata in ${outPath}`);
}

generateSlides().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
