import { OutputProperty } from '../parsers';

export interface Input {
  name: string;
  documentName: string;
  schemaName: string;
  outputPath: string;
  inputPath: string;
  withSwagger: boolean;
  properties: OutputProperty[];
  forceOverwrite: boolean;
}
