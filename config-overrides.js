const { injectBabelPlugin } = require('react-app-rewired');
const rewireCssModules = require('react-app-rewire-css-modules');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
    config = injectBabelPlugin(
        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], // change importing css to less
        config,
    );

    config = rewireLess.withLoaderOptions({
        modifyVars: { "@primary-color": "#E13BDE" },
        javascriptEnabled: true,
    })(config, env);

    config = rewireCssModules(config, env);
    return config;
};
