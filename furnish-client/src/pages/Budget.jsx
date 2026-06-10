import { useFurnish } from '../context/FurnishContext'

function Budget() {
  const { rooms, updateRoomBudget } = useFurnish()

  const totalBudget = rooms.reduce(
    (total, room) => total + Number(room.budget),
    0
  )

  return (
    <section>
      <h2>Budget</h2>
      <p>Set a budget for each room in your apartment.</p>

      <div className="dashboard-grid">
        <div className="card">
          <h3>Total Room Budget</h3>
          <p className="stat">${totalBudget}</p>
        </div>
      </div>

      <div className="form-card">
        <h3>Room Budgets</h3>

        {rooms.map((room) => (
          <label key={room.id}>
            {room.name}
            <input
              type="text"
              inputMode="numeric"
              value={room.budget}
              onChange={(e) => updateRoomBudget(room.id, e.target.value)}
            />
          </label>
        ))}
      </div>
    </section>
  )
}

export default Budget