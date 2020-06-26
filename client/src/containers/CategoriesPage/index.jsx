import React from "react";
import Category from "../Category";
import AddCategoryForm from "../../components/AddCategoryForm";

const CategoriesPage = ({ categories }) => {
    return (
        <>
            {categories.map(cat => <Category category={cat} key={cat._id} />)}
            <AddCategoryForm />
        </>
    );
};

export default CategoriesPage;
