import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GrievanceStatus} from '../types/grievance';
import {Colors} from '../constants/colors';
import {Layout} from '../constants/layout';
import {getStatusLabel} from '../utils/helpers';

interface StatusBadgeProps {
  status: GrievanceStatus;
}

const STATUS_CONFIG: Record<
  GrievanceStatus,
  {bg: string; color: string; dot: string}
> = {
  pending: {
    bg: Colors.statusPendingBg,
    color: Colors.statusPending,
    dot: Colors.statusPending,
  },
  'in-review': {
    bg: Colors.statusInReviewBg,
    color: Colors.statusInReview,
    dot: Colors.statusInReview,
  },
  resolved: {
    bg: Colors.statusResolvedBg,
    color: Colors.statusResolved,
    dot: Colors.statusResolved,
  },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({status}) => {
  const config = STATUS_CONFIG[status];

  return (
    <View style={[styles.badge, {backgroundColor: config.bg}]}>
      <View style={[styles.dot, {backgroundColor: config.dot}]} />
      <Text style={[styles.label, {color: config.color}]}>
        {getStatusLabel(status)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Layout.radius.full,
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: 3,
    gap: 5,
    flexShrink: 0,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontSize: Layout.fontSize.xs,
    fontWeight: Layout.fontWeight.semiBold,
    letterSpacing: 0.2,
  },
});

export default StatusBadge;
