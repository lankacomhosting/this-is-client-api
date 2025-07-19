#!/bin/bash
echo 'run after_install.sh: ' >> /home/derana/tamil-client/deploy.log

echo 'cd /home/derana/tamil-client' >> /home/derana/tamil-client/deploy.log
cd /home/derana/tamil-client >> /home/derana/tamil-client/deploy.log
echo 'npm install' >> /home/derana/tamil-client/deploy.log
# npm install >> /home/derana/tamil-client/deploy.log
# npm run build >> /home/derana/tamil-client/deploy.log


# Make application_start.sh executable
#echo 'chmod +x scripts/application_start.sh' >> /home/derana/tamil-client/deploy.log
#chmod +x scripts/application_start.sh >> /home/derana/tamil-client/deploy.log
