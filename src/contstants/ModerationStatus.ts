export enum ModerationStatus {
  waiting = 'waiting',
  filled = 'filled',
  declined = 'declined',
  approved = 'approved',
}

export enum LoanModerationStatus {
  new = 'new',
  moderating = 'moderating',
  declined = 'declined',
  wait_activate = 'wait_activate',
  active = 'active',
  completed = 'completed',
  canceled = 'canceled',
  filled = 'filled',
}
