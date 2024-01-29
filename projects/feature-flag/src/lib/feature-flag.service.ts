import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class FeatureFlagService {
  public abstract isFeatureEnabled(featureName: string): Observable<boolean>;
}
