#!/bin/bash
sudo -u derana pm2 stop /home/derana/tamil-client/ecosystem.config.js >> /home/derana/tamil-client/deploy.log
rm -rf /home/derana/tamil-client/{*,.*} || true >> /home/derana/tamil-client/deploy.log

