/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "no-cross-domains",
      comment:
        "One library should not depend on another domain's library. Dependencies from shared are allowed.",
      severity: "error",
      from: {
        path: "^libs/(?!(shared))([^/]+)"
      },
      to: {
        path: "^libs/(?!(shared))",
        pathNot: "^libs/\\$1"
      }
    },
    {
      name: "no-lib-to-app-deps",
      comment:
        "One application should not depend only on shell or model libraries. ",
      severity: "error",
      from: {
        path: "^apps/"
      },
      to: {
        path: "^libs/",
        pathNot: "^libs/[^/]+/(?:shell|model)(?:/|$)"  
      }
    },
    {
      name: 'data-access-lib-restricted-deps',
      comment:
        'Libraries of type data-access should depend only on libs of type data-access, model or utils-testing',
      severity: 'error',
      from: {
        path: '^libs/[^/]+/data-access'  
      },
      to: {
        path: '^libs/',
        pathNot: '^libs/[^/]+/(?:data-access|model|utils-testing)(?:/|$)'
      }
    },
    {
      name: 'ui-lib-restricted-deps',
      comment:
        'Libraries of type ui should depend only on libs of type util, model or ui',
      severity: 'error',
      from: {
        path: '^libs/[^/]+/ui'  
      },
      to: {
        path: '^libs/',
        pathNot: '^libs/[^/]+/(?:util|model|ui)(?:/|$)'
      },
    },
    {
      name: 'model-lib-restricted-deps',
      comment:
        'Libraries of type model should depend only on libs of type model',
      severity: 'error',
      from: {
        path: '^libs/[^/]+/model'  
      },
      to: {
        path: '^libs/',
        pathNot: '^libs/[^/]+/(?:model)(?:/|$)'
      },
    },
    {
      name: 'util-lib-restricted-deps',
      comment:
        'Libraries of type util should depend only on libs of type model or util',
      severity: 'error',
      from: {
        path: '^libs/[^/]+/util'  
      },
      to: {
        path: '^libs/',
        pathNot: '^libs/[^/]+/(?:model|util)(?:/|$)'
      },
    },
    {
      name: 'shell-lib-restricted-deps',
      comment:
        'Libraries of type shell should depend only on libs of type shell, model or feature',
      severity: 'error',
      from: {
        path: '^libs/[^/]+/shell'  
      },
      to: {
        path: '^libs/',
        pathNot: '^libs/[^/]+/(?:shell|model|feature-[^/]+)(?:/|$)'
      },
    },
    {
      name: 'no-unshared-lib',
      comment:
        'Each shared lib’s index.ts must be imported by at least two other first-level libs',
      severity: 'error',
      from: {
        path: '^libs/'                
      },
      module: {
        path: '^libs/shared/(?:data-access|ui|model)/src/index.ts$',
        numberOfDependentsLessThan: 2
      }
    },
    {
      name: 'feature-lib-restricted-deps',
      comment:
        'Libraries of type feature should depend only on libs of type feature',
      severity: 'error',
      from: {
        path: '^libs/[^/]+/feature-[^/]+'  
      },
      to: {
        path: '^libs/',
        pathNot: '^libs/[^/]+/(?:feature-[^/]+|model|data-access|ui|util)(?:/|$)'
      },
    },
    {
      name: 'no-circular',
      severity: 'warn',
      comment:
        'This dependency is part of a circular relationship. You might want to revise ' +
        'your solution (i.e. use dependency inversion, make sure the modules have a single responsibility) ',
      from: {},
      to: {
        circular: true
      }
    },
    {
      name: 'no-orphans',
      comment:
        "This is an orphan module - it's likely not used (anymore?). Either use it or " +
        "remove it. If it's logical this module is an orphan (i.e. it's a config file), " +
        "add an exception for it in your dependency-cruiser configuration. By default " +
        "this rule does not scrutinize dot-files (e.g. .eslintrc.js), TypeScript declaration " +
        "files (.d.ts), tsconfig.json and some of the babel and webpack configs.",
      severity: 'warn',
      from: {
        orphan: true,
        pathNot: [
          '(^|/)[.][^/]+[.](?:js|cjs|mjs|ts|cts|mts|json)$',                  // dot files
          '[.]d[.]ts$',                                                       // TypeScript declaration files
          '(^|/)tsconfig[.]json$',                                            // TypeScript config
          '(^|/)(?:babel|webpack)[.]config[.](?:js|cjs|mjs|ts|cts|mts|json)$' // other configs
        ]
      },
      to: {},
    },
    {
      name: 'not-to-deprecated',
      comment:
        'This module uses a (version of an) npm module that has been deprecated. Either upgrade to a later ' +
        'version of that module, or find an alternative. Deprecated modules are a security risk.',
      severity: 'warn',
      from: {},
      to: {
        dependencyTypes: [
          'deprecated'
        ]
      }
    },
    {
      name: 'no-duplicate-dep-types',
      comment:
        "Likely this module depends on an external ('npm') package that occurs more than once " +
        "in your package.json i.e. bot as a devDependencies and in dependencies. This will cause " +
        "maintenance problems later on.",
      severity: 'warn',
      from: {},
      to: {
        moreThanOneDependencyType: true,
        dependencyTypesNot: ["type-only"]
      }
    },
    {
      name: 'not-to-spec',
      comment:
        'This module depends on a spec (test) file. The sole responsibility of a spec file is to test code. ' +
        "If there's something in a spec that's of use to other modules, it doesn't have that single " +
        'responsibility anymore. Factor it out into (e.g.) a separate utility/ helper or a mock.',
      severity: 'error',
      from: {},
      to: {
        path: '[.](?:spec|test)[.](?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$'
      }
    },
    {
      name: 'not-to-dev-dep',
      severity: 'error',
      comment:
        "This module depends on an npm package from the 'devDependencies' section of your " +
        'package.json. It looks like something that ships to production, though. To prevent problems ' +
        "with npm packages that aren't there on production declare it (only!) in the 'dependencies'" +
        'section of your package.json. If this module is development only - add it to the ' +
        'from.pathNot re of the not-to-dev-dep rule in the dependency-cruiser configuration',
      from: {
        path: '^(apps|libs)',
        pathNot: '[.](?:spec|test)[.](?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$'
      },
      to: {
        dependencyTypes: [
          'npm-dev',
        ],
        dependencyTypesNot: [
          'type-only'
        ],
        pathNot: [
          'node_modules/@types/'
        ]
      }
    },
    {
      name: 'peer-deps-used',
      comment:
        "This module depends on an npm package that is declared as a peer dependency " +
        "in your package.json. This makes sense if your package is e.g. a plugin, but in " +
        "other cases - maybe not so much. If the use of a peer dependency is intentional " +
        "add an exception to your dependency-cruiser configuration.",
      severity: 'warn',
      from: {},
      to: {
        dependencyTypes: [
          'npm-peer'
        ]
      }
    }
  ],
  options: {
    doNotFollow: {
      path: ['node_modules']
    },
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: 'tsconfig.base.json'
    },
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default", "types"],
      mainFields: ["main", "types", "typings"],
    },
    skipAnalysisNotInRules: true,
    
    reporterOptions: {
      dot: {
        collapsePattern: 'node_modules/(?:@[^/]+/[^/]+|[^/]+)',
      },
      archi: {
        collapsePattern: '^(?:packages|src|lib(s?)|app(s?)|bin|test(s?)|spec(s?))/[^/]+|node_modules/(?:@[^/]+/[^/]+|[^/]+)',
      },
      "text": {
        "highlightFocused": true
      },
    }
  }
};
// generated: dependency-cruiser@17.0.0 on 2025-08-02T20:11:17.021Z
