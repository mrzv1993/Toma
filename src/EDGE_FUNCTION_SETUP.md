# Диагностика и настройка Edge Function

## Проблема: "Failed to fetch" на всех API запросах

Это означает, что Edge Function не отвечает на запросы. Вот шаги для диагностики и исправления:

## 1. Проверка в консоли браузера

Откройте консоль браузера (F12) и проверьте логи:

```
[HttpClient] API_BASE_URL: https://gyeavjcumghuiblzjwnx.supabase.co/functions/v1/server
[HttpClient] Checking server health...
[HttpClient] Server health check failed: TypeError: Failed to fetch
```

Если вы видите эти ошибки, Edge Function не развернута или недоступна.

## 2. Проверка доступности напрямую

Откройте в браузере:
```
https://gyeavjcumghuiblzjwnx.supabase.co/functions/v1/server/health
```

### Ожидаемый результат:
```json
{"status":"ok"}
```

### Если видите ошибку 404:
Edge Function не развернута или названа неправильно.

### Если видите CORS ошибку:
CORS настроен неправильно (но мы его исправили в последнем коммите).

### Если браузер висит и ничего не отвечает:
Function не запущена или упала.

## 3. Проверка в Supabase Dashboard

1. Откройте https://supabase.com/dashboard
2. Выберите проект `gyeavjcumghuiblzjwnx`
3. Перейдите в раздел "Edge Functions"
4. Проверьте, что функция `server` развернута и работает
5. Посмотрите логи функции на наличие ошибок

## 4. Деплой Edge Function вручную

Если функция не развернута, выполните:

```bash
# Установите Supabase CLI
npm install -g supabase

# Авторизуйтесь
supabase login

# Перейдите в директорию проекта
cd /path/to/project

# Деплой функции
supabase functions deploy server --project-ref gyeavjcumghuiblzjwnx
```

## 5. Проверка переменных окружения

Edge Function требует следующие переменные:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_ANON_KEY`

Проверьте их наличие в настройках проекта:
1. Supabase Dashboard → Settings → API
2. Скопируйте URL и ключи
3. Добавьте в Edge Function secrets

## 6. Локальное тестирование

Для локального тестирования:

```bash
# Запустите локальный Supabase
supabase start

# Запустите Edge Function локально
supabase functions serve server

# Функция будет доступна на http://localhost:54321/functions/v1/server
```

## 7. Временное решение: Fallback на localStorage

Если Edge Function не может быть развернута прямо сейчас, приложение автоматически покажет баннер с ошибкой. Можно временно использовать localStorage для хранения данных, но это не рекомендуется для продакшена.

## 8. Проверка логов сервера

После деплоя проверьте логи:

```bash
supabase functions logs server --project-ref gyeavjcumghuiblzjwnx
```

Ищите ошибки, связанные с:
- Отсутствующими зависимостями
- Ошибками импорта
- Проблемами с KV store
- Ошибками подключения к Supabase

## 9. Частые проблемы

### Проблема: "Missing Supabase environment variables"
**Решение:** Добавьте переменные окружения в настройках Edge Function

### Проблема: "CORS error"
**Решение:** Проверьте, что CORS middleware применяется ДО всех роутов (уже исправлено в коде)

### Проблема: "Function timeout"
**Решение:** Увеличьте timeout в настройках функции или оптимизируйте код

### Проблема: "Cold start delay"
**Решение:** Это нормально. Первый запрос может занять 2-5 секунд. Последующие будут быстрее.

## 10. Контакты для поддержки

Если проблема не решена:
1. Проверьте статус Supabase: https://status.supabase.com/
2. Документация: https://supabase.com/docs/guides/functions
3. Сообщество: https://github.com/supabase/supabase/discussions

---

## Быстрая диагностика (чек-лист)

- [ ] Открыл консоль браузера и увидел логи HttpClient
- [ ] Проверил URL: https://gyeavjcumghuiblzjwnx.supabase.co/functions/v1/server/health
- [ ] Зашел в Supabase Dashboard → Edge Functions
- [ ] Проверил, что функция `server` развернута
- [ ] Посмотрел логи функции на ошибки
- [ ] Проверил переменные окружения
- [ ] Попробовал редеплой функции
- [ ] Проверил логи после редеплоя

Если все пункты выполнены, но проблема остается - возможно, есть проблема с сетью или firewall.
