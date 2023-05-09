import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  contato: Contato = new Contato();

  constructor(private service: ContatoService){

  }

  ngOnInit(): void {

  }

  onSubmit(): void{
    this.service.save(this.contato)
    .subscribe(response =>{
      this.contato = response;
    })
  }

}
