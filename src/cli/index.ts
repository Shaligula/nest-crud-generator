#!/usr/bin/env node
import { program } from 'commander';
import { PackageUtil } from '../lib/utils';
import { CommandLoader } from '../commands';

const bootstrap = async () => {
  program
    .version(PackageUtil.getPackageVersion(), '-v, --version', 'Output the current version')
    .usage('<command> [options]')
    .helpOption('-h, --help', 'Output usage information');

  await CommandLoader.load(program);
  await program.parseAsync(process.argv);
  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
};

bootstrap();
