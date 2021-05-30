//config Environment
interface IConfig {
  MONGODB_URI: string;
  key: string;
}
let URI: string;
process.env.NODE_ENV != 'pro'
  ? (URI = process.env.MONGODB_URI_DEV || '')
  : (URI = process.env.MONGODB_URI || '');

export const config: IConfig = {
  MONGODB_URI: URI,
  key: process.env.NODE_ENV === "test" ? '"$$%fgd$%%&DFS234': process.env.JWT_KEY || ''
};
