### Phase 1 — Fix Foundation and Branding (Week 1)

Install Tailwind CSS so the existing classes actually work

Remove the stray .txt duplicate file

Set up .env for API base URL (no more hardcoded IPs)

Add Mphatek branding: colours from their website (dark navy #0a1628, accent blue #1e88e5, white), company logo in the header

Update index.html title and meta tags

Clean up App.css (remove CRA defaults)

Fix the QR page to use the env variable and match the brand

### Phase 2 — Complete Visitor Registration Form (Week 1-2)

Fix the validation bug (mismatched error keys)

Sync the "Number of Visitors" input with the "Add Visitor" button

Add proper phone number format validation

Add email format validation

Add a success screen after submission (not just a banner)

Make the form fully mobile-responsive (it's a QR-scanned flow, so mobile is primary)

## Phase 3 — Backend API with Node.js + Express (Week 2-4)

Set up a server/ folder with Express

Connect to SQL Server using the schema from the spec (the DB interns will have this ready)

Build these API endpoints:

POST /api/meetings — create meeting + visitors

GET /api/employees — list employees (replace hardcoded data)

GET /api/locations — list locations (replace hardcoded data)

PUT /api/meetings/:id/checkout — mark check-out

GET /api/meetings — list meetings with filters (date, status, employee)

GET /api/visitors — visitor history with search

GET /api/dashboard/stats — today's counts for the dashboard

Add basic error handling and input validation with a library like express-validator

Add environment config for DB connection string

### Phase 4 — Admin Dashboard (Week 4-6)

Add a /login route with simple role-based auth (JWT)

Build the admin dashboard at /admin with:

Today's visitors count

Checked-in visitors list

Overstayed visitors (check-in > X hours, no check-out)

Upcoming meetings

Add a visitors table with search and date filters

Add check-out button for reception staff

Add Excel export (using a library like xlsx)

All styled to match Mphatek brand

### Phase 5 — Notifications (Week 6-7)

Set up Nodemailer with SMTP for email notifications

Send email to host employee when a visitor registers

Include visitor name, purpose, location, contact, arrival time

Log notifications to the Notifications table

Show notification status on the admin dashboard

### Phase 6 — Polish and Testing (Week 7-8)

Role-based route protection (Admin sees everything, Reception sees check-in/out, Employee sees their own meetings)

Audit logging for all actions

Final responsive design pass on all pages

Test all flows end-to-end

Clean up code, add comments where needed for the junior developer to understand

Write a simple README with setup instructions
