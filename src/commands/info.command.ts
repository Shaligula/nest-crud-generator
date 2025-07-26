import { Command } from 'commander';
import { AbstractCommand } from './abstract.command';

export class InfoCommand extends AbstractCommand {
  public load(program: Command) {
    program
      .command('info')
      .alias('i')
      .description('Display details')
      .action(async () => {
        await this.action.handle();
      });
  }
}
