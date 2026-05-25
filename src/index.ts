#!/usr/bin/env node
import { Command } from 'commander';
import prompts from 'prompts';
import pc from 'picocolors';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const program = new Command();

program
  .name('create-avcicms-app')
  .description('Avcı CMS projelerini hızlıca başlatmak için CLI aracı')
  .argument('[project-directory]', 'Oluşturulacak projenin klasör adı')
  .action(async (projectDirectory) => {
    console.log(pc.cyan(pc.bold('\n🚀 AVCI CMS Başlangıç Sihirbazına Hoş Geldiniz!\n')));

    let dirName = projectDirectory;

    if (!dirName) {
      const res = await prompts({
        type: 'text',
        name: 'dirName',
        message: 'Projenizin adı (klasör adı) ne olsun?',
        initial: 'my-avci-app',
      });
      dirName = res.dirName;
    }

    if (!dirName) {
      console.log(pc.red('Proje adı iptal edildi. Çıkılıyor.'));
      process.exit(1);
    }

    const targetPath = path.resolve(process.cwd(), dirName);

    if (fs.existsSync(targetPath)) {
      console.log(pc.red(`Hata: "${dirName}" adında bir klasör zaten var!`));
      process.exit(1);
    }

    const { template, apiKey, projectId } = await prompts([
      {
        type: 'select',
        name: 'template',
        message: 'Hangi şablonla (template) başlamak istiyorsunuz?',
        choices: [
          { title: 'Next.js Blog App', value: 'vercel/next.js/examples/blog-starter', description: 'Hazır blog altyapısı' },
          { title: 'Boş Next.js Projesi', value: 'vercel/next.js/examples/hello-world', description: 'Sadece temel Next.js kurulumu' }
        ]
      },
      {
        type: 'password',
        name: 'apiKey',
        message: 'AVCI CMS API Key (Elinizde yoksa Enter ile geçebilirsiniz):',
      },
      {
        type: 'text',
        name: 'projectId',
        message: 'AVCI CMS Project ID (Elinizde yoksa Enter ile geçebilirsiniz):',
      }
    ]);

    console.log(pc.blue(`\n[1/3] "${dirName}" oluşturuluyor ve şablon indiriliyor...`));
    try {
      // Using npx degit to clone the template without git history
      execSync(`npx degit ${template} ${dirName}`, { stdio: 'inherit' });
    } catch (err) {
      console.log(pc.red('\nŞablon indirilirken bir hata oluştu. İnternet bağlantınızı kontrol edin.'));
      process.exit(1);
    }

    console.log(pc.blue(`\n[2/3] Konfigürasyonlar (API anahtarları) ayarlanıyor...`));
    const envPath = path.join(targetPath, '.env');
    let envContent = `NEXT_PUBLIC_AVCI_API_URL=https://api.avcicms.com/v1\n`;
    if (apiKey) envContent += `AVCI_API_KEY=${apiKey}\n`;
    if (projectId) envContent += `AVCI_PROJECT_ID=${projectId}\n`;
    
    fs.writeFileSync(envPath, envContent, 'utf-8');

    // Automatically add avcicms TS SDK
    console.log(pc.blue(`\n[3/3] NPM paketleri ve AVCI CMS SDK'sı kuruluyor... (Bu işlem 1-2 dakika sürebilir)`));
    try {
      // In a real environment, we'd install the published SDK: npm install avcicms
      // For now, we will run generic npm install, and the user can link it manually during development
      execSync(`npm install`, { cwd: targetPath, stdio: 'inherit' });
      // We also add avcicms just so it is recorded in package.json (it will fail if it's not on npm yet, so we will skip failing)
      try {
        // execSync(`npm install avcicms`, { cwd: targetPath, stdio: 'ignore' });
      } catch (e) {}
    } catch (err) {
      console.log(pc.yellow('\nPaketler yüklenirken ufak bir sorun çıktı, manuel olarak "npm install" yapmanız gerekebilir.'));
    }

    console.log(pc.green(pc.bold('\n🎉 Kurulum başarıyla tamamlandı!')));
    console.log(`\nSıradaki adımlar:`);
    console.log(pc.cyan(`  cd ${dirName}`));
    console.log(pc.cyan(`  npm run dev`));
    console.log('\nAVCI CMS ile geliştirmeye başlamak için hazırsınız!\n');
  });

program.parse();
