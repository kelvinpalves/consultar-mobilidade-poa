import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConsultarService } from '../../service';
import { Consulta, Itinerario } from '../../models';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {
  private readonly CHAVE_ONIBUS: string = 'onibus';
  private readonly CHAVE_LOTACAO: string = 'lotacao';
  private readonly TITULO_ONIBUS: string = "Consultar linhas de ônibus";
  private readonly TITULO_LOTACAO: string = "Consultar linhas de lotação";
  private readonly CARREGANDO_LOTACAO: string = "Aguarde, carregando linhas de lotação.";
  private readonly CARREGANDO_ONIBUS: string = "Aguarde, carregando linhas de ônibus.";
  private readonly CARREGANDO_ITINERARIOS: string = "Aguarde, carregando os pontos para a linha selecionada.";

  form: FormGroup;
  titulo: string = "";
  mensagemCarregando: string = "";
  tipoConsulta: string = "";
  linhas: Consulta[] = [];
  ponto: Itinerario;
  carregando: boolean = false;
  ColumnMode = ColumnMode;
  colunas = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: ConsultarService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.lerTipoConsulta();
    this.definirTitulo();
    this.configurarTabela();
    this.gerarForm();
    this.consultarLinhasOnibus();
    this.consultarLinhasLotacao();
  }

  configurarTabela() {
    this.colunas = [
      { name: 'Ponto' },
      { name: 'Latitude' },
      { name: 'Longitude' },
      { name: 'Link Google Maps', sortable: false }
    ];
  }

  habilitarModoCarregando(mensagem) {
    this.carregando = true;
    this.mensagemCarregando = mensagem;
  }

  desabilitarModoCarregando() {
    this.carregando = false;
  }

  pesquisarItinerario() {
    let id = this.form.get("linha").value;

    this.habilitarModoCarregando(this.CARREGANDO_ITINERARIOS);

    this.service.consultarItenerario(id)
      .subscribe(
        data => {
          this.ponto = this.criarListaPontos(data);          
          this.desabilitarModoCarregando();
          this.toastr.success(`O itinerário para a linha ${this.ponto.nome} foi carregado com sucesso.`);
        },
        err => {
          this.desabilitarModoCarregando();
          this.toastr.error(`Ocorreu um erro ao carregar o itinerário para a linha ${this.ponto.nome}.`);
        }
      );
  }

  criarListaPontos(data: any): Itinerario {
    let ponto: Itinerario = data;
    ponto.pontos = [];

    for (let objeto in data) {
      let propriedade = parseInt(objeto);

      if (!isNaN(propriedade)) {
        ponto.pontos.push(this.criarPonto(propriedade, data[objeto]));
        delete ponto[objeto];
      }
    }

    return ponto;
  }

  criarPonto(index: number, data: any): any {
    return {
      ponto: index + 1,
      latitude: data.lat,
      longitude: data.lng,
      linkGoogleMaps: `<a href="https://www.google.com/maps/?q=${data.lat},${data.lng}" target="_">Visualizar no Mapa</a>`
    }
  }

  linhaSelecionada(): boolean {
    return this.form.get("linha").value != null;
  }

  lerTipoConsulta(): void {
    this.tipoConsulta = this.route.snapshot.paramMap.get('tipoConsulta');
  }

  consultarLinhasOnibus(): void {
    if (this.tipoConsulta == this.CHAVE_ONIBUS) {
      this.habilitarModoCarregando(this.CARREGANDO_ONIBUS);
      this.service.consultarOnibus()
        .subscribe(
          data => {
            this.linhas = data;
            this.desabilitarModoCarregando();
            this.toastr.success("Linhas de ônibus carregadas com sucesso.");
          },
          err => {
            this.linhas = [];
            this.desabilitarModoCarregando();
            this.toastr.error("Ocorreu um erro ao carregar as linhas de ônibus.");
          }
        );
    }
  }

  gerarForm() {
    this.form = this.fb.group({
      linha: [null]
    });
  }

  consultarLinhasLotacao(): void {
    if (this.tipoConsulta == this.CHAVE_LOTACAO) {
      this.habilitarModoCarregando(this.CARREGANDO_LOTACAO);
      this.service.consultarLotacao()
        .subscribe(
          data => {
            this.linhas = data;
            this.desabilitarModoCarregando();
            this.toastr.success("Linhas de lotação carregadas com sucesso.");
          },
          err => {
            this.linhas = [];
            this.desabilitarModoCarregando();
            this.toastr.error("Ocorreu um erro ao carregar as linhas de lotação.");
          }
        );
    }
  }

  definirTitulo(): void {
    this.titulo = (this.tipoConsulta == this.CHAVE_ONIBUS) ? this.TITULO_ONIBUS : this.TITULO_LOTACAO;
  }

}
