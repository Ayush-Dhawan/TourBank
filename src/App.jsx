import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate} from "react-router-dom";

import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import HomePage from "./pages/HomePage";
import AppLayout from "./pages/AppLayout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Form from './components/Form'
import CityList from "./components/CityList";
import CountriesList from "./components/CountriesList";
import City from "./components/City";
import { CitiesProvider} from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoutes from "./pages/ProtectedRoutes";

export default function App() {

  return (
    
      <CitiesProvider >
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/app" element={<ProtectedRoutes><AppLayout /></ProtectedRoutes>}>
          <Route index element={<Navigate replace to="cities" />} />
          <Route path="cities" element={<CityList />} />
          <Route path="countries" element={<CountriesList />} />
          <Route path="form" element={<Form />} />
          <Route path="cities/:id" element={<City />} />
        </Route>
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/products" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  </CitiesProvider>
   
  );
}   
