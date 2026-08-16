module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const oneOfRule = webpackConfig.module.rules.find((rule) => rule.oneOf);
      if (oneOfRule) {
        oneOfRule.oneOf.forEach((rule) => {
          if (rule.test && rule.test.toString().includes('css')) {
            if (rule.use) {
              rule.use.forEach((loader) => {
                if (loader.loader && loader.loader.includes('postcss') && loader.options && loader.options.postcssOptions) {
                  const plugins = loader.options.postcssOptions.plugins;
                  const hasTw = plugins.some((p) => (typeof p === 'string' && p.includes('tailwind')) || (p && p.name && p.name.includes('tailwind')));
                  if (!hasTw) {
                    plugins.unshift(require('tailwindcss'));
                    const hasAp = plugins.some((p) => (typeof p === 'string' && p.includes('autoprefixer')) || (p && p.name && p.name.includes('autoprefixer')));
                    if (!hasAp) plugins.push(require('autoprefixer'));
                  }
                }
              });
            }
          }
        });
      }
      return webpackConfig;
    },
  },
};