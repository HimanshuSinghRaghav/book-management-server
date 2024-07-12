# Book Management Server

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/HimanshuSinghRaghav/book-management-server.git
cd book-management-server
```

### 2. Start the MySQL Server
Ensure that your MySQL server is running.

### 3. Set Environment Variables
Create a `.env` file in the root directory and set the following environment variables:

```makefile
PORT=8000
JWT_SECRET=<your_secret_or_private_key>
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=<password>
DB_NAME=<db_name>
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Start the Server
Run the server with:

```bash
npm run dev
```

### 6. Access the Application
Open your browser and navigate to `http://localhost:8000` to access the application.

For API documentation, visit `http://localhost:8000/api/docs`.
