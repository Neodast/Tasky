const timeData: Record<string, number> = {
  days: 30,
  hours: 24,
  minutes: 60,
  seconds: 60,
  milliseconds: 1000,
};

export const ACCESS_TOKEN_MAX_AGE: number =
  timeData.days *
  timeData.hours *
  timeData.minutes *
  timeData.seconds *
  timeData.milliseconds;
