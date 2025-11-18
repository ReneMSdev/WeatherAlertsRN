import { ColorScheme, useTheme } from '@/hooks/useTheme'
import { Animated, Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native'

interface OverlayProps {
  isFocused: boolean
  handleOverlayPress: () => void
  overlayOpacity: Animated.Value
  translateY: Animated.Value
}

export default function Overlay({
  isFocused,
  handleOverlayPress,
  overlayOpacity,
  translateY,
}: OverlayProps): React.JSX.Element {
  const { colors } = useTheme()
  const styles = getStyles(colors)
  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss()
          handleOverlayPress()
        }}
      >
        <Animated.View
          pointerEvents={isFocused ? 'auto' : 'none'}
          style={[
            styles.overlay,

            {
              opacity: overlayOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1], // full opacity when focused
              }),
              transform: [{ translateY }],
            },
          ]}
        />
      </TouchableWithoutFeedback>
    </>
  )
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: colors.bg,
      zIndex: 5,
      elevation: 5,
    },
  })
