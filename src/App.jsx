import React, { useState } from "react";
import "./index.css";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 4, packed: true },
//   { id: 3, description: "Charger", quantity: 1, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItemes(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItemes} />
      <PakingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onToggleItems={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>✈ Far Away 🌴</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };
    // console.log(newItem);
    onAddItems(newItem);
    //initial state
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for our trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Items ..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PakingList({ items, onDeleteItems, onToggleItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItems={onDeleteItems}
            onToggleItems={onToggleItems}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItems, onToggleItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding items to your packing list 🛴</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percent = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percent === 100
          ? "You got everything ready to go ✈"
          : `🧳 you have ${numItems} items on your list, and you already packed 
         ${numPacked}  (${percent}%)`}
      </em>
    </footer>
  );
}
