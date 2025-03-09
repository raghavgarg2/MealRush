import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import Cart from "./components/Cart";

import RestaurantDishes from "./components/RestaurantDishes";

import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import RestaurantContainer from "./components/RestaurantContainer";

function App() {
  return (
    <Provider store={appStore}>
      <div className="App">
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <RestaurantContainer />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },

      {
        path: "/restaurantmenu/:resId",
        element: <RestaurantDishes />,
      },
    ],
  },
]);

export default App;
