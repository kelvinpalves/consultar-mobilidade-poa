import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { ConsultarService } from '../../service';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { ConsultarComponent } from './consultar.component';
import { ConsultarRoutes } from '../../consultar-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

describe('Componente de Consulta de Linhas de Lotação e Ônibus', () => {
  let component: ConsultarComponent;
  let fixture: ComponentFixture<ConsultarComponent>;

  let TITULO_ONIBUS: string = "Consultar linhas de ônibus";
  let TITULO_LOTACAO: string = "Consultar linhas de lotação";

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarComponent ],
      imports: [
        CommonModule, RouterModule, HttpClientModule, ReactiveFormsModule,
        NgSelectModule, NgxDatatableModule,
        ToastrModule.forRoot(),
        RouterModule.forRoot(ConsultarRoutes)
      ],
      providers: [
        ConsultarService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Validar criação do componente.', () => {
    expect(component).toBeTruthy();
  });

  it('Validar título de acordo com a rota.', () => {
    component.tipoConsulta = 'onibus';
    component.definirTitulo();
    expect(component.titulo).toEqual(TITULO_ONIBUS);

    component.tipoConsulta = 'lotacao';
    component.definirTitulo();
    expect(component.titulo).toEqual(TITULO_LOTACAO);
  });

  it('Validar se linha está selecionada.', () => {
    component.form.get('linha').setValue('53');
    expect(component.linhaSelecionada()).toBeTrue();

    component.form.get('linha').setValue(null);
    expect(component.linhaSelecionada()).toBeFalse();
  });

  it('Validar se ponto está sendo criado.', () => {
    let index = 2;
    let ponto = { lat: 10, lng: 10 };

    let esperado = {
      ponto: 3, latitude: 10, longitude: 10,
      linkGoogleMaps: `<a href="https://www.google.com/maps/?q=10,10" target="_">Visualizar no Mapa</a>`
    };

    let retorno = component.criarPonto(index, ponto);
    expect(retorno).toEqual(esperado);

    index = 10;
    ponto = { lat: 350, lng: 430 };

    esperado = {
      ponto: 11, latitude: 350, longitude: 430,
      linkGoogleMaps: `<a href="https://www.google.com/maps/?q=350,430" target="_">Visualizar no Mapa</a>`
    };

    retorno = component.criarPonto(index, ponto);
    expect(retorno).toEqual(esperado);
  });
});
