import { ConsoleUtil, OSUtil, PackageUtil } from '../lib/utils';
import { AbstractAction } from './abstract.action';

export class InfoAction extends AbstractAction {
  public async handle() {
    await this.displaySystemInfo();
    await this.displayCliInfo();
  }

  private async displaySystemInfo(): Promise<void> {
    ConsoleUtil.boldLog('[System Information]\n');
    ConsoleUtil.boldLog('OS:');
    ConsoleUtil.whiteLog(`${OSUtil.osName()}\n`);
    ConsoleUtil.boldLog('NodeJS Version:');
    ConsoleUtil.whiteLog(`${process.version}\n`);
  }

  private async displayCliInfo(): Promise<void> {
    ConsoleUtil.boldLog('[CLI Information]\n');
    ConsoleUtil.boldLog('Version:');
    ConsoleUtil.blueLog(`${PackageUtil.getPackageVersion()}\n`);
  }
}
