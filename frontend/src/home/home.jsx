import React, { useEffect, useState } from "react";
import Card from "../components/card.jsx";
import Carousel from "../components/crousel.jsx";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = () => {
    fetch("http://localhost:8000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.foodData, data.foodCategory);
        setFoodItem(data.foodData);
        setFoodCat(data.foodCategory);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredFoodItems = foodItem.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Carousel
        images={[
          "../src/image/burgar0.jpg",
          "../src/image/pizza3.jpg",
          "../src/image/burgar0.jpg",
          "../src/image/momos.avif",
          "../src/image/pastanew.jpg",
        ]}
        setSearchTerm={setSearchTerm}
      />

      <div className="flex flex-col items-center my-10 gap-y-10">
        {foodCat.length !== 0 ? (
          foodCat.map((category) => {
            const categoryItems = filteredFoodItems.filter(
              (item) => item.CategoryName === category.CategoryName
            );

            return categoryItems.length > 0 ? (
              <div key={category._id} className="w-full text-center">
                <h2 className="text-4xl font-bold text-teal-500 mb-6">
                  {category.CategoryName}
                </h2>
                <div className="flex justify-around border-teal-500 border-b-4 gap-x-10 mx-7 gap-y-5 flex-wrap">
                  {categoryItems.map((item) => (
                    <div key={item._id} className="mb-4">
                      <Card foodItem={item} options={item.options[0]} />
                    </div>
                  ))}
                </div>
              </div>
            ) : null;
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
