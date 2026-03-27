"use client";
import { useState } from "react";
import "./style.css";

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="top-header">
        <div className="country-select">
          <div className="country-btn">
            🇲🇦 MAROC <small>MAD</small>
          </div>
        </div>

        <h1 className="logo">MenSavil</h1>

        <div className="right">
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={() => setSearchOpen(true)}
          ></i>

          <i
            className="fa-regular fa-user"
            onClick={() => setLoginOpen(true)}
          ></i>

          <i className="fa-solid fa-cart-shopping"></i>
        </div>

        {/* SEARCH */}
        {searchOpen && (
          <div className="search-bar">
            <input placeholder="Rechercher un produit..." />
            <i
              className="fa-solid fa-xmark"
              onClick={() => setSearchOpen(false)}
            ></i>
          </div>
        )}

        {/* LOGIN */}
        {loginOpen && (
          <div className="login-overlay">
            <div className="login-modal">
              <span
                className="close-login"
                onClick={() => setLoginOpen(false)}
              >
                ×
              </span>

              <h4>MENSAVIL</h4>
              <h2>Se connecter</h2>

              <button className="google-btn">
                Continuer avec Google
              </button>

              <form>
                <input type="email" placeholder="Email" required />
                <button>Continuer</button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* NAVBAR */}
      <nav className="menu">
        <a href="#">HOME</a>
        <a href="#">PRODUCTS</a>
        <a href="#">TUTORIALS</a>
        <a href="#">SUBSCRIPTION</a>
        <a href="#">CONTACT</a>
      </nav>

      {/* HERO */}
      <section className="hero-slider">
        <div
          className="slide"
          style={{ backgroundImage: "url('/body.jpeg')" }}
        >
          <h1>Best-Sellers</h1>
          <p>Produits premium pour homme</p>
        </div>
      </section>

      {/* PRODUITS */}
      <section className="products-section">
        <h2>NOS PRODUITS</h2>

        <div className="products-grid">
          <div className="product-card">
            <img src="/champo.png" />
            <h3>Shampooing naturel</h3>
            <p>Nettoie et renforce</p>
            <span>149 MAD</span>
          </div>

          <div className="product-card">
            <img src="/huile.png" />
            <h3>Huile barbe</h3>
            <p>Adoucit et parfume</p>
            <span>99 MAD</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="bottom-fixed-bar">
        <p>© 2026 MenSavil</p>
      </div>
    </>
  );
}