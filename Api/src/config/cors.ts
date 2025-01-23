import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (origin && origin.includes("http")) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
};
