import { Suggestion } from '@/hooks/useAutocomplete'
import { ColorScheme, useTheme } from '@/hooks/useTheme'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'

interface AutocompleteProps {
  suggestions: Suggestion[]
  onSelect: (item: Suggestion) => void
}

export default function Autocomplete({ suggestions, onSelect }: AutocompleteProps) {
  const { colors } = useTheme()
  const styles = getStyles(colors)

  if (suggestions.length === 0) return null

  return (
    <View style={styles.container}>
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.placeId} // unique key
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onSelect(item)}
            style={styles.item}
          >
            <Text style={styles.text}>{item.description}</Text>
          </Pressable>
        )}
      />
    </View>
  )
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: { backgroundColor: colors.bg, borderRadius: 8, marginTop: 5 },
    item: { padding: 12 },
    text: { color: colors.text },
  })
