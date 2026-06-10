import { useState } from "react";
import { useFurnish } from "../context/FurnishContext";

function ByRoom() {
  const { rooms, items, toggleItemStatus, updateItem } = useFurnish();

  const [expandedRoomId, setExpandedRoomId] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);

  const [editForm, setEditForm] = useState({
    productUrl: "",
    name: "",
    store: "",
    price: "",
    roomId: "",
    status: "Planned",
  });

  const toggleRoom = (roomId) => {
    setExpandedRoomId((currentRoomId) =>
      currentRoomId === roomId ? null : roomId,
    );
  };

  const startEditing = (item) => {
    setEditingItemId(item.id);
    setEditForm({
      productUrl: item.productUrl || "",
      name: item.name,
      store: item.store,
      price: item.price,
      roomId: item.roomId,
      status: item.status,
    });
  };

  const saveEdit = (e) => {
    e.preventDefault();
    updateItem(editingItemId, editForm);
    setEditingItemId(null);
  };

  return (
    <section>
      <h2>By Room</h2>
      <p>Track your furniture plans room by room.</p>

      <div className="room-grid">
        {rooms.map((room) => {
          const isExpanded = expandedRoomId === room.id;
          const roomItems = items.filter((item) => item.roomId === room.id);

          const boughtTotal = roomItems
            .filter((item) => item.status === "Bought")
            .reduce((total, item) => total + item.price, 0);

          const plannedTotal = roomItems
            .filter((item) => item.status === "Planned")
            .reduce((total, item) => total + item.price, 0);

          const remaining = room.budget - boughtTotal;
          const usedPercentage =
            room.budget > 0
              ? Math.min((boughtTotal / room.budget) * 100, 100)
              : 0;

          return (
            <div className="card room-card" key={room.id}>
              <div className="room-card-header">
                <button
                  type="button"
                  className="room-expand-button"
                  onClick={() => toggleRoom(room.id)}
                >
                  <div>
                    <h3>{room.name}</h3>
                    <p className="room-subtitle">
                      {roomItems.length} item(s) • ${room.budget} budget
                    </p>
                  </div>

                  <span>{isExpanded ? "−" : "+"}</span>
                </button>
              </div>

              <div className={`room-details ${isExpanded ? "expanded" : ""}`}>
                <div className="room-budget-highlight">
                  <span>${room.budget}</span>
                  <small>Total room budget</small>
                </div>

                <div className="progress-bar">
                  <div style={{ width: `${usedPercentage}%` }}></div>
                </div>

                <small className="room-progress-text">
                  {Math.round(usedPercentage)}% of budget used
                </small>

                <div className="room-stats">
                  <div>
                    <strong>${boughtTotal}</strong>
                    <span>Spent</span>
                  </div>

                  <div>
                    <strong>${remaining}</strong>
                    <span>Remaining</span>
                  </div>

                  <div>
                    <strong>${plannedTotal}</strong>
                    <span>Planned</span>
                  </div>
                </div>

                {roomItems.length === 0 && (
                  <div className="empty-state">
                    <p>No items added yet.</p>
                    <span>Add your first item from the Add Item page.</span>
                  </div>
                )}

                {roomItems.map((item) => (
                  <div className="item-row" key={item.id}>
                    {editingItemId === item.id ? (
                      <form className="edit-form" onSubmit={saveEdit}>
                        <label>
                          Product Link
                          <input
                            type="url"
                            value={editForm.productUrl}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                productUrl: e.target.value,
                              })
                            }
                          />
                        </label>

                        <label>
                          Item Name
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                name: e.target.value,
                              })
                            }
                          />
                        </label>

                        <label>
                          Store
                          <input
                            type="text"
                            value={editForm.store}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                store: e.target.value,
                              })
                            }
                          />
                        </label>

                        <label>
                          Price
                          <input
                            type="text"
                            inputMode="numeric"
                            value={editForm.price}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                price: e.target.value.replace(/\D/g, ""),
                              })
                            }
                          />
                        </label>

                        <label>
                          Room
                          <select
                            value={editForm.roomId}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                roomId: e.target.value,
                              })
                            }
                          >
                            {rooms.map((availableRoom) => (
                              <option
                                key={availableRoom.id}
                                value={availableRoom.id}
                              >
                                {availableRoom.name}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label>
                          Status
                          <select
                            value={editForm.status}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                status: e.target.value,
                              })
                            }
                          >
                            <option>Planned</option>
                            <option>Bought</option>
                          </select>
                        </label>

                        <div className="item-actions">
                          <button type="submit">Save</button>
                          <button
                            type="button"
                            onClick={() => setEditingItemId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div>
                          <strong>{item.name}</strong>
                          <p>
                            {item.store} - ${item.price}
                          </p>

                          <div className="item-meta">
                            <span
                              className={`status-badge ${item.status.toLowerCase()}`}
                            >
                              {item.status}
                            </span>

                            {item.productUrl && (
                              <a
                                href={item.productUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="view-item-link"
                              >
                                View item
                              </a>
                            )}
                          </div>
                        </div>

                        <div className="item-actions">
                          <button
                            type="button"
                            onClick={() => toggleItemStatus(item.id)}
                          >
                            {item.status === "Bought"
                              ? "Mark Planned"
                              : "Mark Bought"}
                          </button>

                          <button
                            type="button"
                            onClick={() => startEditing(item)}
                          >
                            Edit
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ByRoom;