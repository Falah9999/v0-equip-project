// Mock data functions for the prototype
// In a real application, these would fetch data from a database

export async function getEquipmentById(id: string) {
  // Mock equipment data
  const equipment = {
    id,
    name: "Caterpillar Excavator 320",
    category: "excavators",
    description:
      "A powerful excavator perfect for medium to large construction projects. Features a comfortable cabin with air conditioning and excellent visibility.",
    location: "Kuwait City",
    dailyRate: 120,
    weeklyRate: 700,
    rating: 4.8,
    available: true,
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    specs: {
      Brand: "Caterpillar",
      Model: "320",
      Year: 2020,
      Weight: "20 tons",
      "Engine Power": "162 HP",
      "Bucket Capacity": "1.2 m³",
      "Max Digging Depth": "6.7 m",
      "Fuel Type": "Diesel",
    },
    owner: {
      id: "o1",
      name: "Ahmed Al-Sabah",
      rating: 4.9,
      responseTime: "Within 1 hour",
      memberSince: "January 2020",
    },
  }

  return equipment
}

export async function getOwnerEquipment() {
  // Mock owner equipment data
  return [
    {
      id: "1",
      name: "Caterpillar Excavator 320",
      category: "excavators",
      location: "Kuwait City",
      dailyRate: 120,
      status: "available",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "2",
      name: "Bobcat Loader S650",
      category: "loaders",
      location: "Salmiya",
      dailyRate: 85,
      status: "rented",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "3",
      name: "Concrete Mixer CM350",
      category: "tools",
      location: "Hawally",
      dailyRate: 50,
      status: "maintenance",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]
}

export async function getOwnerRentRequests() {
  // Mock rental requests data
  return [
    {
      id: "r1",
      equipmentId: "1",
      equipmentName: "Caterpillar Excavator 320",
      renterName: "Mohammed Al-Ali",
      startDate: "2023-05-15",
      endDate: "2023-05-20",
      status: "pending",
      message: "I need this for a construction project in Kuwait City.",
    },
    {
      id: "r2",
      equipmentId: "2",
      equipmentName: "Bobcat Loader S650",
      renterName: "Fatima Al-Salem",
      startDate: "2023-05-10",
      endDate: "2023-05-25",
      status: "approved",
      message: "We're working on a residential project and need this loader.",
    },
    {
      id: "r3",
      equipmentId: "3",
      equipmentName: "Concrete Mixer CM350",
      renterName: "Khalid Al-Mutawa",
      startDate: "2023-05-18",
      endDate: "2023-05-19",
      status: "declined",
      message: "Need this for a small home renovation project.",
    },
  ]
}

export async function getRenterRentals() {
  // Mock renter rentals data
  return [
    {
      id: "r1",
      equipmentId: "4",
      equipmentName: "Mobile Crane MC200",
      ownerName: "Jassim Al-Qattan",
      startDate: "2023-05-01",
      endDate: "2023-05-10",
      status: "active",
      totalCost: 2000,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "r2",
      equipmentId: "5",
      equipmentName: "Dump Truck DT500",
      ownerName: "Nasser Al-Sabah",
      startDate: "2023-04-15",
      endDate: "2023-04-25",
      status: "completed",
      totalCost: 1500,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "r3",
      equipmentId: "6",
      equipmentName: "Scissor Lift SL100",
      ownerName: "Sara Al-Enezi",
      startDate: "2023-04-01",
      endDate: "2023-04-05",
      status: "completed",
      totalCost: 375,
      image: "/placeholder.svg?height=300&width=400",
    },
  ]
}
