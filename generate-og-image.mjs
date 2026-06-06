import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const WIDTH  = 1200;
const HEIGHT = 630;

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Gradiente oscuro de izquierda a derecha (área de texto) -->
    <linearGradient id="leftDark" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#000000" stop-opacity="0.92"/>
      <stop offset="52%"  stop-color="#000000" stop-opacity="0.65"/>
      <stop offset="75%"  stop-color="#000000" stop-opacity="0.0"/>
    </linearGradient>
    <!-- Gradiente oscuro en la parte inferior -->
    <linearGradient id="bottomDark" x1="0" y1="0" x2="0" y2="1">
      <stop offset="60%"  stop-color="#000000" stop-opacity="0.0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.75"/>
    </linearGradient>
  </defs>

  <!-- Capa oscura izquierda -->
  <rect x="0" y="0" width="${WIDTH}" height="${HEIGHT}" fill="url(#leftDark)"/>
  <!-- Capa oscura inferior -->
  <rect x="0" y="0" width="${WIDTH}" height="${HEIGHT}" fill="url(#bottomDark)"/>

  <!-- Barra de acento naranja vertical -->
  <rect x="68" y="148" width="5" height="170" fill="#FF6B35" rx="3"/>

  <!-- Nombre del restaurante -->
  <text
    x="92" y="228"
    font-family="Arial Black, Impact, sans-serif"
    font-weight="900"
    font-size="78"
    fill="#FFFFFF"
    letter-spacing="-2">Doña Nella</text>

  <!-- Subtítulo naranja -->
  <text
    x="92" y="278"
    font-family="Arial, Helvetica, sans-serif"
    font-weight="700"
    font-size="26"
    fill="#FF6B35"
    letter-spacing="0.5">Delivery · Hamburguesas · Broasters</text>

  <!-- Línea separadora fina -->
  <rect x="92" y="298" width="390" height="2" fill="#FF6B35" opacity="0.45" rx="1"/>

  <!-- Descripción corta -->
  <text
    x="92" y="335"
    font-family="Arial, Helvetica, sans-serif"
    font-weight="400"
    font-size="21"
    fill="rgba(255,255,255,0.88)">Salchipapas, platos especiales y bebidas</text>

  <!-- Badge "Pago contra entrega" -->
  <rect x="92" y="360" width="244" height="36" fill="#FF6B35" rx="18"/>
  <text
    x="214" y="384"
    font-family="Arial, Helvetica, sans-serif"
    font-weight="700"
    font-size="16"
    fill="#FFFFFF"
    text-anchor="middle">Pago contra entrega</text>

  <!-- Badge "Lima, Perú" -->
  <rect x="348" y="360" width="136" height="36" fill="rgba(255,255,255,0.12)" rx="18"/>
  <text
    x="416" y="384"
    font-family="Arial, Helvetica, sans-serif"
    font-weight="600"
    font-size="16"
    fill="rgba(255,255,255,0.90)"
    text-anchor="middle">Lima, Peru</text>

  <!-- Texto inferior centrado -->
  <text
    x="${WIDTH / 2}" y="${HEIGHT - 32}"
    font-family="Arial, Helvetica, sans-serif"
    font-weight="400"
    font-size="18"
    fill="rgba(255,255,255,0.55)"
    text-anchor="middle">Lun–Dom 11:00–22:00  ·  restaurantedelivery.netlify.app</text>
</svg>
`;

const inputPath  = path.join(__dirname, 'public/images/hamburguesa-7.jpg');
const outputPath = path.join(__dirname, 'public/images/og-image.jpg');

console.log('Generando imagen OG...');

await sharp(inputPath)
  .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'center' })
  .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile(outputPath);

console.log(`Imagen generada: public/images/og-image.jpg  (${WIDTH}x${HEIGHT}px)`);
