import classNames from 'classnames';
import type {FC} from 'react';
import React from 'react';

import banner from 'src/assets/images/about.png';
import img1 from 'src/assets/images/about-content-1.png';
import img2 from 'src/assets/images/about-content-2.png';
import img3 from 'src/assets/images/about-content-3.png';
import logo from 'src/assets/images/logo3.png';
import team from 'src/assets/images/team.png';
import VideoPoster from 'src/assets/images/video.png';
import {Page} from 'src/components/common/Page';
import {Breadcrumbs} from 'src/components/ui/Breadcrumbs';
import {Navigation} from 'src/components/ui/Navigation';
import {SideBar} from 'src/components/ui/Sidebar';
import {Text, TextSize} from 'src/components/ui/Text';
import {TextWeight} from 'src/components/ui/Text/Text';
import {Color} from 'src/types/Color';

import s from './AboutUs.scss';
import {RoadMap} from "src/components/ui/RoadMap";


const breadcrumbs = [
  'Инвестиционные предложения',
  'Завод ЖБИ',
];

const sidebar = [{
  heading: 'Предложение',
  hash: '#about',
},
{
  heading: 'О проекте',
  hash: '#about',
  items: [
    {
      label: 'Описание',
      hash: '#about',
    },
    {
      label: 'Галерея',
      hash: '#gallery',
    },
    {
      label: 'Команда',
      hash: '#team',
    },
    {
      label: 'Дорожная карта',
      hash: '#team',
    },
    {
      label: 'Контакты',
      hash: '#team',
    },
    {
      label: 'Дополнительно',
      hash: '#team',
    },
  ],
},
{
  heading: 'О заемщике',
  hash: '#bout-the-borrower',
  items: [
    {
      label: 'Организация',
      hash: '#about',
    },
    {
      label: 'Учредители',
      hash: '#about',
    },
    {
      label: 'Прочее',
      hash: '#about',
    },
  ],
},
{
  heading: 'Документы',
  hash: '#docs',
},
{
  heading: 'Эксперты',
  hash: '#experts',
}];

const roadmap = [
  {
    label: 'Июль 2020',
    desc: 'Описание',
  },
  {
    label: 'Август 2020',
    desc: 'Описание',
  },
  {
    label: 'Сентябрь 2020',
    desc: 'Описание',
  },
  {
    label: 'Ноябрь 2020',
    desc: 'Описание',
    active: true,
  },
  {
    label: 'Декабрь 2020',
    desc: 'MVP',
  }
];

function AddIcon() {
  return (
    <a href='#'>
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M5.62109 12.0002H18.3824' stroke='black' />
        <path d='M12 18.3809V5.61951' stroke='black' />
      </svg>
    </a>
  );
}

function FacebookIcon() {
  return (
    <svg width='33' height='33' viewBox='0 0 33 33' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect width='32.8276' height='32.8276' rx='3.07759' fill='#3477E9' />
      <path fillRule='evenodd' clipRule='evenodd' d='M17.5886 23.9619V17.0752H19.909L20.2564 14.3912H17.5886V12.6776C17.5886 11.9006 17.8052 11.371 18.9237 11.371L20.3503 11.3704V8.96988C20.1035 8.93723 19.2567 8.86414 18.2716 8.86414C16.2147 8.86414 14.8067 10.1149 14.8067 12.4119V14.3912H12.4805V17.0752H14.8067V23.9619H17.5886Z' fill='white' />
    </svg>
  );
}

function LinkInIcon() {
  return (
    <svg width='33' height='33' viewBox='0 0 33 33' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect x='0.0859375' y='0.000244141' width='32.8276' height='32.8276' rx='3.07759' fill='#3480BA' />
      <path fillRule='evenodd' clipRule='evenodd' d='M11.2257 9.47742C12.147 9.47742 12.8951 10.2255 12.8951 11.1474C12.8951 12.0697 12.147 12.8178 11.2257 12.8178C10.3007 12.8178 9.55469 12.0697 9.55469 11.1474C9.55469 10.2255 10.3007 9.47742 11.2257 9.47742Z' fill='white' />
      <path fillRule='evenodd' clipRule='evenodd' d='M9.78516 23.3511H12.6676V14.0845H9.78516V23.3511Z' fill='white' />
      <path fillRule='evenodd' clipRule='evenodd' d='M14.4688 14.0838H17.2293V15.3508H17.2687C17.6527 14.6221 18.5929 13.854 19.9942 13.854C22.9096 13.854 23.4484 15.7726 23.4484 18.2683V23.3504H20.5697V18.8439C20.5697 17.7694 20.5503 16.387 19.0724 16.387C17.574 16.387 17.3453 17.558 17.3453 18.7673V23.3504H14.4688V14.0838Z' fill='white' />
    </svg>

  );
}

