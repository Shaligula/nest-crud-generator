import {
  Project,
  ObjectLiteralExpression,
  PropertyAssignment,
  Decorator,
  PropertyDeclaration,
  SourceFile,
  TypeAliasDeclaration,
} from 'ts-morph';
import { Output, OutputProperty } from './output.interface';

export class MongooseParser {
  public static parseFile(filePath: string): Output | undefined {
    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(filePath);
    const classes = sourceFile.getClasses();

    for (const currentClass of classes) {
      const isSchema = currentClass.getDecorator('Schema');
      const name = currentClass.getName();
      if (isSchema && name) {
        const properties = currentClass.getProperties();
        const schemaInfo: Output = {
          name: name,
          documentName: undefined,
          schemaName: undefined,
          properties: [],
        };

        for (const property of properties) {
          const propertyDecorator = property.getDecorator('Prop');
          if (propertyDecorator) {
            const propertyInfo = this.parseProperties(property, propertyDecorator);
            schemaInfo.properties.push(propertyInfo);
          }
        }

        const documentName = this.checkExportDocumentExist(sourceFile, name);
        const schemaName = this.checkExportSchemaExist(sourceFile, name);

        return {
          ...schemaInfo,
          documentName,
          schemaName,
        };
      }
    }

    return undefined;
  }

  private static parseProperties(
    property: PropertyDeclaration,
    propertyDecorator: Decorator
  ): OutputProperty {
    const name = property.getName();
    const type = property.getType().getText();

    const propertyInfo = {
      name: name,
      type: type,
      options: {} as Record<string, any>,
    };

    const propertyArguments = propertyDecorator.getArguments();
    if (propertyArguments.length > 0) {
      const firstArgument = propertyArguments[0];

      if (firstArgument instanceof ObjectLiteralExpression) {
        for (const propertyAssignment of firstArgument.getProperties()) {
          if (propertyAssignment instanceof PropertyAssignment) {
            const key = propertyAssignment.getName();
            const value = propertyAssignment.getInitializer()?.getText();
            if (key && value) {
              propertyInfo.options[key] = value;
            }
          }
        }
      }
    }

    return propertyInfo;
  }

  private static checkExportDocumentExist(
    sourceFile: SourceFile,
    className: string
  ): string | undefined {
    const typeAliases = sourceFile.getTypeAliases();
    for (const typeAlias of typeAliases) {
      if (typeAlias instanceof TypeAliasDeclaration) {
        const typeText = typeAlias.getType().getText();
        const pattern = new RegExp(`HydratedDocument<.*${className}.*>`);
        if (pattern.test(typeText)) {
          return typeAlias.getName();
        }
      }
    }
    return undefined;
  }

  private static checkExportSchemaExist(
    sourceFile: SourceFile,
    className: string
  ): string | undefined {
    const variableStatements = sourceFile.getVariableStatements();

    for (const statement of variableStatements) {
      const declarations = statement.getDeclarations();

      for (const variable of declarations) {
        const initializer = variable.getInitializer();

        if (
          initializer &&
          initializer.getText().includes(`SchemaFactory.createForClass(${className})`)
        ) {
          return variable.getName();
        }
      }
    }

    return undefined;
  }
}
