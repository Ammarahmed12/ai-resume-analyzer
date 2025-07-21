import { test, expect, devices } from '@playwright/test';
import type { Page } from '@playwright/test';

test.use({ ...devices['iPad (gen 7)'] });

// Mensagem de teste para simular contexto
const TEST_MESSAGE = 'Teste de upload de currículo';

async function screenshotWithScroll(page: Page, path: string) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(200);
  await page.screenshot({ path });
}

test.describe('Home E2E - Mobile', () => {
  test('fluxo básico da home no iPad', async ({ page }) => {
    // 1. Acessa a home (deve estar autenticado)
    await page.goto('/');
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: 'Log In' }).click();
    // 2. Agora segue o fluxo normal do teste
    await page.screenshot({ path: './test-results/01-home-ipad.png' });

    // 3. Verifica se o botão de upload aparece quando não há resumes
    if (await page.getByRole('navigation').getByRole('link', { name: 'Upload Resume' }).isVisible()) {
      await page.screenshot({ path: './test-results/02-upload-vazio-ipad.png' });
    }

    // 4. Se houver resumes, tira print da lista
    if (await page.locator('.resumes-section').isVisible()) {
      await page.screenshot({ path: './test-results/03-lista-resumes-ipad.png' });
    }

    // 5. Tenta navegar para a página de upload
    await page.getByRole('navigation').getByRole('link', { name: 'Upload Resume' }).click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: './test-results/04-upload-page-ipad.png' });

    // 6. Faz upload do PDF e faz scroll antes do print
    const fileInput = await page.locator('input[type="file"]');
    await fileInput.setInputFiles('tests/files/Profile.pdf');
    await page.waitForTimeout(500);
    await screenshotWithScroll(page, './test-results/05-upload-pdf-ipad.png');
  });
}); 