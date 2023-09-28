import { useAuth } from './components/auth/context';
import { withAuth } from './components/auth/withAuth';

const RegisterPage = () => {
  const { user } = useAuth();
  console.log(user);
  return <div>asdf</div>
};

export default withAuth(RegisterPage);