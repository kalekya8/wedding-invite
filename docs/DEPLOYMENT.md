# Deployment Guide

## Architecture Overview

```
Guest Browser
    │
    ▼
Angular SPA (Vercel CDN)
    │ HTTPS REST API
    ▼
ASP.NET Core API (Azure Container Apps)
    │ Entity Framework Core
    ▼
Neon PostgreSQL
```

## Frontend Deployment (Vercel)

### Prerequisites

- Vercel account
- GitHub repository

### Deployment Steps

1. **Connect GitHub Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   - Build Command: `npm run build:prod`
   - Output Directory: `dist/wedding-invitation`
   - Framework Preset: Angular
   - Root Directory: `frontend`

3. **Environment Variables**
   ```
   API_BASE_URL=https://api.lohitha-vivian-wedding.com
   ```

4. **Deploy**
   - Vercel automatically deploys on push to main branch
   - Preview deployments for pull requests

### Custom Domain

1. Add domain in Vercel settings
2. Update DNS records to point to Vercel nameservers
3. SSL certificate auto-provisioned

## Backend Deployment (Azure Container Apps)

### Prerequisites

- Azure subscription
- Azure CLI installed
- Docker
- Neon PostgreSQL account

### Step 1: Set Up Neon PostgreSQL

1. Create account at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string:
   ```
   postgresql://user:password@host/database
   ```

### Step 2: Build Docker Image

```bash
cd backend

# Build image
docker build -t wedding-invite-api:latest .

# Test locally
docker run -p 5000:5000 \
  -e ConnectionStrings__WeddingDatabase="your-connection-string" \
  -e ASPNETCORE_ENVIRONMENT=Production \
  wedding-invite-api:latest
```

### Step 3: Push to Container Registry

```bash
# Login to Azure Container Registry
az acr login --name yourregistry

# Tag image
docker tag wedding-invite-api:latest yourregistry.azurecr.io/wedding-invite-api:latest

# Push image
docker push yourregistry.azurecr.io/wedding-invite-api:latest
```

### Step 4: Create Container App

```bash
az containerapp create \
  --name wedding-invite-api \
  --resource-group your-rg \
  --image yourregistry.azurecr.io/wedding-invite-api:latest \
  --target-port 5000 \
  --registry-login-server yourregistry.azurecr.io \
  --registry-username your-username \
  --registry-password your-password \
  --environment your-env \
  --env-vars \
    ConnectionStrings__WeddingDatabase="your-connection-string" \
    Jwt__SigningKey="your-secret-key" \
    ASPNETCORE_ENVIRONMENT="Production" \
    Cors__AllowedOrigins__0="https://yourdomain.com"
```

### Step 5: Configure Ingress

```bash
az containerapp update \
  --name wedding-invite-api \
  --resource-group your-rg \
  --ingress external \
  --target-port 5000
```

### Step 6: Set Custom Domain

1. Get the FQDN:
   ```bash
   az containerapp show --name wedding-invite-api \
     --resource-group your-rg \
     --query "properties.configuration.ingress.fqdn"
   ```

2. Create CNAME record pointing to the FQDN

3. Add custom domain in Container App settings

## Database Backup Strategy

### Neon PostgreSQL

- Automatic backups (configurable retention)
- Manual backups via Neon console
- Point-in-time recovery available

### Backup Script

```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="./backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/wedding_db_$TIMESTAMP.sql"

mkdir -p $BACKUP_DIR

pg_dump $DATABASE_URL > $BACKUP_FILE

# Keep only last 30 days of backups
find $BACKUP_DIR -mtime +30 -delete

echo "Backup completed: $BACKUP_FILE"
```

## Monitoring & Logging

### Vercel

- Dashboard at [vercel.com/dashboard](https://vercel.com/dashboard)
- Real-time analytics
- Error tracking

### Azure Container Apps

```bash
# View logs
az containerapp logs show \
  --name wedding-invite-api \
  --resource-group your-rg

# Stream logs
az containerapp logs stream \
  --name wedding-invite-api \
  --resource-group your-rg
```

### Application Insights

```bash
# Add monitoring
az containerapp update \
  --name wedding-invite-api \
  --resource-group your-rg \
  --enable-dapr false
```

## Scaling

### Frontend (Vercel)

- Automatic CDN scaling
- Edge caching for static assets

### Backend (Azure Container Apps)

```bash
# Configure auto-scaling
az containerapp update \
  --name wedding-invite-api \
  --resource-group your-rg \
  --min-replicas 2 \
  --max-replicas 10
```

## SSL/TLS Certificates

### Vercel
- Automatic managed by Let's Encrypt
- HTTPS enforced by default

### Azure Container Apps
- Azure-managed certificates
- Custom domain certificates supported

## Security Checklist

- [ ] Database connection string in environment variables (not in code)
- [ ] JWT signing key secured (minimum 32 characters)
- [ ] CORS origins configured correctly
- [ ] SQL injection prevention via parameterized queries (EF Core)
- [ ] Input validation on all API endpoints
- [ ] HTTPS enforced on all endpoints
- [ ] Rate limiting configured
- [ ] Secrets not committed to repository

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        run: |
          cd frontend
          npm install
          npx vercel --prod --token $VERCEL_TOKEN

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Login to Azure
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}
      - name: Build and push Docker image
        run: |
          cd backend
          docker build -t ${{ secrets.REGISTRY_URL }}/wedding-invite-api:latest .
          docker push ${{ secrets.REGISTRY_URL }}/wedding-invite-api:latest
      - name: Deploy to Container Apps
        run: |
          az containerapp update \
            --name wedding-invite-api \
            --resource-group your-rg \
            --image ${{ secrets.REGISTRY_URL }}/wedding-invite-api:latest
```

## Rollback Procedure

### Frontend
- Vercel automatically keeps previous deployments
- Revert by selecting previous deployment in dashboard

### Backend
- Keep previous Docker images in registry
- Deploy previous image tag:
  ```bash
  az containerapp update \
    --name wedding-invite-api \
    --resource-group your-rg \
    --image yourregistry.azurecr.io/wedding-invite-api:previous-tag
  ```

## Performance Optimization

### Frontend
- Lazy load routes
- Tree-shake unused code
- Minify JavaScript and CSS
- Use CDN for static assets

### Backend
- Database query optimization
- Connection pooling
- Caching strategies
- Compress API responses

## Monitoring Checklist

- [ ] Website uptime monitoring
- [ ] API endpoint health checks
- [ ] Database connection monitoring
- [ ] Error rate alerts
- [ ] Performance metrics (response time)
- [ ] Log aggregation
- [ ] Security scanning

## Disaster Recovery

1. **Database Failure**
   - Restore from Neon backup
   - Update connection string in Container Apps
   - Restart application

2. **Application Crash**
   - Azure Container Apps auto-restart
   - Scale to multiple replicas for high availability

3. **Complete Outage**
   - Restore database from backup
   - Redeploy application from git
   - Switch DNS to backup domain if available
