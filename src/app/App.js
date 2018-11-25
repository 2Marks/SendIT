import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import * as components from './components';
 
class App {

  constructor() {
    this.express = express();
    this.init();
  }

  init(){
    /**
     * init necessary middlewares here
     */
    this.express.use(bodyParser.urlencoded({limit: "5mb", extended: true}));
    this.express.use(bodyParser.json({limit: "5mb"}));
    this.express.use(cors());
    this.express.use(morgan("dev"))

    /**
     * accessible routes here
     */
    this.express.use("/api/v1", components.API)
  }
  
}

export default new App().express;