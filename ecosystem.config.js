module.exports = {
  apps: [
    {
      name: "smart-van",
      script: "dist/index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production",
        SCREENSHOTS_PATH
      }
    }
  ],
  deploy: {
    rpi: {
      user: "wolas",
      host: "rpi.local",
      port: "22",
      ref: "origin/master",
      repo: "git@github.com:wolasss/smart-van-rpi.git",
      path: GUARD_PATH,
      "pre-deploy-local": "echo \"---------- Deploying code to Raspberry PI ---------\"",
      "post-deploy": "npm run post-deploy",
      "pre-setup": `sudo apt-get update;
                sudo apt-get install git;
                curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash;
                nvm alias default v10.16.1;
                nvm use default;
                `
    }
  }
};
