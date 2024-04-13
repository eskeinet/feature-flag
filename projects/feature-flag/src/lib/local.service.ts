import { Inject, Injectable } from '@angular/core';
import { FeatureFlagService } from './feature-flag.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FeatureFlag } from './feature-flag';
import { localFileInjectionToken } from './local-file.token';

@Injectable()
export class LocalService extends FeatureFlagService {
  constructor(
    private http: HttpClient,
    @Inject(localFileInjectionToken) private localFile: string
  ) {
    super();
    this.flags$ = this.loadFeatureFlags();
  }

  private flags$: Observable<FeatureFlag[]>;

  public isFeatureEnabled(featureName: string): Observable<boolean> {
    return this.flags$.pipe(
      map(
        (flags: FeatureFlag[]) =>
          !!flags?.find((flag) => flag?.flag === featureName && flag?.enabled)
      )
    );
  }

  // load feature flags from a json file
  public loadFeatureFlags(): Observable<FeatureFlag[]> {
    return this.http.get<FeatureFlag[]>(this.localFile);
  }
}
