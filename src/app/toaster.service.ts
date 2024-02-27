import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toasterService:ToastrService) { }

  successToaster(message?: string | undefined, title?: string | undefined, override?: Partial<IndividualConfig<any>> | undefined){
    this.toasterService.success(message,title ?? 'Success',override)
  }

  errorToaster(message?: string | undefined, title?: string | undefined, override?: Partial<IndividualConfig<any>> | undefined){
    this.toasterService.error(message,title ?? 'Error',override)
  }

  infoToaster(message?: string | undefined, title?: string | undefined, override?: Partial<IndividualConfig<any>> | undefined){
    this.toasterService.info(message,title ?? 'Info',override)
  }

  warningToaster(message?: string | undefined, title?: string | undefined, override?: Partial<IndividualConfig<any>> | undefined){
    this.toasterService.warning(message,title ?? 'Warning',override)
  }
}
