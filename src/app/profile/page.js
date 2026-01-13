import ProtectedPage from '@/components/ProtectedPage';
import ProfileForm from '@/components/ProfileForm';

export default function ProfilePage() {
  return (
    <ProtectedPage>
      <ProfileForm />
    </ProtectedPage>
  );
}
