import React from 'react';
import { useForm } from 'react-hook-form';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { SignupDTO } from '../dto/SignupDTO'; 
import { SignupProps } from '../models/User';

const Signup: React.FC<SignupProps> = ({ onAuthenticated }) => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<SignupDTO>();
  const navigate = useNavigate();

  const onSubmit = async (data: SignupDTO) => {
    const dto = plainToInstance(SignupDTO, data);
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      validationErrors.forEach((error: ValidationError) => {
        setError(error.property as keyof SignupDTO, {
          type: "manual",
          message: Object.values(error.constraints ?? {})[0],
        });
      });
      return;
    }
    const isRegistered = AuthService.register(dto);
    if (isRegistered) {
      onAuthenticated(true);
      setTimeout(() => navigate('/dashboard'), 1000); // Navigate after 1 second
    } else {
      setError('username', {
        type: "manual",
        message: "Username already exists",
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
      <Typography variant="h4">Signup</Typography>
      <TextField label="Username" variant="outlined" margin="normal" {...register('username')} error={!!errors.username} helperText={errors.username?.message} />
      <TextField label="Password" type="password" variant="outlined" margin="normal" {...register('password')} error={!!errors.password} helperText={errors.password?.message} />
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>Signup</Button>
    </Box>
  );
};

export default Signup;
