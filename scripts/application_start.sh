#!/bin/bash
echo 'Setting env variables Started' >> /home/derana/tamil-client/deploy.log
PREFIX="/derana/adaderana/stg/tamil/client/api/"

export AWS_DEFAULT_REGION=us-east-1

PORT=$(aws ssm get-parameter --name "${PREFIX}PORT" --query Parameter.Value --output text)
export PORT

FACEBOOK_APP_ID=$(aws ssm get-parameter --name "${PREFIX}FACEBOOK_APP_ID" --query Parameter.Value --output text)
export FACEBOOK_APP_ID

# CORRECTED TYPO: FACEBOOK_APP_SECERT -> FACEBOOK_APP_SECRET
FACEBOOK_APP_SECRET=$(aws ssm get-parameter --name "${PREFIX}FACEBOOK_APP_SECRET" --query Parameter.Value --output text)
export FACEBOOK_APP_SECRET

GOOGLE_CLIENT_ID=$(aws ssm get-parameter --name "${PREFIX}GOOGLE_CLIENT_ID" --query Parameter.Value --output text)
export GOOGLE_CLIENT_ID

# ADDED --with-decryption for GOOGLE_CLIENT_SECRET (if it's a SecureString)
GOOGLE_CLIENT_SECRET=$(aws ssm get-parameter --name "${PREFIX}GOOGLE_CLIENT_SECRET" --with-decryption --query Parameter.Value --output text)
export GOOGLE_CLIENT_SECRET

# ADDED --with-decryption for API_KEY (if it's a SecureString)
API_KEY=$(aws ssm get-parameter --name "${PREFIX}API_KEY" --with-decryption --query Parameter.Value --output text)
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

# ADDED --with-decryption for SWAGGER_PASSWORD (if it's a SecureString)
SWAGGER_PASSWORD=$(aws ssm get-parameter --name "${PREFIX}SWAGGER_PASSWORD" --with-decryption --query Parameter.Value --output text)
export SWAGGER_PASSWORD

echo 'Starting App ' >> /home/derana/tamil-client/deploy.log

echo 'cd to home folder' >> /home/derana/tamil-client/deploy.log
cd /home/derana/tamil-client/

# IMPORTANT: These steps should ideally be done in CodeBuild, not ApplicationStart.
# If your build artifact already contains node_modules and generated Prisma client,
# these lines can be removed for faster and more reliable deployments.
echo 'prisma installing'  >> /home/derana/tamil-client/deploy.log
yarn add prisma # Consider removing this if already handled in CodeBuild.
pnpm install # Consider removing this if already handled in CodeBuild.
npx prisma generate # Consider removing this if already handled in CodeBuild.

echo 'pm2 start' >> /home/derana/tamil-client/deploy.log
pm2 start /home/derana/tamil-client/ecosystem.config.js --time >> /home/derana/tamil-client/deploy.log

echo 'Application start complete'  >> /home/derana/tamil-client/deploy.log
