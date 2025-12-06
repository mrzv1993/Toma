import { httpClient } from '../utils/httpClient';

export interface Idea {
  id: string;
  text: string;
  tags: string[];
  color?: string;
  userId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateIdeaDTO {
  text: string;
  tags?: string[];
  color?: string;
}

export interface UpdateIdeaDTO {
  text?: string;
  tags?: string[];
  color?: string;
}

export class IdeaRepository {
  static async getAll(): Promise<Idea[]> {
    const response = await httpClient.request<{ success: boolean; data: Idea[] }>(
      '/ideas'
    );
    return response.data;
  }

  static async create(dto: CreateIdeaDTO): Promise<Idea> {
    const response = await httpClient.request<{ success: boolean; data: Idea }>(
      '/ideas',
      {
        method: 'POST',
        body: JSON.stringify(dto),
      }
    );
    return response.data;
  }

  static async update(id: string, dto: UpdateIdeaDTO): Promise<Idea> {
    const response = await httpClient.request<{ success: boolean; data: Idea }>(
      `/ideas/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(dto),
      }
    );
    return response.data;
  }

  static async delete(id: string): Promise<void> {
    await httpClient.request(`/ideas/${id}`, {
      method: 'DELETE',
    });
  }
}
