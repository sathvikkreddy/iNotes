import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
// import Home from "./components/Home";
import Layout from "./Layout";
import Login from "./components/Login";
import Profile from "./components/Profile";
import PageNotFound from "./components/PageNotFound";
import PrivateRoutes from "./components/PrivateRoutes";
import Notes from "./components/Notes";
import AddNote from "./components/AddNote";
import EditNote from "./components/EditNote";
import SignUp from "./components/SignUp";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="login" exact element={<Login />} />
      <Route path="signUp" exact element={<SignUp />} />
      <Route element={<PrivateRoutes />}>
        <Route path="" element={<Notes />} />
        <Route path="profile" element={<Profile />} />
        <Route path="addNote" element={<AddNote />} />
        <Route path="editNote" element={<EditNote />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Route>
  )
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
