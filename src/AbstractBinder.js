class AbstractBinder{
  constructor(handler, render){
    this.handler = handler;
    this.render = render;
  }

  bind(){
    if(this.handler){
      this.handler.bind();
    }
    if(this.render){
      this.render.bind();
    }

    return this;
  }

  unbind(){
    if(this.handler){
      this.handler.unbind();
    }
    if(this.render){
      this.render.unbind();
    }

    return this;
  }
};

module.exports = AbstractBinder;
