import path from "node:path";
import { fileURLToPath } from "node:url";

const configDir = path.dirname(fileURLToPath(import.meta.url));
// .storybook is at apps/storybook/.storybook -> repo root is three levels up
const repoRoot = path.resolve(configDir, "../../..");

const config = {
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  stories: [
    // UI package stories
    path.join(repoRoot, "packages/ui/src/**/*.stories.@(ts|tsx|mdx)"),
    // Optional: keep a local stories folder for quick sanity checks
    path.join(repoRoot, "apps/storybook/stories/**/*.stories.@(ts|tsx|mdx)"),
  ],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],

  docs: { autodocs: "tag" },

  viteFinal: async (viteConfig: any) => {
    viteConfig.resolve = viteConfig.resolve ?? {};
    viteConfig.resolve.alias = {
      ...(viteConfig.resolve.alias ?? {}),
      "@org/ui": path.join(repoRoot, "packages/ui/src"),
      "@org/tokens": path.join(repoRoot, "packages/tokens/src"),
    };

    // Critical for monorepos: allow Vite to serve files outside apps/storybook
    viteConfig.server = viteConfig.server ?? {};
    viteConfig.server.fs = viteConfig.server.fs ?? {};
    viteConfig.server.fs.allow = Array.from(
      new Set([...(viteConfig.server.fs.allow ?? []), repoRoot])
    );

    return viteConfig;
  },
};

export default config;
