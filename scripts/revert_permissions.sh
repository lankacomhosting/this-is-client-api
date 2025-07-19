#!/bin/bash
echo 'Reverting permissions' >> /home/derana/tamil-client/deploy.log
chmod -x /home/derana/tamil-client/scripts/* >> /home/derana/tamil-client/deploy.log
echo 'Reverting permission complete!' >> /home/derana/tamil-client/deploy.log

