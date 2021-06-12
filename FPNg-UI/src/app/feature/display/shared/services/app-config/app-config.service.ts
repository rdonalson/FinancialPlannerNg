import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppConfig } from '../../models/appconfig';

@Injectable()
export class AppConfigService {

    config: AppConfig = {
        theme: 'saga-blue',
        dark: false,
        inputStyle: 'outlined',
        ripple: true
    };

    private configUpdate = new Subject<AppConfig>();

    configUpdate$ = this.configUpdate.asObservable();

    updateConfig(config: AppConfig): void {
        this.config = config;
        this.configUpdate.next(config);
    }

    getConfig(): AppConfig {
        return this.config;
    }
}
