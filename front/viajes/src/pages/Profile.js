import ProfileInfo from '../components/components/Profile';
import useAuth from '../shared/hooks/useAuth';
import '../stylesPages/Profile.css';

export default function Profile() {
  const { updateInfoUser } = useAuth();
  return <ProfileInfo onSubmit={updateInfoUser}></ProfileInfo>;
}
