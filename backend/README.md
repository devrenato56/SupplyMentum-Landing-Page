# SupplyMentum Landing Page - Backend
## Description

Server-side logic of SupplyMentum Landing Page built over [Nest](https://github.com/nestjs/nest)

## Project setup
### npm configuration
```bash
$ npm install
```

### Environment variables
1. Create a .env file based on .env.example
2. Complete the following:
    * `SUPABASE_URL`: Public url for Supabase connection
    * `SUPABASE_KEY`: Database's public anon key
    * `JWT_SECRET`: A large random hexadecimal string. You can generate one using crypto in your command line:
    ```bash
   $ node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.