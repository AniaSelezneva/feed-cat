import "./App.css";
import Card from "./cards";
import food_info from "./data_source/food_info.json";
import { FoodItem } from "./interface/foodItem";

function App() {
  const food = JSON.parse(JSON.stringify(food_info));

  return (
    <>
      <h1>Ты сегодня покормил кота?</h1>
      <div className="App">
        {food.list.map((item: FoodItem, idx: number) => (
          <Card item={item} key={idx} />
        ))}
      </div>
    </>
  );
}

export default App;
