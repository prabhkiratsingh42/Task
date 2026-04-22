import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  Animated,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { GrievanceListScreenProps } from '../types/navigation';
import ListItem from '../components/ListItem';
import EmptyState from '../components/EmptyState';
import LoadingOverlay from '../components/LoadingOverlay';
import { Colors } from '../constants/colors';
import { Layout } from '../constants/layout';
import { Strings } from '../constants/strings';
import { Grievance, GrievanceStatus } from '../types/grievance';
import useGrievances from '../hooks/useGrievances';

type FilterStatus = 'all' | GrievanceStatus;

const FILTER_OPTIONS: { label: string; value: FilterStatus }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'In Review', value: 'in-review' },
  { label: 'Resolved', value: 'resolved' },
];

const GrievanceListScreen: React.FC<GrievanceListScreenProps> = ({
  navigation,
}) => {
  const { grievances, isLoading, error, fetchGrievances } = useGrievances();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('all');

  const fadeAnim = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    fetchGrievances();
  }, [fetchGrievances]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchGrievances();
    });
    return unsubscribe;
  }, [navigation, fetchGrievances]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);


  const filteredGrievances = grievances
    .filter(g => (activeFilter === 'all' ? true : g.status === activeFilter))
    .filter(g => {
      if (!searchQuery.trim()) {
        return true;
      }
      const q = searchQuery.toLowerCase();
      return (
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q)
      );
    });

  const handleItemPress = useCallback(
    (grievance: Grievance) => {
      navigation.navigate('GrievanceDetail', { grievance });
    },
    [navigation],
  );

  const renderItem = ({ item }: { item: Grievance }) => (
    <ListItem item={item} onPress={handleItemPress} />
  );

  const keyExtractor = (item: Grievance) => item.id;

  const renderHeader = () => (
    <View>



      <View style={styles.filterRow}>
        {FILTER_OPTIONS.map(opt => {
          const isActive = activeFilter === opt.value;
          return (
            <TouchableOpacity
              key={opt.value}
              onPress={() => setActiveFilter(opt.value)}
              style={[styles.filterChip, isActive && styles.filterChipActive]}
              activeOpacity={0.75}>
              <Text
                style={[
                  styles.filterChipText,
                  isActive && styles.filterChipTextActive,
                ]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>


      <Text style={styles.countLabel}>
        {filteredGrievances.length}{' '}
        {filteredGrievances.length === 1 ? 'grievance' : 'grievances'}
      </Text>
    </View>
  );

  const renderEmpty = () => {
    if (isLoading) {
      return null;
    }
    return (
      <EmptyState
        title={Strings.list.empty}
        subtitle={
          searchQuery
            ? `No results for "${searchQuery}"`
            : Strings.list.emptySubtitle
        }
        icon="📭"
      />
    );
  };

  if (isLoading && grievances.length === 0) {
    return <LoadingOverlay fullScreen message="Loading grievances..." />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorTitle}>Something went wrong</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <TouchableOpacity onPress={fetchGrievances} style={styles.retryBtn}>
          <Text style={styles.retryBtnText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <FlatList
          data={filteredGrievances}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onRefresh={fetchGrievances}
          refreshing={isLoading}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        />
      </Animated.View>


      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddGrievance')}
        activeOpacity={0.85}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: { flex: 1 },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.spacing.md,
    paddingBottom: 100,
  },


  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Layout.radius.md,
    borderWidth: 1.5,
    borderColor: Colors.surfaceBorder,
    paddingHorizontal: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
    gap: Layout.spacing.sm,
    minHeight: 52,
  },
  searchIcon: { fontSize: 16 },
  searchInput: {
    flex: 1,
    fontSize: Layout.fontSize.md,
    color: Colors.textPrimary,
    paddingVertical: Layout.spacing.sm + 2,
  },
  clearBtn: {
    fontSize: 16,
    color: Colors.textSecondary,
    paddingHorizontal: 6,
    fontWeight: Layout.fontWeight.bold,
  },

  // Filters
  filterRow: {
    flexDirection: 'row',
    gap: Layout.spacing.sm,
    marginBottom: Layout.spacing.md,
    flexWrap: 'wrap',
  },
  filterChip: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs + 4,
    borderRadius: Layout.radius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.surfaceBorder,
  },
  filterChipActive: {
    backgroundColor: Colors.primarySoft,
    borderColor: Colors.primary,
  },
  filterChipText: {
    fontSize: Layout.fontSize.sm,
    color: Colors.textPrimary,
    fontWeight: Layout.fontWeight.semiBold,
  },
  filterChipTextActive: {
    color: Colors.primaryLight,
    fontWeight: Layout.fontWeight.bold,
  },

  countLabel: {
    fontSize: Layout.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Layout.spacing.sm,
    fontWeight: Layout.fontWeight.semiBold,
  },


  fab: {
    position: 'absolute',
    bottom: Layout.spacing.xl,
    right: Layout.spacing.lg,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Layout.shadow,
  },
  fabIcon: {
    fontSize: 28,
    color: Colors.white,
    lineHeight: 32,
    fontWeight: Layout.fontWeight.regular,
  },


  errorContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.xl,
  },
  errorIcon: { fontSize: 48, marginBottom: Layout.spacing.md },
  errorTitle: {
    fontSize: Layout.fontSize.xl,
    fontWeight: Layout.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Layout.spacing.sm,
  },
  errorMessage: {
    fontSize: Layout.fontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Layout.spacing.lg,
  },
  retryBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Layout.spacing.xl,
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.radius.md,
  },
  retryBtnText: {
    color: Colors.white,
    fontWeight: Layout.fontWeight.semiBold,
    fontSize: Layout.fontSize.md,
  },
});

export default GrievanceListScreen;
