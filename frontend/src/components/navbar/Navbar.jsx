import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SearchIcon, HeartIcon, CartIcon, ChevronRightIcon } from '../common/Icons.jsx';
import { useApp } from '../../context/AppContext.jsx';
import SearchModal from '../common/SearchModal.jsx';

const HOME_LINKS = [
  { label: 'Home', hash: '#home' },
  { label: 'New Arrivals', hash: '#arrivals' },
];

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { wishlistCount, cartCount, categories } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const onJerseyPage = location.pathname.startsWith('/customize-jersey');
  const onAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the Categories dropdown on outside click/tap or Escape — needed
  // now that it opens on click (not just desktop hover), so it must also
  // have an explicit way to close on mobile where there's no "mouse leave".
  useEffect(() => {
    if (!catOpen) return undefined;
    const onDocClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setCatOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setCatOpen(false);
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [catOpen]);

  if (onAdminPage) return null;

  const goHomeSection = (hash) => (e) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname !== '/') {
      navigate('/' + hash);
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`navbar${solid ? ' solid' : ''}`} id="navbar">
        <div className="container nav-inner">
          <Link to="/" className="nav-logo" onClick={() => setOpen(false)}>
            <div className="brandline">VANDA<span className="sw">SPORTS WEAR</span></div>
          </Link>

          <div className={`nav-links${open ? ' open' : ''}`}>
            <a
              href="#home"
              className={`nav-link${!onJerseyPage && location.pathname === '/' ? ' active' : ''}`}
              onClick={goHomeSection('#home')}
            >
              Home
            </a>

            <div
              className="nav-dropdown"
              ref={dropdownRef}
              onMouseEnter={() => setCatOpen(true)}
            >
              <button
                type="button"
                className="nav-link nav-link-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setCatOpen(true);
                }}
                aria-expanded={catOpen}
              >
                Categories
              </button>
              <div className={`nav-dropdown-panel${catOpen ? ' show' : ''}`}>
                {categories.map((c) => (
                  <Link key={c.slug} to={`/category/${c.slug}`} onClick={() => { setOpen(false); setCatOpen(false); }}>
                    {c.name} <ChevronRightIcon width="12" height="12" />
                  </Link>
                ))}
              </div>
            </div>

            <a href="#arrivals" className="nav-link" onClick={goHomeSection('#arrivals')}>New Arrivals</a>

            <Link to="/customize-jersey" className={`nav-link${onJerseyPage ? ' active' : ''}`} onClick={() => setOpen(false)}>
              Customize Jersey
            </Link>
            <Link to="/contact" className="nav-link" onClick={() => setOpen(false)}>Contact</Link>
          </div>

          <div className="nav-right">
            <div className="icon-btn" title="Search" onClick={() => setSearchOpen(true)}><SearchIcon /></div>
            <Link className="icon-btn" title="Wishlist" to="/wishlist">
              <HeartIcon /><span className="badge">{wishlistCount}</span>
            </Link>
            <Link className="icon-btn" title="Cart" to="/cart">
              <CartIcon /><span className="badge">{cartCount}</span>
            </Link>
            <Link className="btn-login" to="/login">Login</Link>
          </div>

          <div className="nav-toggle" onClick={() => setOpen((v) => !v)}>
            <span /><span /><span />
          </div>
        </div>
      </nav>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
