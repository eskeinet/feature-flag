import { InjectionToken } from '@angular/core';
import { UnleashConfiguration } from './unleash-configuration';

export const unleashConfigInjectionToken =
  new InjectionToken<UnleashConfiguration>('unleashConfig');
