import _ from 'lodash';

import type {adaptiveBreackpoints} from 'src/contstants/adaptiveBreackpoints';
import {getViewportSize} from 'src/utils/getViewportSize';

const memoViewportSize = _.memoize(() => {
  return getViewportSize();
});

export function breackpointUp(breackpoint: adaptiveBreackpoints): boolean {
  const viewportSize = memoViewportSize();
  return viewportSize.width >= breackpoint;
}

export function breackpointDown(breackpoint: adaptiveBreackpoints): boolean {
  const viewportSize = memoViewportSize();
  return viewportSize.width < breackpoint;
}

export function breackpointBetween(lower: adaptiveBreackpoints, upper: adaptiveBreackpoints): boolean {
  const viewportSize = memoViewportSize();
  return viewportSize.width >= lower && viewportSize.width < upper;
}
