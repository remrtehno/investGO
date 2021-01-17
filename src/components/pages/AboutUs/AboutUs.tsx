import classNames from 'classnames';
import type {FC} from 'react';
import React, {useState} from 'react';

import banner from 'src/assets/images/about.png';
import img1 from 'src/assets/images/about-content-1.png';
import img2 from 'src/assets/images/about-content-2.png';
import img3 from 'src/assets/images/about-content-3.png';
import experts from 'src/assets/images/exeprts.png';
import logo from 'src/assets/images/logo3.svg';
import team from 'src/assets/images/team.png';
import VideoPoster from 'src/assets/images/video.png';
import {Page} from 'src/components/common/Page';
import {breadcrumbs, roadmap, sidebar, tabs} from 'src/components/pages/AboutUs/mockup';
import {Navigation} from 'src/components/pages/AboutUs/Navigation';
import {RoadMap} from 'src/components/pages/AboutUs/RoadMap';
import {SideBar} from 'src/components/pages/AboutUs/Sidebar';
import {TabsContent} from 'src/components/pages/AboutUs/TabsContent';
import {Breadcrumbs} from 'src/components/ui/Breadcrumbs';
import Tabs from 'src/components/ui/Tabs/Tabs';
import {Text, TextSize} from 'src/components/ui/Text';
import {TextWeight} from 'src/components/ui/Text/Text';
import {Color} from 'src/contstants/Color';
import {DocumentIcon} from 'src/icons/DocumentIcon';
import {FacebookIcon} from 'src/icons/FacebookIcon';
import {Instagram} from 'src/icons/InstagramIcon';
import {LinkedIn} from 'src/icons/LinkedIn';

import s from './AboutUs.scss';

function Video() {
  return (
    <video className={classNames(s.contentPageVideo)} poster={VideoPoster}>
      <source src='movie.mp4' type='video/mp4' />
      <source src='movie.ogg' type='video/ogg' />
    </video>
  );
}

function AvatarLabel() {
  return (
    <svg width='14' height='19' viewBox='0 0 14 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M4 10H10V19L7 17.5L4 19V10Z' fill='#FF3B30' />
      <circle cx='7' cy='7' r='7' fill='#FF3B30' />
    </svg>
  );
}


export const AboutUs: FC = () => {
  const [tab, setTab] = useState('1');

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
                <div id='about' className={classNames(s.contentPage)}>
                  <div className={classNames(s.contentPageHeader)}>
                    <Text size={TextSize.h2}>О проекте</Text>
                  </div>
                  <Video />
                  <Text className={classNames(s.contentPageTitle)} size={TextSize.subHeadline1} weight={TextWeight.semibold}>Производство
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
                        <Text size={TextSize.body2} className={s.contentTeamTitle} weight={TextWeight.semibold}>Орлов
                          Александр Иванович</Text>
                        <Text size={TextSize.body1} weight={TextWeight.light} className={s.contentTeamSubTitle}>Генеральный
                          директор</Text>
                        <div className={s.contentTeamSocial}><a href='#'><FacebookIcon /></a> <a href='#'> <LinkedIn />
                        </a></div>
                        <Text size={TextSize.body1}>Такой-то специалист в таком-то деле. Лауреат того-то. Участник
                          того-то.</Text>
                      </div>
                      <div className={classNames('col-md-6', s.contentTeamItem)}>
                        <img src={team} alt='team' className={s.contentTeamImg} />
                        <Text size={TextSize.body2} className={s.contentTeamTitle} weight={TextWeight.semibold}>Орлов
                          Александр Иванович</Text>
                        <Text size={TextSize.body1} weight={TextWeight.light} className={s.contentTeamSubTitle}>Генеральный
                          директор</Text>
                        <div className={s.contentTeamSocial}><a href='#'><FacebookIcon /></a> <a href='#'> <LinkedIn />
                        </a></div>
                        <Text size={TextSize.body1}>Такой-то специалист в таком-то деле. Лауреат того-то. Участник
                          того-то.</Text>
                      </div>
                    </div>
                  </div>
                  <div id='roadmap' className={s.contentRoadMap}>
                    <Text size={TextSize.h3} className={s.AboutUsItemsTitle}>Дорожная карта</Text>
                    <RoadMap data={roadmap} />
                  </div>
                  <div id='contacts'>
                    <Text size={TextSize.h3} className={s.AboutUsItemsTitle}>Контактные данные</Text>
                    <table className={s.contentTable}>
                      <tbody>
                        <tr>
                          <td><Text size={TextSize.body1} weight={TextWeight.semibold}>Сайт:</Text></td>
                          <td><Text size={TextSize.body2} ><a href='#'>jbi.com</a></Text></td>
                        </tr>
                        <tr>
                          <td><Text size={TextSize.body1} weight={TextWeight.semibold}>Emai:</Text></td>
                          <td><Text size={TextSize.body2} >jbi@mail.com</Text></td>
                        </tr>
                        <tr>
                          <td><Text size={TextSize.body1} weight={TextWeight.semibold}>Телефон:</Text></td>
                          <td><Text size={TextSize.body2} >+7 (460) 586-75-69</Text></td>
                        </tr>
                        <tr>
                          <td><Text size={TextSize.body1} weight={TextWeight.semibold}>Фактический адрес:</Text></td>
                          <td><Text size={TextSize.body2} >г.Москва, ​Лосино островский район, Норильская, 1</Text></td>
                        </tr>
                        <tr>
                          <td><Text size={TextSize.body1} weight={TextWeight.semibold}>Соц.сети:</Text></td>
                          <td>
                            <a href='#'><FacebookIcon /></a>&nbsp;
                            <a href='#'><Instagram /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                { /*About the borrower*/ }
                <div id='about-borrower' className={s.contentPage}>
                  <div className={s.contentPageHeader}>
                    <Text size={TextSize.h2}>О заемщике</Text>
                  </div>
                  <Tabs
                    tabs={tabs}
                    activeTab={tab}
                    onChange={setTab}
                    viewType='about-boroow'
                  />
                  <TabsContent tabId={tab} />
                </div>
                <div id='docs' className={s.contentPage}>
                  <div className={s.contentPageHeader}>
                    <Text size={TextSize.h2}>Документы</Text>
                  </div>
                  <a href='#' className={s.contentDocumentItem}>
                    <DocumentIcon />
                    <Text size={TextSize.body2}>Свидетельство на осуществление <br /> деятельности</Text>
                  </a>
                  <a href='#' className={s.contentDocumentItem}>
                    <DocumentIcon />
                    <Text size={TextSize.body2}>Свидетельство о регистрации <br />
                      юридичесского лица</Text>
                  </a>
                </div>
                <div id='experts' className={s.contentPage}>
                  <div className={s.contentPageHeader}>
                    <Text size={TextSize.h2}>Эксперты</Text>
                  </div>
                  <div className={s.contentExpertsItem}>
                    <div className={s.contentExpertsItemImage}>
                      <img src={experts} alt='experts' width='60' height='60' />
                      <AvatarLabel />
                    </div>

                    <div className={s.contentExpertsItemText}>
                      <Text size={TextSize.body2} weight={TextWeight.semibold}>Орлов Александр Иванович</Text>
                      <Text size={TextSize.body1} weight={TextWeight.light}>Такой-то специалист. <br />
                        Кратко об опыте специалиста.</Text>
                    </div>
                  </div>
                  <Text
                    className={s.contentExpertsItemNotice}
                    color={Color.red}
                    size={TextSize.body1}
                    weight={TextWeight.light}
                  >Результаты работы экперта прилагаются к активному проекту.</Text>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </Page>
  );
};