function Video() {
  return (
    <video className={s.contentPageVideo} poster={VideoPoster}>
      <source src='movie.mp4' type='video/mp4' />
      <source src='movie.ogg' type='video/ogg' />
    </video>
  );
}

export const AboutUs: FC = () => {
  return (
    <Page>
      <section className={s.AboutUs}>
        <Navigation />
        <div className='container'>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <div className={s.banner} style={{backgroundImage: `url(${banner})`}}>
            <img src={logo} className={s.bannerIcon} alt='' />
            <Text size={TextSize.bodyMini} className={s.bannerTitle} color={Color.white}>Завод ЖБИ</Text>
            <Text size={TextSize.tabMenu} color={Color.white}> Производство </Text>
          </div>
        </div>
        <div className={classNames(s.AboutUsContent, 'content')}>
          <div className='container'>
            <div className='row'>
              <div className='col-md-2'>
                <SideBar menuItems={sidebar} />
              </div>
              <div className='col-md-8'>
                <div id='aboutProject' className={s.contentPage}>
                  <div className={s.contentPageHeader}>
                    <Text size={TextSize.subHeadline1}>О проекте</Text>
                    <AddIcon />
                  </div>
                  <Video />
                  <Text className={s.contentPageTitle} size={TextSize.subHeadline1} weight={TextWeight.semibold}>Производство
                    сборного железобетона</Text>
                  <Text className={s.contentPageText} size={TextSize.body1}>
                    Наиболее экономный путь – приобретение бЗависть от региона, площади и других моментов
                    удовлетворяющего нормативным требованиям, колебнется в пределах 1-2 млн. рублей в год.
                  </Text>
                  <Text className={s.contentPageText} size={TextSize.body1}>
                    Сократить первоначальные расходы на обустройство, можно, подобрав здание, уже оснащенное
                    промышленной электросетью, отопительными, водными и другими коммуникациями. При этом отдельное
                    внимание следует уделить качественному оснащению складских площадей. Нарушение правил складирования
                    может привести к намоканию либо механическим повреждениям готового продукта и, соответственно,
                    финансовым потерям.
                  </Text>
                  <Text className={s.contentPageTitle} size={TextSize.subHeadline1} weight={TextWeight.semibold}>Производство
                    сборного железобетона</Text>
                  <Text className={s.contentPageText} size={TextSize.body1}>
                    Наиболее экономный путь – приобретение бывших в употреблении установок. Однако при этом владелец
                    завода рискует получить лишние пункты расходов, связанные с поломкой агрегатов и простоями
                    производства. Новый комплект формируется соответственно планируемым объемам выпуска и номенклатуре
                    продукции
                  </Text>
                  <div className={s.contentImagesWrapper} id='gallery'>
                    <img src={img1} alt='' />
                    <img src={img2} alt='' />
                    <img src={img3} alt='' />
                  </div>
                  <div className={s.contentTeam} id='team'>
                    <Text size={TextSize.h3} className={s.contentTeamHeading}>Команда</Text>
                    <div className='row'>
                      <div className={classNames('col-md-6', s.contentTeamItem)}>
                        <img src={team} alt='team' className={s.contentTeamImg} />
                        <Text size={TextSize.body2} className={s.contentTeamTitle} weight={TextWeight.semibold}>Орлов Александр Иванович</Text>
                        <Text size={TextSize.body1} weight={TextWeight.light} className={s.contentTeamSubTitle}>Генеральный директор</Text>
                        <div className={s.contentTeamSocial}><a href='#'><FacebookIcon /></a> <a href='#'> <LinkInIcon/> </a></div>
                        <Text size={TextSize.body1}>Такой-то специалист в таком-то деле. Лауреат того-то. Участник того-то.</Text>
                      </div>
                      <div className={classNames('col-md-6', s.contentTeamItem)}>
                        <img src={team} alt='team' className={s.contentTeamImg} />
                        <Text size={TextSize.body2} className={s.contentTeamTitle} weight={TextWeight.semibold}>Орлов Александр Иванович</Text>
                        <Text size={TextSize.body1} weight={TextWeight.light} className={s.contentTeamSubTitle}>Генеральный директор</Text>
                        <div className={s.contentTeamSocial}><a href='#'><FacebookIcon /></a> <a href='#'> <LinkInIcon/> </a></div>
                        <Text size={TextSize.body1}>Такой-то специалист в таком-то деле. Лауреат того-то. Участник того-то.</Text>
                      </div>
                    </div>
                  </div>
                  <div id='roadmap'>
                    <Text size={TextSize.h3}>Дорожная карта</Text>
                    <RoadMap data={roadmap} />
                  </div>
                  <div id="contacts">
                    <Text size={TextSize.h3}>Контактные данные</Text>
                    <table>
                      <tr>
                        <td>
                          <Text size={TextSize.body1}>Сайт:</Text>
                        </td>
                        <td></td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </Page>
  );
};
