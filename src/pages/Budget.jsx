import { useState } from "react";
import { useFurnish } from "../context/FurnishContext";

function Budget() {
  const { rooms, addRoom, deleteRoom, updateRoomBudget } = useFurnish();
  const [roomName, setRoomName] = useState("");

  const totalRoomBudget = rooms.reduce(
    (total, room) => total + Number(room.budget),
    0,
  );

  const handleAddRoom = (e) => {
    e.preventDefault();

    const roomAdded = addRoom(roomName);

    if (!roomAdded) {
      alert("A room with that name already exists.");
      return;
    }

    setRoomName("");
  };

  const handleDeleteRoom = (room) => {
    const confirmed = window.confirm(
      `Delete ${room.name}? This cannot be undone.`,
    );

    if (!confirmed) return;

    const roomDeleted = deleteRoom(room.id);

    if (!roomDeleted) {
      alert("You need to delete the item(s) in this room before deleting it.");
    }
  };

  return (
    <section>
      <h2>Budget</h2>
      <p>Create rooms and set a budget for each area in your apartment.</p>

      <form className="inline-form" onSubmit={handleAddRoom}>
        <input
          type="text"
          placeholder="Add a new room"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button type="submit">Add Room</button>
      </form>

      <div className="form-card">
        <h3>Room Budgets</h3>

        {rooms.map((room) => (
          <div className="budget-room-row" key={room.id}>
            <div className="budget-room-header">
              <span>{room.name}</span>

              <button
                type="button"
                className="room-delete-button"
                onClick={() => handleDeleteRoom(room)}
              >
                Delete
              </button>
            </div>

            <input
              type="text"
              inputMode="numeric"
              value={room.budget}
              onChange={(e) =>
                updateRoomBudget(room.id, e.target.value.replace(/\D/g, ""))
              }
            />
          </div>
        ))}

        <div className="budget-total">
          <span>Total Budget</span>
          <strong>${totalRoomBudget}</strong>
          <small>Across all rooms</small>
        </div>
      </div>
    </section>
  );
}

export default Budget;
