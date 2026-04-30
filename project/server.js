const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 5000;
const pagesDir = path.join(__dirname, 'pages');

// Middleware to serve the frontend pages from the existing pages folder
app.use(express.static(pagesDir));

// Simulated Backend Data
const platformData = {
    courses: [
        { id: 'CS101', name: 'Introduction to Computer Science', instructor: 'Dr. Sarah', credits: 3 },
        { id: 'DV202', name: 'DevOps & CI/CD Pipeline', instructor: 'Prof. Somnang', credits: 4 },
        { id: 'CC303', name: 'Cloud Architecture', instructor: 'Dr. Alan', credits: 3 }
    ],
    grades: [
        { id: 'AUPP001', name: 'Sok Ly', course: 'DevOps', score: 95, status: 'Passed' },
        { id: 'AUPP002', name: 'Chanrath S.', course: 'Cloud', score: 88, status: 'Passed' },
        { id: 'AUPP003', name: 'Borey K.', course: 'Cybersecurity', score: 92, status: 'Passed' }
    ]
};

const pages = [
    {
        id: 'dashboard',
        path: '/',
        title: 'Dashboard',
        file: 'index.html'
    },
    {
        id: 'courses',
        path: '/courses',
        title: 'Courses',
        file: 'courses.html'
    },
    {
        id: 'grades',
        path: '/grades',
        title: 'Grades',
        file: 'grades.html'
    }
];

// API endpoints for navigation and sample data
app.get('/api/pages', (req, res) => res.json(pages));
app.get('/api/pages/:pageId', (req, res) => {
    const page = pages.find((item) => item.id === req.params.pageId);

    if (!page) {
        return res.status(404).json({ error: 'Page not found' });
    }

    return res.json(page);
});

app.get('/api/courses', (req, res) => res.json(platformData.courses));
app.get('/api/grades', (req, res) => res.json(platformData.grades));
app.get('/health', (req, res) => res.status(200).json({ status: 'UP', service: 'AUPP-LMS' }));

// Route handlers to serve the specific HTML files
app.get('/', (req, res) => res.sendFile(path.join(pagesDir, 'index.html')));
app.get('/courses', (req, res) => res.sendFile(path.join(pagesDir, 'courses.html')));
app.get('/grades', (req, res) => res.sendFile(path.join(pagesDir, 'grades.html')));
app.get('/index.html', (req, res) => res.sendFile(path.join(pagesDir, 'index.html')));
app.get('/courses.html', (req, res) => res.sendFile(path.join(pagesDir, 'courses.html')));
app.get('/grades.html', (req, res) => res.sendFile(path.join(pagesDir, 'grades.html')));

// Convenience route so the root page can act as a simple API-driven entry point.
app.get('/api', (req, res) => {
    res.json({
        service: 'AUPP LMS',
        pages,
        routes: {
            dashboard: '/',
            courses: '/courses',
            grades: '/grades'
        }
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`=========================================`);
    console.log(`AUPP LMS SIMULATION STARTING...`);
    console.log(`Local URL: http://localhost:${PORT}`);
    console.log(`=========================================`);
});