import React from "react";
import { Routes ,Route } from 'react-router-dom';
import HomePage from "../../HomePage";
import NotFoundPage from "../../../components/NotFoundPage";
import AlertMsg from "../../../components/AlertMsg";
import PublicNavbar from "../../../components/PublicNavbar";
import ViewDetailPage from "../../ViewDetailPage";
import AddEditBlogPage from "../../AddEditBlogPage";


const PublicLayout = () => {
  return (
    <>
      <PublicNavbar />
        <AlertMsg />
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/blog-detail/:id' element={<ViewDetailPage/>} />
          <Route path='/add-edit' element={<AddEditBlogPage/>} />
          <Route path='/add-edit/:id' element={<AddEditBlogPage/>} />
          <Route path='*' element={NotFoundPage} />
          
        </Routes>
    </>
  );
};

export default PublicLayout;