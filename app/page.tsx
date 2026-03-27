"use client"
import { useState } from "react";
import { MenuIcon, SearchIcon, ShoppingCartIcon, XIcon } from "lucide-react";

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [country, setCountry] = useState("🇲🇦 Morocco (MAD)");
  const toggleMenu = () => setMenuOpen((isMenuOpen) => !isMenuOpen)
  const toggleSearch = () => setSearchOpen((isSeachOpen) => !isSeachOpen)
  // const toggleShopping = () => setShoppingOpen((isShoppingOpen) => !isShoppingOpen)

return (
<>
       {/* 🔝 NAVBAR */}
      <header className="flex justify-between items-center bg-mauve-100 p-2 px-4">
        <MenuIcon onClick={toggleMenu} />
        <h1 className="text-2xl md:text-4xl">Mensavil</h1>
        
        {/* ICONS */}
        <div  className="flex justify-center items-center gap-4">
          <SearchIcon onClick = {toggleSearch}/>

          <ShoppingCartIcon />
        </div>

        {/* SEARCH OVERLAY */}
        {searchOpen && (
          <div className="search-overlay">
            <div className="search-content">
              <input type="text" placeholder="Search products..." />
            </div>
          </div>
        )}

        {/* CART PANEL */}
          {/* <div className="cart-panel">
            <div className="cart-header">
              <h3>Cart</h3>
              <span onClick={() => setCartOpen(false)}>✕</span>
            </div>

            <div className="cart-body">
              <p>Your cart is empty</p>
            </div>
          </div> */}
      </header>

      {/* 📌 SIDEBAR */}
      <div className={`sidebar ${menuOpen ? "active" : ""}`}>
        {/* Header */}
        <div className="sidebar-header">
          <XIcon  onClick={() => setMenuOpen(false)}/>
        </div>

        {/* Links */}
        <div className="menu-links">
          <a href="index.html">Home</a>
          <a href="PRODUCTS.html">Products</a>
          <a href="TUTORIALS.html">Tutorials</a>
          <a href="MANAGE-SUBSCRIPTION.html">Manage Subscription</a>
          <a href="CONTACT-US.html">Contact Us</a>
        </div>

        {/* Country */}
        <div className="country-select">
          <div
            className="country-btn"
            onClick={() => setCountryOpen(!countryOpen)}
          >
            {country}
            <i className="fas fa-chevron-down"></i>
          </div>

          {countryOpen && (
            <div className="country-dropdown">
              <div onClick={() => setCountry("🇲🇦 Morocco (MAD)")}>
                🇲🇦 Morocco (MAD)
              </div>
              <div onClick={() => setCountry("🇫🇷 France (EUR)")}>
                🇫🇷 France (EUR)
              </div>
              <div onClick={() => setCountry("🇺🇸 USA (USD)")}>
                🇺🇸 USA (USD)
              </div>
              <div onClick={() => setCountry("🇪🇸 Spain (EUR)")}>
                🇪🇸 Spain (EUR)
              </div>
              <div onClick={() => setCountry("🇦🇪 UAE (AED)")}>
                🇦🇪 UAE (AED)
              </div>
            </div>
          )}
        </div>

        {/* Login */}
        <div className="login">
          <i className="far fa-user"></i>
          <span>Log in</span>
        </div>

        {/* Socials */}
        <div className="socials">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp">
            <i className="fab fa-whatsapp"></i>
          </a>
          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="social-icon tiktok">
            <i className="fab fa-tiktok"></i>
          </a>
        </div>

        {/* Footer */}
        <div className="bottom-bar">
          <footer>
            <div className="scroll-container">
              <p className="scroll-text">
                © 2026 MenSavil — Tous droits réservés • Produits cosmétiques premium
              </p>
            </div>
          </footer>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)}></div>
      )}
    </>
  );
}
