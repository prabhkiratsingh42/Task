import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Animated,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { AddGrievanceScreenProps } from '../types/navigation';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { Colors } from '../constants/colors';
import { Layout } from '../constants/layout';
import { Strings } from '../constants/strings';
import { GRIEVANCE_CATEGORIES, GrievanceCategory } from '../types/grievance';
import useAddGrievance from '../hooks/useAddGrievance';

const AddGrievanceScreen: React.FC<AddGrievanceScreenProps> = ({
  navigation,
}) => {
  const {
    formData,
    errors,
    isSubmitting,
    submitError,
    setField,
    submitForm,
    resetForm,
  } = useAddGrievance();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, speed: 14, bounciness: 5, useNativeDriver: true }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleSubmit = async () => {
    const success = await submitForm();
    if (success) {
      Alert.alert(
        '✅ Submitted!',
        Strings.addGrievance.successMessage,
        [
          {
            text: 'View All',
            onPress: () => {
              resetForm();
              navigation.navigate('GrievanceList');
            },
          },
          {
            text: 'Add Another',
            style: 'cancel',
            onPress: () => resetForm(),
          },
        ],
        { cancelable: false },
      );
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>

        <Animated.View
          style={[styles.headerCard, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.headerEmoji}>📝</Text>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>New Grievance</Text>
            <Text style={styles.headerSub}>Fill in the details below and submit.</Text>
          </View>
        </Animated.View>

        <Animated.View
          style={[styles.formCard, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>

          <CustomInput
            label={Strings.addGrievance.titleLabel}
            placeholder={Strings.addGrievance.titlePlaceholder}
            value={formData.title}
            onChangeText={text => setField('title', text)}
            error={errors.title}
            maxLength={80}
            returnKeyType="next"
            autoCapitalize="sentences"
          />

          <CustomInput
            label={Strings.addGrievance.descriptionLabel}
            placeholder={Strings.addGrievance.descriptionPlaceholder}
            value={formData.description}
            onChangeText={text => setField('description', text)}
            error={errors.description}
            maxLength={500}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            inputStyle={styles.textArea}
          />

          <Text style={styles.categoryLabel}>{Strings.addGrievance.categoryLabel}</Text>
          <View style={styles.categoryGrid}>
            {GRIEVANCE_CATEGORIES.map(cat => {
              const isSelected = formData.category === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setField('category', cat as GrievanceCategory)}
                  style={[styles.categoryChip, isSelected && styles.categoryChipSelected]}
                  activeOpacity={0.75}>
                  <Text
                    style={[
                      styles.categoryChipText,
                      isSelected && styles.categoryChipTextSelected,
                    ]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.charCount}>
            {formData.description.length} / 500
          </Text>

          {!!submitError && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorBannerText}>⚠️ {submitError}</Text>
            </View>
          )}


          <CustomButton
            label={
              isSubmitting
                ? Strings.addGrievance.submitting
                : Strings.addGrievance.submitButton
            }
            onPress={handleSubmit}
            isLoading={isSubmitting}
            style={styles.submitBtn}
          />

          <CustomButton
            label="Cancel"
            onPress={() => navigation.goBack()}
            variant="ghost"
            style={styles.cancelBtn}
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

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

  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primarySoft,
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.lg,
    borderWidth: 1,
    borderColor: Colors.primary + '40',
    gap: Layout.spacing.md,
  },
  headerEmoji: { fontSize: 32 },
  headerText: { flex: 1 },
  headerTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: Layout.fontWeight.bold,
    color: Colors.textPrimary,
  },
  headerSub: {
    fontSize: Layout.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },


  formCard: {
    backgroundColor: Colors.surface,
    borderRadius: Layout.radius.xl,
    padding: Layout.spacing.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    ...Layout.shadowSm,
  },

  textArea: {
    minHeight: 110,
    paddingTop: Layout.spacing.sm + 4,
  },


  categoryLabel: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.semiBold,
    color: Colors.textSecondary,
    marginBottom: Layout.spacing.sm,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.spacing.sm,
    marginBottom: Layout.spacing.xs,
  },
  categoryChip: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs + 2,
    borderRadius: Layout.radius.full,
    backgroundColor: Colors.inputBackground,
    borderWidth: 1.5,
    borderColor: Colors.surfaceBorder,
  },
  categoryChipSelected: {
    backgroundColor: Colors.primarySoft,
    borderColor: Colors.primary,
  },
  categoryChipText: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.medium,
    color: Colors.textSecondary,
  },
  categoryChipTextSelected: {
    color: Colors.primaryLight,
    fontWeight: Layout.fontWeight.semiBold,
  },

  charCount: {
    fontSize: Layout.fontSize.xs,
    color: Colors.textMuted,
    textAlign: 'right',
    marginBottom: Layout.spacing.md,
    marginTop: -Layout.spacing.sm,
  },


  errorBanner: {
    backgroundColor: Colors.errorBg,
    borderRadius: Layout.radius.md,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
    borderWidth: 1,
    borderColor: Colors.error + '50',
  },
  errorBannerText: {
    fontSize: Layout.fontSize.sm,
    color: Colors.error,
    fontWeight: Layout.fontWeight.medium,
  },

  submitBtn: { width: '100%', marginBottom: Layout.spacing.sm },
  cancelBtn: { width: '100%' },
});

export default AddGrievanceScreen;
