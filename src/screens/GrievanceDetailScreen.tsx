import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Animated,
  TouchableOpacity,
  Share,
} from 'react-native';
import { GrievanceDetailScreenProps } from '../types/navigation';
import StatusBadge from '../components/StatusBadge';
import { Colors } from '../constants/colors';
import { Layout } from '../constants/layout';
import { Strings } from '../constants/strings';
import { formatDate } from '../utils/helpers';

const GrievanceDetailScreen: React.FC<GrievanceDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { grievance } = route.params;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 450, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, speed: 14, bounciness: 4, useNativeDriver: true }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleShare = async () => {
    try {
      await Share.share({
        title: grievance.title,
        message: `📋 Grievance: ${grievance.title}\n\nCategory: ${grievance.category}\nStatus: ${grievance.status}\n\nDescription:\n${grievance.description}\n\nSubmitted: ${formatDate(grievance.createdAt)}`,
      });
    } catch (_) {

    }
  };

  const categoryInitial = grievance.category.charAt(0).toUpperCase();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>


        <Animated.View
          style={[styles.heroBanner, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{categoryInitial}</Text>
          </View>
          <View style={styles.heroMeta}>
            <View style={styles.categoryPill}>
              <Text style={styles.categoryPillText}>{grievance.category}</Text>
            </View>
            <StatusBadge status={grievance.status} />
          </View>
          <Text style={styles.heroTitle}>{grievance.title}</Text>
          <Text style={styles.heroDate}>
            Submitted {formatDate(grievance.createdAt)}
          </Text>
        </Animated.View>


        <Animated.View
          style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>


          <View style={styles.section}>
            <Text style={styles.sectionLabel}>
              {Strings.detail.descriptionLabel}
            </Text>
            <Text style={styles.descriptionText}>{grievance.description}</Text>
          </View>

          <View style={styles.divider} />


          <View style={styles.metaGrid}>
            <MetaItem label="Category" value={grievance.category} icon="🏷️" />
            <MetaItem
              label="Status"
              value={grievance.status
                .replace('-', ' ')
                .replace(/\b\w/g, c => c.toUpperCase())}
              icon="📌"
            />
            <MetaItem
              label="Submitted"
              value={formatDate(grievance.createdAt)}
              icon="📅"
              fullWidth
            />
            {grievance.updatedAt !== grievance.createdAt && (
              <MetaItem
                label="Last Updated"
                value={formatDate(grievance.updatedAt)}
                icon="🔄"
                fullWidth
              />
            )}
          </View>
        </Animated.View>


        <Animated.View
          style={[styles.actions, { opacity: fadeAnim }]}>
          <TouchableOpacity style={styles.shareBtn} onPress={handleShare} activeOpacity={0.8}>
            <Text style={styles.shareBtnIcon}>↑</Text>
            <Text style={styles.shareBtnText}>Share Grievance</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}>
            <Text style={styles.backBtnText}>← Back to List</Text>
          </TouchableOpacity>
        </Animated.View>


        <Text style={styles.idLabel}>ID: {grievance.id}</Text>
      </ScrollView>
    </View>
  );
};


interface MetaItemProps {
  label: string;
  value: string;
  icon: string;
  fullWidth?: boolean;
}

const MetaItem: React.FC<MetaItemProps> = ({ label, value, icon, fullWidth }) => (
  <View style={[styles.metaItem, fullWidth && styles.metaItemFull]}>
    <Text style={styles.metaIcon}>{icon}</Text>
    <View style={styles.metaContent}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    padding: Layout.spacing.lg,
    paddingBottom: Layout.spacing.xxl,
  },


  heroBanner: {
    backgroundColor: Colors.surface,
    borderRadius: Layout.radius.xl,
    padding: Layout.spacing.lg,
    marginBottom: Layout.spacing.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    alignItems: 'flex-start',
    ...Layout.shadowSm,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primarySoft,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Layout.spacing.md,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: Layout.fontWeight.bold,
    color: Colors.primary,
  },
  heroMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.sm,
    marginBottom: Layout.spacing.sm,
  },
  categoryPill: {
    backgroundColor: Colors.primarySoft,
    borderRadius: Layout.radius.full,
    paddingHorizontal: Layout.spacing.sm + 2,
    paddingVertical: 3,
  },
  categoryPillText: {
    fontSize: Layout.fontSize.xs,
    color: Colors.primaryLight,
    fontWeight: Layout.fontWeight.semiBold,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  heroTitle: {
    fontSize: Layout.fontSize.xxl,
    fontWeight: Layout.fontWeight.bold,
    color: Colors.textPrimary,
    lineHeight: 32,
    marginBottom: Layout.spacing.xs,
  },
  heroDate: {
    fontSize: Layout.fontSize.sm,
    color: Colors.textMuted,
  },


  card: {
    backgroundColor: Colors.surface,
    borderRadius: Layout.radius.xl,
    padding: Layout.spacing.lg,
    marginBottom: Layout.spacing.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    ...Layout.shadowSm,
  },
  section: { marginBottom: Layout.spacing.md },
  sectionLabel: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.semiBold,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: Layout.spacing.sm,
  },
  descriptionText: {
    fontSize: Layout.fontSize.md,
    color: Colors.textPrimary,
    lineHeight: 26,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.surfaceBorder,
    marginVertical: Layout.spacing.md,
  },


  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Layout.radius.md,
    padding: Layout.spacing.md,
    gap: Layout.spacing.sm,
    width: '47%',
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  metaItemFull: {
    width: '100%',
  },
  metaIcon: { fontSize: 18 },
  metaContent: { flex: 1 },
  metaLabel: {
    fontSize: Layout.fontSize.xs,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  metaValue: {
    fontSize: Layout.fontSize.sm,
    color: Colors.textPrimary,
    fontWeight: Layout.fontWeight.semiBold,
  },

  // Actions
  actions: {
    gap: Layout.spacing.sm,
    marginBottom: Layout.spacing.md,
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Layout.spacing.sm,
    backgroundColor: Colors.primarySoft,
    borderRadius: Layout.radius.md,
    paddingVertical: Layout.spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.primary + '60',
  },
  shareBtnIcon: {
    fontSize: 18,
    color: Colors.primaryLight,
    fontWeight: Layout.fontWeight.bold,
  },
  shareBtnText: {
    fontSize: Layout.fontSize.md,
    color: Colors.primaryLight,
    fontWeight: Layout.fontWeight.semiBold,
  },
  backBtn: {
    alignItems: 'center',
    paddingVertical: Layout.spacing.md,
  },
  backBtnText: {
    fontSize: Layout.fontSize.md,
    color: Colors.textSecondary,
    fontWeight: Layout.fontWeight.medium,
  },

  // ID
  idLabel: {
    fontSize: Layout.fontSize.xs,
    color: Colors.textMuted,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
});

export default GrievanceDetailScreen;
