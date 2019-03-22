import http from './http';
declare var Http: {
  [key:string]: any; // missing index defintion
  prototype: http;
  new(): http;
}