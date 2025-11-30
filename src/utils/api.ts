import { httpClient } from './httpClient';
import { AuthRepository } from '../repositories/AuthRepository';
import { HookRepository } from '../repositories/HookRepository';
import { HookGroupRepository } from '../repositories/HookGroupRepository';
import { PersonRepository } from '../repositories/PersonRepository';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { TaskRepository } from '../repositories/TaskRepository';
import { TimerRepository } from '../repositories/TimerRepository';
import { SprintRepository } from '../repositories/SprintRepository';
import { TelegramRepository } from '../repositories/TelegramRepository';
import { TimeEntryRepository } from '../repositories/TimeEntryRepository';

class ApiFacade {
  setAccessToken(token: string | null) {
    httpClient.setAccessToken(token);
  }

  // Auth
  signUp = AuthRepository.signUp;

  // Hook Groups
  getHookGroups = HookGroupRepository.getAll;
  createHookGroup = HookGroupRepository.create;
  updateHookGroup = HookGroupRepository.update;
  deleteHookGroup = HookGroupRepository.delete;

  // Hooks
  getHooks = HookRepository.getAll;
  createHook = HookRepository.create;
  updateHook = HookRepository.update;
  deleteHook = HookRepository.delete;

  // People
  getPeople = PersonRepository.getAll;
  createPerson = PersonRepository.create;
  updatePerson = PersonRepository.update;
  deletePerson = PersonRepository.delete;

  // Categories
  getCategories = CategoryRepository.getAll;
  createCategory = CategoryRepository.create;
  deleteCategory = CategoryRepository.delete;

  // Tasks
  getTasks = TaskRepository.getAll;
  createTask = TaskRepository.create;
  updateTask = TaskRepository.update;
  moveTaskToSprint = TaskRepository.moveToSprint;
  moveTaskToInbox = TaskRepository.moveToInbox;
  completeTask = TaskRepository.complete;
  deleteTask = TaskRepository.delete;

  // Time Entries
  getTimeEntries = TimeEntryRepository.getAll;

  // Timer
  getTimer = TimerRepository.getTimer;
  startTimer = TimerRepository.start;
  pauseTimer = TimerRepository.pause;
  stopTimer = TimerRepository.stop;

  // Sprint
  getActiveSprint = SprintRepository.getActiveSprint;
  getSprintHistory = SprintRepository.getHistory;
  startSprint = SprintRepository.start;
  completeSprint = SprintRepository.complete;
  resetActiveSprintTimes = SprintRepository.resetActiveSprintTimes;

  // Telegram
  setupTelegramWebhook = TelegramRepository.setupWebhook;
  getTelegramStatus = TelegramRepository.getStatus;
  disconnectTelegram = TelegramRepository.disconnect;
}

export const api = new ApiFacade();
