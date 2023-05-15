import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { ContatoDetalheComponent } from '../contato-detalhe/contato-detalhe.component';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario: FormGroup;
  contatos: Contato[] = [];
  colunas = ['foto','id', 'nome', 'email', 'favorito'];

  totalElementos = 0;
  pagina = 0;
  tamanho = 10;
  pageSizeOptions: number[] = [10];

  constructor(private service: ContatoService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar){

  }

  ngOnInit(): void {
     this.listar(this.pagina, this.tamanho);
     this.montarFormulario();
  }

  listar(pagina: number = 0, tamanho: number = 10):void{
    this.service.list(pagina, tamanho).subscribe( response =>{
      this.contatos = response.content;
      this.pagina = response.number;
      this.totalElementos = response.totalElements;
    })
  }

  favoritar(contato: Contato){
    this.service.toFavorite(contato)
      .subscribe( response =>{
        contato.favorito = !contato.favorito;
    });

  }

  montarFormulario():void{
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]]
    });
  }

  onSubmit(): void{
    const formValues = this.formulario.value;

    let contato: Contato = new Contato(formValues.nome, formValues.email)
    this.service.save(contato)
    .subscribe(response =>{
      this.listar();
      this.snackBar.open('O contato foi adicionado!', 'Sucesso',{
        duration: 2000
      });
    });




  }


  uploadFoto(event: any, contato: Contato){
    const files = event.target.files;
    if(files){
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append("foto", foto);
      this.service.upload(contato, formData)
        .subscribe( response => this.listar(this.pagina, this.tamanho));
    }
  }

  paginar(event: PageEvent){
    this.pagina = event.pageIndex;
    this.listar(this.pagina, this.tamanho);

  }



  visualizarContato(contato: Contato){
    this.dialog.open( ContatoDetalheComponent, {
      width: '400px',
      height: '450px',
      data: contato
    });
  }

}
