import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";

const RestaurantContainer = () => {
  const [resList, setResList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.32750&lng=78.03250&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();
    console.log(json);

    setResList(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredList(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) {
    return (
      <h1 className="text-center mt-20 text-red-500 font-semibold">
        Looks like you are offline
      </h1>
    );
  }

  return resList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="p-6">
      <div className="flex items-center justify-center mb-6 space-x-4">
        <input
          className="bg-gray-200 rounded-2xl w-2/5 p-3 text-lg font-semibold text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
          type="text"
          placeholder="Search for food, grocery, drinks, etc."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <button
          onClick={() => {
            setFilteredList(
              resList.filter((restaurant) =>
                restaurant.info.name.toLowerCase().includes(searchText)
              )
            );
          }}
          className="bg-black px-6 py-3 rounded-xl text-white font-semibold hover:bg-gray-800 transition duration-200"
        >
          Search
        </button>
        <button
          onClick={() => {
            setFilteredList(
              resList.filter((restaurant) => restaurant.info.avgRating > 4)
            );
          }}
          className="bg-black px-6 py-3 rounded-xl text-white font-semibold hover:bg-gray-800 transition duration-200"
        >
          Top Rated
        </button>
      </div>

      <div className="m-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredList.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            // to={`/restaurantmenu/${restaurant.info.id}`}
            to={"/restaurantmenu/:restaurant.info.id"}
            className="transition-transform transform hover:scale-105"
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RestaurantContainer;
