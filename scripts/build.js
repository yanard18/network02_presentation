/**
 * Reveal.js Slide Builder Script
 * Automatically combines modular slide files listed in slides/slides.json into index.html.
 * Supports 2D slide layouts (array of file strings = vertical slide stack).
 */

const fs = require('fs');
const path = require('path');

const SLIDES_DIR = path.join(__dirname, '..', 'slides');
const MANIFEST_PATH = path.join(SLIDES_DIR, 'slides.json');
const INDEX_PATH = path.join(__dirname, '..', 'index.html');

console.log('📦 Compiling 2D modular slides into index.html...');

try {
  let slideEntries = [];

  if (fs.existsSync(MANIFEST_PATH)) {
    console.log('📋 Reading slide order and 2D topic groups from slides/slides.json...');
    const manifestContent = fs.readFileSync(MANIFEST_PATH, 'utf8');
    slideEntries = JSON.parse(manifestContent);
  } else {
    console.log('⚠️ Warning: slides/slides.json not found. Falling back to alphabetical order.');
    slideEntries = fs.readdirSync(SLIDES_DIR)
      .filter(file => file.endsWith('.html'))
      .sort();
  }

  console.log(`Loading ${slideEntries.length} top-level topic groups/slides...`);

  let combinedSlidesHTML = '';

  slideEntries.forEach((entry, index) => {
    if (Array.isArray(entry)) {
      // Group of vertical slides under a parent section
      combinedSlidesHTML += `\n\n      <!-- Vertical Topic Group #${index + 1} (${entry.length} slides) -->\n      <section>`;
      entry.forEach(file => {
        const filePath = path.join(SLIDES_DIR, file);
        if (!fs.existsSync(filePath)) {
          console.warn(`⚠️ Warning: Slide file "${file}" listed in slides.json does not exist! Skipping...`);
          return;
        }
        const content = fs.readFileSync(filePath, 'utf8').trim();
        combinedSlidesHTML += `\n\n        <!-- Loaded from slides/${file} -->\n${content}`;
      });
      combinedSlidesHTML += `\n      </section>`;
    } else {
      // Standalone horizontal slide
      const filePath = path.join(SLIDES_DIR, entry);
      if (!fs.existsSync(filePath)) {
        console.warn(`⚠️ Warning: Slide file "${entry}" listed in slides.json does not exist! Skipping...`);
        return;
      }
      const content = fs.readFileSync(filePath, 'utf8').trim();
      combinedSlidesHTML += `\n\n      <!-- Loaded from slides/${entry} -->\n${content}`;
    }
  });

  // Load base template or update index.html
  let indexHTML = fs.readFileSync(INDEX_PATH, 'utf8');

  // Replace content inside <div class="slides">...</div>
  const slidesRegex = /(<div class="slides">)([\s\S]*?)(<\/div>\s*<\/div>\s*<!-- Custom Navigation Overlay -->)/;

  if (slidesRegex.test(indexHTML)) {
    indexHTML = indexHTML.replace(slidesRegex, `$1${combinedSlidesHTML}\n    $3`);
    fs.writeFileSync(INDEX_PATH, indexHTML, 'utf8');
    console.log('✅ Successfully compiled index.html with 2D horizontal & vertical slides!');
  } else {
    console.error('❌ Error: Could not locate <div class="slides"> container in index.html');
  }

} catch (err) {
  console.error('❌ Error building slides:', err.message);
}
