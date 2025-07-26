export class PackageUtil {
  public static getPackageVersion(): string {
    return require('../../../package.json').version;
  }
}
