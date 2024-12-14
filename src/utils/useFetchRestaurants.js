import { useState,useEffect } from "react";

const useFetchRestaurants = () =>{
    const[resList,setResList] = useState(null);

    useEffect(() =>{
        fetchData();
    },[]);

    const fetchData  = async () =>{
        
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.5355161&lng=77.3910265&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
        const json = await data.json();
        setResList(json.data);
    }


        


    return resList;
}
export default useFetchRestaurants;