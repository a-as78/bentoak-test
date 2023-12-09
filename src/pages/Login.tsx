import React from 'react';
import { useForm } from 'react-hook-form';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { LoginDTO } from '../dto/LoginDTO';
import { LoginProps } from '../models/Layout';

const Login: React.FC<LoginProps> = ({ onAuthenticated }) => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginDTO>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginDTO) => {
    const dto = plainToInstance(LoginDTO, data);
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      validationErrors.forEach((error: ValidationError) => {
        setError(error.property as keyof LoginDTO, {
          type: "manual",
          message: Object.values(error.constraints ?? {})[0],
        });
      });
      return;
    }

    if (AuthService.login(dto)) {
      onAuthenticated(true);
      setTimeout(() => navigate('/dashboard'), 1000); // Navigate after 1 seconds
    } else {
      setError('password', {
        type: "manual",
        message: "Invalid Credentials",
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
      <Typography variant="h4">Login</Typography>
      <TextField label="Username" variant="outlined" margin="normal" {...register('username')} error={!!errors.username} helperText={errors.username?.message} />
      <TextField label="Password" type="password" variant="outlined" margin="normal" {...register('password')} error={!!errors.password} helperText={errors.password?.message} />
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>Login</Button>
    </Box>
  );
};

export default Login;
