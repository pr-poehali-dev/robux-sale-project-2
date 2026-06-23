import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/906fbc37-1c21-40ba-aeb7-15a09afc32c4/files/1133e41e-be37-4963-8323-2ab326dac088.jpg';

interface Pack {
  id: number;
  robux: number;
  price: number;
  oldPrice?: number;
  bonus?: string;
  popular?: boolean;
  badge?: string;
}

const PACKS: Pack[] = [
  { id: 1, robux: 400, price: 290, bonus: '+5% бонус' },
  { id: 2, robux: 800, price: 550, oldPrice: 620, bonus: '+10% бонус' },
  { id: 3, robux: 1700, price: 990, oldPrice: 1190, bonus: '+15% бонус', popular: true, badge: 'Хит продаж' },
  { id: 4, robux: 4500, price: 2390, oldPrice: 2890, bonus: '+20% бонус' },
  { id: 5, robux: 10000, price: 4990, oldPrice: 5990, bonus: '+25% бонус', badge: 'Выгодно' },
  { id: 6, robux: 22500, price: 9990, oldPrice: 12990, bonus: '+30% бонус', badge: 'Максимум' },
];

const NAV = [
  { label: 'Главная', icon: 'Home', href: '#hero' },
  { label: 'Каталог', icon: 'Package', href: '#catalog' },
  { label: 'Оплата', icon: 'CreditCard', href: '#payment' },
  { label: 'Поддержка', icon: 'LifeBuoy', href: '#support' },
];

const FEATURES = [
  { icon: 'Zap', title: 'Моментально', text: 'Зачисление за 5–15 минут после оплаты' },
  { icon: 'ShieldCheck', title: 'Безопасно', text: 'Защищённые платежи и гарантия возврата' },
  { icon: 'Gift', title: 'Бонусы', text: 'Чем больше пакет — тем выгоднее курс' },
  { icon: 'Headphones', title: 'Поддержка 24/7', text: 'Всегда на связи и поможем с заказом' },
  { icon: 'Clock', title: 'Срок доставки', text: 'Геймпасс и Робаксы зачисляются до 5 дней' },
];



const CARD_NUMBER = '2202 2080 4828 9913';
const CARD_BANK = 'Сбербанк';

