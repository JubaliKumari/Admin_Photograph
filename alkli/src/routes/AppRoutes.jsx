import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "@/pages";
import { Dashboard } from "@/pages";
import { UserList } from "@/pages";
import { MainLayout } from "@/layouts";
import AddPostForm from "@/pages/AddPostForm";
import ExploreWork from "@/pages/ExploreWork";
import AboutMe from "@/pages/AboutMe";
import AllEvents from "@/pages/AllEvents";
import Products from "@/pages/Products";
import Travelling from "@/pages/Travelling";
import LifeStyle from "@/pages/LifeStyle";
import Corparate from "@/pages/Corparate";
import Portrait from "@/pages/Portrait";

// import Login from "../pages/auth/Login";
// import Dashboard from "../pages/dashboard/Dashboard";
// import UserList from "../pages/dashboard/UserList";
// import MainLayout from "../layouts/MainLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/imageslider" element={<AddPostForm />} />
          <Route path="/ExploreWork" element={<ExploreWork />} />
          <Route path="/AboutMe" element={<AboutMe />} />
          <Route path="/AllEvents" element={<AllEvents />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Travelling" element={<Travelling />} />
          <Route path="/LifeStyle" element={<LifeStyle />} />
          <Route path="/Corparate" element={<Corparate />} />
          <Route path="/Portrait" element={<Portrait />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
