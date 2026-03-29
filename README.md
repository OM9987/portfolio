# Portfolio - Full-Stack Serverless Application

A production-ready portfolio platform built with **Next.js 15** on the frontend and **.NET 8 AWS Lambda** on the backend, deployed with **Amazon S3 + CloudFront + API Gateway + Lambda**.

---

## Tech Stack

### Frontend
- Next.js 15 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Route-level loading/error boundaries
- Hybrid rendering (Server Components + client islands)

### Backend
- ASP.NET Core on AWS Lambda (.NET 8)
- Amazon API Gateway (HTTP API)
- Service-oriented architecture (`Controllers` -> `Interfaces` -> `Services` -> `Models`)
- CORS handling via environment-driven `AllowedOrigins`

### Cloud / Deployment
- Amazon S3 for static frontend hosting
- Amazon CloudFront as global CDN + HTTPS edge distribution
- AWS Lambda for serverless API compute
- API Gateway for public REST endpoints
- AWS SAM + CloudFormation for backend infrastructure
- CloudWatch Logs with retention policy for cost control

---

## Architecture

1. Frontend routes render via Next.js (server-first where possible).
2. Data requests go to API Gateway.
3. API Gateway invokes Lambda (`Portfolio.Api`).
4. Lambda responds with typed JSON for portfolio content.
5. CloudFront serves frontend assets from S3 with low latency and HTTPS.

---

## Repository Structure

```text
.
├── app/                               # Next.js App Router routes
│   ├── page.tsx                       # Home
│   ├── about/
│   ├── blog/
│   └── projects/
├── components/                        # UI and client islands
│   ├── about/about-content.tsx
│   ├── home/home-intro.tsx
│   └── ...
├── services/
│   └── api.ts                         # Shared typed frontend API client
├── backend/
│   ├── template.yaml                  # SAM root template (used for deploy)
│   ├── samconfig.toml                 # Saved SAM deploy config
│   └── src/Portfolio.Api/
│       ├── Controllers/
│       ├── Interfaces/
│       ├── Models/
│       ├── Services/
│       ├── Startup.cs
│       └── Portfolio.Api.csproj
└── README.md
```

---

## Backend API Endpoints

- `GET /experiences`
- `GET /projects/featured`
- `GET /blog-posts`
- `GET /blog-posts/latest?count=1`
- `GET /skills`

Base URL example:

`https://<api-id>.execute-api.<region>.amazonaws.com/`

---

## Environment Variables

Create `.env.local` in project root:

```env
NEXT_PUBLIC_API_BASE_URL=https://<api-id>.execute-api.<region>.amazonaws.com
```

---

## Local Development

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd backend/src/Portfolio.Api
dotnet restore
dotnet build
```

---

## Backend Deployment (SAM)

From `backend/`:

```bash
sam validate -t template.yaml --profile om-aws --region ap-south-1
sam build -t template.yaml --profile om-aws --region ap-south-1
sam deploy --guided --profile om-aws --region ap-south-1
```

Subsequent deploys:

```bash
sam build --profile om-aws --region ap-south-1
sam deploy --profile om-aws --region ap-south-1
```

---

## Frontend Hosting (S3 + CloudFront)

The frontend delivery architecture uses:

- **S3 bucket** as static hosting origin
- **CloudFront distribution** as CDN + HTTPS endpoint
- SPA/deep-link fallback behavior configured through CloudFront error handling

Typical deployment flow:

1. Build/export frontend artifacts
2. Upload to S3 bucket
3. Invalidate CloudFront cache
4. Verify HTTPS route access and deep-link behavior

---

## Performance and UX Optimizations

- Server-rendered portfolio routes for faster first load
- Route-level loading and error boundaries
- Client-side request dedupe/inflight protection in `services/api.ts`
- Server-side API revalidation strategy for balanced freshness + speed
- Mobile motion tuning (reduced heavy animation where needed)

---

## Observability and Cost Controls

- CloudWatch logging enabled for Lambda
- Log retention configured in infrastructure template
- Low-cost serverless defaults (HTTP API + Lambda memory/timeout tuning)
- Budget-friendly architecture for AWS free-tier / low-traffic portfolio workloads

---

## Notes

- This portfolio is continuously iterated for performance, reliability, and cloud architecture quality.
- Infrastructure is defined as code to keep deployments reproducible and auditable.
