export interface OutputProperty {
  name: string;
  type: string;
  options: Record<string, any>;
}

export interface Output {
  name: string;
  documentName: string | undefined;
  schemaName: string | undefined;
  properties: OutputProperty[];
}
