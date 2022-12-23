import React from "react";
import Layout from "./pages/Layout";
import store from './store';
import { Provider } from "react-redux";
function App() {
  return ( 
    <Provider store={store}>
      <Layout />
    </Provider>
  )
}

export default App;
