import { useState } from "react";
import { useFurnish } from "../context/FurnishContext";

function AddItem() {
  const { rooms, addItem } = useFurnish();

  const [productUrl, setProductUrl] = useState("");
  const [name, setName] = useState("");
  const [store, setStore] = useState("");
  const [price, setPrice] = useState("");
  const [roomId, setRoomId] = useState(rooms[0]?.id || "");
  const [status, setStatus] = useState("Planned");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !store || !price || !roomId) {
      setMessage("Please complete the required fields.");
      return;
    }

    addItem({
      productUrl,
      name,
      store,
      price,
      roomId,
      status,
    });

    setProductUrl("");
    setName("");
    setStore("");
    setPrice("");
    setRoomId(rooms[0]?.id || "");
    setStatus("Planned");
    setMessage("Item added successfully!");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <section>
      <h2>Add Item</h2>
      <p>Add a furniture item and save the shopping link for later.</p>

      <form className="form-card" onSubmit={handleSubmit}>
        {message && <p className="success-message">{message}</p>}

        <label>
          Product Link
          <input
            type="url"
            placeholder="https://www.ikea.com/..."
            value={productUrl}
            onChange={(e) => setProductUrl(e.target.value)}
          />
        </label>

        <label>
          Item Name
          <input
            type="text"
            placeholder="Coffee table"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Store
          <input
            type="text"
            placeholder="IKEA"
            value={store}
            onChange={(e) => setStore(e.target.value)}
          />
        </label>

        <label>
          Price
          <input
            type="text"
            inputMode="numeric"
            placeholder="349"
            value={price}
            onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))}
          />
        </label>

        <label>
          Room
          <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Planned</option>
            <option>Bought</option>
          </select>
        </label>

        <button type="submit">Save Item</button>
      </form>
    </section>
  );
}

export default AddItem;