import { Command } from 'commander';
import { InfoCommand } from './info.command';
import { GenerateAction, InfoAction } from '../actions';
import { ConsoleUtil } from '../lib/utils';
import { GenerateCommand } from './generate.command';

export class CommandLoader {
  public static async load(program: Command): Promise<void> {
    new InfoCommand(new InfoAction()).load(program);
    await new GenerateCommand(new GenerateAction()).load(program);
    this.handleInvalidCommand(program);
  }

  public static handleInvalidCommand(program: Command): void {
    program.on('command:*', () => {
      ConsoleUtil.redLog(`\n Invalid command: ${program.args.join(' ')}\n`);
      ConsoleUtil.whiteLog('See --help for a list of available commands.\n');
      process.exit(1);
    });
  }
}
