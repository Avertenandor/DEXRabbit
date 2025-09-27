import { test, expect } from 'vitest';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { parse } from 'node-html-parser';

const CONTENT_DIR = 'src/content/faq';
const PUBLIC_DIR = 'public';

// Read all FAQ files
function getAllFaqContent() {
  const files = readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
  const content = [];

  for (const file of files) {
    const filePath = join(CONTENT_DIR, file);
    const text = readFileSync(filePath, 'utf8');
    content.push({ file, text });
  }

  return content;
}

test('FAQ should contain required economic terms', () => {
  const faqContent = getAllFaqContent();
  const allText = faqContent.map(c => c.text).join(' ');

  // Required terms
  expect(allText).toMatch(/USDT-вход|вход.*USDT/i);
  expect(allText).toMatch(/ежедневные.*PLEX.*бонусы|PLEX.*ежедневные.*бонусы/i);
  expect(allText).toMatch(/USDT-выплата|выплата.*USDT/i);
  expect(allText).toMatch(/форс-мажор.*возврат.*PLEX|возврат.*форс-мажор.*PLEX/i);
});

test('FAQ should not contain forbidden economic phrases', () => {
  const faqContent = getAllFaqContent();
  const allText = faqContent.map(c => c.text).join(' ');

  // Forbidden phrases
  expect(allText).not.toMatch(/прибыль.*PLEX/i);
  expect(allText).not.toMatch(/только.*PLEX/i);
  expect(allText).not.toMatch(/выплата.*только.*PLEX/i);
});

test('FAQ questions should be unique', () => {
  const faqContent = getAllFaqContent();
  const questions = [];

  for (const content of faqContent) {
    const lines = content.text.split('\n');
    for (const line of lines) {
      const match = line.match(/question:\s*"(.+)"/);
      if (match) {
        questions.push(match[1].toLowerCase().trim());
      }
    }
  }

  const uniqueQuestions = new Set(questions);
  expect(uniqueQuestions.size).toBe(questions.length);
});
