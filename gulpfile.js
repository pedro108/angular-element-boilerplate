const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const rimraf = require('rimraf');
const gulp = require('gulp');
const shell = require('gulp-shell');
const concat = require('gulp-concat');
const replace = require('gulp-replace');

const packageJSON = JSON.parse(fs.readFileSync('./package.json'));

const outputDir = 'dist-element';

function getBuildFileName() {
  const projectName = packageJSON.name.replace(/^@(.+)\//, '$1-');
  const projectVersion = packageJSON.version;
  return `${projectName}@${projectVersion}`;
}

function buildBase64URL(match, fileName) {
  const filePath = path.join(__dirname, outputDir, fileName);
  try {
    const fileData = Buffer.from(fs.readFileSync(filePath)).toString('base64');
    const fileType = mime.lookup(fileName);
    return `url(data:${fileType};base64,${fileData})`;
  } catch(e) {
    console.error(`Invalid filePath: ${e.message}`);
    return match;
  }

}

gulp.task('build:element:angular',
  shell.task(`ng build --prod --configuration=element --output-hashing=none --output-path=${outputDir}/`),
);

gulp.task('build:element:concat', function () {
  return gulp.src([
    `./${outputDir}/styles.js`,
    `./${outputDir}/polyfills.js`,
    `./${outputDir}/runtime.js`,
    `./${outputDir}/main.js`,
  ])
    .pipe(replace(/url\(\\?'?([^"')]+?)\\?'?\)/g, buildBase64URL))
    .pipe(concat(`${getBuildFileName()}.js`))
    .pipe(gulp.dest('./dist/web-component'));
});

gulp.task('build:element:clear', function (cb) {
  rimraf(`./${outputDir}`, cb);
});

gulp.task('build:element', gulp.series('build:element:angular', 'build:element:concat', 'build:element:clear'));
