#!/usr/bin/env node
import { Command } from "commander";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

type Options = {
  brand: string;
  template: string;
  dest: string;
  noInstall?: boolean;
};

const program = new Command();

program
  .name("create-app")
  .description(
    "Generate a new Next.js (Pages Router) app from the monorepo template."
  )
  .argument(
    "<appName>",
    "Folder name for the new app (also used as package name)"
  )
  .option("--brand <brand>", "Brand key (default|cozepto|edprinter)", "default")
  .option(
    "--template <path>",
    "Template path relative to repo root",
    "apps/seed-next-pages"
  )
  .option("--dest <path>", "Destination folder relative to repo root", "apps")
  .option("--no-install", "Do not run pnpm install after generating")
  .parse(process.argv);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function removeIfExists(p: string) {
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
}

function findRepoRoot(startDir: string): string {
  let dir = startDir;
  while (true) {
    const candidate = path.join(dir, "pnpm-workspace.yaml");
    if (fs.existsSync(candidate)) return dir;

    const parent = path.dirname(dir);
    if (parent === dir) {
      throw new Error(
        "Could not find repo root (pnpm-workspace.yaml not found)."
      );
    }
    dir = parent;
  }
}

function ensureDirDoesNotExist(targetPath: string) {
  if (fs.existsSync(targetPath)) {
    throw new Error(`Target already exists: ${targetPath}`);
  }
}

function copyDir(src: string, dst: string) {
  fs.cpSync(src, dst, { recursive: true, errorOnExist: true });
}

function readJson(filePath: string): any {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath: string, value: any) {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + "\n", "utf8");
}

function setBrandFile(appPath: string, brand: string) {
  const brandFile = path.join(appPath, "src", "theme", "brand.ts");
  if (!fs.existsSync(brandFile)) {
    throw new Error(
      `Expected brand file not found: ${brandFile}\n` +
        `Ensure your template includes src/theme/brand.ts`
    );
  }
  const content = `const brand = "${brand}";\nexport default brand;\n`;
  fs.writeFileSync(brandFile, content, "utf8");
}

function updateAppPackageJson(appPath: string, appName: string) {
  const pkgPath = path.join(appPath, "package.json");
  const pkg = readJson(pkgPath);

  // Keep it simple: package name equals folder name
  pkg.name = appName;
  pkg.private = true;

  pkg.scripts = pkg.scripts ?? {};
  pkg.scripts.dev = `next dev -p 30${Math.floor(Math.random() * 90 + 10)}`; // e.g. 3012

  pkg.dependencies = pkg.dependencies ?? {};
  pkg.dependencies["@org/ui"] = "workspace:*";

  // Optional: ensure app has required emotion deps if your template didn’t include them
  // (If template already includes, pnpm will keep versions)
  pkg.dependencies["@emotion/react"] =
    pkg.dependencies["@emotion/react"] ?? "^11.11.0";
  pkg.dependencies["@emotion/styled"] =
    pkg.dependencies["@emotion/styled"] ?? "^11.11.0";
  pkg.dependencies["@emotion/server"] =
    pkg.dependencies["@emotion/server"] ?? "^11.11.0";
  pkg.dependencies["@emotion/cache"] =
    pkg.dependencies["@emotion/cache"] ?? "^11.11.0";

  pkg.dependencies["@mui/material"] =
    pkg.dependencies["@mui/material"] ?? "^6.0.0";
  pkg.dependencies["@mui/system"] = pkg.dependencies["@mui/system"] ?? "^6.0.0";
  pkg.dependencies["@mui/icons-material"] =
    pkg.dependencies["@mui/icons-material"] ?? "^6.0.0";

  writeJson(pkgPath, pkg);
}

function run(cmd: string, args: string[], cwd: string) {
  const res = spawnSync(cmd, args, { cwd, stdio: "inherit", shell: false });
  if (res.status !== 0) {
    throw new Error(`Command failed: ${cmd} ${args.join(" ")}`);
  }
}

function main() {
  const appName = program.args[0];
  const opts = program.opts<Options>();

  const repoRoot = findRepoRoot(process.cwd());
  const templatePath = path.join(repoRoot, opts.template);
  const destRoot = path.join(repoRoot, opts.dest);
  const appPath = path.join(destRoot, appName);

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}`);
  }
  if (!fs.existsSync(destRoot)) {
    fs.mkdirSync(destRoot, { recursive: true });
  }

  ensureDirDoesNotExist(appPath);

  console.log(`\nCreating app: ${appName}`);
  console.log(`Template:     ${opts.template}`);
  console.log(`Destination:  ${path.relative(repoRoot, appPath)}`);
  console.log(`Brand:        ${opts.brand}\n`);

  copyDir(templatePath, appPath);

  removeIfExists(path.join(appPath, "node_modules"));
  removeIfExists(path.join(appPath, ".next"));
  removeIfExists(path.join(appPath, "dist"));
  removeIfExists(path.join(appPath, "storybook-static"));
  removeIfExists(path.join(appPath, "coverage"));
  removeIfExists(path.join(appPath, ".turbo"));

  // Cleanup template artifacts if they accidentally got copied
  const maybeNodeModules = path.join(appPath, "node_modules");
  if (fs.existsSync(maybeNodeModules))
    fs.rmSync(maybeNodeModules, { recursive: true, force: true });
  const maybeNext = path.join(appPath, ".next");
  if (fs.existsSync(maybeNext))
    fs.rmSync(maybeNext, { recursive: true, force: true });

  updateAppPackageJson(appPath, appName);
  setBrandFile(appPath, opts.brand);

  if (!opts.noInstall) {
    console.log("\nRunning pnpm install at repo root...\n");
    run("pnpm", ["install"], repoRoot);
  }

  console.log("\nDone.");
  console.log(`Next steps:`);
  console.log(`  pnpm dev -F ${appName}`);
  console.log("");
}

main();
