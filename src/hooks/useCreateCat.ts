import { useRef, useCallback } from 'react';
import { useAppDispatch } from '../Redux/hooks';
import { createCatAsync } from '../Redux/features/catsSlice';
import { CatFormData } from '../types/cat.types';

const useCreateCat = () => {
  const dispatch = useAppDispatch();
  const hasDispatchedRef = useRef(false);

  const collectFormData = (): CatFormData => {
    return {
      goals: localStorage.getItem('goals'),
      issues_faced: localStorage.getItem('issues_faced'),
      activity_level: localStorage.getItem('activity_level'),
      gender: localStorage.getItem('gender'),
      age: parseInt(localStorage.getItem('age') || '0'),
      country: localStorage.getItem('country'),
      zipcode: localStorage.getItem('zipcode'),
      breed: localStorage.getItem('breed'),
      weight: parseFloat(localStorage.getItem('weight') || '0'),
      target_weight: parseFloat(localStorage.getItem('target_weight') || '0'),
      required_progress: localStorage.getItem('required_progress'),
      check_in_period: localStorage.getItem('check_in_period'),
      training_days: localStorage.getItem('training_days'),
      medical_conditions: localStorage.getItem('medical_conditions'),
      medications: localStorage.getItem('medications'),
      dietary_restrictions: localStorage.getItem('dietary_restrictions'),
      medical_history: localStorage.getItem('medical_history'),
      items: localStorage.getItem('items'),
    };
  };

  const createCat = useCallback(async () => {
    if (hasDispatchedRef.current) return;
    hasDispatchedRef.current = true;

    try {
      const formData = collectFormData();
      await dispatch(createCatAsync(formData)).unwrap();
      return true;
    } catch (error) {
      console.error('Failed to create cat:', error);
      return false;
    }
  }, [dispatch]);

  return { createCat };
};

export default useCreateCat; 