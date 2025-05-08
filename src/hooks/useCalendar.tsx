import { useState, useCallback, useRef, useMemo } from 'react'
import { API } from '../services/api'

export type Allocation = {
  date: string
  location: string
  activity: string
  weekday: string
}

export function useCalendar() {
  const [allocations, setAllocations] = useState<Allocation[]>([])
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState<Error | null>(null)

  const cache = useRef<Record<string, Allocation[]>>({})

  const fetchCalendarData = useCallback(
    async (userId: number, year: string, month: string) => {
      const key = `${userId}-${year}-${month}`
      if (cache.current[key]) {
        setAllocations(cache.current[key])
        return
      }

      setLoading(true)
      setError(null)
      try {
        const data = await API.calendar.getCalendar(userId, year, month)

        const flat: Allocation[] = data.calendar.flatMap((week: any) =>
          week.groups.flatMap((group: any) =>
            group.days.flatMap((day: any) => day.allocations)
          )
        )

        cache.current[key] = flat
        setAllocations(flat)
      } catch (err) {
        setError(err as Error)
        setAllocations([])
      } finally {
        setLoading(false)
      }
    },
    []
  )
  const displayRows = useMemo(
    () =>
      allocations.map((alloc) => ({
        day: new Date(alloc.date).getDate(),
        location: alloc.location,
        activity: alloc.activity,
        weekday: alloc.weekday,
      })),
    [allocations]
  )

  return { allocations, displayRows, loading, error, fetchCalendarData }
}
