import { ProfileEditForm } from "features/ProfileEditForm";
import { ProfileEditPasswordForm } from "features/ProfileEditPasswordForm";
import { ProfileMain } from "features/ProfileMain";

import { PAGES } from "app/lib/routes.types";

import mockProfileData from "../../mocks/profileData.json";

type ProfileConfig = {
  [key: string]: {
    component: JSX.Element;
    linkBack: string;
    hoverAvatar: boolean;
  }
}

export const profileConfig: ProfileConfig = {
  [PAGES.EDIT_PROFILE]: {
    component: <ProfileEditForm profileData={mockProfileData} />,
    linkBack: PAGES.PROFILE,
    hoverAvatar: false
  },
  [PAGES.EDIT_PASSWORD]: {
    component: <ProfileEditPasswordForm profileData={mockProfileData} />,
    linkBack: PAGES.PROFILE,
    hoverAvatar: false
  },
  [PAGES.PROFILE]: {
    component: <ProfileMain profileData={mockProfileData} />,
    linkBack: PAGES.GAME,
    hoverAvatar: true
  }
}
