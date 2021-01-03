import React, {FC} from 'react';
import {ProfilePage} from './ProfilePage';

export const RegisterPage: FC = () => <ProfilePage checkAuth={false} />;

