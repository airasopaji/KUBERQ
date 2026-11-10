/**
 * KuberQ — PM2 High-Concurrency Cluster Configuration
 * Designed for 200+ simultaneous connections (100 merchants + 100 customers) on Render/VPS
 */

module.exports = {
  apps: [
    {
      name: 'kuberq-cluster',
      script: './server.js',
      // Cluster mode: Spawns worker per CPU core to maximize multi-core throughput
      instances: process.env.WEB_CONCURRENCY || 'max',
      exec_mode: 'cluster',

      // Memory Guard: Automatically restart any worker exceeding 480MB
      // to avoid OOM killer on Render Free / Starter (512MB RAM) tiers
      max_memory_restart: '480M',

      // Node v8 heap tuning: Keep garbage collection proactive
      node_args: '--max-old-space-size=440',

      // Environment Variables
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 4500
      },

      // Zero-Downtime Rolling Restarts & Graceful Reload
      wait_ready: true,            // Wait for worker process.send('ready') before routing traffic
      listen_timeout: 8000,        // Max ms to wait for worker to start listening
      kill_timeout: 5000,          // 5s window to finish in-flight orders/transactions before SIGKILL
      shutdown_with_message: true,

      // Auto-restart on crash with exponential backoff to prevent CPU throttling loops
      autorestart: true,
      exp_backoff_restart_delay: 200,
      max_restarts: 15,
      min_uptime: '10s',

      // Log Management
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: './data/logs/pm2-error.log',
      out_file: './data/logs/pm2-out.log'
    }
  ]
};
