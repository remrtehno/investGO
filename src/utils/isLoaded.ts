import {RequestStatus} from "../types/common";

export function isLoaded(status: RequestStatus) {
  return [RequestStatus.success, RequestStatus.failed].includes(status);
}