function Index() {
  const [cart, setCart] = useState<Pack[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [payOpen, setPayOpen] = useState(false);
  const [nickname, setNickname] = useState('');
  const [copied, setCopied] = useState(false);
  const [paid, setPaid] = useState(false);

  const addToCart = (pack: Pack) => {
    setCart((prev) => [...prev, pack]);
    setCartOpen(true);
  };
  const removeFromCart = (idx: number) =>
    setCart((prev) => prev.filter((_, i) => i !== idx));

  const total = cart.reduce((s, p) => s + p.price, 0);
  const totalRobux = cart.reduce((s, p) => s + p.robux, 0);

  const openPayment = () => {
    setCartOpen(false);
    setPaid(false);
    setPayOpen(true);
  };

  const copyCard = () => {
    navigator.clipboard.writeText(CARD_NUMBER.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const confirmPayment = () => {
    setPaid(true);
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* glow blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-secondary/30 blur-[120px]" />
        <div className="absolute inset-0 grid-bg opacity-60" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <a href="#hero" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent font-display text-lg font-black glow-blue">
              R$
            </div>
            <span className="font-display text-xl font-extrabold tracking-tight">
              Rbx<span className="text-gradient">Store</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Icon name={n.icon} size={16} />
                {n.label}
              </a>
            ))}
          </nav>

          <Button
            onClick={() => setCartOpen(true)}
            className="relative bg-gradient-to-r from-primary to-secondary font-semibold hover:opacity-90"
          >
            <Icon name="ShoppingCart" size={18} />
            <span className="hidden sm:inline">Корзина</span>
            {cart.length > 0 && (
              <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-accent text-xs font-bold">
                {cart.length}
              </span>
            )}
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="container relative grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div className="animate-fade-up">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Icon name="Sparkles" size={15} />
            Лучший курс Робаксов 2026
          </div>
          <h1 className="font-display text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl">
            Покупай <span className="text-gradient">Робаксы</span><br />
            быстро и безопасно
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">
            Готовые пакеты с бонусами до 30%. Оплата только на карту Сбербанка.
            Зачисление на твой аккаунт до 5 дней.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-primary to-secondary text-base font-semibold glow-blue hover:opacity-90"
            >
              Выбрать пакет
              <Icon name="ArrowRight" size={18} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById('support')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-border bg-card/50 text-base font-semibold hover:bg-muted"
            >
              <Icon name="MessageCircle" size={18} />
              Поддержка
            </Button>
          </div>
          <div className="mt-10 flex gap-8">
            {[['24/7', 'Поддержка']].map(([v, l]) => (
              <div key={l}>
                <div className="font-display text-2xl font-extrabold text-gradient">{v}</div>
                <div className="text-sm text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-float">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/40 to-secondary/40 blur-2xl" />
          <img
            src={HERO_IMG}
            alt="Робаксы"
            className="relative w-full rounded-[2rem] border border-border/60 shadow-2xl"
          />
        </div>
      </section>

      {/* Features */}
      <section className="container grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-5">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur transition-transform hover:-translate-y-1"
          >
            <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary">
              <Icon name={f.icon} size={22} />
            </div>
            <h3 className="font-display font-bold">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
          </div>
        ))}
      </section>

      {/* Catalog */}
      <section id="catalog" className="container py-16">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-black sm:text-4xl">
            Пакеты <span className="text-gradient">Робаксов</span>
          </h2>
          <p className="mt-3 text-muted-foreground">Выбери пакет — чем больше, тем выгоднее бонус</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PACKS.map((p) => (
            <div
              key={p.id}
              className={`group relative flex flex-col rounded-3xl border bg-card/70 p-6 backdrop-blur transition-all hover:-translate-y-1.5 ${
                p.popular ? 'border-accent glow-purple' : 'border-border/60 hover:border-primary/50'
              }`}
            >
              {p.badge && (
                <span
                  className={`absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-bold ${
                    p.popular ? 'bg-gradient-to-r from-secondary to-accent' : 'bg-primary'
                  }`}
                >
                  {p.badge}
                </span>
              )}

              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary font-display text-xl font-black glow-blue">
                  R$
                </div>
                <div>
                  <div className="font-display text-3xl font-black leading-none">
                    {p.robux.toLocaleString('ru-RU')}
                  </div>
                  <div className="text-sm text-muted-foreground">Робаксов</div>
                </div>
              </div>

              {p.bonus && (
                <div className="mb-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-sm font-semibold text-accent">
                  <Icon name="Gift" size={14} />
                  {p.bonus}
                </div>
              )}

              <div className="mt-auto flex items-end gap-2">
                <span className="font-display text-2xl font-extrabold">{p.price} ₽</span>
                {p.oldPrice && (
                  <span className="mb-0.5 text-sm text-muted-foreground line-through">{p.oldPrice} ₽</span>
                )}
              </div>

              <Button
                onClick={() => addToCart(p)}
                className={`mt-4 font-semibold ${
                  p.popular
                    ? 'bg-gradient-to-r from-secondary to-accent hover:opacity-90'
                    : 'bg-gradient-to-r from-primary to-secondary hover:opacity-90'
                }`}
              >
                <Icon name="ShoppingCart" size={17} />
                В корзину
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Payment */}
      <section id="payment" className="container py-16">
        <div className="mx-auto max-w-lg rounded-3xl border border-primary/40 bg-card/70 p-8 backdrop-blur md:p-10">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary glow-blue">
              <Icon name="CreditCard" size={28} />
            </div>
            <h2 className="font-display text-3xl font-black sm:text-4xl">
              Оплата <span className="text-gradient">на карту</span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Только перевод на карту Сбербанка — быстро и просто
            </p>
          </div>

          <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5">
            <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="CreditCard" size={15} />
              Карта Сбербанк
            </div>
            <div className="font-display text-2xl font-extrabold tracking-widest">{CARD_NUMBER}</div>
          </div>

          <ul className="mt-6 space-y-3">
            {[
              'Выбери пакет и добавь в корзину',
              'Переведи точную сумму на карту выше',
              'Нажми «Я оплатил(а)» и укажи ник в Roblox',
              'Получи Робаксы за 5–15 минут',
            ].map((t, i) => (
              <li key={t} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold">
                  {i + 1}
                </span>
                {t}
              </li>
            ))}
          </ul>

          <Button
            onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-7 w-full bg-gradient-to-r from-primary to-secondary font-semibold hover:opacity-90"
          >
            <Icon name="Package" size={18} />
            Выбрать пакет
          </Button>
        </div>
      </section>

      {/* Support */}
      <section id="support" className="container py-16">
        <div className="relative overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/15 to-secondary/15 p-8 text-center md:p-14">
          <div className="absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative">
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent glow-purple">
              <Icon name="LifeBuoy" size={32} />
            </div>
            <h2 className="font-display text-3xl font-black sm:text-4xl">Нужна помощь?</h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Наша поддержка на связи круглосуточно. Поможем с выбором пакета,
              оплатой и зачислением Робаксов.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary font-semibold hover:opacity-90">
                <Icon name="Send" size={18} />
                Написать в Telegram
              </Button>
              <Button size="lg" variant="outline" className="border-border bg-card/50 font-semibold hover:bg-muted">
                <Icon name="Mail" size={18} />
                Написать на почту
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 py-8">
        <div className="container flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <span className="font-display font-bold text-foreground">
            Rbx<span className="text-gradient">Store</span>
          </span>
          <span>© 2025 RbxStore. Не является официальным продуктом Roblox Corporation.</span>
        </div>
      </footer>

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-border bg-background shadow-2xl">
            <div className="flex items-center justify-between border-b border-border p-5">
              <h3 className="flex items-center gap-2 font-display text-xl font-extrabold">
                <Icon name="ShoppingCart" size={22} />
                Корзина
              </h3>
              <button onClick={() => setCartOpen(false)} className="rounded-lg p-2 hover:bg-muted">
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="mt-20 text-center text-muted-foreground">
                  <Icon name="PackageOpen" size={48} className="mx-auto mb-3 opacity-50" />
                  Корзина пуста
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/60 p-3">
                      <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-sm font-black">
                        R$
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{p.robux.toLocaleString('ru-RU')} Робаксов</div>
                        <div className="text-sm text-muted-foreground">{p.price} ₽</div>
                      </div>
                      <button onClick={() => removeFromCart(idx)} className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-destructive">
                        <Icon name="Trash2" size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-border p-5">
                <div className="mb-1 flex justify-between text-sm text-muted-foreground">
                  <span>Всего Робаксов</span>
                  <span>{totalRobux.toLocaleString('ru-RU')}</span>
                </div>
                <div className="mb-4 flex justify-between font-display text-lg font-extrabold">
                  <span>Итого</span>
                  <span className="text-gradient">{total} ₽</span>
                </div>
                <Button
                  onClick={openPayment}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-base font-semibold glow-blue hover:opacity-90"
                >
                  <Icon name="CreditCard" size={18} />
                  Перейти к оплате
                </Button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* Payment modal */}
      {payOpen && (
        <div className="fixed inset-0 z-[70] grid place-items-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setPayOpen(false)} />
          <div className="relative w-full max-w-md animate-fade-up rounded-3xl border border-border bg-card p-6 shadow-2xl sm:p-8">
            <button
              onClick={() => setPayOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-2 text-muted-foreground hover:bg-muted"
            >
              <Icon name="X" size={20} />
            </button>

            {paid ? (
              <div className="py-6 text-center">
                <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-accent/20 text-accent glow-purple">
                  <Icon name="CircleCheck" size={36} />
                </div>
                <h3 className="font-display text-2xl font-black">Спасибо за заказ!</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm text-muted-foreground">
                  Мы проверим оплату и зачислим Робаксы на твой аккаунт в течение 5–15 минут.
                  Статус подтвердим в поддержке.
                </p>
                <Button
                  onClick={() => setPayOpen(false)}
                  className="mt-6 w-full bg-gradient-to-r from-primary to-secondary font-semibold hover:opacity-90"
                >
                  Готово
                </Button>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl font-black">Оплата заказа</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Переведи точную сумму на карту {CARD_BANK} и подтверди оплату.
                </p>

                <div className="mt-5 rounded-2xl border border-border bg-background/60 p-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Сумма к оплате</span>
                    <span className="font-display text-xl font-extrabold text-gradient">{total} ₽</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-sm text-muted-foreground">
                    <span>Робаксов</span>
                    <span>{totalRobux.toLocaleString('ru-RU')}</span>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-primary/40 bg-primary/10 p-4">
                  <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="CreditCard" size={16} />
                    Карта {CARD_BANK}
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-display text-lg font-extrabold tracking-wider">{CARD_NUMBER}</span>
                    <button
                      onClick={copyCard}
                      className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
                    >
                      <Icon name={copied ? 'Check' : 'Copy'} size={15} />
                      {copied ? 'Скопировано' : 'Копировать'}
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
                    Ник в Roblox для зачисления
                  </label>
                  <input
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="Например: RobloxPlayer123"
                    className="w-full rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>

                <Button
                  onClick={confirmPayment}
                  disabled={!nickname.trim()}
                  className="mt-5 w-full bg-gradient-to-r from-primary to-secondary text-base font-semibold glow-blue hover:opacity-90 disabled:opacity-50"
                >
                  <Icon name="CircleCheck" size={18} />
                  Я оплатил(а)
                </Button>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  После перевода нажми кнопку — мы проверим оплату и зачислим Робаксы
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Index;