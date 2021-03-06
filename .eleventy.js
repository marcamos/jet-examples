const { execSync } = require("child_process");

module.exports = function(eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addWatchTarget('./src/css/tailwind.css');
  eleventyConfig.addPassthroughCopy('./src/img');
  eleventyConfig.on('eleventy.after', async () => {
    console.log('Building Tailwind…');
    console.log(execSync('npm run build:tailwind').toString());
  });

  // BEGIN: paired shortcode demo
  eleventyConfig.addPairedShortcode('shortNameHere', function(innerContent, uniqueVariableName1, uniqueVariableName2) {
    return `
      <div class="classNameHere">
        <div class="anotherClassNameHere">${uniqueVariableName1}</div>
        <div class="aThirdClassNameHere">${uniqueVariableName2}</div>
        <p>${innerContent}</p>
      </div>
    `;
  });
  // END: paired shortcode demo

  return {
    htmlTemplateEngine: "njk",
    dir: {
      input: 'src',
      output: 'public'
    }
  }
}