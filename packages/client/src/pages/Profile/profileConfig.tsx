import { ProfileEditForm } from 'features/ProfileEditForm';
import { ProfileEditPasswordForm } from 'features/ProfileEditPasswordForm';
import { ProfileMain } from 'features/ProfileMain';

import { PAGES } from 'app/lib/routes.types';

import { UserInfoResponse } from 'app/store/api/auth/authApi';

type ProfileConfig = {
  [key: string]: {
    getComponent: (profileData: UserInfoResponse) => JSX.Element;
    linkBack: string;
    hoverAvatar: boolean;
  };
};

export const profileConfig: ProfileConfig = {
  [PAGES.EDIT_PROFILE]: {
    getComponent: profileData => <ProfileEditForm profileData={profileData} />,
    linkBack: PAGES.PROFILE,
    hoverAvatar: false,
  },
  [PAGES.EDIT_PASSWORD]: {
    getComponent: profileData => (
      <ProfileEditPasswordForm profileData={profileData} />
    ),
    linkBack: PAGES.PROFILE,
    hoverAvatar: false,
  },
  [PAGES.PROFILE]: {
    getComponent: profileData => <ProfileMain profileData={profileData} />,
    linkBack: PAGES.GAME,
    hoverAvatar: true,
  },
};
