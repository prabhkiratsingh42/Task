import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  Animated,
  TouchableWithoutFeedback,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {Colors} from '../constants/colors';
import {Layout} from '../constants/layout';

interface CustomInputProps extends TextInputProps {
  label: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  containerStyle,
  inputStyle,
  onFocus,
  onBlur,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const borderAnim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);

  const animateBorder = (toValue: number) => {
    Animated.timing(borderAnim, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      error ? Colors.error : Colors.inputBorder,
      error ? Colors.error : Colors.inputBorderFocused,
    ],
  });

  const handleFocus = (e: any) => {
    setIsFocused(true);
    animateBorder(1);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    animateBorder(0);
    onBlur?.(e);
  };

  return (
    <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
      <View style={[styles.container, containerStyle]}>
        <Text style={styles.label}>{label}</Text>
        <Animated.View
          style={[
            styles.inputWrapper,
            {borderColor},
            isFocused && styles.inputWrapperFocused,
          ]}>
          <TextInput
            ref={inputRef}
            style={[styles.input, inputStyle]}
            placeholderTextColor={Colors.inputPlaceholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            selectionColor={Colors.primary}
            {...rest}
          />
        </Animated.View>
        {!!error && (
          <View style={styles.errorRow}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Layout.spacing.md,
  },
  label: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.semiBold,
    color: Colors.textSecondary,
    marginBottom: Layout.spacing.xs + 2,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  inputWrapper: {
    backgroundColor: Colors.inputBackground,
    borderWidth: 1.5,
    borderColor: Colors.inputBorder,
    borderRadius: Layout.radius.md,
    overflow: 'hidden',
  },
  inputWrapperFocused: {
    backgroundColor: Colors.surfaceElevated,
  },
  input: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm + 4,
    fontSize: Layout.fontSize.md,
    color: Colors.textPrimary,
    minHeight: 48,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Layout.spacing.xs,
    paddingHorizontal: 2,
  },
  errorText: {
    fontSize: Layout.fontSize.xs,
    color: Colors.error,
    fontWeight: Layout.fontWeight.medium,
    flex: 1,
  },
});

export default CustomInput;
