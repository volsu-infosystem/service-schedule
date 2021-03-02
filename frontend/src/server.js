import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka()
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    cookieParser(),
    (req, res, next) => {
      const token = req.cookies['token'];
      const profile = token ? jwt.decode(token).userPayload.profile : {};
      return sapper.middleware({
        session: () => {
          return {
            token,
            profile,
          };
        },
      })(req, res, next);
    },
  )
  .listen(PORT, err => {
    if (err) console.log('error', err);
  });
