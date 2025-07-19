#!/bin/bash
echo 'Setting env variables Started' >> /home/derana/tamil-client/deploy.log
PREFIX="/derana/adaderana/client/"

export AWS_DEFAULT_REGION=us-east-1


PORT=$(aws ssm get-parameter --name "${PREFIX}PORT" --query Parameter.Value --output text)
export PORT

FACEBOOK_APP_ID=$(aws ssm get-parameter --name "${PREFIX}FACEBOOK_APP_ID" --query Parameter.Value --output text)
export FACEBOOK_APP_ID

FACEBOOK_APP_SECERT=$(aws ssm get-parameter --name "${PREFIX}FACEBOOK_APP_SECERT" --query Parameter.Value --output text)
export FACEBOOK_APP_SECERT

GOOGLE_CLIENT_ID=$(aws ssm get-parameter --name "${PREFIX}GOOGLE_CLIENT_ID" --query Parameter.Value --output text)
export GOOGLE_CLIENT_ID

GOOGLE_CLIENT_SECRET=$(aws ssm get-parameter --name "${PREFIX}GOOGLE_CLIENT_SECRET" --query Parameter.Value --output text)
export GOOGLE_CLIENT_SECRET

API_KEY=$(aws ssm get-parameter --name "${PREFIX}API_KEY" --query Parameter.Value --output text)
export API_KEY

NEXT_PUBLIC_AUTH_SERVICE_API_KEY=$(aws ssm get-parameter --name "${PREFIX}NEXT_PUBLIC_AUTH_SERVICE_API_KEY" --query Parameter.Value --output text)
export NEXT_PUBLIC_AUTH_SERVICE_API_KEY

DATABASE_URL=$(aws ssm get-parameter --name "${PREFIX}DATABASE_URL" --with-decryption --query Parameter.Value --output text)
export DATABASE_URL

NEXT_PUBLIC_AUTH_SERVICE_API_URL=$(aws ssm get-parameter --name "${PREFIX}NEXT_PUBLIC_AUTH_SERVICE_API_URL" --with-decryption --query Parameter.Value --output text)
export NEXT_PUBLIC_AUTH_SERVICE_API_URL

BACKEND_URL=$(aws ssm get-parameter --name "${PREFIX}BACKEND_URL" --query Parameter.Value --output text)
export BACKEND_URL

FRONTEND_URL=$(aws ssm get-parameter --name "${PREFIX}FRONTEND_URL" --query Parameter.Value --output text)
export FRONTEND_URL

SWAGGER_USER=$(aws ssm get-parameter --name "${PREFIX}SWAGGER_USER" --query Parameter.Value --output text)
export SWAGGER_USER

SWAGGER_PASSWORD=$(aws ssm get-parameter --name "${PREFIX}SWAGGER_PASSWORD" --query Parameter.Value --output text)
export SWAGGER_PASSWORD

echo 'Starting App ' >> /home/derana/tamil-client/deploy.log

echo 'cd to home folder' >> /home/derana/tamil-client/deploy.log
cd /home/derana/tamil-client/

echo 'prisma installing'  >> /home/derana/tamil-client/deploy.log
yarn add prisma

echo 'pm2 start' >> /home/derana/tamil-client/deploy.log
pm2 start /home/derana/tamil-client/ecosystem.config.js --time >> /home/derana/tamil-client/deploy.log

echo 'Application start complete'  >> /home/derana/tamil-client/deploy.log
