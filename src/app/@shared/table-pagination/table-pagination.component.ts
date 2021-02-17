import { ITableColums } from '@core/interfaces/table-colums.interface';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DocumentNode } from 'graphql';
import { TablePaginationService } from './table-pagination.service';
import { IResultData, IInfoPage } from '@core/interfaces/result-data.interface';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { ACTIVE_FILTERS } from '../../@core/constant/filters';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent implements OnInit {
  @Input() query: DocumentNode;
  @Input() context: object;
  @Input() itemsPage: 20;
  @Input() include = true;
  @Input() resultData: IResultData;
  @Input() filterActiveValues: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE;
  @Input() tableColums: Array<ITableColums> = undefined;
  @Output() manageItem = new EventEmitter<Array<any>>();
  infoPage: IInfoPage;
  data$: Observable<any>;
  constructor(private service: TablePaginationService) { }

  ngOnInit(): void {

    if (this.query === undefined) {
      throw new Error('Querry is undefined, please add');

    }
    if (this.resultData === undefined) {
      throw new Error('resultData is undefined, please add');

    }
    if (this.tableColums === undefined) {
      throw new Error('tableColums is undefined, please add');

    }
    this.infoPage = {
      page: 1,
      pages: 1,
      itemsPage: this.itemsPage,
      total: 1
    };
    this.loadData();
  }


  loadData(){
    const variables = {
      page: this.infoPage.page,
      itemsPage: this.infoPage.itemsPage,
      include: this.include,
      active: this.filterActiveValues
    };
    this.data$ = this.service.getCollectionData(this.query, variables, {})
    .pipe(
      map((result: any) => {
        const data = result[this.resultData.definitionKey];
        this.infoPage.pages = data.info.pages;
        this.infoPage.total = data.info.total;
        return data[this.resultData.listKey];
      })
    );
  }

  changePage() {
    console.log(this.infoPage.page);
    this.loadData();

  }

  manageAction(action: string, data: any) {
    console.log(action, data);
    this.manageItem.emit([
      action,
      data
    ]);
  }

}
