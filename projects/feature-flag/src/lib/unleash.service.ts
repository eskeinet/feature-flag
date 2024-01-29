import { Injectable, Inject } from '@angular/core';
import { FeatureFlagService } from './feature-flag.service';
import { UnleashClient } from 'unleash-proxy-client';
import { Observable, from, fromEvent, map, mergeMap } from 'rxjs';
import { unleashConfigInjectionToken } from './unleash.token';
import { UnleashConfiguration } from './unleash-configuration';

@Injectable()
export class UnleashService extends FeatureFlagService {
  constructor(
    @Inject(unleashConfigInjectionToken) private config: UnleashConfiguration
  ) {
    super();
  }

  private unleash = new UnleashClient({
    ...this.config,
    metricsInterval: 10,
  });
  private unleashLoaded$ = from(this.unleash.start());
  private unleashUpdate$ = this.unleashLoaded$.pipe(
    mergeMap(() => fromEvent(this.unleash, 'update'))
  );

  public isFeatureEnabled(featureName: string): Observable<boolean> {
    return this.unleashLoaded$.pipe(
      map(() => this.unleash.isEnabled(featureName))
    );
  }
}
