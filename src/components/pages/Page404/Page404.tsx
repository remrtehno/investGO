import cx from 'classnames';
import type { FC } from 'react';
import React from 'react';
import { Page } from 'src/components/common/Page';
import s from './Page404.scss';

export const Page404: FC = () => {
  return (
    <Page isBigLogo={true} classNameHeader={s.pageHeader} className={s.page}>
      <div className={s.pageContainer}>
        <div className={s.Content}>
          <svg width="199" height="181" viewBox="0 0 199 181" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M51.0029 7.79297L192 89.5L150.997 180.707L9.99957 99L51.0029 7.79297Z" fill="black" />
            <rect x="41.2539" y="0.661052" width="171" height="99" transform="rotate(24.2069 41.2539 0.661052)" fill="white"
              stroke="black" />
            <path
              d="M72.4709 79.3422C74.6161 80.3066 75.2852 81.6863 74.4783 83.4812C73.6714 85.2762 72.1953 85.6915 70.0501 84.7271L65.8473 82.8376L62.9246 89.3389C62.4325 90.4334 61.7423 91.1493 60.8538 91.4866C59.985 91.7802 59.0472 91.7007 58.0403 91.248C57.0771 90.815 56.417 90.1762 56.06 89.3315C55.7226 88.4431 55.7999 87.4516 56.292 86.3571L59.2147 79.8559L40.7617 71.5601C39.7985 71.1271 39.1724 70.5298 38.8832 69.7683C38.594 69.0067 38.6364 68.2101 39.0104 67.3783C39.404 66.5027 40.0724 65.7769 41.0154 65.201L75.5147 44.4765C76.6678 43.7845 77.8792 43.7239 79.1488 44.2946C80.0682 44.7079 80.7184 45.3687 81.0996 46.2768C81.5004 47.1412 81.4548 48.1206 80.9628 49.2151L68.2681 77.4528L72.4709 79.3422ZM47.451 68.0942L61.6355 74.471L70.8465 53.9822L47.451 68.0942ZM89.1116 105.453C83.7267 103.033 80.5168 99.1686 79.4818 93.8616C78.4907 88.5743 79.7271 82.078 83.191 74.3728C86.6747 66.6239 90.7228 61.3654 95.3354 58.5973C99.9917 55.8489 105.012 55.6851 110.397 58.106C115.782 60.5268 118.97 64.3809 119.961 69.6682C121.016 74.9314 119.801 81.4375 116.318 89.1865C112.834 96.9354 108.764 102.184 104.108 104.932C99.4952 107.701 94.4964 107.874 89.1116 105.453ZM91.5619 100.003C94.9329 101.518 98.0658 101.164 100.961 98.939C103.855 96.7144 106.72 92.4499 109.554 86.1457C112.388 79.8414 113.667 74.8903 113.389 71.2924C113.132 67.6506 111.318 65.072 107.947 63.5565C104.576 62.041 101.443 62.3956 98.5483 64.6203C95.6732 66.8012 92.8186 71.0438 89.9845 77.348C87.17 83.6084 85.8816 88.5814 86.1193 92.267C86.3767 95.9087 88.1909 98.4873 91.5619 100.003ZM149.763 114.09C151.908 115.054 152.578 116.434 151.771 118.229C150.964 120.024 149.488 120.439 147.342 119.475L143.14 117.585L140.217 124.087C139.725 125.181 139.035 125.897 138.146 126.234C137.277 126.528 136.339 126.448 135.333 125.996C134.369 125.563 133.709 124.924 133.352 124.079C133.015 123.191 133.092 122.199 133.584 121.105L136.507 114.604L118.054 106.308C117.091 105.875 116.465 105.278 116.175 104.516C115.886 103.755 115.929 102.958 116.303 102.126C116.696 101.25 117.365 100.525 118.308 99.9487L152.807 79.2243C153.96 78.5323 155.171 78.4716 156.441 79.0424C157.36 79.4557 158.011 80.1164 158.392 81.0246C158.793 81.8889 158.747 82.8684 158.255 83.9628L145.56 112.201L149.763 114.09ZM124.743 102.842L138.928 109.219L148.139 88.73L124.743 102.842Z"
              fill="black" />
            <path d="M55.5 9.5L51.5 14.5" stroke="black" />
            <circle cx="55.5" cy="9.5" r="2.5" fill="black" />
            <path d="M190.5 9.5L186.5 14.5" stroke="black" />
            <circle cx="190.5" cy="9.5" r="2.5" fill="black" />
          </svg>
          <br />
          <br />
          <h1 className={s.Page404Text}>Ошибка 404!</h1>
          <p className={s.Page404Text}>К сожалению, страница не найдена!</p>
        </div>
      </div>
    </Page>
  );
};