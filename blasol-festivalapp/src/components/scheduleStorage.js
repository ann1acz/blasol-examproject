const STORAGE_KEY = 'blasol_schedule'

export function getSavedSchedule() {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export function saveSchedule(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function isScheduled(id) {
  const items = getSavedSchedule()
  return items.some((item) => item.id === id)
}

export function toggleScheduleItem(item) {
  const items = getSavedSchedule()
  const exists = items.some((saved) => saved.id === item.id)

  let updated
  if (exists) {
    updated = items.filter((saved) => saved.id !== item.id)
  } else {
    updated = [...items, item]
  }

  saveSchedule(updated)
  return updated
}