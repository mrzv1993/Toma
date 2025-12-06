# 📋 Шпаргалка по деплою Toma Edge Function

## 🎯 Проблема
```
Error: {"code":"NOT_FOUND","message":"Requested function was not found"}
```

## ✅ Решение

### Один из трех способов:

```bash
# 1️⃣ Автоматический скрипт (БЫСТРЕЕ ВСЕГО)
chmod +x deploy-edge-function.sh && ./deploy-edge-function.sh
```

```bash
# 2️⃣ Три команды вручную
npm install -g supabase
supabase login
supabase functions deploy server --project-ref gyeavjcumghuiblzjwnx
```

```
# 3️⃣ Через браузер
https://supabase.com/dashboard/project/gyeavjcumghuiblzjwnx/functions
→ Create Function → Name: server → Deploy
```

---

## ✅ Проверка

### Терминал
```bash
curl https://gyeavjcumghuiblzjwnx.supabase.co/functions/v1/server/health
# Ожидаем: {"status":"ok",...}
```

### Браузер
```
1. https://tommma.ru
2. Ctrl+F5 (жесткая перезагрузка)
3. F12 (консоль) → Видим: ✅ Server health check passed
```

---

## 🔧 Полезные команды

| Команда | Описание |
|---------|----------|
| `supabase --version` | Проверить установку CLI |
| `supabase login` | Авторизация |
| `supabase projects list` | Список проектов |
| `supabase functions deploy server --project-ref gyeavjcumghuiblzjwnx` | Деплой |
| `supabase functions logs server --project-ref gyeavjcumghuiblzjwnx --follow` | Логи |
| `curl https://gyeavjcumghuiblzjwnx.supabase.co/functions/v1/server/health` | Тест health |
| `curl https://gyeavjcumghuiblzjwnx.supabase.co/functions/v1/server/ping` | Тест ping |

---

## 📚 Документация

| Файл | Назначение | Время чтения |
|------|------------|--------------|
| **START_HERE.md** | Начните здесь | 30 сек |
| **QUICK_COMMAND.txt** | Команды для копипасты | 10 сек |
| **README_QUICK_FIX.md** | Быстрое решение | 1 мин |
| **STEP_BY_STEP_DEPLOY.md** | Подробная инструкция | 3 мин |
| **DEPLOYMENT_CHECKLIST.md** | Чек-лист | 2 мин |
| **FIX_SUMMARY.md** | Что исправлено | 2 мин |

---

## 🐛 Частые проблемы

| Проблема | Решение |
|----------|---------|
| `supabase: command not found` | `npm install -g supabase` |
| `Not logged in` | `supabase login` |
| `Health returns 404` | Подождать 10-15 сек (cold start) |
| `Errors after deploy` | `Ctrl+F5` (жесткая перезагрузка) |
| `Secrets missing` | Автоматически предоставляются Supabase |

---

## ⏱️ Время

- **Установка CLI:** 1 мин (если еще нет)
- **Авторизация:** 30 сек
- **Деплой:** 30-60 сек
- **Проверка:** 30 сек
- **ИТОГО:** 2-3 минуты

---

## 🎯 Endpoints

После деплоя доступны:

```
https://gyeavjcumghuiblzjwnx.supabase.co/functions/v1/server/

├── /health          → {"status":"ok",...}
├── /ping            → "pong"
├── /                → API info
├── /tasks           → CRUD задач
├── /categories      → Категории целей
├── /sprint/active   → Активный спринт
├── /sprint/history  → История спринтов
├── /timer           → Таймер
├── /hooks           → Регулярные задачи
├── /hook-groups     → Группы hooks
├── /people          → Сотрудники
└── /time-entries    → Записи времени
```

---

## 📦 Структура

```
supabase/
├── config.toml              ← Конфигурация
└── functions/
    ├── deno.json            ← Настройки Deno
    └── server/
        ├── index.tsx        ← Код функции ✨
        └── kv_store.tsx     ← Key-Value store
```

---

## ✨ Результат

После деплоя:
- ✅ Приложение работает
- ✅ Данные загружаются
- ✅ Таймер работает
- ✅ Спринты работают
- ✅ Нет ошибок

---

<div align="center">

**🚀 Начать деплой:**

`chmod +x deploy-edge-function.sh && ./deploy-edge-function.sh`

</div>
