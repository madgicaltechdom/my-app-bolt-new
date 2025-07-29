import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FormInput } from './FormInput';
import { LoadingButton } from './LoadingButton';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  full_name: yup.string().required('Full name is required'),
  bio: yup.string().max(500, 'Bio must be less than 500 characters'),
});

type FormData = {
  full_name: string;
  bio: string;
};

interface ProfileFormProps {
  user: any;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  loading: boolean;
}

export function ProfileForm({ user, onSubmit, onCancel, loading }: ProfileFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      full_name: user.user_metadata?.full_name || '',
      bio: user.user_metadata?.bio || '',
    },
  });

  return (
    <View style={styles.container}>
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
          />
        )}
      />

      <View style={styles.buttonContainer}>
        <LoadingButton
          title="Save Changes"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          style={styles.saveButton}
        />
        <LoadingButton
          title="Cancel"
          onPress={onCancel}
          style={styles.cancelButton}
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