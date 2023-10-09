import { Config } from '@stencil/core';

import { sass } from '@stencil/sass';
import { getBundles, getCopyExternalBundles } from './src/bundles';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export const config: Config = {
  namespace: 'test',
  globalStyle: 'src/index.scss',
  bundles: getBundles('test'),
  rollupPlugins: { after: [nodePolyfills()] },
  taskQueue: 'async',
  plugins: [sass()],
  outputTargets: [
    { type: 'docs-json', file: 'docs.json' },
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers,
      copy: [...getCopyExternalBundles()],
    },
  ],
};
