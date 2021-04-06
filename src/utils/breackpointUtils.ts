import type {adaptiveBreackpoints} from 'src/contstants/adaptiveBreackpoints';
import {useViewportSize} from 'src/hooks/useViewportSize';

export function breackpointUp(breackpoint: adaptiveBreackpoints): boolean {
  const viewportSize = useViewportSize();
  return viewportSize.width >= breackpoint;
}

export function breackpointDown(breackpoint: adaptiveBreackpoints): boolean {
  const viewportSize = useViewportSize();
  return viewportSize.width < breackpoint;
}

export function breackpointBetween(lower: adaptiveBreackpoints, upper: adaptiveBreackpoints): boolean {
  const viewportSize = useViewportSize();
  return viewportSize.width >= lower && viewportSize.width < upper;
}
