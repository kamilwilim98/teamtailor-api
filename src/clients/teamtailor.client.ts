import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

@Injectable()
export class TeamtailorClient {
  remainingRequests: number;
  resetTime: number;
  client: axios.AxiosInstance;
  baseUrl: string;
  apiKey: string;

  constructor(private readonly configService: ConfigService) {
    this.remainingRequests = Infinity;
    this.resetTime = Date.now();
    this.baseUrl = this.configService.get('TEAMTAILOR_API_URL') as string;
    this.apiKey = this.configService.get('TEAMTAILOR_API_KEY') as string;

    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      headers: {
        Authorization: `Token token=${this.apiKey}`,
        'X-Api-Version': '20240404',
      },
    });

    this.client.interceptors.response.use(
      (response) => this.handleRateLimitHeaders(response),
      (error) => Promise.reject(error),
    );

    this.client.interceptors.request.use(
      (config) => this.handleRateLimitRequests(config),
      (error) => Promise.reject(error),
    );
  }

  handleRateLimitHeaders(response: AxiosResponse) {
    if (response.headers['x-rate-limit-limit']) {
      const limit = parseInt(response.headers['x-rate-limit-limit'], 10);
      this.remainingRequests = parseInt(response.headers['x-rate-limit-remaining'], 10);
      const reset = parseInt(response.headers['x-rate-limit-reset'], 10);

      this.resetTime = Date.now() + reset * 1000;

      console.log(
        `Rate Limit: ${limit}, Remaining: ${this.remainingRequests}, Reset In: ${reset}s`,
      );
    }
    return response;
  }

  async handleRateLimitRequests(config: InternalAxiosRequestConfig) {
    if (this.remainingRequests <= 0) {
      const waitTime = this.resetTime - Date.now();
      if (waitTime > 0) {
        console.log(`Rate limit exceeded. Waiting for ${waitTime / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }
    return config;
  }
}
