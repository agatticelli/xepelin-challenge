import { decode } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { AuthProvider, User } from './context';

export const withAuth = (WrappedComponent: React.FC<any>) => {
  const token = cookies().get('token')?.value ?? '';
  const { sub: username } = decode(token) as { sub: string };
  const user: User = { username };

  const Wrapper = (props: any) => {
    return (
      <AuthProvider value={{ user, isAuthenticated: !!user }}>
        <WrappedComponent {...props} />
      </AuthProvider>
    );
  };

  return Wrapper;
};
