import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, TextInput, View } from 'react-native'
import { ColorScheme, useTheme } from '../hooks/useTheme'

interface SearchBarProps {
  handleFocus: () => void
  handleOverlayPress: () => void
  search: string
  setSearch: (text: string) => void
}

export default function SearchBar({
  handleFocus,
  handleOverlayPress,
  search,
  setSearch,
}: SearchBarProps): React.JSX.Element {
  const { colors } = useTheme()
  const styles = getStyles(colors)

  return (
    <View style={styles.search}>
      <Ionicons
        style={styles.icon}
        name='search'
        size={20}
        color={colors.textMuted}
      />
      <TextInput
        style={styles.searchInput}
        placeholder='Search for a city in the US...'
        placeholderTextColor={colors.textMuted + '80'}
        onFocus={handleFocus}
        onBlur={handleOverlayPress}
        value={search}
        onChangeText={setSearch}
        returnKeyType='search'
        enablesReturnKeyAutomatically
      />
    </View>
  )
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    searchInput: { flex: 1, height: 40, color: colors.text },
    search: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
      borderWidth: 2,
      borderColor: colors.border,
      backgroundColor: colors.bg,
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 10,
      zIndex: 10,
      elevation: 10,
    },
    icon: { marginRight: 8 },
  })
