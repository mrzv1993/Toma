# ✅ Чек-лист деплоя Edge Function

Быстрый чек-лист для деплоя Edge Function на Supabase.

---

## Перед деплоем

- [ ] Supabase CLI установлен
  ```bash
  supabase --version
  ```
  Если нет: `npm install -g supabase`

- [ ] Авторизован в Supabase
  ```bash
  supabase projects list
  ```
  Если нет: `supabase login`

- [ ] Нахожусь в корневой директории проекта
  ```bash
  ls -la supabase/functions/server/index.tsx
  ```
  Должен существовать файл

---

## Деплой

- [ ] **Способ 1:** Автоматический скрипт
  ```bash
  chmod +x deploy-edge-function.sh
  ./deploy-edge-function.sh
  ```

  **ИЛИ**

- [ ] **Способ 2:** Вручную
  ```bash
  supabase functions deploy server \
    --project-ref gyeavjcumghuiblzjwnx \
    --no-verify-jwt
  ```

- [ ] Дождался сообщения "Deployed Function server"

---

## Проверка деплоя

- [ ] Проверил health endpoint в терминале
  ```bash
  curl https://gyeavjcumghuiblzjwnx.supabase.co/functions/v1/server/health
  ```
  Ожидаю: `{"status":"ok",...}`

- [ ] Проверил health endpoint в браузере
  ```
  https://gyeavjcumghuiblzjwnx.supabase.co/functions/v1/server/health
  ```
  Вижу JSON с `status: "ok"`

- [ ] Проверил ping endpoint
  ```bash
  curl https://gyeavjcumghuiblzjwnx.supabase.co/functions/v1/server/ping
  ```
  Ожидаю: `pong`

---

## Проверка в приложении

- [ ] Открыл https://tommma.ru
- [ ] Сделал жесткую перезагрузку (`Ctrl+F5` или `Cmd+Shift+R`)
- [ ] Открыл консоль браузера (F12)
- [ ] Вижу сообщение: `✅ Server health check passed`
- [ ] Красный баннер исчез
- [ ] Данные загружаются
- [ ] Нет ошибок "Failed to fetch"

---

## Если что-то пошло не так

### Деплой не удается

- [ ] Проверил, что авторизован: `supabase login`
- [ ] Проверил проект: `supabase projects list | grep gyeavjcumghuiblzjwnx`
- [ ] Проверил синтаксис кода:
  ```bash
  cat supabase/functions/server/index.tsx | head -50
  ```

### Health check возвращает 404

- [ ] Подождал 10-15 секунд (cold start)
- [ ] Попробовал снова:
  ```bash
  curl https://gyeavjcumghuiblzjwnx.supabase.co/functions/v1/server/health
  ```
- [ ] Проверил логи:
  ```bash
  supabase functions logs server --project-ref gyeavjcumghuiblzjwnx
  ```

### Приложение все еще показывает ошибки

- [ ] Сделал жесткую перезагрузку страницы (`Ctrl+F5`)
- [ ] Очистил кеш браузера
- [ ] Открыл в режиме инкогнито
- [ ] Проверил консоль на новые ошибки

### Переменные окружения

- [ ] Проверил secrets:
  ```bash
  supabase secrets list --project-ref gyeavjcumghuiblzjwnx
  ```
  Должны быть:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `SUPABASE_ANON_KEY`

---

## Просмотр логов (опционально)

- [ ] Запустил мониторинг логов:
  ```bash
  supabase functions logs server --project-ref gyeavjcumghuiblzjwnx --follow
  ```
- [ ] Сделал запрос в приложении
- [ ] Увидел логи запроса
- [ ] Остановил мониторинг (`Ctrl+C`)

---

## Финальная проверка

- [ ] Health endpoint работает ✅
- [ ] Приложение работает ✅
- [ ] Нет ошибок в консоли ✅
- [ ] Данные загружаются ✅
- [ ] Красный баннер отсутствует ✅

---

## Ссылки на документацию

Если нужна помощь:

- **Пошаговая инструкция:** `/STEP_BY_STEP_DEPLOY.md`
- **Быстрое исправление:** `/README_QUICK_FIX.md`
- **Полное руководство:** `/DEPLOY_NOW.md`
- **Краткая инструкция:** `/README_DEPLOY_INSTRUCTIONS.md`
- **Резюме проблемы:** `/FIX_SUMMARY.md`

---

## Полезные команды

```bash
# Статус CLI
supabase --version

# Авторизация
supabase login

# Список проектов
supabase projects list

# Деплой
supabase functions deploy server --project-ref gyeavjcumghuiblzjwnx

# Логи
supabase functions logs server --project-ref gyeavjcumghuiblzjwnx --follow

# Список функций
supabase functions list --project-ref gyeavjcumghuiblzjwnx

# Секреты
supabase secrets list --project-ref gyeavjcumghuiblzjwnx

# Тест health
curl https://gyeavjcumghuiblzjwnx.supabase.co/functions/v1/server/health

# Тест ping
curl https://gyeavjcumghuiblzjwnx.supabase.co/functions/v1/server/ping
```

---

**Время выполнения чек-листа:** 3-5 минут

**Сложность:** Легко

**Результат:** Полностью рабочее приложение! 🎉
