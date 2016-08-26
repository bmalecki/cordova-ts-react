var context = require.context('../src/tests', true, /.*\.spec\.[tj]sx?$/);
context.keys().forEach(context);
