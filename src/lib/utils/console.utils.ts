import * as Readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

/* This class use ANSI codes to color console output */
export class ConsoleUtil {
  public static whiteLog(message: string): void {
    console.info(`\x1b[37m${message}\x1b[0m`);
  }

  public static redLog(message: string): void {
    console.info(`\x1b[31m${message}\x1b[0m`);
  }

  public static greenLog(message: string): void {
    console.info(`\x1b[32m${message}\x1b[0m`);
  }

  public static blueLog(message: string): void {
    console.info(`\x1b[34m${message}\x1b[0m`);
  }

  public static boldLog(message: string): void {
    console.info(`\x1b[1m${message}\x1b[0m`);
  }

  public static async ask(question: string): Promise<string> {
    const readline = Readline.createInterface({ input, output });
    try {
      return await readline.question(question);
    } finally {
      readline.close();
    }
  }
}
