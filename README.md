# AUPP LMS Sample Project

Small Express-based sample project for a pipeline architecture demo. The frontend is served from the existing `project/` folder and the backend exposes simple navigation/data endpoints.

## Run

```bash
npm install
npm start
```

Open `http://localhost:3000` to view the dashboard.

## Pages

- `/` - Dashboard
- `/courses` - Course catalog
- `/grades` - Internal grade sheet

## API

- `/api/pages` - list available pages and their routes
- `/api/pages/:pageId` - get one page by id (`dashboard`, `courses`, `grades`)
- `/api/courses` - sample course data
- `/api/grades` - sample grade data
- `/health` - health check