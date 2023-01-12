# PWA Demo

## 1. Install clients

- In every client, run "npm install"
- create .env file required for step 3

## 2. Install server

- cd server
- run "npm install"
- create ".env" file with database and other information
- run "npx prisma migrate dev --name init" to migrate DB

## 3. Setup Push Notifications

- In server, run "npx web-push generate-vapid-keys" to generate Vapid keys
- Add public and private key in server .env file as well as public key in client .env file
 
