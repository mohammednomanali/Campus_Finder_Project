import { useMemo, useState } from "react";
import "./App.css";

type ItemType = "Lost" | "Found";

type CampusItem = {
  id: number;
  type: ItemType;
  name: string;
  category: string;
  location: string;
  date: string;
  description: string;
  emoji: string;
  campus: string;
  contact: string;
};

const initialItems: CampusItem[] = [
  {
    id: 1,
    type: "Lost",
    name: "Student ID Card",
    category: "ID Cards",
    location: "Main Library",
    date: "2026-10-14",
    description: "A student ID card lost near the library entrance.",
    emoji: "🪪",
    campus: "Main Campus",
    contact: "student@example.com",
  },
  {
    id: 2,
    type: "Found",
    name: "Blue Water Bottle",
    category: "Accessories",
    location: "Cafeteria",
    date: "2026-10-13",
    description: "A blue bottle was found on a cafeteria table.",
    emoji: "🧴",
    campus: "Main Campus",
    contact: "finder@example.com",
  },
  {
    id: 3,
    type: "Lost",
    name: "Black Backpack",
    category: "Bags",
    location: "Computer Lab",
    date: "2026-10-12",
    description: "A black backpack may have been left in the lab.",
    emoji: "🎒",
    campus: "Main Campus",
    contact: "student@example.com",
  },
  {
    id: 4,
    type: "Found",
    name: "Notebook",
    category: "Books",
    location: "Engineering Block",
    date: "2026-10-11",
    description: "A notebook was found outside a classroom.",
    emoji: "📓",
    campus: "Main Campus",
    contact: "finder@example.com",
  },
  {
    id: 5,
    type: "Lost",
    name: "House Keys",
    category: "Accessories",
    location: "Sports Ground",
    date: "2026-10-10",
    description: "A small set of keys was misplaced after sports practice.",
    emoji: "🔑",
    campus: "North Campus",
    contact: "student@example.com",
  },
  {
    id: 6,
    type: "Found",
    name: "Wireless Earbuds Case",
    category: "Electronics",
    location: "Auditorium",
    date: "2026-10-09",
    description: "An earbuds case was found after an event.",
    emoji: "🎧",
    campus: "North Campus",
    contact: "finder@example.com",
  },
];

const categories = [
  "All Categories",
  "ID Cards",
  "Bags",
  "Books",
  "Electronics",
  "Accessories",
  "Other",
];

const emptyForm = {
  type: "Lost" as ItemType,
  name: "",
  category: "Other",
  location: "",
  date: new Date().toLocaleDateString("en-CA"),
  description: "",
  campus: "Main Campus",
  contact: "",
};

