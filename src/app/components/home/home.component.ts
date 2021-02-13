import { Component, OnInit } from '@angular/core';
import{FormGroup, FormControl, Validators} from '@angular/forms'

import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  forma:FormGroup;
  numeroRandom:number;
  intento:number;
  placeHolder:String;

  constructor() { 
  
  }

  ngOnInit(): void {
    this.placeHolder="Ingresa tu número"
    this.intento=0;
    this.forma = new FormGroup({
      'numero': new FormControl('', [
                                      Validators.required,
                                      
                                    ])
    })
    this.numeroRandom=this.buscarNumeroRandom(0,100);
    console.log(this.numeroRandom);
  }

  compararNumeros() {
    if(this.forma.value.numero<0 || this.forma.value.numero>100){
      Swal.fire({
        title:"Número Incorrecto",
        text: "El número debe estar entre 0 y 100",
        icon:'warning',
        confirmButtonText:"OK",
        showConfirmButton:true,
        showCancelButton:false
    });
    return null;
  }
    
    if(!this.forma.valid){
      return null;
    }
    console.log(this.forma.value);
   var numero=this.forma.value.numero;
   console.log(numero);
   if(numero==this.numeroRandom){
     console.log("Ganaste");
     this.intento++;
     Swal.fire({
      title:`¡Adivinaste en el intento ${this.intento}!`,
      text: `el número que estaba pensando es el ${numero}.`,
      icon:'success',
      confirmButtonText:"Volver a Jugar",
      showConfirmButton:true,
      showCancelButton:false
    }).then( resp=>{
      this.ngOnInit();}  
          );

   }else if(numero>this.numeroRandom){
     console.log("tu numero es mayor al número del juego");
     this.intento++;
     this.placeHolder=`Menor a ${numero}`
     Swal.fire({
      title:`No Adivinaste, el número que estoy pensando es Menor a ${numero}`,
      text: `¿Seguir intentando?`,
      icon:'error',
      confirmButtonText:"Seguir",
      cancelButtonText:"Volver a Empezar",
      showConfirmButton:true,
      showCancelButton:true
    }).then( resp=>{
      if(resp.value){
        this.forma.reset({
          numero:null
        })
      }else{
        this.ngOnInit();
      }} 
          );

   }else if(numero<this.numeroRandom){
    this.placeHolder=`Mayor a ${numero}`
     this.intento++;
     Swal.fire({
      title:`No Adivinaste, el número que estoy pensando es Mayor a ${numero}`,
      text: `¿Seguir intentando?`,
      icon:'error',
      confirmButtonText:"Seguir",
      cancelButtonText:"Volver a Empezar",
      showConfirmButton:true,
      showCancelButton:true
    }).then( resp=>{
      if(resp.value){
        this.forma.reset({
          numero:null
        })
      }else{
        this.ngOnInit();
      }}
      
          );
   }
    
  }

  buscarNumeroRandom(min:number,max:number){
    return Math.floor(Math.random() * (max - min)) + min;
  }

}
