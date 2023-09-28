'use client';
import { useState } from 'react';
import {
  Container as MuiContainer,
  Typography,
  TextField as MuiTextField,
  Button,
  Link,
  Box,
} from '@mui/material';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation'

const Container = styled(MuiContainer)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '2rem',
});

const Form = styled.form({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '400px',
  padding: '2rem',
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
});

const TextField = styled(MuiTextField)({
  width: '100%',
  marginBottom: '1.5rem',
});

const GoToLogin = styled.div({
  marginTop: '1rem',
});

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    router.push('/');
  };

  return (
    <Container>
      <Box>
        <Form onSubmit={handleSubmit}>
          <Typography variant='h4' align='center' gutterBottom>
            Register
          </Typography>
          <TextField
            label='Username'
            variant='outlined'
            name='username'
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            label='Password'
            variant='outlined'
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
          <Button variant='contained' color='primary' type='submit'>
            Register
          </Button>
          <GoToLogin>
            <Typography variant='body1' align='center' gutterBottom>
              Do you have an account?{' '}
              <Link href='/auth/login'>Login instead</Link>
            </Typography>
          </GoToLogin>
        </Form>
      </Box>
    </Container>
  );
}
