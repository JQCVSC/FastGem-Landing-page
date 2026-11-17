/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FASTGEM_RUNTIME_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
