import { useState, useEffect } from "react";

const useRestaurantMenu = (resId) => {
  const [resMenu, setResMenu] = useState(null);

  useEffect(() => {
    if (resId) {
      fetchMenu(resId);
    }
  }, [resId]);

  const fetchMenu = async (resId) => {
    const proxyUrl = "https://cors-anywhere-hrs9.onrender.com/";
    const apiUrl = `${proxyUrl}https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=30.32750&lng=78.03250&restaurantId=793100&catalog_qa=undefined&submitAction=ENTER${resId}`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      setResMenu(json.data);
    } catch (error) {
      console.error("Error fetching restaurant menu:", error);
    }
  };

  return resMenu;
};

export default useRestaurantMenu;
