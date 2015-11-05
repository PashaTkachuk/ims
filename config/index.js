var config;
try {
  config = require('./config');
} catch (err) {
  console.error('=====================================================');
  console.error('= Please make sure that "config/config.json" exists =');
  console.error('=====================================================');

  throw err;
}

module.exports = config;