function App() {
  const [items, setItems] = useState<CampusItem[]>(initialItems);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [category, setCategory] = useState("All Categories");
  const [campus, setCampus] = useState("All Campuses");
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CampusItem | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [notice, setNotice] = useState("");

  const filteredItems = useMemo(() => {
    const query = search.toLowerCase().trim();

    return items.filter((item) => {
      const matchesSearch = [
        item.name,
        item.location,
        item.description,
        item.category,
      ].some((value) => value.toLowerCase().includes(query));

      const matchesType = filter === "All" || item.type === filter;
      const matchesCategory =
        category === "All Categories" || item.category === category;
      const matchesCampus =
        campus === "All Campuses" || item.campus === campus;

      return (
        matchesSearch &&
        matchesType &&
        matchesCategory &&
        matchesCampus
      );
    });
  }, [items, search, filter, category, campus]);

  function submitReport(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const emojiByCategory: Record<string, string> = {
      "ID Cards": "🪪",
      Bags: "🎒",
      Books: "📓",
      Electronics: "🎧",
      Accessories: "🔑",
      Other: "📦",
    };

    const newItem: CampusItem = {
      ...form,
      id: Date.now(),
      emoji: emojiByCategory[form.category] || "📦",
    };

    setItems((previous) => [newItem, ...previous]);
    setSearch("");
    setFilter("All");
    setCategory("All Categories");
    setCampus("All Campuses");
    setForm(emptyForm);
    setShowForm(false);
    setNotice("Your report has been added successfully!");
    window.setTimeout(() => setNotice(""), 3500);
  }

  function openReport(type: ItemType) {
    setForm({ ...emptyForm, type });
    setShowForm(true);
    setSelectedItem(null);
  }

  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#home" aria-label="Campus Finder home">
          <span className="brand-icon">⌖</span>
          <span>Campus<span className="brand-accent">Finder</span></span>
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#items">Browse Items</a>
          <a href="#how-it-works">How It Works</a>
        </nav>

        <button className="button button-primary nav-button"
          onClick={() => openReport("Lost")}>
          + Report Item
        </button>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">YOUR CAMPUS, CONNECTED</span>
            <h1>Lost something?<br />
              <span>Let’s find it together.</span>
            </h1>
            <p className="hero-description">
              A smarter way to reconnect students with their lost belongings.
              Search campus reports or help someone find what they lost.
            </p>

            <div className="hero-actions">
              <button className="button button-primary"
                onClick={() => {
                  setFilter("Lost");
                  document.getElementById("items")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}>
                Find Lost Items →
              </button>
              <button className="button button-light"
                onClick={() => openReport("Found")}>
                + Report Found Item
              </button>
            </div>

            <div className="hero-note">
              <span>✓</span> Built for students, by students
            </div>
          </div>

          <div className="hero-art" aria-label="Illustration of lost belongings">
            <div className="art-circle"></div>
            <div className="art-card art-card-one">
              <span>🎒</span>
              <small>Backpack</small>
            </div>
            <div className="art-card art-card-two">
              <span>🔑</span>
              <small>Keys</small>
            </div>
            <div className="art-card art-card-three">
              <span>🪪</span>
              <small>ID Card</small>
            </div>
            <div className="art-main-icon">🔎</div>
            <div className="art-caption">Every item deserves a way home.</div>
          </div>
        </section>

        <section className="stats">
          <div className="stat">
            <span className="stat-icon">📋</span>
            <div><strong>{items.length}</strong><small>Total Reports</small></div>
          </div>
          <div className="stat">
            <span className="stat-icon">🔍</span>
            <div>
              <strong>{items.filter((item) => item.type === "Lost").length}</strong>
              <small>Lost Reports</small>
            </div>
          </div>
          <div className="stat">
            <span className="stat-icon">🤝</span>
            <div>
              <strong>{items.filter((item) => item.type === "Found").length}</strong>
              <small>Found Items</small>
            </div>
          </div>
          <div className="stat">
            <span className="stat-icon">🏫</span>
            <div><strong>2</strong><small>Sample Campuses</small></div>
          </div>
        </section>

        <section className="items-section" id="items">
          <div className="section-heading">
            <div>
              <span className="eyebrow">THE LOST & FOUND BOARD</span>
              <h2>Find what you’re looking for.</h2>
              <p>Explore reports from your campus community.</p>
            </div>
            <button className="button button-primary"
              onClick={() => openReport("Lost")}>
              + Post an Item
            </button>
          </div>

          <div className="search-panel">
            <label className="search-box">
              <span>⌕</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search items, locations, keywords..."
                aria-label="Search items"
              />
            </label>

            <select value={campus} onChange={(event) => setCampus(event.target.value)}
              aria-label="Filter by campus">
              <option>All Campuses</option>
              <option>Main Campus</option>
              <option>North Campus</option>
            </select>

            <select value={category}
              onChange={(event) => setCategory(event.target.value)}
              aria-label="Filter by category">
              {categories.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </div>

          <div className="filter-row">
            {["All", "Lost", "Found"].map((value) => (
              <button
                key={value}
                className={`filter-chip ${filter === value ? "active" : ""}`}
                onClick={() => setFilter(value)}
              >
                {value === "All" ? "All Items" : `${value} Items`}
              </button>
            ))}
            <span className="results-count">
              {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"} found
            </span>
          </div>

          <div className="item-grid">
            {filteredItems.map((item) => (
              <article className="item-card" key={item.id}>
                <div className={`item-visual ${item.type.toLowerCase()}`}>
                  <span className={`status-badge ${item.type.toLowerCase()}`}>
                    {item.type === "Lost" ? "● Lost Item" : "● Found Item"}
                  </span>
                  <span className="item-emoji">{item.emoji}</span>
                </div>

                <div className="item-content">
                  <div className="item-category">{item.category}</div>
                  <h3>{item.name}</h3>
                  <p className="item-description">{item.description}</p>

                  <div className="item-meta">
                    <span>📍 {item.location}</span>
                    <span>📅 {item.date}</span>
                  </div>

                  <div className="item-footer">
                    <span className="campus-tag">🏫 {item.campus}</span>
                    <button className="text-button"
                      onClick={() => setSelectedItem(item)}>
                      View Details →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="empty-state">
              <span>🔎</span>
              <h3>No matching items found</h3>
              <p>Try another search or report the item yourself.</p>
              <button className="button button-primary"
                onClick={() => openReport("Lost")}>
                Report an Item
              </button>
            </div>
          )}
        </section>

        <section className="how-section" id="how-it-works">
          <span className="eyebrow">SIMPLE. HELPFUL. CAMPUS-FOCUSED.</span>
          <h2>How Campus Finder works</h2>
          <p className="how-intro">Three simple steps can help an item find its owner.</p>

          <div className="how-grid">
            <article className="how-card">
              <span className="step-number">01</span>
              <span className="how-icon">📝</span>
              <h3>Report an Item</h3>
              <p>Share the item name, location, date and useful details.</p>
            </article>
            <article className="how-card">
              <span className="step-number">02</span>
              <span className="how-icon">🔎</span>
              <h3>Search the Board</h3>
              <p>Use search and filters to find a matching lost or found report.</p>
            </article>
            <article className="how-card">
              <span className="step-number">03</span>
              <span className="how-icon">🤝</span>
              <h3>Reconnect</h3>
              <p>Check the report details and use the listed contact to coordinate safely.</p>
            </article>
          </div>
        </section>

        <section className="cta">
          <div>
            <h2>Found something on campus?</h2>
            <p>A small act of kindness can make someone's day.</p>
          </div>
          <button className="button button-white"
            onClick={() => openReport("Found")}>
            Report a Found Item →
          </button>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-icon">⌖</span>
          <span>Campus<span className="brand-accent">Finder</span></span>
        </a>
        <p>Helping campus communities reconnect with their belongings.</p>
        <small>© 2026 Campus Finder · IBM SkillsBuild Project</small>
      </footer>

      {notice && <div className="toast" role="status">✓ {notice}</div>}

      {showForm && (
        <div className="modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowForm(false);
          }}>
          <section className="modal" role="dialog" aria-modal="true"
            aria-labelledby="report-title">
            <button className="modal-close" onClick={() => setShowForm(false)}
              aria-label="Close form">×</button>
            <span className="eyebrow">CAMPUS COMMUNITY</span>
            <h2 id="report-title">Report an Item</h2>
            <p className="modal-intro">Enter the details below to add a report.</p>

            <form onSubmit={submitReport}>
              <label>Report Type
                <div className="type-options">
                  {(["Lost", "Found"] as ItemType[]).map((value) => (
                    <button key={value} type="button"
                      className={`type-option ${form.type === value ? "selected" : ""}`}
                      onClick={() => setForm({ ...form, type: value })}>
                      {value === "Lost" ? "🔍 Lost Item" : "🎉 Found Item"}
                    </button>
                  ))}
                </div>
              </label>

              <label>Item Name *
                <input required maxLength={80} value={form.name}
                  placeholder="e.g. Black backpack"
                  onChange={(event) => setForm({ ...form, name: event.target.value })} />
              </label>

              <div className="form-row">
                <label>Category *
                  <select required value={form.category}
                    onChange={(event) => setForm({ ...form, category: event.target.value })}>
                    {categories.filter((value) => value !== "All Categories").map((value) => (
                      <option key={value}>{value}</option>
                    ))}
                  </select>
                </label>

                <label>Campus *
                  <select required value={form.campus}
                    onChange={(event) => setForm({ ...form, campus: event.target.value })}>
                    <option>Main Campus</option>
                    <option>North Campus</option>
                  </select>
                </label>
              </div>

              <label>Location *
                <input required maxLength={120} value={form.location}
                  placeholder="e.g. Library, Block A"
                  onChange={(event) => setForm({ ...form, location: event.target.value })} />
              </label>

              <label>Date *
                <input required type="date" value={form.date}
                  max={new Date().toLocaleDateString("en-CA")}
                  onChange={(event) => setForm({ ...form, date: event.target.value })} />
              </label>

              <label>Description *
                <textarea required maxLength={500} rows={3} value={form.description}
                  placeholder="Describe the item and where it was last seen or found."
                  onChange={(event) => setForm({ ...form, description: event.target.value })} />
              </label>

              <label>Contact Email *
                <input required type="email" maxLength={120} value={form.contact}
                  placeholder="you@example.com"
                  onChange={(event) => setForm({ ...form, contact: event.target.value })} />
              </label>

              <p className="privacy-note">
                For this demo, reports are visible in this browser session.
                Use a test email and avoid posting private information.
              </p>

              <button className="button button-primary submit-button" type="submit">
                Submit Report →
              </button>
            </form>
          </section>
        </div>
      )}

      {selectedItem && (
        <div className="modal-overlay" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSelectedItem(null);
        }}>
          <section className="modal details-modal" role="dialog" aria-modal="true"
            aria-labelledby="details-title">
            <button className="modal-close" onClick={() => setSelectedItem(null)}
              aria-label="Close details">×</button>
            <div className={`detail-visual ${selectedItem.type.toLowerCase()}`}>
              <span>{selectedItem.emoji}</span>
            </div>
            <span className={`status-badge ${selectedItem.type.toLowerCase()}`}>
              {selectedItem.type} Item
            </span>
            <h2 id="details-title">{selectedItem.name}</h2>
            <p>{selectedItem.description}</p>
            <div className="detail-list">
              <p><strong>Category:</strong> {selectedItem.category}</p>
              <p><strong>Campus:</strong> {selectedItem.campus}</p>
              <p><strong>Location:</strong> {selectedItem.location}</p>
              <p><strong>Date:</strong> {selectedItem.date}</p>
              <p><strong>Contact:</strong> {selectedItem.contact}</p>
            </div>
            <p className="privacy-note">
              Verify ownership before handing over an item. Never share passwords
              or sensitive personal details.
            </p>
            <button className="button button-primary submit-button"
              onClick={() => setSelectedItem(null)}>Close Details</button>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;