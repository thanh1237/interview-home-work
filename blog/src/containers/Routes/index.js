import React from "react";
import { Routes ,Route } from 'react-router-dom';
import PublicLayout from "./layouts/PublicLayout";

const MainRoutes = (props) => {
  return (
    <Routes>
      <Route exact path="*" element={<PublicLayout />}  />
    </Routes>
  );
};
export default MainRoutes;