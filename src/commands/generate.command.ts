import { Command } from 'commander';
import { AbstractCommand } from './abstract.command';
import { Input } from './command.input';

interface IGenerateOptions {
  output?: string;
  force?: boolean;
  swagger?: boolean;
}

export class GenerateCommand extends AbstractCommand {
  public async load(program: Command) {
    program
      .command('generate <path>')
      .allowUnknownOption()
      .description('Generate CRUD for Mongoose model')
      .option('-o, --output <output>', 'Path to output directory')
      .option('--no-swagger', 'Do not generate swagger', true)
      .option('-f, --force', 'Force overwrite', false)
      .action(async (path: string, command: Command & IGenerateOptions) => {
        const options: Input[] = [];
        options.push({ name: 'output', value: command.output || false });
        options.push({ name: 'force', value: command.force ?? false });
        options.push({ name: 'swagger', value: command.swagger ?? true });

        const inputs: Input[] = [];
        inputs.push({ name: 'path', value: path });

        await this.action.handle(inputs, options);
      });
  }
}
