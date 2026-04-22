import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Grievance } from '../types/grievance';
import { Colors } from '../constants/colors';
import { Layout } from '../constants/layout';
import { formatRelativeDate, getStatusLabel, truncate } from '../utils/helpers';
import StatusBadge from './StatusBadge';

interface ListItemProps {
  item: Grievance;
  onPress: (grievance: Grievance) => void;
}

const ListItem: React.FC<ListItemProps> = ({ item, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 2,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 4,
    }).start();
  };

  const categoryInitial = item.category.charAt(0).toUpperCase();

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={() => onPress(item)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.95}
        style={styles.container}>
        {/* Left accent */}
        <View style={styles.accentBar} />

        {/* Category avatar */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{categoryInitial}</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.topRow}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <StatusBadge status={item.status} />
          </View>
          <Text style={styles.description} numberOfLines={2}>
            {truncate(item.description, 100)}
          </Text>
          <View style={styles.bottomRow}>
            <View style={styles.categoryChip}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
            <Text style={styles.date}>
              {formatRelativeDate(item.createdAt)}
            </Text>
          </View>
        </View>

        {/* Chevron */}
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Layout.radius.lg,
    marginBottom: Layout.spacing.sm + 4,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: Colors.surfaceBorder,
    ...Layout.shadowSm,
  },
  accentBar: {
    width: 4,
    alignSelf: 'stretch',
    backgroundColor: Colors.primary,
    borderTopLeftRadius: Layout.radius.lg,
    borderBottomLeftRadius: Layout.radius.lg,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: Layout.radius.full,
    backgroundColor: Colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Layout.spacing.md,
    marginRight: Layout.spacing.sm,
    flexShrink: 0,
  },
  avatarText: {
    fontSize: Layout.fontSize.lg,
    fontWeight: Layout.fontWeight.bold,
    color: Colors.primaryLight,
  },
  content: {
    flex: 1,
    paddingVertical: Layout.spacing.md,
    paddingRight: Layout.spacing.sm,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.xs,
    gap: Layout.spacing.sm,
  },
  title: {
    flex: 1,
    fontSize: Layout.fontSize.md,
    fontWeight: Layout.fontWeight.semiBold,
    color: Colors.textPrimary,
  },
  description: {
    fontSize: Layout.fontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Layout.spacing.sm,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryChip: {
    backgroundColor: Colors.primarySoft,
    borderRadius: Layout.radius.full,
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: Colors.primary + '55',
  },
  categoryText: {
    fontSize: Layout.fontSize.xs,
    color: Colors.primaryLight,
    fontWeight: Layout.fontWeight.semiBold,
  },
  date: {
    fontSize: Layout.fontSize.xs,
    color: Colors.textMuted,
    fontWeight: Layout.fontWeight.medium,
  },
  chevron: {
    fontSize: 22,
    color: Colors.textSecondary,
    paddingHorizontal: Layout.spacing.sm,
  },
});

export default ListItem;
