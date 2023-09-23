import ProfileData from "@/containers/Profile/ProfileData";

export default function Profile({ params }: { params: { userName: string; userId: number } }) {
  return <ProfileData />;
}
