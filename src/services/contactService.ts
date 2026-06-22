// Vraj

import { apiService } from './api';
import type { ContactFormType } from '../utils/validation';

class ContactService {
  async sendContactMessage(data: ContactFormType): Promise<void> {
    const response = await apiService.post('/contact/message', {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });

    if (!response.success) {
      throw new Error(response.error || 'Erro ao enviar mensagem');
    }
  }

  async subscribeNewsletter(email: string): Promise<void> {
    const response = await apiService.post('/contact/newsletter-subscribe', {
      email,
    });

    if (!response.success) {
      throw new Error(response.error || 'Erro ao inscrever na newsletter');
    }
  }

  async unsubscribeNewsletter(email: string, token: string): Promise<void> {
    const response = await apiService.post('/contact/newsletter-unsubscribe', {
      email,
      token,
    });

    if (!response.success) {
      throw new Error(response.error || 'Erro ao desinscrever da newsletter');
    }
  }
}

export const contactService = new ContactService();