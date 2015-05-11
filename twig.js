/* globals define, require */
define(['twig'], function(Twig) {
    'use strict';

    var twig = Twig.twig,
        DEFAULT_EXTENSION = 'twig',
        TWIG_COMPILER_MODULE = 'requirejs-text';

    Twig.extend(function(Twig) {
        var compiler = Twig.compiler;
        compiler.module[TWIG_COMPILER_MODULE] = function(id, tokens, pathToTwig) {
            return ('define(["' + pathToTwig + '"],function(Twig) {\n\tvar twig = Twig.twig,\n\t\ttemplate = ' +
                compiler.wrap(id, tokens) + '\n\treturn function(context) {\n\t\treturn template.render(context)\n\t};\n});\n');
        };
    });

    return {

        /**
         * @see {@link http://requirejs.org/docs/plugins.html#apiload}
         * @param {String} name
         * @param {Function} parentRequire
         * @param {Function} onLoad
         * @param {Function} onLoad.error
         * @param {Object} config
         * @param {Object} [config.twigjs]
         */
        load: function(name, parentRequire, onLoad, config) {
            var extension = (config.twigjs && config.twigjs.extension ? config.twigjs.extension : DEFAULT_EXTENSION),
                url = require.toUrl(name + '.' + extension);

            if (require.isBrowser) {
                twig({
                    id: name,
                    href: url,
                    load: function(template) {
                        onLoad(function(context) {
                            return template.render(context);
                        });
                    },
                    error: onLoad.error
                });
            } else {
                (function() {
                    var fs = require.nodeRequire('fs');

                    try {
                        onLoad(twig({
                            id: name,
                            data: fs.readFileSync(url, 'utf-8')
                        }));
                    } catch(e) {
                        onLoad.error(e);
                    }
                }());
            }
        },

        /**
         * @see {@link http://requirejs.org/docs/plugins.html#apiwrite}
         * @param {String} pluginName
         * @param {String} moduleName
         * @param {Function} write
         * @param {Function} write.asModule
         * @param {Object} config
         */
        write: function(pluginName, moduleName, write, config) {
            var template = twig({ ref: moduleName });

            if (template) {
                write.asModule(pluginName + '!' + moduleName, template.compile({
                    module: TWIG_COMPILER_MODULE,
                    twig: 'twig'
                }));
            }
        }

    };

});
