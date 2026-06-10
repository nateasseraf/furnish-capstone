import { useState } from 'react'
import { useFurnish } from '../context/FurnishContext'

function ByRoom() {
  const {
    rooms,
    items,
    addRoom,
    deleteItem,
    toggleItemStatus,
    updateItem,
  } = useFurnish()

  const [roomName, setRoomName] = useState('')
  const [editingItemId, setEditingItemId] = useState(null)
  const [editForm, setEditForm] = useState({
    productUrl: '',
    name: '',
    store: '',
    price: '',
    roomId: '',
    status: 'Planned',
  })

  const handleAddRoom = (e) => {
    e.preventDefault()

    const roomAdded = addRoom(roomName)

    if (!roomAdded) {
      alert('A room with that name already exists.')
      return
    }

    setRoomName('')
  }

  const startEditing = (item) => {
    setEditingItemId(item.id)
    setEditForm({
      productUrl: item.productUrl || '',
      name: item.name,
      store: item.store,
      price: item.price,
      roomId: item.roomId,
      status: item.status,
    })
  }

  const cancelEditing = () => {
    setEditingItemId(null)
  }

  const saveEdit = (e) => {
    e.preventDefault()

    updateItem(editingItemId, editForm)
    setEditingItemId(null)
  }

  return (
    <section>
      <h2>By Room</h2>
      <p>Track your furniture plans room by room.</p>

      <form className="inline-form" onSubmit={handleAddRoom}>
        <input
          type="text"
          placeholder="Add a new room"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button type="submit">Add Room</button>
      </form>

      <div className="room-grid">
        {rooms.map((room) => {
          const roomItems = items.filter((item) => item.roomId === room.id)

          const boughtTotal = roomItems
            .filter((item) => item.status === 'Bought')
            .reduce((total, item) => total + item.price, 0)

          const plannedTotal = roomItems
            .filter((item) => item.status === 'Planned')
            .reduce((total, item) => total + item.price, 0)

          const remaining = room.budget - boughtTotal

          return (
            <div className="card" key={room.id}>
              <h3>{room.name}</h3>
              <p>Budget: ${room.budget}</p>
              <p>Spent: ${boughtTotal}</p>
              <p>Remaining: ${remaining}</p>
              <p>Planned: ${plannedTotal}</p>
              <p>Items: {roomItems.length}</p>

              {roomItems.length === 0 && <p>No items added yet.</p>}

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
                              price: e.target.value.replace(/\D/g, ''),
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
                        <button type="button" onClick={cancelEditing}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div>
                        <strong>{item.name}</strong>
                        <p>
                          {item.store} - ${item.price} - {item.status}
                        </p>

                        {item.productUrl && (
                          <a
                            href={item.productUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View item
                          </a>
                        )}
                      </div>

                      <div className="item-actions">
                        <button
                          type="button"
                          onClick={() => toggleItemStatus(item.id)}
                        >
                          {item.status === 'Bought'
                            ? 'Mark as Planned'
                            : 'Mark as Bought'}
                        </button>

                        <button type="button" onClick={() => startEditing(item)}>
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteItem(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default ByRoom