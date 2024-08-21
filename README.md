<h1 align="center">NestJS User Authentication and Authorization Project</h1>

<p align="center">
  This project is a NestJS-based application that handles user authentication and authorization using JWTs, with full user management features.
</p>

<h2>📁 Project Structure</h2>
<p>The project is organized as follows:</p>
<pre>
<code>
src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   ├── jwt-auth.guard.ts
│   ├── local-auth.guard.ts
│   └── local.strategy.ts
├── colleges/
│   ├── entities/
│   │   └── user.entity.ts
│   ├── colleges.controller.ts
│   ├── colleges.module.ts
│   ├── colleges.service.ts
├── users/
│   ├── users.module.ts
│   ├── users.repository.ts
│   ├── users.service.ts
├── app.module.ts
├── main.ts
├── app.controller.ts
├── app.controller.spec.ts
└── app.service.ts
</code>
</pre>

<h2>🚀 Installation and Setup</h2>

<h3>Prerequisites</h3>
<ul>
  <li>Node.js (>= 14.x)</li>
  <li>npm (>= 6.x) or yarn (>= 1.22.x)</li>
  <li>PostgreSQL or any other database supported by TypeORM</li>
</ul>

<h3>Steps</h3>
<ol>
  <li>
    <strong>Clone the repository:</strong>
    <pre><code>git clone https://github.com/your-repository.git
cd your-repository</code></pre>
  </li>
  <li>
    <strong>Install dependencies:</strong>
    <pre><code>npm install
# or
yarn install</code></pre>
  </li>
  <li>
    <strong>Set up the database:</strong>
    <p>Ensure your database is running and create the necessary database for the application.</p>
  </li>
  <li>
    <strong>Configure environment variables:</strong>
    <p>Create a <code>.env</code> file in the root directory with the following variables:</p>
    <pre><code>DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=your_db_name
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=3600s</code></pre>
  </li>
</ol>

<h2>🔧 Environment Variables</h2>
<p>The application relies on several environment variables, which should be configured in a <code>.env</code> file:</p>
<ul>
  <li><code>DATABASE_HOST</code>: The database host (e.g., <code>localhost</code>).</li>
  <li><code>DATABASE_PORT</code>: The database port (e.g., <code>5432</code>).</li>
  <li><code>DATABASE_USER</code>: The database user.</li>
  <li><code>DATABASE_PASSWORD</code>: The database password.</li>
  <li><code>DATABASE_NAME</code>: The name of the database.</li>
  <li><code>JWT_SECRET</code>: The secret key for signing JWTs.</li>
  <li><code>JWT_EXPIRATION</code>: The expiration time for JWTs (e.g., <code>3600s</code>).</li>
</ul>

<h2>▶️ Running the Application</h2>
<p>To start the application, run the following command:</p>
<pre><code>npm run start
# or
yarn start</code></pre>
<p>This will start the NestJS application, which should be accessible at <code>http://localhost:3000</code>.</p>

<h2>🔑 Authentication and Authorization</h2>
<p>The application uses JWT for authentication and authorization:</p>
<ul>
  <li><strong>Login:</strong> Users can log in by sending a <code>POST</code> request to <code>/auth/login</code> with their username and password. Upon successful authentication, a JWT token is returned.</li>
  <li><strong>Protected Routes:</strong> Routes can be protected using the <code>JwtAuthGuard</code>. For example, only authenticated users can access routes that use this guard.</li>
</ul>

<h2>👤 User Management</h2>
<p>The <code>UsersService</code> and <code>UsersRepository</code> handle all user-related operations:</p>
<ul>
  <li><strong>Create User:</strong> A new user can be created using the <code>create</code> method in <code>UsersService</code>, which stores the user in the database.</li>
  <li><strong>Find User by Username:</strong> Users can be retrieved by their username using the <code>findOneByUsername</code> method.</li>
  <li><strong>List All Users:</strong> The <code>findAll</code> method can be used to retrieve all users from the database.</li>
</ul>

<h2>🧪 Testing</h2>
<p>The application includes basic unit tests. To run the tests, use the following command:</p>
<pre><code>npm run test
# or
yarn test</code></pre>
<p>Make sure that your test database is correctly configured in the <code>.env.test</code> file.</p>

<h2>🚢 Deployment</h2>
<p>For deployment, ensure that all environment variables are correctly set in your production environment. The application can be deployed on any platform that supports Node.js.</p>

<h2>📜 API Documentation</h2>
<p>Here is a brief overview of the available API endpoints:</p>
<ul>
  <li><strong>POST <code>/auth/login</code>:</strong> Logs in a user and returns a JWT.</li>
  <li><strong>GET <code>/users</code>:</strong> Returns a list of all users (protected by JWT).</li>
  <li><strong>POST <code>/users</code>:</strong> Creates a new user (you may want to restrict this endpoint based on your use case).</li>
</ul>
