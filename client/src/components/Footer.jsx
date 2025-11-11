import { Link } from "react-router-dom";
import '../styles/footer.css';

const navGroups = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "#about" },
      { label: "Vault", href: "/dashboard" },
      { label: "Knowledge Graph", href: "#features" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#" },
      { label: "Press Kit", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "#" },
      { label: "Security", href: "#" },
      { label: "Support", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-gradient" />
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-spark" />
            <span className="footer-name">CogniVault</span>
          </div>
          <p>
            Your memories, illuminated. Capture every idea with AI guardrails that make recall instant and private.
          </p>

          <form className="footer-form">
            <label htmlFor="email" className="sr-only">Subscribe for updates</label>
            <input id="email" type="email" placeholder="Enter your email" />
            <button type="submit">Stay in the loop</button>
          </form>
        </div>

        <div className="footer-links">
          {navGroups.map((group) => (
            <div key={group.title} className="footer-column">
              <h4>{group.title}</h4>
              <ul>
                {group.links.map((item) =>
                  item.href.startsWith("/") ? (
                    <li key={item.label}>
                      <Link to={item.href}>{item.label}</Link>
                    </li>
                  ) : (
                    <li key={item.label}>
                      <a href={item.href}>{item.label}</a>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-meta">
        <div className="container footer-meta-inner">
          <span>© {new Date().getFullYear()} CogniVault. All rights reserved.</span>
          <div className="footer-meta-links">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

