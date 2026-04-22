import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Animated,
  ImageBackground,
} from 'react-native';
import { HomeScreenProps } from '../types/navigation';
import CustomButton from '../components/CustomButton';
import { Colors } from '../constants/colors';
import { Layout } from '../constants/layout';
import { Strings } from '../constants/strings';
import useGrievances from '../hooks/useGrievances';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { grievances, fetchGrievances } = useGrievances();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    fetchGrievances();
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        speed: 14,
        bounciness: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fetchGrievances, fadeAnim, slideAnim]);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchGrievances();
    });
    return unsubscribe;
  }, [navigation, fetchGrievances]);

  const totalCount = grievances.length;
  const pendingCount = grievances.filter(g => g.status === 'pending').length;
  const resolvedCount = grievances.filter(g => g.status === 'resolved').length;

  const stats = [
    { label: Strings.home.statsTotal, value: totalCount, color: Colors.primaryLight },
    { label: Strings.home.statsPending, value: pendingCount, color: Colors.statusPending },
    { label: Strings.home.statsResolved, value: resolvedCount, color: Colors.statusResolved },
  ];

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>


        <Animated.View
          style={[
            styles.hero,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoEmoji}>⚡</Text>
            </View>
          </View>
          <Text style={styles.appName}>{Strings.app.name}</Text>
          <Text style={styles.subtitle}>{Strings.home.subtitle}</Text>
        </Animated.View>


        <Animated.View
          style={[
            styles.statsRow,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}>
          {stats.map(stat => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={[styles.statValue, { color: stat.color }]}>
                {stat.value}
              </Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </Animated.View>


        <View style={styles.divider} />


        <Animated.View
          style={[
            styles.actions,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}>
          <CustomButton
            label={Strings.home.submitButton}
            onPress={() => navigation.navigate('AddGrievance')}
            variant="primary"
            style={styles.primaryBtn}
          />
          <CustomButton
            label={Strings.home.viewButton}
            onPress={() => navigation.navigate('GrievanceList')}
            variant="secondary"
            style={styles.secondaryBtn}
          />
        </Animated.View>


        <Text style={styles.footer}>
          All grievances are stored securely on your device.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.spacing.xxl + 16,
    paddingBottom: Layout.spacing.xl,
  },


  hero: {
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  logoContainer: {
    marginBottom: Layout.spacing.lg,
  },
  logoCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.primarySoft,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Layout.shadow,
  },
  logoEmoji: {
    fontSize: 40,
  },
  appName: {
    fontSize: Layout.fontSize.xxxl,
    fontWeight: Layout.fontWeight.extraBold,
    color: Colors.textPrimary,
    letterSpacing: -0.5,
    marginBottom: Layout.spacing.sm,
  },
  subtitle: {
    fontSize: Layout.fontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },


  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    marginBottom: Layout.spacing.xl,
    overflow: 'hidden',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Layout.spacing.md + 4,
    borderRightWidth: 1,
    borderRightColor: Colors.surfaceBorder,
  },
  statValue: {
    fontSize: Layout.fontSize.xxl,
    fontWeight: Layout.fontWeight.extraBold,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: Layout.fontSize.xs,
    color: Colors.textMuted,
    fontWeight: Layout.fontWeight.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },


  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginBottom: Layout.spacing.xl,
  },


  actions: {
    gap: Layout.spacing.md,
  },
  primaryBtn: {
    width: '100%',
  },
  secondaryBtn: {
    width: '100%',
  },


  footer: {
    marginTop: Layout.spacing.xl,
    fontSize: Layout.fontSize.xs,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});

export default HomeScreen;
