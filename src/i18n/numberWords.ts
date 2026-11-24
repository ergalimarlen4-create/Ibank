import type { Lang } from './index';

const enOnes = ['','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
const enTens = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
const en = (n: number): string =>
  n < 20 ? enOnes[n]
  : n < 100 ? enTens[Math.floor(n / 10)] + (n % 10 ? ' ' + enOnes[n % 10] : '')
  : n < 1000 ? enOnes[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' ' + en(n % 100) : '')
  : en(Math.floor(n / 1000)) + ' thousand' + (n % 1000 ? ' ' + en(n % 1000) : '');

const kkOnes = ['','бір','екі','үш','төрт','бес','алты','жеті','сегіз','тоғыз'];
const kkTens = ['','он','жиырма','отыз','қырық','елу','алпыс','жетпіс','сексен','тоқсан'];
const kk = (n: number): string =>
  n < 10 ? kkOnes[n]
  : n < 100 ? kkTens[Math.floor(n / 10)] + (n % 10 ? ' ' + kkOnes[n % 10] : '')
  : n < 1000 ? kkOnes[Math.floor(n / 100)] + ' жүз' + (n % 100 ? ' ' + kk(n % 100) : '')
  : kk(Math.floor(n / 1000)) + ' мың' + (n % 1000 ? ' ' + kk(n % 1000) : '');

const ruOnes = ['','один','два','три','четыре','пять','шесть','семь','восемь','девять'];
const ruTeens = ['десять','одиннадцать','двенадцать','тринадцать','четырнадцать','пятнадцать','шестнадцать','семнадцать','восемнадцать','девятнадцать'];
const ruTens = ['','','двадцать','тридцать','сорок','пятьдесят','шестьдесят','семьдесят','восемьдесят','девяносто'];
const ruHund = ['','сто','двести','триста','четыреста','пятьсот','шестьсот','семьсот','восемьсот','девятьсот'];
const ruForm = (n: number, a: string, b: string, c: string) => {
  const m100 = n % 100, m10 = n % 10;
  return m100 >= 11 && m100 <= 14 ? c : m10 === 1 ? a : m10 >= 2 && m10 <= 4 ? b : c;
};
const ruBelow = (n: number, fem: boolean): string => {
  const out: string[] = [];
  const h = Math.floor(n / 100), r = n % 100;
  if (h) out.push(ruHund[h]);
  if (r >= 10 && r < 20) out.push(ruTeens[r - 10]);
  else {
    if (r >= 20) out.push(ruTens[Math.floor(r / 10)]);
    const u = r % 10;
    if (u) out.push(fem && u === 1 ? 'одна' : fem && u === 2 ? 'две' : ruOnes[u]);
  }
  return out.join(' ');
};
const ru = (n: number): string => {
  const k = Math.floor(n / 1000), r = n % 1000;
  const out: string[] = [];
  if (k) out.push(ruBelow(k, true), ruForm(k, 'тысяча', 'тысячи', 'тысяч'));
  if (r) out.push(ruBelow(r, false));
  return out.join(' ');
};

// "200" -> "Two hundred dollar" / "Екі жүз доллар" / "Двести долларов"
export function amountInWords(raw: string, lang: Lang): string {
  const n = Math.floor(Number(String(raw).replace(',', '.').replace(/\s/g, '')));
  if (!isFinite(n) || n <= 0 || n >= 1000000) return '';
  const w = lang === 'kk' ? kk(n) : lang === 'ru' ? ru(n) : en(n);
  const unit = lang === 'kk' ? 'доллар' : lang === 'ru' ? ruForm(n, 'доллар', 'доллара', 'долларов') : 'dollar';
  return `${w.charAt(0).toUpperCase()}${w.slice(1)} ${unit}`;
}
