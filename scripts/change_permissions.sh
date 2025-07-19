#!/bin/bash
echo 'Changing Permissions' >> /home/derana/tamil-client/deploy.log
chown -R derana:derana /home/derana/tamil-client/
chmod +x /home/derana/tamil-client/scripts/* >> /home/derana/tamil-client/deploy.log
echo 'Permissions changed!' >> /home/derana/tamil-client/deploy.log
