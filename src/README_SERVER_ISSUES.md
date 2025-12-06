# 🔴 КРИТИЧЕСКАЯ ПРОБЛЕМА: Edge Function не отвечает

## Симптомы

В консоли браузера (F12) вы видите:

```
[HttpClient] Server health check failed: TypeError: Failed to fetch
API Request Failed [/tasks]. Retrying...
API Request Error [/tasks] after 4 attempts: TypeError: Failed to fetch
```

На экране появляется красный баннер:
```
Не удалось подключиться к серверу
Edge Function не отвечает. Проверьте консоль для деталей.
```

## Причина

Edge Function `/supabase/functions/server/` **НЕ РАЗВЕРНУТА** на Supabase или не работает.

## ⚡ БЫСТРОЕ РЕШЕНИЕ

### Шаг 1: Деплой Edge Function

```bash
# Если Supabase CLI еще не установлен:
npm install -g supabase

# Авторизуйтесь (откроется браузер):
supabase login

# Деплой функции:
supabase functions deploy server --project-ref gyeavjcumghuiblzjwnx
```

### Шаг 2: Проверка

После деплоя откройте в браузере:
```
https://gyeavjcumghuiblzjwnx.supabase.co/functions/v1/server/health
```

**Ожидаемый результат:**
```json
{"status":"ok"}
```

Если видите это - всё работает! Обновите страницу приложения (Ctrl+F5).

### Шаг 3: Проверка переменных окружения

Edge Function требует эти секреты:

```bash
supabase secrets list --project-ref gyeavjcumghuiblzjwnx
```

Должны быть:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`  
- `SUPABASE_ANON_KEY`

Если их нет - добавьте через Supabase Dashboard:
1. Перейдите в https://supabase.com/dashboard/project/gyeavjcumghuiblzjwnx/settings/api
2. Скопируйте URL и ключи
3. Settings → Edge Functions → Add secret

## 🧪 Тест в консоли браузера

Вставьте в консоль (F12):

```javascript
fetch("/test-server.js").then(r=>r.text()).then(eval)
```

Это запустит автоматический тест соединения и покажет детальную диагностику.

## 📋 Подробная диагностика

См. файлы:
- `/DEPLOYMENT_CHECKLIST.md` - чек-лист деплоя
- `/EDGE_FUNCTION_SETUP.md` - детальная диагностика всех проблем

## 🆘 Если ничего не помогает

1. **Проверьте статус Supabase:**
   https://status.supabase.com/

2. **Посмотрите логи Edge Function:**
   ```bash
   supabase functions logs server --project-ref gyeavjcumghuiblzjwnx --follow
   ```

3. **Проверьте Supabase Dashboard:**
   https://supabase.com/dashboard/project/gyeavjcumghuiblzjwnx/functions

4. **Попробуйте локальный запуск:**
   ```bash
   supabase start
   supabase functions serve server
   ```

## ✅ После исправления

1. Обновите страницу приложения (Ctrl+F5)
2. Красный баннер должен исчезнуть
3. В консоли должно быть:
   ```
   [HttpClient] Server health check passed: {status: "ok"}
   ```
4. Данные должны начать загружаться

---

**Важно:** Без работающей Edge Function приложение НЕ БУДЕТ РАБОТАТЬ. Это критический компонент, который обрабатывает все данные.
