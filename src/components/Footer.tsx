import React, { useState, useEffect, useRef } from "react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer
      ref={footerRef}
      className="bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purp/[0.03] rounded-full blur-3xl"></div>
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-gray-100">
        <div
          className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="relative z-10 lg:flex lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-3xl font-light text-gray-900">
                Stay updated with new properties
              </h2>
              <p className="mt-4 text-gray-500">
                Get notified about new listings and exclusive offers.
              </p>
            </div>

            <div className="mt-8 lg:mt-0 lg:ml-8">
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3 text-gray-900 bg-white border border-gray-200 rounded-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                />
                <button
                  type="submit"
                  className="px-8 py-3 text-white bg-primary rounded-full hover:bg-primary/90 transition-all duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div>
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {["About", "Careers", "Contact", "Blog"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {["Listings", "Property Management", "Rentals", "Sales"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              {["Help Center", "Guides", "FAQs", "Documentation"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`mt-16 pt-8 border-t border-gray-100 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-gray-500">
                © {new Date().getFullYear()} Property Centre. All rights
                reserved.
              </span>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-gray-900 transition-colors duration-200"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-900 transition-colors duration-200"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-900 transition-colors duration-200"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
