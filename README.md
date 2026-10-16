# Movie Picture Pipeline — DevOps for ATCI

Starter project aligned to the assignment's Flask backend and React frontend requirements.

## Components
- `frontend/`: React + Vite movie catalogue
- `backend/`: Flask API using Pipenv
- `k8s/`: Kubernetes deployment and service manifests
- `.github/workflows/`: frontend/backend CI and CD workflows

## Run locally

### Backend
```bash
cd backend
pip install pipenv
pipenv install --dev
pipenv run flake8 app.py test_app.py
pipenv run pytest -q
pipenv run python app.py
```
API: `http://localhost:5000/movies`

### Frontend
In another terminal:
```bash
cd frontend
npm install
npm run lint
npm test
npm run dev
```
The frontend uses `REACT_APP_API_URL` as a Docker build argument, mapped by the Dockerfile to Vite's `VITE_API_URL`. Locally it defaults to `http://localhost:5000/movies`.

## GitHub Actions configuration

Add these repository **Actions secrets**:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `ECR_BACKEND_REPOSITORY`
- `ECR_FRONTEND_REPOSITORY`
- `EKS_CLUSTER_NAME`

Add this repository **Actions variable**:
- `REACT_APP_API_URL` — publicly reachable backend API URL ending in `/movies`

The AWS identity must be authorized to push to ECR and deploy to the existing EKS cluster. The ECR repositories and EKS cluster must already exist; these workflows do not provision cloud infrastructure.

## Before submitting
1. Push this project to a public GitHub repository.
2. Configure the required AWS secrets and `REACT_APP_API_URL` variable.
3. Run all four workflows and resolve any errors.
4. Verify the backend `/movies` endpoint and the frontend in a browser.
5. Submit the GitHub repository URL and required evidence through Udacity.

**Important:** This ZIP is a starter project, not a confirmed live deployment. Cloud setup, workflow execution, and public URLs still need to be verified in your AWS/GitHub environment. Check your course's exact starter repository and rubric for any required filenames or commands that differ.
