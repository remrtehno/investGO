import {useMemo} from 'react';

import type {Form} from 'src/components/common/Form';
import {FieldType} from 'src/components/common/Form/Form';
import {EmailArrayField} from 'src/components/pages/ProfilePage/fields/EmailArrayField';
import {PhoneArrayField} from 'src/components/pages/ProfilePage/fields/PhoneArrayField';
import type {User} from 'src/types/User';
import { email } from 'src/validations/email';
import {minLength} from 'src/validations/minLength';
import {required} from 'src/validations/required';

import {BgImageField} from './fields/BgImageField';
import {GalleryField} from './fields/GalleryField';
import {RoadmapField} from './fields/RoadmapField';
import {SocialsField} from './fields/SocialsField/SocialsField';
import {TeamField} from './fields/TeamField';

export const useCompanyEditFields = (company: User.Company | {}) => {
  return useMemo((): Form.FieldModels => ({
    // id: {
    //   name: 'id',
    //   type: FieldType.hidden,
    // },
    preview: {
      name: 'preview',
      type: FieldType.custom,
      Field: BgImageField,
      label: 'Загрузить фоновое изображение',
    } as any,
    logo: {
      name: 'logo',
      type: FieldType.custom,
      Field: BgImageField,
      // validations: [required()],
      size: 'small',
      background: 'white',
    } as any,
    title: {
      name: 'title',
      type: FieldType.text,
      label: 'Наименование юридического лица (проекта)',
      validations: [required()],
      disabled: true,
    },
    small_description: {
      name: 'small_description',
      type: FieldType.text,
      label: 'Cфера деятельности',
      validations: [required()],
    },
    address: {
      name: 'address',
      type: FieldType.text,
      label: 'Адрес',
      validations: [required()],
    },
    video_link: {
      name: 'video_link',
      type: FieldType.text,
      label: 'Ссылка на видео (если есть)',
    },
    description: {
      name: 'description',
      type: FieldType.textArea,
      label: 'Текст описания',
      validations: [required()],
    },
    gallery_images: {
      name: 'gallery_images',
      type: FieldType.custom,
      Field: GalleryField,
    } as any,
    team: {
      name: 'team',
      type: FieldType.custom,
      Field: TeamField,
    } as any,
    roadmap: {
      name: 'roadmap',
      type: FieldType.custom,
      Field: RoadmapField,
    } as any,
    email: {
      name: 'email',
      type: FieldType.text,
      label: 'Ваш email',
      validations: [required(), email()],
    } as any,
    phone: {
      name: 'phone',
      type: FieldType.phone,
      label: 'Номер телефона',
      validations: [required()],
    } as any,
    site: {
      name: 'site',
      type: FieldType.text,
      label: 'Адрес сайта',
    },
    link: {
      name: 'link',
      type: FieldType.custom,
      Field: SocialsField,
      label: 'Социальные сети',
    } as any,
    data_valid: {
      name: 'data_valid',
      type: FieldType.checkbox,
      label: 'Верность сведений о проекте и документов к нему.',
      defaultValue: true,
      validations: [required()],
    },
  }), []);
};
