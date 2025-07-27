import { Input } from './input.interface';
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as path from 'path';
import { ConsoleUtil, PathUtil } from '../utils';
import { DTOTemplates } from '../templates/dto';

export class DtoGenerator {
  static async generate(input: Input) {
    const templatesDirectory = path.join(__dirname, '..', 'templates', 'dto');

    ConsoleUtil.whiteLog('\nStart generating DTOs...\n');
    const dtoDirectory = path.join(input.outputPath, 'dto');
    await PathUtil.checkExistAndMakeDirectory(dtoDirectory);
    for (const template of DTOTemplates) {
      const dtoFileName = await this.generateFromTemplate(
        input,
        templatesDirectory,
        template.template,
        dtoDirectory,
        template.name
      );
      ConsoleUtil.greenLog(`${template.successMessage}: ${dtoFileName}`);
    }
  }

  private static async generateFromTemplate(
    input: Input,
    templatesDirectory: string,
    templateFileName: string,
    outputPath: string,
    outputFileName: string
  ): Promise<string> {
    const templateFilePath = path.join(templatesDirectory, templateFileName);
    const template = fs.readFileSync(templateFilePath, 'utf-8');

    const content = ejs.render(
      template,
      {
        name: input.name,
        properties: input.properties,
        withSwagger: input.withSwagger,
      },
      {
        views: [templatesDirectory],
        root: templatesDirectory,
      }
    );

    const fileName = `${outputFileName}-${input.name.toLowerCase()}.dto.ts`;
    const filePath = path.join(outputPath, fileName);
    if(!input.forceOverwrite) {
      const fileIsExist = await PathUtil.checkExists(filePath);
      if(fileIsExist) {
        throw new Error(`File ${filePath} already exists!\n\nUse --force to overwrite it.\n\nOr use --output <output path> to specify another path.`);
      }
    }
    fs.writeFileSync(filePath, content);
    return fileName;
  }
}
