# CRUD Generator CLI for NestJS & Mongoose

A CLI tool to automatically generate CRUD (Create, Read, Update, Delete) endpoints for Mongoose models in NestJS applications.

Supports:
✅ REST API generation
✅ Swagger/OpenAPI documentation (optional)
✅ Automatic DTOs with validation
✅ Pagination & Filtering

## Install

```bash
npm install -g @shaligula/nest-crud-generator
```

## Usage

```bash
npx nest-crud-generator ./src/models/book.model.ts
```

This will create:

- book.module.ts
- book.controller.ts
- book.service.ts
- book.mapper.ts
- /dto

## Options

| Option | Description | Default |
|--------|-------------|---------|
| -o, --output <dir> | Custom output directory | ./src/<modelName> |
| --no-swagger | Disable Swagger decorators (for dto may use mapped-types package) | false |
| -f, --force | Overwrite existing files | false |

*Example with options:*

```bash
npx nest-crud-generator ./src/models/book.model.ts -o ./src/books --no-swagger -f
```

## Example

[See example](https://github.com/Shaligula/nest-crud-generator/tree/master/example)
