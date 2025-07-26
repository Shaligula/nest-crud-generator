import { access, mkdir, constants, readdir } from 'fs/promises';
import path from 'path';

export class PathUtil {
  public static async createOutputPath(
    outputPath: string | false,
    modelName: string
  ): Promise<string> {
    if (outputPath) {
      await this.checkExistAndMakeDirectory(outputPath);
      return outputPath;
    }

    const defaultOutputPath = path.resolve(process.cwd(), 'src');
    await this.checkExistAndMakeDirectory(defaultOutputPath);

    const outputPathWithModelName = path.resolve(defaultOutputPath, modelName.toLowerCase());
    await this.checkExistAndMakeDirectory(outputPathWithModelName);

    return outputPathWithModelName;
  }

  public static async checkExistAndMakeDirectory(path: string): Promise<void> {
    try {
      await access(path);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await mkdir(path);
      } else throw error;
    }
  }

  public static async checkExists(path: string): Promise<boolean> {
    try {
      await access(path, constants.F_OK);
      return true;
    } catch {
      return false;
    }
  }

  public static async checkIsEmpty(path: string): Promise<boolean> {
    try {
      const files = await readdir(path);
      return files.length === 0;
    } catch (error) {
      if (error.code === 'ENOENT') {
        return true;
      }
      throw error;
    }
  }
}
