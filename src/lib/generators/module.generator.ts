import { Input } from './input.interface';
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as path from 'path';
import { ConsoleUtil } from '../utils';
import { ModuleTemplates } from '../templates/module';

export class ModuleGenerator {
  public static async generate(input: Input) {
    const templatesDirectory = path.join(__dirname, '..', 'templates', 'module');

    ConsoleUtil.whiteLog('\nStart generating Module...\n');
    const moduleDirectory = input.outputPath;

    for (const template of ModuleTemplates) {
      const moduleFileName = await this.generateFromTemplate(
        templatesDirectory,
        template.template,
        input,
        moduleDirectory,
        template.name
      );
      ConsoleUtil.greenLog(`${template.successMessage}: ${moduleFileName}`);
    }
  }

  private static async generateFromTemplate(
    templatesDirectory: string,
    templateFileName: string,
    input: Input,
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
        inputPath: input.inputPath,
        documentName: input.documentName,
        schemaName: input.schemaName,
      },
      {
        views: [templatesDirectory],
        root: templatesDirectory,
      }
    );

    const fileName = `${input.name.toLowerCase()}.${outputFileName}.ts`;
    const filePath = path.join(outputPath, fileName);
    fs.writeFileSync(filePath, content);
    return fileName;
  }
}
