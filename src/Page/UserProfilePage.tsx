import { Flex } from "@radix-ui/themes";
import UserProfileForm from "../forms/user-profile-form/UserProfileForm";
import MetaData from "../components/MetaData";

const UserProfilePage = () => {
  return (
    <Flex align="center" justify="center" width="100vw" className="p-4 md:p-20">
      <MetaData title="Profile" />
      <UserProfileForm />
    </Flex>
  );
};

export default UserProfilePage;
