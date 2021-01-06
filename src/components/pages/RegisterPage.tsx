import type {FC} from 'react';
import React from 'react';

import {ProfilePage} from './ProfilePage';

export const RegisterPage: FC = () => <ProfilePage checkAuth={false} />;

