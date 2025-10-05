import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import('jest').Config} */
export default {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  extensionsToTreatAsEsm: [".ts"], // treat TS as ESM
  globals: {
    "ts-jest": {
      tsconfig: {
        module: "nodenext", // supports import.meta & top-level await
        moduleResolution: "nodenext",
        target: "esnext",
      },
    },
  },
};
