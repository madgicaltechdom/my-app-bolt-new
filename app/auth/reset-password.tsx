import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { FormInput } from '@/components/FormInput';
import { LoadingButton } from '@/components/LoadingButton';
import { Link, useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ArrowLeft } from 'lucide-react-native';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
});

type FormData = {
  email: string;
};

export default function ResetPasswordScreen() {
  const { resetPassword } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await resetPassword(data.email);
      setSent(true);
      Alert.alert(
        'Reset Email Sent',
        'Check your email for password reset instructions.'
      );
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} color="#3B82F6" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>
          {sent
            ? 'Check your email for reset instructions'
            : 'Enter your email to receive reset instructions'}
        </Text>
      </View>

      {!sent && (
        <View style={styles.form}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email?.message}
              />
            )}
          />

          <LoadingButton
            title="Send Reset Email"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            style={styles.resetButton}
          />
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Remember your password? </Text>
        <Link href="/auth/login" asChild>
          <TouchableOpacity>
            <Text style={styles.linkText}>Sign In</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  backButton: {
    paddingTop: 60,
    paddingBottom: 20,
  },
  header: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    flex: 1,
  },
  resetButton: {
    marginTop: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
  },
  linkText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
});