import {useMemo} from 'react';

import type {Form} from 'src/components/common/Form';
import {FieldType} from 'src/components/common/Form/Form';
import {EmailArrayField} from 'src/components/pages/ProfilePage/fields/EmailArrayField';
import {PhoneArrayField} from 'src/components/pages/ProfilePage/fields/PhoneArrayField';
import type {User} from 'src/types/User';
import {minLength} from 'src/validations/minLength';
import {required} from 'src/validations/required';

import {BgImageField} from './fields/BgImageField';
import {GalleryField} from './fields/GalleryField';
import {RoadmapField} from './fields/RoadmapField';
import {SocialsField} from './fields/SocialsField/SocialsField';
import {TeamField} from './fields/TeamField';

export const useCompanyEditFields = (company: User.Company | {}) => {
  return useMemo((): Form.FieldModels => ({
    id: {
      name: 'id',
      type: FieldType.hidden,
    },
    bg_image: {
      name: 'bg_image',
      type: FieldType.custom,
      Field: BgImageField,
      label: 'Загрузить фоновое изображение',
    } as any,
    logo: {
      name: 'logo',
      type: FieldType.custom,
      Field: BgImageField,
      validations: [required()],
      size: 'small',
      background: 'white',
    } as any,
    name: {
      name: 'name',
      type: FieldType.text,
      label: 'Наименование юридического лица (проекта)',
      validations: [required()],
      disabled: true,
    },
    field_of_activity: {
      name: 'field_of_activity',
      type: FieldType.text,
      label: 'Cфера деятельности',
      validations: [required()],
    },
    video: {
      name: 'video',
      type: FieldType.text,
      label: 'Ссылка на видео (если есть)',
    },
    description: {
      name: 'description',
      type: FieldType.textArea,
      label: 'Текст описания',
      validations: [required()],
    },
    gallery: {
      name: 'gallery',
      type: FieldType.custom,
      Field: GalleryField,
    } as any,
    founders: {
      name: 'founders',
      type: FieldType.custom,
      Field: TeamField,
    } as any,
    roadmap: {
      name: 'roadmap',
      type: FieldType.custom,
      Field: RoadmapField,
    } as any,
    emails: {
      name: 'emails',
      type: FieldType.custom,
      Field: EmailArrayField,
      label: 'Ваш email',
      validations: [required()],
    } as any,
    phones: {
      name: 'phones',
      type: FieldType.custom,
      Field: PhoneArrayField,
      label: 'Номер телефона',
      validations: [required()],
    } as any,
    site: {
      name: 'site',
      type: FieldType.text,
      label: 'Адрес сайта',
    },
    socials: {
      name: 'socials',
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