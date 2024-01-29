import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureFlagService } from './feature-flag.service';
import { HttpClientModule } from '@angular/common/http';
import { LocalService } from './local.service';
import { UnleashService } from './unleash.service';
import { localFileInjectionToken } from './local-file.token';
import { UnleashConfiguration } from './unleash-configuration';
import { unleashConfigInjectionToken } from './unleash.token';

export type FeatureFlagConfiguration = string | UnleashConfiguration;

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [LocalService, UnleashService],
})
export class FeatureFlagModule {
  static forRoot(
    config: FeatureFlagConfiguration
  ): ModuleWithProviders<FeatureFlagModule> {
    return {
      ngModule: FeatureFlagModule,
      providers: this.getProvidersFromConfig(config),
    };
  }

  private static getProvidersFromConfig(config: FeatureFlagConfiguration) {
    if (typeof config === 'string') {
      return [
        { provide: localFileInjectionToken, useValue: config },
        { provide: FeatureFlagService, useExisting: LocalService },
      ];
    } else {
      return [
        { provide: unleashConfigInjectionToken, useValue: config },
        { provide: FeatureFlagService, useExisting: UnleashService },
      ];
    }
  }
}
