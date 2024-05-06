import { Injectable } from '@angular/core';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { AxiosConfig } from '../axios-config';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  ApiWrapper = AxiosConfig();

  handleErrors(error: AxiosError) {
    return Promise.reject(error.response);
  }

  async GET(endPoint: string, config?: AxiosRequestConfig) {
    return await this.ApiWrapper.get(endPoint, config)
      .then((response) => {
        return { data: [...response.data], status: response.status };
      })
      .catch((error) => this.handleErrors(error));
  }

  async POST(endPoint: string, data: any, config?: AxiosRequestConfig) {
    return await this.ApiWrapper.post(endPoint, data, config)
      .then((response) => {
        return { data: { ...response.data }, status: response.status };
      })
      .catch((error) => this.handleErrors(error));
  }

  async DELETE(endPoint: string, config?: AxiosRequestConfig) {
    return await this.ApiWrapper.delete(endPoint, config)
      .then((response) => {
        return { data: response.data, status: 200 };
      })
      .catch((error) => {
        this.handleErrors(error);
      });
  }

  async PATCH(endPoint: string, data: any, config?: AxiosRequestConfig) {
    return await this.ApiWrapper.patch(endPoint, data, config)
      .then((response) => {
        return { data: response.data, status: 200 };
      })
      .catch((error) => {
        this.handleErrors(error);
      });
  }
}
