import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario: FormGroup;
  contatos: Contato[] = [];
  colunas = ['id', 'nome', 'email', 'favorito'];

  constructor(private service: ContatoService,
    private fb: FormBuilder){

  }

  ngOnInit(): void {
      this.formulario = this.fb.group({
        nome: ['', Validators.required],
        email: ['', [Validators.email, Validators.required]]
      });

      this.service.getAll().subscribe( response =>{
        this.contatos = response;
      })
  }

  onSubmit(): void{
    const formValues = this.formulario.value;

    let contato: Contato = new Contato(formValues.nome, formValues.email)
    this.service.save(contato)
    .subscribe(response =>{
      this.contatos.push(response);
    })
  }

}
