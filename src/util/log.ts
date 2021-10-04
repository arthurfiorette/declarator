const ResetColor = '\x1b[0m';

const Levels = {
  warn: '\x1b[33m', // Yellow
  debug: '\x1b[36m', // Cyan
  error: '\x1b[31m', // Red
  info: '\x1b[32m' // Green
};

type LogArguments =
  | string
  | number
  | boolean
  | Record<string, unknown>
  | Error
  | LogArguments[];

const describeValue = (value: LogArguments): string => {
  if (Array.isArray(value)) return value.map((value) => describeValue(value)).join(', ');
  if (value instanceof Error) return value.message + '\n' + value.stack;
  if (typeof value === 'object') return JSON.stringify(value, null, 2);
  return String(value);
};

const templateLog = (level: keyof typeof Levels) => {
  return (
    { raw }: TemplateStringsArray,
    ...values: (LogArguments | null | undefined)[]
  ) => {
    const msg = raw.reduce((acc, str, i) => {
      const value = values[i];
      return (
        acc + str + (value !== null && value !== undefined ? describeValue(value) : '')
      );
    }, '');

    console.log(`${Levels[level]}[declarator]${ResetColor}: ${msg}`);
  };
};

export const log = {
  info: templateLog('info'),
  warn: templateLog('warn'),
  debug: templateLog('debug'),
  error: templateLog('error')
};
