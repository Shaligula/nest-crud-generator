import { AbstractAction } from '.';
import { Input } from '../commands';
import { ConsoleUtil, PathUtil } from '../lib/utils';
import { LOGO } from '../lib/ui';
import { MongooseParser } from '../lib/parsers';
import { DtoGenerator, ModuleGenerator } from '../lib/generators';

export class GenerateAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]) {
    this.generateFiles([...inputs, ...options]);
  }

  private async generateFiles(inputs: Input[]) {
    ConsoleUtil.whiteLog(LOGO);

    const pathInput = inputs.find((input) => input.name === 'path');
    if (!pathInput || !pathInput.value) {
      ConsoleUtil.redLog('Path is required');
      return;
    }
    const pathInputExist = await PathUtil.checkExists(pathInput.value.toString());
    if (!pathInputExist) {
      ConsoleUtil.redLog(`Path ${pathInput.value} does not exists`);
      return;
    }

    const forceInput = inputs.find((input) => input.name === 'force');
    const forceEnabled = !!forceInput?.value;

    const schemaInfo = await MongooseParser.parseFile(pathInput.value.toString());
    if (!schemaInfo) {
      ConsoleUtil.redLog('Invalid schema');
      return;
    }

    if (!schemaInfo.documentName) {
      return;
    }
    if (!schemaInfo.schemaName) {
      return;
    }

    const swaggerInput = inputs.find((input) => input.name === 'swagger');
    const swaggerEnabled = !!swaggerInput?.value;

    const outputInput = inputs.find((input) => input.name === 'output');
    const outputValue = outputInput
      ? outputInput.value === false
        ? false
        : outputInput.value.toString()
      : false;
    if (outputValue) {
      const pathExists = await PathUtil.checkExists(outputValue);
      if (!pathExists) {
        ConsoleUtil.redLog(`Path ${outputValue} does not exists`);
        return;
      }
    }

    const outputPath = await PathUtil.createOutputPath(outputValue, schemaInfo.name);

    try {
      await DtoGenerator.generate({
        name: schemaInfo.name,
        documentName: schemaInfo.documentName,
        schemaName: schemaInfo.schemaName,
        properties: schemaInfo.properties,
        outputPath: outputPath,
        withSwagger: swaggerEnabled,
        inputPath: pathInput.value.toString(),
        forceOverwrite: forceEnabled,
      });
  
      await ModuleGenerator.generate({
        name: schemaInfo.name,
        documentName: schemaInfo.documentName,
        schemaName: schemaInfo.schemaName,
        properties: schemaInfo.properties,
        outputPath: outputPath,
        withSwagger: swaggerEnabled,
        inputPath: pathInput.value.toString(),
        forceOverwrite: forceEnabled,
      });
    }
    catch(error) {
      ConsoleUtil.redLog(error);
    }
  }
}
