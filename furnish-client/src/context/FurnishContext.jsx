import { createContext, useContext, useEffect, useState } from 'react'

const FurnishContext = createContext()

export function FurnishProvider({ children }) {
  const defaultRooms = [
    { id: 1, name: 'Living Room', budget: 0 },
    { id: 2, name: 'Bedroom', budget: 0 },
    { id: 3, name: 'Office', budget: 0 },
    { id: 4, name: 'Dining Room', budget: 0 },
  ]

  const [rooms, setRooms] = useState(() => {
    const savedRooms = localStorage.getItem('furnishRooms')
    return savedRooms ? JSON.parse(savedRooms) : defaultRooms
  })

  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('furnishItems')
    return savedItems ? JSON.parse(savedItems) : []
  })

  const [activity, setActivity] = useState(() => {
    const savedActivity = localStorage.getItem('furnishActivity')
    return savedActivity ? JSON.parse(savedActivity) : []
  })

  useEffect(() => {
    localStorage.setItem('furnishRooms', JSON.stringify(rooms))
  }, [rooms])

  useEffect(() => {
    localStorage.setItem('furnishItems', JSON.stringify(items))
  }, [items])

  useEffect(() => {
    localStorage.setItem('furnishActivity', JSON.stringify(activity))
  }, [activity])

  const addActivity = (message) => {
    setActivity((prev) => [
      { id: Date.now(), message },
      ...prev.slice(0, 4),
    ])
  }

  const addRoom = (roomName) => {
    const cleanRoomName = roomName.trim()
    if (!cleanRoomName) return false

    const roomExists = rooms.some(
      (room) => room.name.toLowerCase() === cleanRoomName.toLowerCase()
    )

    if (roomExists) return false

    setRooms((prevRooms) => [
      ...prevRooms,
      { id: Date.now(), name: cleanRoomName, budget: 0 },
    ])

    addActivity(`Added ${cleanRoomName}`)
    return true
  }

  const deleteRoom = (roomId) => {
    const room = rooms.find((room) => room.id === Number(roomId))
    const roomHasItems = items.some((item) => item.roomId === Number(roomId))

    if (roomHasItems) return false

    setRooms((prevRooms) =>
      prevRooms.filter((room) => room.id !== Number(roomId))
    )

    addActivity(`Deleted ${room?.name || 'room'}`)
    return true
  }

  const updateRoomBudget = (roomId, newBudget) => {
    const cleanBudget = Number(String(newBudget).replace(/\D/g, ''))

    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === Number(roomId) ? { ...room, budget: cleanBudget } : room
      )
    )

    const room = rooms.find((room) => room.id === Number(roomId))
    addActivity(`Updated ${room?.name || 'room'} budget`)
  }

  const addItem = (item) => {
    const cleanPrice = Number(String(item.price).replace(/\D/g, ''))

    setItems((prevItems) => [
      ...prevItems,
      {
        id: Date.now(),
        ...item,
        price: cleanPrice,
        roomId: Number(item.roomId),
      },
    ])

    addActivity(`Added ${item.name}`)
  }

  const updateItem = (itemId, updatedItem) => {
    const cleanPrice = Number(String(updatedItem.price).replace(/\D/g, ''))

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              ...updatedItem,
              price: cleanPrice,
              roomId: Number(updatedItem.roomId),
            }
          : item
      )
    )

    addActivity(`Updated ${updatedItem.name}`)
  }

  const deleteItem = (itemId) => {
    const item = items.find((item) => item.id === itemId)

    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId))

    addActivity(`Deleted ${item?.name || 'item'}`)
  }

  const toggleItemStatus = (itemId) => {
    const item = items.find((item) => item.id === itemId)

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              status: item.status === 'Bought' ? 'Planned' : 'Bought',
            }
          : item
      )
    )

    addActivity(`Changed ${item?.name || 'item'} status`)
  }

  return (
    <FurnishContext.Provider
      value={{
        rooms,
        items,
        activity,
        addRoom,
        deleteRoom,
        updateRoomBudget,
        addItem,
        updateItem,
        deleteItem,
        toggleItemStatus,
      }}
    >
      {children}
    </FurnishContext.Provider>
  )
}

export function useFurnish() {
  return useContext(FurnishContext)
}