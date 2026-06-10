import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  calculateTotalSpent,
  calculatePlannedTotal,
  calculateRemainingBudget,
  calculateTopUpNeeded,
} from '../utils/budgetUtils'
import { useFurnish } from '../context/FurnishContext'
import { useAuth } from '../context/AuthContext'

function Home() {
  const { rooms, items } = useFurnish()
  const { user } = useAuth()

  const totalBudget = rooms.reduce(
    (total, room) => total + Number(room.budget),
    0
  )

  const spent = calculateTotalSpent(items)
  const planned = calculatePlannedTotal(items)
  const remaining = calculateRemainingBudget(totalBudget, items)
  const topUp = calculateTopUpNeeded(totalBudget, items)

  const spentPercentage =
    totalBudget > 0 ? Math.min((spent / totalBudget) * 100, 100) : 0

  const plannedPercentage =
    totalBudget > 0 ? Math.min((planned / totalBudget) * 100, 100) : 0

  const isEmptyDashboard = totalBudget === 0 && spent === 0 && planned === 0

  const insights = [
    `You have spent $${spent} so far.`,
    `You have $${remaining} remaining.`,
    `You have $${planned} in planned purchases.`,
    topUp > 0
      ? `Add $${topUp} to your room budgets to afford all planned items.`
      : 'All planned purchases fit within your current budget.',
  ]

  const [selectedInsight] = useState(() => {
    const randomIndex = Math.floor(Math.random() * insights.length)
    return insights[randomIndex]
  })

  if (!user) {
    return (
      <section>
        <div className="home-hero">
          <div>
            <p className="eyebrow">Furnish Dashboard</p>
            <h2>Plan your space with less chaos.</h2>
            <p>
              Log in or create an account to track rooms, furniture items,
              budgets, and purchases in one place.
            </p>
          </div>

          <div className="insight-banner">
            <span>Get Started</span>
            <p>Create an account to unlock your furnishing dashboard.</p>
            <Link className="banner-link" to="/login">
              Log in
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className="home-hero">
        <div>
          <p className="eyebrow">Furnish Dashboard</p>
          <h2>Welcome home, {user.firstName}</h2>
          <p>Track your budget, purchases, and furnishing plans in one place.</p>
        </div>

        <div className="insight-banner">
          {isEmptyDashboard ? (
            <>
              <span>Let&apos;s get started</span>
              <p>
                1. Enter your rooms and budgets in the Budget tab.
                <br />
                2. Add items you&apos;ve purchased or are planning to purchase.
                <br />
                3. Stay on track as your apartment plan comes together.
              </p>
            </>
          ) : (
            <>
              <span>Smart Budget Insight</span>
              <p>{selectedInsight}</p>
            </>
          )}
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card stat-card">
          <h3>Total Budget</h3>
          <p className="stat">${totalBudget}</p>
          <small>Across all rooms</small>
        </div>

        <div className="card stat-card">
          <h3>Spent</h3>
          <p className="stat">${spent}</p>
          <div className="progress-bar">
            <div style={{ width: `${spentPercentage}%` }}></div>
          </div>
          <small>{Math.round(spentPercentage)}% of budget used</small>
        </div>

        <div className="card stat-card">
          <h3>Remaining</h3>
          <p className="stat">${remaining}</p>
          <small>Available budget</small>
        </div>

        <div className="card stat-card">
          <h3>Planned</h3>
          <p className="stat">${planned}</p>
          <div className="progress-bar">
            <div style={{ width: `${plannedPercentage}%` }}></div>
          </div>
          <small>{Math.round(plannedPercentage)}% planned</small>
        </div>
      </div>
    </section>
  )
}

export default Home