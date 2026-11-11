/**
 * KuberQ — PM2 High-Concurrency Cluster Configuration
 * Designed for 200+ simultaneous connections (100 merchants + 100 customers) on Render/VPS
 */

module.exports = {
  apps: [
    {
      name: 'kuberq',
      script: './server.js',
      // Single worker fork mode: perfectly sized for Render 512MB RAM tier (avoids OOM kills)
      instances: 1,
      exec_mode: 'fork',

      // Memory Guard: Restart if exceeding 420MB RAM
      max_memory_restart: '420M',

      // Keep v8 heap conservative for 512MB container
      node_args: '--max-old-space-size=380',

      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 4500
      },

      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s'
    }
  ]
};
