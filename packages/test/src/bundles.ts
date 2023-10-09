import { ConfigBundle } from '@stencil/core/internal';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

function readDocsJson(namespace: string): Record<string, any> | null {
  const docsJsonPath = join(__dirname, '..', '..', '..', 'dist', 'packages', namespace, 'docs.json');

  if (!existsSync(docsJsonPath)) {
    return null;
  }

  return JSON.parse(readFileSync(docsJsonPath, { encoding: 'utf-8' }));
}

export function getBundles(namespace: string): ConfigBundle[] | undefined {
  const docsJson = readDocsJson(namespace);

  if (!docsJson) {
    return undefined;
  }

  const components: ConfigBundle[] = [{ components: docsJson.components.map((c: { tag: string }) => c.tag) }];

  return [...components];
}

function readSydleUiJson() {
  const sydleUiJsonPath = join(__dirname, '..', 'sydle-ui.json');

  if (!existsSync(sydleUiJsonPath)) {
    return null;
  }

  return JSON.parse(readFileSync(sydleUiJsonPath, { encoding: 'utf-8' }));
}

function removeLibScope(lib: string) {
  return lib.replace(/^@.+\//, '');
}

export function getCopyExternalBundles(): { src: string; dest: string }[] {
  const sydleUiConfig = readSydleUiJson();

  const externalStencilLibs: string[] = sydleUiConfig['external-stencil-libs'] || [];

  return externalStencilLibs.map((lib) => {
    const libName = removeLibScope(lib);
    return {
      src: `../../../node_modules/${lib}/dist/${libName}/`,
      dest: `lib/${libName}/`,
    };
  });
}
