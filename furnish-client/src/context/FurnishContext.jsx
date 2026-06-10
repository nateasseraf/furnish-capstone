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

  useEffect(() => {
    localStorage.setItem('furnishRooms', JSON.stringify(rooms))
  }, [rooms])

  useEffect(() => {
    localStorage.setItem('furnishItems', JSON.stringify(items))
  }, [items])

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

    return true
  }

  const updateRoomBudget = (roomId, newBudget) => {
    const onlyNumbers = String(newBudget).replace(/\D/g, '')
    const cleanBudget = Number(onlyNumbers)

    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === Number(roomId) ? { ...room, budget: cleanBudget } : room
      )
    )
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
  }

  const deleteItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
  }

  const toggleItemStatus = (itemId) => {
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
  }

  return (
    <FurnishContext.Provider
      value={{
        rooms,
        items,
        addRoom,
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