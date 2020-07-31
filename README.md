# SIAPCE API - Universidad de El Salvador

<div align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</div>

API para el Sistema Informático para el control y seguimiento del historial conductual y expediente psicológico de los estudiantes del colegio Liceo Salvadoreño

## Prerrequisites

1. PostgreSQL v11.x
2. NodeJS v12.x and npm v6.x
3. Docker v19.x
4. Docker Compose v1.25.x

## Installation

1. Clone the repository.
   > \$ git clone https://github.com/KevinARE29/SIPCE-API.git
2. Install dependencies.
   > \$ npm i
3. Create the database [DB Name] on PostgreSQL.

4. Configure the .env file, check the .env.example file on root folder to see the required variable names.

<center>

| Environment Variable Key         | Environment Variable Value                                                   |
| -------------------------------- | ---------------------------------------------------------------------------- |
| PORT                             | 3000                                                                         |
| API_URL                          | [The API URL]                                                                |
| FRONT_URL                        | [The Frontend URL]                                                           |
| JWT_SECRET_ACCESS_TOKEN          | [Your JWT_SECRET_ACCESS_TOKEN]                                               |
| JWT_SECRET_REFRESH_TOKEN         | [Your JWT_SECRET_REFRESH_TOKEN]                                              |
| JWT_SECRET_PASSWORD_RESET        | [Your JWT_SECRET_PASSWORD_RESET]                                             |
| ACCESS_TOKEN_EXPIRATION          | [Your ACCESS_TOKEN_EXPIRATION]                                               |
| REFRESH_TOKEN_EXPIRATION         | [Your REFRESH_TOKEN_EXPIRATION]                                              |
| PASSWORD_RESET_EXPIRATION        | [Your PASSWORD_RESET_EXPIRATION]                                             |
| TYPEORM_CONNECTION               | postgres                                                                     |
| TYPEORM_HOST                     | ['db' for start with docker-compose or 'localhost' for start without docker] |
| TYPEORM_USERNAME                 | [YOUR DB USERNAME]                                                           |
| TYPEORM_PASSWORD                 | [YOUR DB PASSWORD]                                                           |
| TYPEORM_DATABASE                 | [DATABASE NAME]                                                              |
| TYPEORM_PORT                     | 5432                                                                         |
| TYPEORM_SYNCHRONIZE              | false                                                                        |
| TYPEORM_ENTITIES                 | src/**/entities/\*.js,dist/**/entities/\*.js                                 |
| TYPEORM_MIGRATIONS_TABLE_NAME    | migration                                                                    |
| TYPEORM_MIGRATIONS               | migrations/\*.js, dist/migrations/\_.js                                      |
| TYPEORM_MIGRATIONS_DIR           | migrations                                                                   |
| TYPEORM_MIGRATIONS_RUN           | true                                                                         |
| SENDGRID_API_KEY                 | [The Sendgrid API Key]                                                       |
| RESET_PSW_SENDGRID_TEMPLATE_ID   | [Template ID for Reset Password]                                             |
| GENERATE_CREDENTIALS_TEMPLATE_ID | [Template ID for Generate User Credentials]                                  |
| EMAIL_USER                       | [The no reply email]                                                         |
| CLOUDINARY_CLOUD_NAME            | [The Cloudinary Cloud Name]                                                  |
| CLOUDINARY_API_KEY               | [The Cloudinary API KEY]                                                     |
| CLOUDINARY_API_SECRET            | [The Cloudinary API SECRET]                                                  |
| CLOUDINARY_ENVS                  | [dev, uat]                                                                   |
| FILE_EXTENSION_WHITE_LIST        | jpg,jpeg,png,svg                                                             |
| FILE_SIZE_LIMIT_IN_BYTES         | 5242880                                                                      |

</center>

## Usage

#### Start the server using npm:

> \$ npm run start

#### Or use Docker Compose

> \$ docker-compose up

## Testing

1. Execute all unit tests:

   > \$ npm run test

2. Execute the test coverage script:
   > \$ npm run test:cov

## API Documentation

Swagger Documentation: Available through the /docs path.
Postman Documentation: [Postman Docs](https://documenter.getpostman.com/view/11301441/SzmmUEd3)

## Heroku Deployed API.

[SIAPCE API](https://dev-sipce-api.herokuapp.com/docs/)
