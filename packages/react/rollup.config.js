import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';

export default [
  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: 'src/index.ts',
    external: ['react', 'rxjs', 'rxjs/operators'],
    plugins: [typescript()],
    output: [{file: pkg.main, format: 'cjs'}, {file: pkg.module, format: 'es'}],
  },
];
