import type { Category, Report, ReportOwner } from "@/types"

/**
 * Development dataset. Used automatically whenever NEXT_PUBLIC_API_URL is not
 * set, so every screen renders real-looking content without a backend.
 */

const daysAgo = (days: number) => {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString()
}

const owners: Record<string, ReportOwner> = {
  layla: {
    id: "u_1",
    name: "Layla Haddad",
    avatarUrl: "/placeholder-user.jpg",
    phone: "+962 7 9012 3456",
    email: "layla.h@example.com",
    verified: true,
    memberSince: "2023-04-11",
    reportsCount: 4,
  },
  omar: {
    id: "u_2",
    name: "Omar Nasser",
    avatarUrl: "/placeholder-user.jpg",
    phone: "+962 7 8811 2244",
    email: "omar.n@example.com",
    verified: true,
    memberSince: "2022-11-02",
    reportsCount: 11,
  },
  sara: {
    id: "u_3",
    name: "Sara Mansour",
    avatarUrl: "/placeholder-user.jpg",
    phone: "+962 7 7345 8890",
    email: "sara.m@example.com",
    verified: false,
    memberSince: "2024-08-19",
    reportsCount: 2,
  },
  transit: {
    id: "u_4",
    name: "City Transit Lost Office",
    avatarUrl: "/placeholder-logo.png",
    phone: "+962 6 500 1200",
    email: "lostoffice@citytransit.example",
    verified: true,
    memberSince: "2021-01-05",
    reportsCount: 148,
  },
}

export const mockReports: Report[] = [
  {
    id: "FB-4821",
    type: "lost",
    category: "documents",
    title: "Brown leather wallet with ID and bank cards",
    description:
      "Lost my brown bifold wallet somewhere between the bus stop on Rainbow Street and the parking garage. It contains my national ID, two bank cards, and a folded photo of my daughter. The cards are already blocked — I only need the ID and the photo back. There is a small tear on the inner seam which makes it easy to identify.",
    images: ["/reports/wallet.png", "/reports/documents.png"],
    location: { city: "Amman", address: "Rainbow Street, Jabal Amman", lat: 31.951, lng: 35.933 },
    date: daysAgo(2),
    createdAt: daysAgo(2),
    status: "active",
    reward: 50,
    owner: owners.layla,
    tags: ["wallet", "leather", "ID card"],
  },
  {
    id: "FB-4817",
    type: "found",
    category: "other",
    title: "Set of keys with a blue rubber keychain",
    description:
      "Found this key set on a bench in the park near the north gate at around 6pm. Four keys plus a small car fob and a blue rubber tag. They are with me and I can hand them over any evening this week, or drop them at the nearest police station if nobody claims them by the weekend.",
    images: ["/reports/keys.png"],
    location: { city: "Amman", address: "Al Hussein Public Park, north gate" },
    date: daysAgo(1),
    createdAt: daysAgo(1),
    status: "active",
    owner: owners.omar,
    tags: ["keys", "car fob"],
  },
  {
    id: "FB-4790",
    type: "found",
    category: "bags",
    title: "Navy canvas backpack left on platform 3",
    description:
      "A navy backpack was handed in to our lost property office after being found on platform 3. It contains study notes, a water bottle, and a charging cable. The owner will need to describe the contents and show ID before collection. Office hours are 8am to 5pm, Sunday to Thursday.",
    images: ["/reports/backpack.png"],
    location: { city: "Zarqa", address: "Central Station, lost property office" },
    date: daysAgo(6),
    createdAt: daysAgo(5),
    status: "active",
    owner: owners.transit,
    tags: ["backpack", "navy", "station"],
  },
  {
    id: "FB-4788",
    type: "lost",
    category: "pets",
    title: "Orange tabby cat named Simba, red collar",
    description:
      "Simba slipped out of the balcony door on Tuesday night. He is a very friendly two-year-old orange tabby wearing a red collar with a small bell, and he responds to his name. He is microchipped. Please do not chase him — call us and we will come straight away.",
    images: ["/reports/cat.png"],
    location: { city: "Amman", address: "Al Rabieh, near the water tower" },
    date: daysAgo(4),
    createdAt: daysAgo(4),
    status: "matched",
    reward: 100,
    owner: owners.sara,
    matchScore: 88,
    tags: ["cat", "tabby", "microchipped"],
  },
  {
    id: "FB-4776",
    type: "lost",
    category: "electronics",
    title: "Silver laptop in a grey sleeve, left at a cafe",
    description:
      "I left my silver laptop in its grey sleeve at a cafe on University Street on Saturday afternoon. It has three stickers on the lid and the login screen shows my name. All my thesis work is on it. Staff say it was gone by the time they closed, so someone may have picked it up by mistake.",
    images: ["/reports/laptop.png"],
    location: { city: "Irbid", address: "University Street, corner cafe" },
    date: daysAgo(9),
    createdAt: daysAgo(8),
    status: "active",
    reward: 150,
    owner: owners.layla,
    tags: ["laptop", "silver", "cafe"],
  },
  {
    id: "FB-4762",
    type: "found",
    category: "electronics",
    title: "Black smartphone with cracked screen protector",
    description:
      "Picked this phone up from a walking path in the park. The screen protector is cracked but the phone still turns on and shows a lock screen with a photo of two children. I have not attempted to unlock it. Happy to meet at the community centre to return it to the owner.",
    images: ["/reports/phone.png"],
    location: { city: "Amman", address: "Sports City walking path" },
    date: daysAgo(3),
    createdAt: daysAgo(3),
    status: "active",
    owner: owners.omar,
    matchScore: 72,
    tags: ["phone", "black", "cracked"],
  },
  {
    id: "FB-4750",
    type: "found",
    category: "pets",
    title: "Beagle wandering alone on a residential street",
    description:
      "A small beagle with a blue collar has been wandering our street for two days. No tag or phone number on the collar. He is calm, well fed, and clearly someone's pet. We are keeping him safe in our garden until the owner is found and will take him to a vet to check for a microchip.",
    images: ["/reports/dog.png"],
    location: { city: "Madaba", address: "Al Nuzha neighbourhood, 12th street" },
    date: daysAgo(2),
    createdAt: daysAgo(2),
    status: "active",
    owner: owners.sara,
    tags: ["dog", "beagle", "blue collar"],
  },
  {
    id: "FB-4731",
    type: "lost",
    category: "documents",
    title: "Passport and travel folder lost in a taxi",
    description:
      "I left a dark blue passport inside a slim document folder in the back seat of a taxi from the airport. The folder also holds a boarding pass and an insurance card. I have already filed a police report but I am hoping the driver or the next passenger finds this listing.",
    images: ["/reports/documents.png"],
    location: { city: "Amman", address: "Airport road, taxi drop-off" },
    date: daysAgo(14),
    createdAt: daysAgo(13),
    status: "resolved",
    owner: owners.omar,
    tags: ["passport", "taxi", "travel"],
  },
]

