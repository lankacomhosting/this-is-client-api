module.exports = {
  apps: [
    {
      name: 'client-adaderana-tamil',
      script: 'dist/main.js',
      instances: 1,
      args: 'start -p 3000',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      //env: {
       //DB URL
     //},
    },
  ],
};
