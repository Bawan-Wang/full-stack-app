# Full Stack Demo Project

This is a simple full-stack project built with:

- **Frontend**: React.js  
- **Backend**: Spring Boot  
- **Database**: MySQL (hosted locally)  
- **CI/CD**: GitHub Actions with SSH for auto deployment  
- **Containerization**: Docker + Docker Compose  

## Project Structure

hello-fullstack/
├── backend/ # Spring Boot application
│ ├── Dockerfile
│ └── src/
├── frontend/ # React application
│ ├── Dockerfile
│ └── src/
├── docker-compose.yml # Orchestrates backend and frontend
└── .github/
└── workflows/
└── local-redeploy.yml # GitHub Actions for CI/CD

## 🐳 Getting Started

### First time (build and run):

### bash
docker-compose up --build