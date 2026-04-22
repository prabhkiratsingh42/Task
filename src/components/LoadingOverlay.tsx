import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import {Colors} from '../constants/colors';
import {Layout} from '../constants/layout';

interface LoadingOverlayProps {
  message?: string;
  fullScreen?: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message,
  fullScreen = false,
}) => {
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
      <ActivityIndicator size="large" color={Colors.primary} />
      {!!message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.xxl,
    gap: Layout.spacing.md,
  },
  fullScreen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  message: {
    fontSize: Layout.fontSize.md,
    color: Colors.textSecondary,
    fontWeight: Layout.fontWeight.medium,
  },
});

export default LoadingOverlay;
