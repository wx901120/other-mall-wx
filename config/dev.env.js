const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  /* 测试环境接口 */
  TEST_API: '""',
  ONLINE_API: '"http://wox.w-lans.com"',
  TEST_URL: '"http://test.woxmob.78wifi.com"',
  ONLINE_URL: '"http://woxmob.w-lans.com"',
  PAY_URL: '"http://test2.api.w-lans.cn"',
  IS_TEST: '"yes"',
  WITH_CREDENTIALS: 'false',
  API_ENV: '"test"',
});
