import cx from 'classnames';
import type {CSSProperties, FC} from 'react';
import React, {useEffect, useMemo, useRef, useState} from 'react';

import Tabs from 'src/components/ui/Tabs/Tabs';
import {usePageScroll} from 'src/hooks/usePageScroll';
import {usePosition} from 'src/hooks/usePosition';
import {getElementPosition} from 'src/utils/getElementPosition';

import s from './CompanyEditNavigation.scss';

export declare namespace CompanyEditNavigation {
  export type Props = {};
}

const tabs = [
  {id: 'preview-section', label: 'Превью'},
  {id: 'description-section', label: 'Описание'},
  {id: 'gallery-section', label: 'Галерея'},
  {id: 'team-section', label: 'Команда'},
  {id: 'roadmap-section', label: 'Дорожная карта'},
  {id: 'contacts-section', label: 'Контакты'},
];

export const CompanyEditNavigation: FC<CompanyEditNavigation.Props> = (props) => {
  const [activeSection, setActiveSection] = useState('');
  const preventHandleScrollRef = useRef(false);
  const {scrollTop} = usePageScroll();
  const navRef = useRef<HTMLDivElement | null>(null);
  const navPos = usePosition(navRef);

  const [navStyle, navClass] = useMemo((): [CSSProperties, string] | [] => {
    if (!navPos) {
      return [];
    }

    if (navPos.top - scrollTop > 0) {
      return [];
    }

    return [
      {
        position: 'fixed',
        top: 0,
      },
      s.fixed,
    ];
  }, [navPos, scrollTop]);

  useEffect(() => {
    if (preventHandleScrollRef.current) {
      return;
    }

    let newCurrentSection: { id: string, pos: number } = {id: tabs[0].id, pos: 0};

    tabs.forEach((tab) => {
      const sectionEl = document.getElementById(tab.id);
      if (!sectionEl) {
        return;
      }
      const {top} = getElementPosition(sectionEl);
      const pos = Math.abs(top + (sectionEl.offsetHeight / 2));

      if (!newCurrentSection.pos || newCurrentSection.pos > pos) {
        newCurrentSection = {
          id: sectionEl.id,
          pos,
        };
      }
    });

    if (newCurrentSection.id !== activeSection) {
      preventHandleScrollRef.current = true;
      setActiveSection(newCurrentSection.id);
      setTimeout(() => {
        preventHandleScrollRef.current = false;
      }, 10);
    }
  }, [scrollTop]);

  function handleChangeTab(tab: string) {
    setActiveSection(tab);
  }

  useEffect(() => {
    if (preventHandleScrollRef.current) {
      return;
    }
    const sectionEl = document.getElementById(activeSection);
    if (sectionEl) {
      preventHandleScrollRef.current = true;
      sectionEl.scrollIntoView({block: 'center', behavior: 'smooth'});
      setTimeout(() => {
        preventHandleScrollRef.current = false;
      }, 100);
    }
  }, [activeSection]);

  return (
    <div className={s.navigationContainer} ref={navRef}>
      <div style={navStyle} className={cx(s.navigation, navClass)}>
        <div className={cx('container', s.container)}>
          <Tabs
            tabs={tabs}
            activeTab={activeSection}
            onChange={handleChangeTab}
          />
        </div>
      </div>
    </div>
  );
};
