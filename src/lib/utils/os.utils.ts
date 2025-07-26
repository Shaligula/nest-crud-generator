import { platform, release } from 'os';

export class OSUtil {
  public static osName(): string {
    const platformName = platform();
    const releaseName = release();

    switch (platformName) {
      case 'darwin':
        return Number(releaseName.split('.')[0]) > 15 ? 'macOS' : 'OS X';
      case 'linux':
        return 'Linux';
      case 'win32':
        return 'Windows';
      default:
        return platformName;
    }
  }
}
