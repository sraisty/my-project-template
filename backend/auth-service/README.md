## auth-service

This service would be responsible for managing user accounts, authentication, and authorization.

### Responsibilities

* User registration and login.
* JWT token issuance and verification.
* Role management.
* Account updates (email, password).

### Technologies

* Typescript
* Express.js (for the API).
* postgres (for the user data)
* knex (for query building)
* JWT (for token-based authentication).
* Docker for containerization


### Example Endpoints

* `POST /auth/signup` - User registration.
* `POST /auth/login` - User login (returns a JWT token).
* `GET /auth/profile` - Fetch user profile data.
* `POST /auth/refresh-token` - Refresh JWT token.
