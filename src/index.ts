#!/usr/bin/env node
import { Command } from 'commander';
import prompts from 'prompts';
import pc from 'picocolors';

const program = new Command();

program
  .name('create-avcicms-app')
  .description('Scaffold an AVCI CMS powered application')
  .version('1.0.0');

program.action(async () => {
  console.log(pc.cyan(pc.bold('\n🚀 Welcome to AVCI CMS CLI!\n')));

  const response = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: 'What is your project named?',
      initial: 'my-avcicms-app'
    },
    {
      type: 'select',
      name: 'template',
      message: 'Select a template',
      choices: [
        { title: 'Next.js Blog (App Router)', value: 'nextjs-blog' },
        { title: 'React SPA', value: 'react-spa' },
        { title: 'Blank Project', value: 'blank' }
      ]
    }
  ]);

  if (!response.projectName) {
    console.log(pc.red('Operation cancelled.'));
    process.exit(1);
  }

  console.log(`\n${pc.green('✔')} Setting up ${pc.bold(response.projectName)} with the ${pc.bold(response.template)} template...\n`);
  console.log(pc.gray('(Template downloading and setup will be implemented in the next phase.)\n'));
});

program.parse();
