"use client";

import { useState } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

/* ---------------- TYPES ---------------- */

type MenuItem = {
  id: number;
  name: string;
  price: number;
  category: string;
  type: "Veg" | "Non-Veg";
  image: string;
};

type CartItem = MenuItem & {
  qty: number;
};

/* ---------------- MENU DATA ---------------- */

const menuItems: MenuItem[] = [

  { id: 1, name: "Chicken 65", price: 180, category: "Starters", type: "Non-Veg",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d" },

  { id: 2, name: "Paneer Tikka", price: 160, category: "Starters", type: "Veg",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398" },

  { id: 3, name: "Veg Spring Roll", price: 120, category: "Starters", type: "Veg",
    image: "https://images.unsplash.com/photo-1606756790138-261d2b21cd09" },

  { id: 4, name: "Chicken Wings", price: 200, category: "Starters", type: "Non-Veg",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092" },

  { id: 5, name: "Chicken Biryani", price: 220, category: "Main Course", type: "Non-Veg",
    image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a" },

  { id: 6, name: "Veg Fried Rice", price: 150, category: "Main Course", type: "Veg",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b" },

  { id: 7, name: "Butter Chicken", price: 240, category: "Main Course", type: "Non-Veg",
    image: "https://images.unsplash.com/photo-1603893662172-99ed0cea2a08" },

  { id: 8, name: "Paneer Butter Masala", price: 210, category: "Main Course", type: "Veg",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7" },

  { id: 9, name: "Cold Coffee", price: 90, category: "Beverages", type: "Veg",
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096" },

  { id: 10, name: "Milkshake", price: 110, category: "Beverages", type: "Veg",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888" },

  { id: 11, name: "Ice Cream", price: 70, category: "Desserts", type: "Veg",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" },

  { id: 12, name: "Chocolate Cake", price: 120, category: "Desserts", type: "Veg",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587" },

];

const categories = [
  "All",
  "Starters",
  "Main Course",
  "Beverages",
  "Desserts",
];

export default function BillingPage() {

  const router = useRouter();

  const [cart, setCart] =
    useState<CartItem[]>([]);

  const [activeCategory, setActiveCategory] =
    useState("All");

  const [foodType, setFoodType] =
    useState<"All" | "Veg" | "Non-Veg">("All");

  const [search, setSearch] =
    useState("");

  const [discount, setDiscount] =
    useState(0);

  const taxRate = 5;

/* ---------------- ADD ITEM ---------------- */

const addItem = (item: MenuItem) => {

  const exist =
    cart.find((c) => c.id === item.id);

  if (exist) {

    setCart(
      cart.map((c) =>
        c.id === item.id
          ? { ...c, qty: c.qty + 1 }
          : c
      )
    );

  } else {

    setCart([
      ...cart,
      { ...item, qty: 1 },
    ]);

  }

};

/* ---------------- UPDATE QTY ---------------- */

const updateQty = (
  id: number,
  type: "inc" | "dec"
) => {

  setCart(
    cart.map((c) => {

      if (c.id === id) {

        const newQty =
          type === "inc"
            ? c.qty + 1
            : c.qty - 1;

        if (newQty <= 0)
          return c;

        return { ...c, qty: newQty };

      }

      return c;

    })
  );

};

/* ---------------- REMOVE ITEM ---------------- */

const removeItem = (id: number) => {

  setCart(
    cart.filter((c) => c.id !== id)
  );

};

/* ---------------- FILTER ---------------- */

let filteredItems =
  menuItems.filter((item) =>
    item.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

if (foodType !== "All") {

  filteredItems =
    filteredItems.filter(
      (item) =>
        item.type === foodType
    );

}

if (activeCategory !== "All") {

  filteredItems =
    filteredItems.filter(
      (item) =>
        item.category === activeCategory
    );

}

/* ---------------- CALCULATIONS ---------------- */

const subtotal =
  cart.reduce(
    (sum, item) =>
      sum + item.price * item.qty,
    0
  );

const tax =
  (subtotal * taxRate) / 100;

const total =
  subtotal + tax - discount;

/* ---------------- BILL ---------------- */

const generateBill = () => {

  if (cart.length === 0) {

    alert("Cart is empty!");
    return;

  }

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  router.push("/billing/invoice");

};

/* ---------------- UI ---------------- */

return (

<div className="py-3 px-2 bg-gray-100 min-h-screen">

<h2 className="text-3xl font-bold mb-4">
Restaurant Billing
</h2>

<div className="grid grid-cols-3 gap-6">

{/* ---------------- MENU ---------------- */}

<div className="col-span-2 bg-white rounded-xl shadow-sm p-4">



<div className="flex justify-between items-center mb-4">

{/* SEARCH */}

<input
placeholder="Search food..."
className="bg-gray-100 border border-gray-200 p-2.5 rounded-lg w-[60%]"
value={search}
onChange={(e)=>
setSearch(e.target.value)
}
/>

{/* TOGGLE SWITCHES */}

<div className="flex items-center gap-6">

  {/* VEG TOGGLE */}

  <div className="flex items-center gap-3">

    <span className="text-sm text-gray-600 font-medium">
      Veg
    </span>

    <label className="relative inline-flex items-center cursor-pointer">

      <input
        type="checkbox"
        className="sr-only peer"
        checked={foodType === "Veg"}
        onChange={() =>
          setFoodType(
            foodType === "Veg" ? "All" : "Veg"
          )
        }
      />

      <div className="
        w-11 h-6
        bg-gray-300
        rounded-full
        peer
        peer-checked:bg-green-500
        transition
        after:content-['']
        after:absolute
        after:top-[2px]
        after:left-[2px]
        after:bg-white
        after:w-5
        after:h-5
        after:rounded-full
        after:transition
        peer-checked:after:translate-x-5
      "></div>

    </label>

  </div>

  {/* NON-VEG TOGGLE */}

  <div className="flex items-center gap-3">

    <span className="text-sm text-gray-600 font-medium">
      Non-Veg
    </span>

    <label className="relative inline-flex items-center cursor-pointer">

      <input
        type="checkbox"
        className="sr-only peer"
        checked={foodType === "Non-Veg"}
        onChange={() =>
          setFoodType(
            foodType === "Non-Veg"
              ? "All"
              : "Non-Veg"
          )
        }
      />

      <div className="
        w-11 h-6
        bg-gray-300
        rounded-full
        peer
        peer-checked:bg-red-500
        transition
        after:content-['']
        after:absolute
        after:top-[2px]
        after:left-[2px]
        after:bg-white
        after:w-5
        after:h-5
        after:rounded-full
        after:transition
        peer-checked:after:translate-x-5
      "></div>

    </label>

  </div>

</div>

</div>

{/* CATEGORY */}

<div className="flex gap-2 mb-4 flex-wrap">

{categories.map((cat) => (

<button
key={cat}
onClick={() =>
setActiveCategory(cat)
}
className={`
px-3 py-1 rounded text-sm

${
activeCategory === cat
? "bg-indigo-600 text-white"
: "bg-gray-100 text-gray-600"
}
`}
>
{cat}
</button>

))}

</div>

{/* FOOD GRID */}

<div className="grid grid-cols-3 gap-4">

{filteredItems.map((item) => (

<div
key={item.id}
className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md"
>

<img
src={item.image}
className="w-full h-28 object-cover"
/>

<div className="p-3">

<div className="flex justify-between items-center mb-1">

<p className="font-medium text-sm">
{item.name}
</p>

<span
className={`
text-[10px] px-2 py-0.5 rounded-full

${
item.type === "Veg"
? "bg-green-100 text-green-700"
: "bg-red-100 text-red-700"
}
`}
>
{item.type}
</span>

</div>

<p className="text-xs text-gray-500">
₹{item.price}
</p>

<button
onClick={() =>
addItem(item)
}
className="mt-2 w-full bg-indigo-600 text-white text-sm py-1.5 rounded"
>
<Plus size={14} />
Add
</button>

</div>

</div>

))}

</div>

</div>

{/* ---------------- CART ---------------- */}

<div className="bg-white rounded-xl shadow-sm p-4">

<h3 className="font-semibold mb-3">
Billing Summary
</h3>

<div className="space-y-3 max-h-[350px] overflow-y-auto">

{cart.map((item) => (

<div
key={item.id}
className="flex justify-between items-center border-b pb-2"
>

<div>

<p className="text-sm font-medium">
{item.name}
</p>

<p className="text-xs text-gray-500">
₹{item.price}
</p>

</div>

<div className="flex items-center gap-2">

<button
onClick={() =>
updateQty(item.id,"dec")
}
className="border p-1 rounded"
>
<Minus size={12}/>
</button>

{item.qty}

<button
onClick={() =>
updateQty(item.id,"inc")
}
className="border p-1 rounded"
>
<Plus size={12}/>
</button>

</div>

<button
onClick={() =>
removeItem(item.id)
}
className="text-red-500"
>
<Trash2 size={14}/>
</button>

</div>

))}

</div>

{/* TOTAL */}

<div className="mt-4 text-sm space-y-2">

<div className="flex justify-between">
<span>Subtotal</span>
<span>₹{subtotal}</span>
</div>

<div className="flex justify-between">
<span>Tax (5%)</span>
<span>₹{tax.toFixed(2)}</span>
</div>

<div className="flex justify-between items-center">

<span>Discount</span>

<input
type="number"
className="border p-1 w-20 rounded text-right"
value={discount}
onChange={(e)=>
setDiscount(Number(e.target.value))
}
/>

</div>

<div className="flex justify-between font-semibold border-t pt-2">

<span>Total</span>

<span>
₹{total.toFixed(2)}
</span>

</div>

</div>

<select className="border p-2 rounded w-full mt-4 text-sm">

<option>Cash</option>
<option>Card</option>
<option>UPI</option>

</select>

<button
onClick={generateBill}
className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg"
>

Generate Bill

</button>

</div>

</div>

</div>

);

}