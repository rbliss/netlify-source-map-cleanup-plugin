import { promises as fs } from 'fs';
import glob from 'glob-promise';

export const onPostBuild = async function ({ constants }) {
  const cssSourceMapFiles = await glob(`${constants.PUBLISH_DIR}/**/*.css.map`);
  const jsSourceMapFiles = await glob(`${constants.PUBLISH_DIR}/**/*.js.map`);
  const sourceMapFiles = cssSourceMapFiles.concat(jsSourceMapFiles);

  for (const filePath of sourceMapFiles) {
    console.log(`Deleting sourcemap ${filePath}...`);
    await fs.unlink(filePath);
  }

  const sourceFiles = await glob(`${constants.PUBLISH_DIR}/**/*.js`);
  for (const filePath of sourceFiles) {
    try {
      console.log(`Removing sourcemap comment for ${filePath}...`);
      const fileContent = await fs.readFile(filePath, 'utf8');
      await fs.writeFile(filePath, fileContent.replace(/\/\/# sourceMappingURL=\S+/g, ''));
    } catch (err) {
      console.error(err);
    }
  }
};