export const mockCategories: Category[] = [
  { slug: "electronics", labelKey: "categories.electronics", icon: "Smartphone", count: 412 },
  { slug: "documents", labelKey: "categories.documents", icon: "FileText", count: 289 },
  { slug: "bags", labelKey: "categories.bags", icon: "Briefcase", count: 196 },
  { slug: "pets", labelKey: "categories.pets", icon: "PawPrint", count: 154 },
  { slug: "children", labelKey: "categories.children", icon: "HeartHandshake", count: 12 },
  { slug: "jewelry", labelKey: "categories.jewelry", icon: "Gem", count: 87 },
]

export const mockStats = {
  recovered: 12480,
  active: 3162,
  users: 48900,
  cities: 42,
}

export const mockCities = ["Amman", "Zarqa", "Irbid", "Madaba", "Aqaba"]

export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
  avatarUrl: string
}

export const mockTestimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "I posted my lost wallet at midnight and woke up to a match notification. My ID and my daughter's photo were back in my hands the same afternoon.",
    name: "Layla Haddad",
    role: "Recovered a wallet in Amman",
    avatarUrl: "/placeholder-user.jpg",
  },
  {
    id: "t2",
    quote:
      "I found a backpack on the platform and had no idea what to do with it. Two photos and a short description later, the student who owned it messaged me.",
    name: "Omar Nasser",
    role: "Returned a backpack in Zarqa",
    avatarUrl: "/placeholder-user.jpg",
  },
  {
    id: "t3",
    quote:
      "Our cat was gone for four days. Someone two streets away had already posted a found report — FindBack matched them before we even thought to look.",
    name: "Sara Mansour",
    role: "Reunited with a pet in Amman",
    avatarUrl: "/placeholder-user.jpg",
  },
]
