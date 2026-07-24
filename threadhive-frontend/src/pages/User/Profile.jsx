import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Container, Card, Button, Form } from "react-bootstrap";
import "./Profile.css";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    website: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
        location: user.location || "",
        website: user.website || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateUser({ ...user, ...form });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
        location: user.location || "",
        website: user.website || "",
      });
    }
  };

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="profile-wrapper">
      <Container fluid className="p-0">
        <Card className="profile-card border-0 rounded-3 shadow-sm mx-auto">
          <Card.Body className="p-4">

            {/* Top bar */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <Button
                variant="outline-secondary"
                size="sm"
                className="profile-back-btn"
                onClick={() => navigate("/home")}
              >
                ← Back to Home
              </Button>
              <Button
                variant={editing ? "outline-danger" : "outline-primary"}
                size="sm"
                className="profile-edit-btn"
                onClick={() => (editing ? handleCancel() : setEditing(true))}
              >
                {editing ? "✕ Cancel" : "✏ Edit Profile"}
              </Button>
            </div>

            {/* Avatar + name */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="profile-avatar">{initial}</div>
              <div>
                <p className="profile-name mb-0">{user?.name || "User"}</p>
                <p className="profile-email mb-0">{user?.email || ""}</p>
              </div>
            </div>

            <hr className="profile-divider" />

            {editing ? (
              /* Edit mode */
              <Form onSubmit={handleSave}>
                <Form.Group className="mb-3">
                  <Form.Label className="profile-field-label">Name</Form.Label>
                  <Form.Control
                    className="profile-form-control"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="profile-field-label">Email</Form.Label>
                  <Form.Control
                    className="profile-form-control"
                    name="email"
                    type="email"
                    value={form.email}
                    disabled
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="profile-field-label">Bio</Form.Label>
                  <Form.Control
                    className="profile-form-control"
                    as="textarea"
                    rows={3}
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="profile-field-label">Location</Form.Label>
                  <Form.Control
                    className="profile-form-control"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="profile-field-label">Website</Form.Label>
                  <Form.Control
                    className="profile-form-control"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    placeholder="https://yourwebsite.com"
                  />
                </Form.Group>

                <div className="d-flex gap-2 justify-content-end">
                  <Button variant="outline-secondary" size="sm" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" type="submit">
                    Save Changes
                  </Button>
                </div>
              </Form>
            ) : (
              /* View mode */
              <div>
                {[
                  { label: "Name", value: user?.name },
                  { label: "Email", value: user?.email },
                  { label: "Bio", value: user?.bio },
                  { label: "Location", value: user?.location },
                  { label: "Website", value: user?.website },
                ].map(({ label, value }) => (
                  <div key={label} className="mb-3">
                    <p className="profile-field-label mb-1">{label}</p>
                    {value ? (
                      <p className="profile-field-value">{value}</p>
                    ) : (
                      <p className="profile-field-empty">Not set</p>
                    )}
                  </div>
                ))}
              </div>
            )}

          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
