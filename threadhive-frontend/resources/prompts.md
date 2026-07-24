Create Thread Form Toggle Prompt
```
In src/pages/User/Home.jsx, add a "Create Thread" button that toggles a form into view.

Requirements:
- Add a boolean state variable called showForm, initialized to false
- Add a "➕ Create" button in the heading row of the home feed, aligned to the right of the "🏠 Home Feed" heading
- When showForm is true, render the CreateThreadForm component (from src/components/Forms/CreateThreadForm.jsx) below the heading row
- Pass an onClose prop to CreateThreadForm that sets showForm back to false
- When showForm is true, change the button label to "✕ Close"
- The button should toggle showForm on each click
```
---
Build Profile Page Prompt

```
Build the Profile component in src/pages/User/Profile.jsx.

Requirements:
- Import and use the useAuth() hook from src/context/AuthContext.jsx to get the current user and the updateUser function:
  const { user, updateUser } = useAuth();
- Display the user's name, email, bio, location, and website
- Show an avatar circle with the user's first initial (uppercase); fall back to "U" if name is not set
- Add a "← Back to Home" button that uses useNavigate() to navigate to /home
- Add an "✏️ Edit Profile" toggle button that shows and hides an edit form
- In view mode, display each field (name, email, bio, location, website) with a label
- In edit mode, show form inputs for name, bio, location, and website — the email field must be present but disabled
- On save: call updateUser({ ...user, ...form }) to persist the changes, then set editing to false
- On cancel: set editing to false without saving
- Add a useEffect that syncs the form state when the user object changes (so the displayed values update after a save)
- Use the CSS classes already defined in Profile.css
```

---
Playwright CLI Authentication Flow Test Prompt
```
Using playwright-cli, test the full authentication flow for the ThreadHive app running at http://localhost:5173.

Test that a new user can register, log in, and is redirected to the home page upon successful login. Then test that the user can log out and is redirected to the login page.
```