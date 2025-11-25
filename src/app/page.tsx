"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

const navItems = ["Women", "Men", "Kids", "Essentials", "Stories"];

const shippingPerks = [
  { label: "Free global shipping", value: "For orders above $80" },
  { label: "Complimentary returns", value: "30 day window" },
  { label: "Responsible sourcing", value: "Handmade partners" },
];

const priceSteps = ["Under $50", "$50 – $120", "$120 – $220", "Above $220"];

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortType, setSortType] = useState("recommended");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  // Load products
  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=12")
      .then((res) => res.json())
      .then((data) => {
        const cleaned = data.map((item: any) => {
          const { description, ...rest } = item;
          return rest;
        });
        setProducts(cleaned);
      });
  }, []);

  // Load cart from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      const parsed = JSON.parse(stored);
      setCart(parsed);
      setCartCount(parsed.reduce((sum: number, item: CartItem) => sum + item.quantity, 0));
    }
  }, []);

  // Save cart to localStorage
  const updateCartStorage = (newCart: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  // Add to Bag function
  const addToBag = (product: Product) => {
    const existing = cart.find((item) => item.id === product.id);

    let updatedCart;

    if (existing) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        { id: product.id, title: product.title, price: product.price, image: product.image, quantity: 1 },
      ];
    }

    setCart(updatedCart);
    updateCartStorage(updatedCart);

    // Update bag count
    const total = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  };

  // Sorting Logic
  const sortedProducts = [...products].sort((a, b) => {
    if (sortType === "price-low") return a.price - b.price;
    if (sortType === "price-high") return b.price - a.price;
    if (sortType === "rating") return b.rating.rate - a.rating.rate;
    return 0;
  });

  // Count categories
  const categoryCount = products.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="page-shell">

      {/* HERO */}
      <div className="hero-strip">
        Discover the new artisanal capsule — shipping now worldwide
      </div>

      {/* HEADER */}
      <header className="top-bar">
        <span className="logo">Logo</span>

        <nav className="nav-links">
          {navItems.map((item) => (
            <a key={item}>{item}</a>
          ))}
        </nav>

        <div className="utility-actions">
          <span>Search</span>
          <span>Account</span>
          <span className="utility-chip">Bag ({cartCount})</span>
        </div>
      </header>

      {/* MAIN CATALOG */}
      <main className="catalog-layout">

        {/* FILTER PANEL */}
        <aside className="filter-panel">
          <section>
            <h3>Categories</h3>
            <div className="filter-list">
              {Object.entries(categoryCount).map(([category, count], index) => (
                <button
                  key={category}
                  className={index === 0 ? "filter-active" : ""}
                >
                  <span>{category}</span>
                  <span>{count}</span>
                </button>
              ))}
            </div>
          </section>

          <div className="filters-divider" />

          <section>
            <h3>Price</h3>
            <div className="filter-list">
              {priceSteps.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </section>

          <div className="filters-divider" />

          <section>
            <h3>Highlights</h3>
            <div className="filter-list">
              {shippingPerks.map((perk) => (
                <span key={perk.label}>
                  {perk.label} <br />
                  <small>{perk.value}</small>
                </span>
              ))}
            </div>
          </section>
        </aside>

        {/* PRODUCTS */}
        <section className="catalog-section">
          <div className="catalog-header">
            <div>
              <p className="catalog-heading">Discover our products</p>
              <h1>Discover Our Products</h1>
            </div>

            <div className="catalog-controls">
              <span>Showing {products.length} items</span>

              <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="sort-select"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          <div className="product-grid">
            {sortedProducts.map((product, index) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="product-photo"
                  />
                </div>

                <div className="product-meta">
                  <p className="product-category">{product.category}</p>
                  <h2>{product.title}</h2>

                  <div className="product-price-row">
                    <strong>{formatter.format(product.price)}</strong>
                    <button
                      className="pill-button"
                      onClick={() => addToBag(product)}
                    >
                      Add to bag
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
