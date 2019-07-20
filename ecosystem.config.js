module.exports = {
  apps : [{
    name: 'server',
    script: './dist/server/server.js',
    instances: 1,
    autorestart: false,
    watch: ['./dist'],
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
