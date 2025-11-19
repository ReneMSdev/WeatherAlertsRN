import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

export type Suggestion = {
  description: string
  placeId: string
}

export default function useAutocomplete(query: string, sessionToken: string) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [debouncedQuery] = useDebounce(query, 300)

  useEffect(() => {
    if (!debouncedQuery) return setSuggestions([])

    // require at least 3 characters to get suggestions
    if (debouncedQuery.length < 3) return setSuggestions([])

    const controller = new AbortController()

    fetch(process.env.EXPO_PUBLIC_AUTOCOMPLETE_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: debouncedQuery, sessionToken }),
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.predictions) {
          setSuggestions(
            data.predictions.map((p: any) => ({
              description: p.description,
              placeId: p.placeId,
            }))
          )
        } else {
          setSuggestions([])
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') console.error(err)
      })

    return () => controller.abort()
  }, [debouncedQuery, sessionToken])

  console.log('suggestions:', suggestions)
  return suggestions
}
