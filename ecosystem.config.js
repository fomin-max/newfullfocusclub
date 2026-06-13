module.exports = {
  apps: [
    {
      name: 'fullfocusclub',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/var/www/fullfocusclub',
      instances: 1,
      exec_mode: 'fork',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      max_memory_restart: '800M',
      restart_delay: 3000,
      wait_ready: true,
      listen_timeout: 10000,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: '/var/log/pm2/fullfocusclub-error.log',
      out_file: '/var/log/pm2/fullfocusclub-out.log',
      merge_logs: true,
    },
  ],
}
