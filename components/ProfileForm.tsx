import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FormInput } from './FormInput';
import { LoadingButton } from './LoadingButton';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormData = {
  full_name: string;
  bio: string;
};

const schema = yup.object<FormData>({
  full_name: yup.string().required('Full name is required'),
  bio: yup.string().max(500, 'Bio must be less than 500 characters').default(''),
});

interface ProfileFormProps {
  user: any;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  loading: boolean;
  testID?: string;
}

export function ProfileForm({ user, onSubmit, onCancel, loading, testID }: ProfileFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema) as any, // Type assertion to handle yup resolver type
    defaultValues: {
      full_name: user.user_metadata?.full_name || '',
      bio: user.user_metadata?.bio || '',
    },
  });
  
  const handleFormSubmit = (data: FormData) => {
    onSubmit(data);
  };

  return (
    <View style={styles.container} testID={testID}>
      <Controller
        control={control}
        name="full_name"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            label="Full Name"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.full_name?.message}
            testID="full-name-input"
          />
        )}
      />

      <Controller
        control={control}
        name="bio"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            label="Bio"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            multiline
            numberOfLines={4}
            style={styles.bioInput}
            error={errors.bio?.message}
            testID="bio-input"
          />
        )}
      />

      <View style={styles.buttonContainer}>
        <LoadingButton
          title="Save Changes"
          onPress={handleSubmit(handleFormSubmit)}
          loading={loading}
          style={styles.saveButton}
          testID="save-button"
        />
        <LoadingButton
          title="Cancel"
          onPress={onCancel}
          style={styles.cancelButton}
          testID="cancel-button"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    gap: 12,
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: '#3B82F6',
  },
  cancelButton: {
    backgroundColor: '#6B7280',
  },
});