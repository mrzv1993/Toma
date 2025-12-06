/**
 * Скрипт для тестирования доступности Edge Function
 * 
 * Использование:
 * 1. Откройте консоль браузера (F12)
 * 2. Скопируйте и вставьте этот код
 * 3. Нажмите Enter
 * 
 * Скрипт проверит:
 * - Доступность health endpoint
 * - CORS настройки
 * - Время ответа
 */

(async function testServerConnection() {
  console.log('=== Тест соединения с Edge Function ===\n');
  
  const API_BASE_URL = 'https://gyeavjcumghuiblzjwnx.supabase.co/functions/v1/server';
  const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5ZWF2amN1bWdodWlibHpqd254Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNzIzMDYsImV4cCI6MjA3OTc0ODMwNn0.3qGgUz_AZnu0IcCqr4OX45sqN68JjEvrylMGjhEdSlI';
  
  console.log('📍 API URL:', API_BASE_URL);
  console.log('🔑 Anon Key:', ANON_KEY.substring(0, 20) + '...\n');
  
  // Test 1: Health Check
  console.log('🏥 Тест 1: Health Check');
  try {
    const startTime = Date.now();
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    console.log('✅ Статус:', response.status, response.statusText);
    console.log('⏱️  Время ответа:', responseTime, 'мс');
    
    if (response.ok) {
      const data = await response.json();
      console.log('📦 Данные:', data);
      console.log('✅ Health check пройден!\n');
    } else {
      console.error('❌ Health check не пройден!');
      const text = await response.text();
      console.error('📄 Ответ сервера:', text, '\n');
    }
  } catch (error) {
    console.error('❌ Ошибка при подключении к health endpoint:');
    console.error(error);
    console.error('\n⚠️  Edge Function недоступна или не развернута!\n');
    return;
  }
  
  // Test 2: CORS Check
  console.log('🌐 Тест 2: CORS');
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'OPTIONS',
      headers: {
        'Origin': window.location.origin,
        'Access-Control-Request-Method': 'GET',
      }
    });
    
    const corsHeaders = {
      'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
      'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
      'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers'),
    };
    
    console.log('📋 CORS заголовки:', corsHeaders);
    
    if (corsHeaders['Access-Control-Allow-Origin']) {
      console.log('✅ CORS настроен правильно!\n');
    } else {
      console.warn('⚠️  CORS может быть настроен неправильно\n');
    }
  } catch (error) {
    console.error('❌ Ошибка при проверке CORS:', error, '\n');
  }
  
  // Test 3: Authenticated Request Test
  console.log('🔐 Тест 3: Запрос с авторизацией (пример)');
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ANON_KEY}`,
      }
    });
    
    console.log('📡 Статус /categories:', response.status, response.statusText);
    
    if (response.status === 401) {
      console.log('✅ Авторизация работает (требуется токен пользователя)\n');
    } else if (response.ok) {
      console.log('✅ Запрос успешен!');
      const data = await response.json();
      console.log('📦 Данные:', data, '\n');
    } else {
      console.warn('⚠️  Неожиданный статус:', response.status);
      const text = await response.text();
      console.log('📄 Ответ:', text, '\n');
    }
  } catch (error) {
    console.error('❌ Ошибка при тестовом запросе:', error, '\n');
  }
  
  // Summary
  console.log('=== Итоги тестирования ===');
  console.log('Если все тесты пройдены успешно, Edge Function работает корректно.');
  console.log('Если есть ошибки, см. DEPLOYMENT_CHECKLIST.md для инструкций по деплою.\n');
  
  console.log('📚 Дополнительная информация:');
  console.log('  - Dashboard: https://supabase.com/dashboard/project/gyeavjcumghuiblzjwnx');
  console.log('  - Functions: https://supabase.com/dashboard/project/gyeavjcumghuiblzjwnx/functions');
  console.log('  - Logs: supabase functions logs server --project-ref gyeavjcumghuiblzjwnx\n');
})();
