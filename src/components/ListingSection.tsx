import React, { useEffect, useState, useRef } from "react";
import { ListingCard } from "./ListingCard";
import { useStore } from "../hooks/useStore";
import axios from "axios";

interface Accommodation {
  id: string;
  images: string[];
  address: string;
  name: string;
}

export const ListingSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const accommodationsPerPage = 9;
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const listingRef = useRef<HTMLDivElement>(null);
  const store = useStore();

  const indexOfLastAccommodation = currentPage * accommodationsPerPage;
  const indexOfFirstAccommodation =
    indexOfLastAccommodation - accommodationsPerPage;
  const currentAccommodations = accommodations?.slice(
    indexOfFirstAccommodation,
    indexOfLastAccommodation
  );

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(store.url + "/accommodation");
        setAccommodations(response?.data?.accommodations);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSkills();
  }, [store.url]);

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cardId = Number(entry.target.getAttribute("data-card-id"));
          setVisibleCards((prev) => new Set(prev).add(cardId));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    const cards = document.querySelectorAll(".listing-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [currentAccommodations?.length]);

  const handleNextPage = () => {
    if (
      currentPage < Math.ceil(accommodations?.length / accommodationsPerPage)
    ) {
      setCurrentPage(currentPage + 1);
      setVisibleCards(new Set());
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setVisibleCards(new Set());
    }
  };

  return (
    <div ref={listingRef} className="relative min-h-screen bg-gray-50/50 py-16">
      {currentAccommodations?.length > 0 ? (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {currentAccommodations?.map((accommodation, index) => (
                <div
                  key={accommodation.id}
                  data-card-id={index}
                  className={`listing-card listing-hover ${
                    visibleCards.has(index) ? "visible" : ""
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <ListingCard
                    rating="w"
                    price="1000/night"
                    img={
                      accommodation.images?.[0] ||
                      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                    }
                    location={accommodation.address}
                    name={accommodation.name}
                    id={Number(accommodation.id)}
                  />
                </div>
              ))}
            </div>

            <div className="mt-16 flex justify-center gap-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-8 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={
                  currentPage ===
                    Math.ceil(accommodations?.length / accommodationsPerPage) ||
                  currentAccommodations?.length === 0
                }
                className="px-8 py-3 text-sm font-medium text-white bg-primary border border-transparent rounded-full shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="h-[50vh] flex items-center justify-center">
          <div className="text-2xl text-gray-500 font-light text-center opacity-0 animate-[fade-in_0.5s_ease_forwards]">
            No accommodations listings yet.
          </div>
        </div>
      )}
    </div>
  );
};
